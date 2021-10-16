const express = require("express");
const crypto = require("crypto");
const cookieSession = require("cookie-session");
const expressRateLimit = require("express-rate-limit")
const app = express();
require("dotenv").config();

const passHasher = crypto.createHmac("sha256", process.env.PASSWORD_HASH_SECRET);

const connection = require('./mysql');
const mail = require("./mail");

app.use("/public", express.static("public"))

app.use(express.json());
app.use(cookieSession({
    name: "PopJonanekLogin",
    keys: [
        process.env.COOKIE_SESSION_SECRET_1,
        process.env.COOKIE_SESSION_SECRET_2,
    ],
    maxAge: 29 * 24 * 60 * 60 * 1000
}))


//TODO: NEPOČÍTÁNÍ NEÚSPĚŠNÝCH REQUESTŮ DO RATE LIMITU
//TODO: PŘIDÁNÍ JSON ERROR ZPRÁV
const RegLimiter = expressRateLimit({
    windowMs: 24 * 60 * 60 * 1000, 
    max: 5
})
const LogLimiter = expressRateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 10
})

app.use(express.urlencoded({ extended: true }));

//Login check
app.use((req, res, next) => {
    let logined = false;
    if (req.session.username & req.session.password) {
        connection.query("SELECT * FROM Users WHERE Username LIKE '" + req.session.username+ "' AND SHA256Password LIKE '" + req.session.password + "' LIMIT 1", (err, result) => {
            if (!err) {
                if (result.length > 0) {
                    logined = true;
                    console.log("LL");
                }
            } 
        })
    }
    res.locals.logined = logined;
    next();
})

app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
    console.log(res.locals.logined);
});

app.post("/api/usernamecheck", (req, res) => {
    connection.query("SELECT * FROM Users WHERE Username LIKE '" + req.body.username + "'", (err, result) => {
        if (result.length > 0) {
            res.json({VolneJmeno: false})
        } else {
            res.json({VolneJmeno: true})
        }
    })
})

app.get("/api/test", (req, res) => {
    console.log(req.session.username);
    req.session.username = "kokot";
})

//ÚDAJE CO CHCU: username, email, heslo, reheslo
app.post("/api/reg", RegLimiter, (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.heslo || !req.body.reheslo) {
        res.json({code: 6001, msg: "Nebylo vyplněné povinné pole"});
    } else if (req.body.heslo != req.body.reheslo) {
        res.json({code: 6002, msg: "Zadaná hesla se neshodují!"});
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
        res.json({code: 6003, msg: "Zadaný email není platný!"});
    } else if (req.body.username.length < 4 || req.body.username.length > 15) {
        res.json({code: 6004, msg: "Zadaná přezdívka je příliš krátká nebo dlouhá! Přezdívka musí mít 4-29 znaků"});
    } else if (req.body.heslo.length < 8 || req.body.heslo.length > 40) {
        res.json({code: 6005, msg: "Zadané heslo je příliš krátké nebo dlouhé! Heslo musí mít 8-40 znaků"});
    } else {
        connection.query ("SELECT * FROM Users WHERE Username LIKE '" + req.body.username + "' OR Email LIKE '" + req.body.email + "'", (err, result) => {
            if (result.length > 0) {
                res.json({code: 6006, msg: "Zadaný email nebo uživatelské jméno již někdo využívá!"})
            } else {
                const hash = passHasher.update(req.body.heslo).digest("hex");
                connection.query("INSERT INTO Users (Username, SHA256Password, Email) VALUES ('" + req.body.username + "', '" + hash + "', '" + req.body.email + "')", (err2, result2) => {
                    if (err2) {
                        res.json({ code: 6007, msg: "Nastala chyba při zapisování dat do databáze" });
                    } else {
                        res.json({ code: 0, msg: "Registrace proběhla úspěšně!" });
                        req.session.username = req.body.username;
                        req.session.password = hash;
                        const fs = require("fs");
                        mail.sendMail({
                            from: "noreply@popjonanek.napicu.eu",
                            to: req.body.email,
                            subject: "Registrace | popjoanek.napicu.eu",
                            html: fs.readFileSync("./emails/welcome.html").toString().replaceAll("$USERNAME$", result[0].Username).replace("$RESETCODE$", ResetCode).replaceAll("$IP$", req.headers["X-Real-IP"]).replaceAll("$MAINLINK$", process.env.MAIN_LINK).replaceAll("$STYLE$", fs.readFileSync("./emails/style.css").toString())
                        })
                    }
                })
            }
        })
    }
})

