# NapicuPopJonanek 2    
* Vytvořeno v [Angular](https://angular.io/)
1. Naklonování repozitáře
    ```sh
    git clone https://github.com/Numax-cz/NapicuPopJonanekV2
   ```
# PopJonanek 2 - Web
## Instalace
1. Nainstalování balíčků (web)
   ```sh
   npm install
   ```
## Spuštění 
1. Spuštění aplikace na localhostu
   ```sh
   npm run start
   ```
2. Buildnutí aplikace pro finální použití
   ```sh
   npm run build
   ```
# PopJonanek 2 - Api
* Api pro [PopJonanek](https://popjonanek.napicu.eu)
* Aplikace pro zobrazení světového skore
## Instalace 
1. Nainstalování balíčků (server)
   ```sh
   npm install
   ``` 
2. Vytvořte databázi 
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
# Další odkazy komponentů
* [Jonanek (Hlavní stránka)](https://github.com/Numax-cz/NapicuPopJonanekV2/tree/main/client/src/app/jonanek)
* [Nastavení](https://github.com/Numax-cz/NapicuPopJonanekV2/tree/main/client/src/app/settings)
* [Nastavení - session](https://github.com/Numax-cz/NapicuPopJonanekV2/tree/main/client/src/app/settings-alert-session)
* [Obchod](https://github.com/Numax-cz/NapicuPopJonanekV2/tree/main/client/src/app/shop)
* [Obchod - pozadí](https://github.com/Numax-cz/NapicuPopJonanekV2/tree/main/client/src/app/shop-background)
* [Obchod - zvuky](https://github.com/Numax-cz/NapicuPopJonanekV2/tree/main/client/src/app/shop-sound)
* [Error](https://github.com/Numax-cz/NapicuPopJonanekV2/tree/main/client/src/app/error)
* [Assets](https://github.com/Numax-cz/NapicuPopJonanekV2/tree/main/client/src/assets)
* [Server](https://github.com/Numax-cz/NapicuPopJonanekV2/tree/main/server)

