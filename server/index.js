const express = require('express');
const crypto = require('crypto');
const cookieSession = require('express-session');
const expressRateLimit = require('express-rate-limit');
const codes = require('./codes.json');
const app = express();
require('dotenv').config();

const connection = require('./mysql');
const mail = require('./mail');

app.use('/public', express.static('public'));

app.use(express.json());
app.use(
  cookieSession({
    name: 'PopJonanekLogin',
    keys: [process.env.COOKIE_SESSION_SECRET_1, process.env.COOKIE_SESSION_SECRET_2],
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
);

//TODO: NEPOČÍTÁNÍ NEÚSPĚŠNÝCH REQUESTŮ DO RATE LIMITU
//TODO: PŘIDÁNÍ JSON ERROR ZPRÁV
const RegLimiter = expressRateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 5,
});
const LogLimiter = expressRateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
});

console.log(codes[0]);

app.use(express.urlencoded({ extended: true }));
app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

//Login check
app.use((req, res, next) => {
  if ((req.session.username != undefined) & (req.session.password != undefined)) {
    connection.query(
      `SELECT * FROM Users WHERE Username LIKE '${req.session.username}' AND SHA256Password LIKE '${req.session.password}' LIMIT 1`,
      (err, result) => {
        if (!err) {
          if (result.length > 0) {
            res.locals.loginedin = true;
            res.locals.user = result[0];
            next();
          } else {
            req.session = null;
            res.json(codes[6014]);
          }
        }
      }
    );
  } else {
    res.locals.loginedin = false;
    next();
  }
});
app.post('/api/usernamecheck', (req, res) => {
  connection.query(`SELECT * FROM Users WHERE Username LIKE '${req.body.username}`, (err, result) => {
    if (result.length > 0) {
      res.json({ VolneJmeno: false });
    } else {
      res.json({ VolneJmeno: true });
    }
  });
});

app.post('/api/reg', RegLimiter, (req, res) => {
  if (res.locals.loginedin) {
    res.json(codes[6013]);
  } else if (!req.body.name || !req.body.email || !req.body.passwords.pass1 || !req.body.passwords.pass2) {
    res.json(codes[6001]);
  } else if (req.body.passwords.pass1 != req.body.passwords.pass2) {
    res.json(codes[6002]);
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
    res.json(codes[6003]);
  } else if (!/^[a-zA-Z0-9\-]+$/.test(req.body.name)) {
    res.json(codes[6015]);
  } else if (req.body.name.length < 4 || req.body.name.length > 15) {
    res.json(codes[6004]);
  } else if (
    req.body.passwords.pass1.length < 8 ||
    req.body.passwords.pass1.length > 40 ||
    !/\d/.test(req.body.passwords.pass1) ||
    !/[a-z]/.test(req.body.passwords.pass1) ||
    !/[A-Z]/.test(req.body.passwords.pass1)
  ) {
    res.json(codes[6005]);
  } else {
    connection.query(
      `SELECT * FROM Users WHERE Username LIKE '${req.body.name}' OR Email LIKE '${req.body.email}`,
      (err, result) => {
        if (result) {
          res.json(codes[6006]);
        } else {
          const hash = crypto.createHash('sha256').update(req.body.passwords.pass1).digest('hex');
          connection.query(
            `INSERT INTO Users (Username, SHA256Password, Email) VALUES ('${req.body.name}', '${hash}', '${req.body.email}')`,
            (err2) => {
              if (err2) {
                res.json(codes[6007]);
              } else {
                req.session.username = req.body.name;
                req.session.password = hash;
                res.json(codes[0]);
                const fs = require('fs');
                mail.sendMail({
                  from: 'noreply@popjonanek.napicu.eu',
                  to: req.body.email,
                  subject: 'Registrace | popjoanek.napicu.eu',
                  html: fs
                    .readFileSync('./emails/welcome.html')
                    .toString()
                    .replaceAll('$USERNAME$', req.body.name)
                    .replaceAll('$IP$', req.headers['x-forwarded-for'])
                    .replaceAll('$MAINLINK$', process.env.MAIN_LINK),
                });
              }
            }
          );
        }
      }
    );
  }
});

