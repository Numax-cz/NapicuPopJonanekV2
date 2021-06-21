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
## Použité balíčky 
* dotenv@8.2.0
* ejs@3.1.6
* express@4.17.1
* mysql@2.18.1
* nodemon@2.0.7