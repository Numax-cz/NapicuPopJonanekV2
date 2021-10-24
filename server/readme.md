# PopJonanek 2 - Api
* Api pro [PopJonanek](https://popjonanek.napicu.eu)
* Aplikace pro zobrazení světového skore
## Instalace 
1. Naklonování repozitáře
    ```sh
    git clone https://github.com/Numax-cz/NapicuPopJonanekV2.git
   ```
2. Nainstalování balíčků (server)
   ```sh
   npm install
   ``` 
4. Vytvořte databázi 
* Doporučená databáze pro tento kód 
    ```sql
    CREATE TABLE `popjonanek` (
    `id` int(11) NOT NULL,
    `counter` int(11) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE `Users` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Username` TEXT NOT NULL,
    `SHA256Password` VARCHAR(64) NOT NULL,
    `Email` VARCHAR(50) NOT NULL,
    `Clicks` INT NOT NULL DEFAULT '0',
    PRIMARY KEY (`ID`)
    );

    CREATE TABLE `EmailCodes` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`User_ID` INT NOT NULL,
	`CodeType` INT NOT NULL,
	`Code` TEXT NOT NULL,
	`CreationTimestamp` BIGINT NOT NULL,
	PRIMARY KEY (`ID`)
    );

    ```
3. Vložte údaje do `.env` 
    ```
    PORT=
    DB_HOST= 
    DB_USER=
    DB_DB=
    DB_PASS=
    ```
## Spuštění 
2. Spuštění aplikace
* Server
    ```sh
    npm run start
    ```
* Developer 
    ```sh
    npm run start
    ```