app.post("/api/resetpassword/check", (req, res) => {
    if (!req.body.code) {
        res.json({code: 6001, msg: "Nebylo vyplněné povinné pole"});
    } else {
        connection.query("SELECT * FROM PasswordReset WHERE Code LIKE '" + req.body.code + "' LIMIT 1", (err, result) => {
            if (result.length < 1) {
                res.json({code: 6011, msg: "Nebyl zadán platný kód pro resetování hesla."});
            } else if(new Date() - new Date(result[0].CreationTimestamp) > process.env.RESETPASSWORD_CODE_ACTIVE_TIME_MS) {
                connection.query("DELETE FROM PasswordReset WHERE ID LIKE '" + result[0].ID + "'");
                res.json({code: 6012, msg: "Byl zadán již expirovaný kód pro resetování hesla. Kód je aktivní pouze 30 minut!"});
            } else if (req.body.code & (!req.body.heslo || !req.body.reheslo)) {
                res.json({code: 0, msg: "Zadaný kód pro resetování hesla je platný."})
            } else {
                if (heslo !== reheslo) {
                    res.json({code: 6002, msg: "Zadaná hesla se neshodují!"});
                } else {
                    const hash = passHasher.update(req.body.heslo).digest("hex");
                    connection.query("UPDATE Users SET SHA256Password='" + hash + "' WHERE ID LIKE '" + result[0].User_ID + "'", (err2) => {
                        if (err2) {
                            res.json({code: 6007, msg: "Nastala chyba při zapisování dat do databáze"});
                        } else {
                            res.json({code: 0, msg: "Heslo bylo úspěšně resetováno!"});
                        }
                    })
                }
            }
        })
    }
})

app.post("/api/resetpassword", (req, res) => {
    if (!req.body.email) {
        res.json({code: 6001, msg: "Nebylo vyplněné povinné pole"});
    } else {
        connection.query("SELECT * FROM Users WHERE Email LIKE '" + req.body.email + "' LIMIT 1", (err, result) =>{
            if (result.length < 1) {
                res.json({code: 6009, msg: "Byl zadán email, který není připojený u žádného účtu!"});
            } else {
                connection.query("SELECT * FROM PasswordReset WHERE User_ID LIKE '" + result[0].ID + "' ORDER BY ID DESC LIMIT 1", (err2, result2) => {
                    if (result2.length < 1 || new Date() - new Date(result2[0].CreationTimestamp) > process.env.RESETPASSWORD_CODE_ACTIVE_TIME_MS) {
                        if (result2.length > 0) {
                            connection.query("DELETE FROM PasswordReset WHERE ID LIKE '" + result2[0].ID + "'");
                        }

                        const ResetCode = crypto.randomBytes(8).toString("hex");
                        connection.query("INSERT INTO PasswordReset (User_ID, Code, CreationTimestamp) VALUES ('" + result[0].ID + "', '" + ResetCode + "', '" + new Date().getTime() + "')", (err2) => {
                            if (err2) {
                                res.json({code: 6007, msg: "Nastala chyba při zapisování dat do databáze"});
                            } else {
                                res.json({code: 0, msg: "Email pro resetování hesla byl odeslán úspěšně"});
                            }
                        })
                        const fs = require("fs");
                        mail.sendMail({
                            from: "noreply@popjonanek.napicu.eu",
                            to: req.body.email,
                            subject: "Žádost o resetování hesla | popjoanek.napicu.eu",
                            html: fs.readFileSync("./emails/passwordreset.html").toString().replaceAll("$USERNAME$", result[0].Username).replace("$RESETCODE$", ResetCode).replaceAll("$IP$", req.headers["X-Real-IP"]).replaceAll("$MAINLINK$", process.env.MAIN_LINK).replaceAll("$STYLE$", fs.readFileSync("./emails/style.css").toString())
                        })
                        .catch(() => {
                            console.log("[Chyba] Nepodařilo se odeslat kód pro resetování hesla.");
                        })
                    } else {

                        res.json({code: 6010, msg: "Kód pro resetování hesla pro tento účet již byl odeslán! Další lze vygenerovat až za 30 minut."});
                    }
                })
            }
        })
    }
})