app.post('/api/userdelete/check', (req, res) => {
  if (!res.locals.loginedin) {
    res.json(codes[6014]);
  } else {
    connection.query(
      `SELECT * FROM EmailCodes WHERE User_ID LIKE '${res.locals.ID}' AND CodeType LIKE '2' ORDER BY ID DESC LIMIT 1`,
      (err2, result) => {
        if (
          result.length < 1 ||
          new Date() - new Date(result[0].CreationTimestamp) > process.env.RESETPASSWORD_CODE_ACTIVE_TIME_MS
        ) {
          if (result.length > 0) {
            connection.query(`DELETE FROM EmailCodes WHERE ID LIKE '${res.locals.ID}' AND CodeType LIKE '2'`);
          }

          const DelCode = crypto.randomBytes(8).toString('hex');
          connection.query(
            `INSERT INTO EmailCodes (User_ID, CodeType, Code, CreationTimestamp) VALUES ('${
              res.locals.ID
            }', 1, '${DelCode}', '${new Date().getTime()}')`,
            (err2) => {
              if (err2) {
                res.json(codes[6007]);
              } else {
                res.json(codes[0]);
              }
            }
          );
          const fs = require('fs');
          mail
            .sendMail({
              from: 'noreply@popjonanek.napicu.eu',
              to: req.body.email,
              subject: 'Žádost o smazání účtu | popjoanek.napicu.eu',
              html: fs
                .readFileSync('./emails/passwordreset.html')
                .toString()
                .replaceAll('$USERNAME$', res.locals.Username)
                .replace('$RESETCODE$', DelCode)
                .replaceAll('$IP$', req.headers['x-forwarded-for'])
                .replaceAll('$MAINLINK$', process.env.MAIN_LINK),
            })
            .catch(() => {
              console.log('[Chyba] Nepodařilo se odeslat kód pro smazání účtu.');
            });
        } else {
          res.json(codes[6010]);
        }
      }
    );
  }
});

app.post('/api/userdelete', (req, res) => {
  if (!res.locals.loginedin) {
    res.json(codes[6014]);
  } else {
    connection.query(
      `SELECT * FROM EmailCodes WHERE User_ID LIKE '${res.locals.ID}' AND CodeType LIKE '2' ORDER BY ID DESC LIMIT 1`,
      (err2, result) => {
        if (
          result.length < 1 ||
          new Date() - new Date(result[0].CreationTimestamp) > process.env.RESETPASSWORD_CODE_ACTIVE_TIME_MS
        ) {
          if (result.length > 0) {
            connection.query(`DELETE FROM EmailCodes WHERE ID LIKE '${res.locals.ID}' AND CodeType LIKE '2'`);
          }

          const DelCode = crypto.randomBytes(8).toString('hex');
          connection.query(
            `INSERT INTO EmailCodes (User_ID, CodeType, Code, CreationTimestamp) VALUES ('${
              res.locals.ID
            }', 1, '${DelCode}', '${new Date().getTime()}')`,
            (err2) => {
              if (err2) {
                res.json(codes[6007]);
              } else {
                res.json(codes[0]);
              }
            }
          );
          const fs = require('fs');
          mail
            .sendMail({
              from: 'noreply@popjonanek.napicu.eu',
              to: req.body.email,
              subject: 'Žádost o smazání účtu | popjoanek.napicu.eu',
              html: fs
                .readFileSync('./emails/passwordreset.html')
                .toString()
                .replaceAll('$USERNAME$', res.locals.Username)
                .replace('$RESETCODE$', DelCode)
                .replaceAll('$IP$', req.headers['x-forwarded-for'])
                .replaceAll('$MAINLINK$', process.env.MAIN_LINK),
            })
            .catch(() => {
              console.log('[Chyba] Nepodařilo se odeslat kód pro smazání účtu.');
            });
        } else {
          res.json(codes[6010]);
        }
      }
    );
  }
});

app.post('/api/resetpassword/check', (req, res) => {
  if (res.locals.loginedin) {
    res.json(codes[6013]);
  } else if (!req.body.code) {
    res.json(codes[6001]);
  } else {
    connection.query(
      `SELECT * FROM EmailCodes WHERE Code LIKE '${req.body.code}' AND CodeType LIKE '1' LIMIT 1`,
      (err, result) => {
        if (result.length < 1) {
          res.json(codes[6011]);
        } else if (
          new Date() - new Date(result[0].CreationTimestamp) >
          process.env.RESETPASSWORD_CODE_ACTIVE_TIME_MS
        ) {
          connection.query(`DELETE FROM EmailCodes WHERE ID LIKE '${result[0].ID}' AND CodeType LIKE '1'`);
          res.json(codes[6012]);
        } else if (req.body.code & (!req.body.heslo || !req.body.reheslo)) {
          res.json(codes[0]);
        } else {
          if (heslo !== reheslo) {
            res.json(codes[6002]);
          } else {
            const hash = crypto.createHash('sha256').update(req.body.heslo).digest('hex');
            connection.query(
              `UPDATE Users SET SHA256Password='${hash}' WHERE ID LIKE '${result[0].User_ID}'`,
              (err2) => {
                if (err2) {
                  res.json(codes[6007]);
                } else {
                  res.json(codes[0]);
                }
              }
            );
          }
        }
      }
    );
  }
});