app.post("/api/log", (req, res) => {
    if (!req.body.EmailUsername || !req.body.heslo) {
        res.json({code: 6001, msg: "Nebylo vyplněné povinné pole"});
    } else {
        const hash = passHasher.update(req.body.heslo).digest("hex");
        connection.query("SELECT * FROM Users WHERE (Username LIKE '" + req.body.EmailUsername + "' OR Email LIKE '" + req.body.EmailUsername + "') AND SHA256Password LIKE '" + hash + "' LIMIT 1", (err, result) => {
            if (err) {
                res.json({code: 6007, msg: "Nastala chyba při zapisování dat do databáze"});
            } else if (result.length == 1) {
                res.json({code: 0, msg: "Přihlášení proběhlo úspěšně!"});
                req.session.username = req.body.username;
                req.session.password = hash;
            } else {
                res.json({code: 6008, msg: "Bylo zadnaé špatné uživatelské jméno nebo heslo!"});
            }
        })
    }
})
app.get("/api/leaderboard", (req, res) => {
    res.json({msg: "JSI NAJIVNÍ SI MYSLET, ŽE JSEM NĚCO UDĚLAL"});
})
app.post("/api/update", async (req, res) => {
    const ClickCounter = req.body.ClickCounter;
    if (ClickCounter > 1000) {
        ClickCounter = 1000
    }
    let UserClicks = -1;
    if (req.session.username & req.session.password) {
        await connection.query("SELECT * FROM Users WHERE Username LIKE '" + req.body.username + "' AND SHA256Password LIKE '" + req.body.heslo + "' LIMIT 1", (err, result) => {
            const updatnuteKliky = result[0].Clicks + ClickCounter;
            connection.query("UPDATE Users SET Clicks='" + updatnuteKliky + "' WHERE Username LIKE '" + req.body.username + "'", (err2) => {
                if (err2) {
                    res.json({code: 6007, msg: "Nastala chyba při zapisování dat do databáze"});
                } else {
                    UserClicks = updatnuteKliky;
                }
            })
        })
    }
    let GlobalClicks;
    await connection.query(`SELECT counter FROM popjonanek WHERE id='1'`, (err, DataBaseData, fl) => {
        var y = DataBaseData[0].counter + Math.floor(ClickCounter);
        connection.query(`UPDATE popjonanek SET counter='${y}' WHERE id='1'`, (err, DataBaseData, fl) => {
            if (err) {
                res.json({code: 6007, msg: "Nastala chyba při zapisování dat do databáze"});
            } else {
                GlobalClicks = y;
            }
        });
    });
    res.json({userclicks: UserClicks, globalclicks: GlobalClicks})
});


app.listen(process.env.PORT, () => {
    console.log('The application is running on the port: ' + process.env.PORT);
});
connection.connect(function (e) {
    if (e) throw e;
    console.log('Application connected to the database!');
    setInterval(() => {
        connection.ping();
    }, 30 * 60 * 1000);
})