app.post('/api/resetpassword', (req, res) => {
  if (res.locals.loginedin) {
    res.json(codes[6013]);
  } else if (!req.body.email) {
    res.json(codes[6001]);
  } else {
    connection.query(`SELECT * FROM Users WHERE Email LIKE '${req.body.email}' LIMIT 1`, (err, result) => {
      if (result.length < 1) {
        res.json(codes[6009]);
      } else {
        connection.query(
          `SELECT * FROM EmailCodes WHERE User_ID LIKE '${result[0].ID}' AND CodeType LIKE '1' ORDER BY ID DESC LIMIT 1`,
          (err2, result2) => {
            if (
              result2.length < 1 ||
              new Date() - new Date(result2[0].CreationTimestamp) >
                process.env.RESETPASSWORD_CODE_ACTIVE_TIME_MS
            ) {
              if (result2.length > 0) {
                connection.query(
                  `DELETE FROM EmailCodes WHERE ID LIKE '${result2[0].ID}' AND CodeType LIKE '1'`
                );
              }

              const ResetCode = crypto.randomBytes(8).toString('hex');
              connection.query(
                `INSERT INTO EmailCodes (User_ID, CodeType, Code, CreationTimestamp) VALUES ('${
                  result[0].ID
                }', 1, '${ResetCode}', '${new Date().getTime()}')`,
                (err2) => {
                  if (err2) {
                    res.json(codes[6007]);
                  } else {
                    res.json(codes[0]);
                  }
                }
              );
              const fs = require('fs');
              mail
                .sendMail({
                  from: 'noreply@popjonanek.napicu.eu',
                  to: req.body.email,
                  subject: 'Žádost o resetování hesla | popjoanek.napicu.eu',
                  html: fs
                    .readFileSync('./emails/passwordreset.html')
                    .toString()
                    .replaceAll('$USERNAME$', result[0].Username)
                    .replace('$RESETCODE$', ResetCode)
                    .replaceAll('$IP$', req.headers['x-forwarded-for'])
                    .replaceAll('$MAINLINK$', process.env.MAIN_LINK),
                })
                .catch(() => {
                  console.log('[Chyba] Nepodařilo se odeslat kód pro resetování hesla.');
                });
            } else {
              res.json(codes[6010]);
            }
          }
        );
      }
    });
  }
});

app.get('/api/69', (req, res) => {
  res.send('');
});

app.post('/api/log', (req, res) => {
  if (res.locals.loginedin) {
    res.json(codes[6013]);
  } else if (!req.body.EmailUsername || !req.body.heslo) {
    res.json(codes[6001]);
  } else {
    const hash = crypto.createHash('sha256').update(req.body.heslo).digest('hex');
    connection.query(
      `SELECT * FROM Users WHERE (Username LIKE '${req.body.EmailUsername}' OR Email LIKE '${req.body.EmailUsername}') AND SHA256Password LIKE '${hash}' LIMIT 1`,
      (err, result) => {
        if (err) {
          res.json(codes[6007]);
        } else if (result.length == 1) {
          req.session.username = result[0].Username;
          req.session.password = hash;
          res.json(codes[0]);
        } else {
          res.json(codes[6008]);
        }
      }
    );
  }
});

app.get('/api/usercheck', (req, res) => {
  if (!res.locals.loginedin) {
    res.json({ loginedin: false, username: '', email: '' });
  } else {
    res.json({ loginedin: true, username: res.locals.user.Username, email: res.locals.user.Email });
  }
});

app.get('/api/leaderboard', (req, res) => {
  connection.query(`SELECT * FROM Users ORDER BY Clicks DESC LIMIT 10`, (err, result) => {
    const leaderboard = [];
    result.forEach((user) => {
      leaderboard.push({ user: user.Username, count: user.Clicks.toString() });
    });
    res.json(leaderboard);
  });
});

app.post('/api/update', async (req, res) => {
  //Počet kliků, co naklikal
  const ClickCounter = req.body.ClickCounter;
  if (ClickCounter > 1000) {
    ClickCounter = 1000;
  }

  //Celkový počet kliků uživatele, pokud je přihlášen
  let UserClicks = -1;
  if (res.locals.loginedin) {
    const updatnuteKliky = result[0].Clicks + ClickCounter;
    connection.query(
      `UPDATE Users SET Clicks='${updatnuteKliky}' WHERE Username LIKE '${req.session.username}'`,
      (err) => {
        if (err) {
          res.json(codes[6007]);
        } else {
          UserClicks = updatnuteKliky;
        }
      }
    );
  }

  let GlobalClicks;
  await connection.query(`SELECT counter FROM popjonanek WHERE id='1'`, (err, DataBaseData, fl) => {
    var y = DataBaseData[0].counter + Math.floor(ClickCounter);
    connection.query(`UPDATE popjonanek SET counter='${y}' WHERE id='1'`, (err, DataBaseData, fl) => {
      if (err) {
        res.json(codes[6007]);
      } else {
        GlobalClicks = y;
      }
    });
  });
  res.json({ userclicks: UserClicks, globalclicks: GlobalClicks });
});

app.listen(process.env.PORT, () => {
  console.log(`[Start] API běží na portu: ${process.env.PORT}`);
});
connection.connect(function (e) {
  if (e) {
    console.log(`[FATAL ERROR] Nepodařilo se připojit na MySQL! Err: ${e}`);
    process.exit(1);
  } else {
    console.log('[Start] Připojení na MySQL bylo úspěšné!!');
    setInterval(() => {
      connection.ping();
    }, 30 * 60 * 1000);
  }
});
