# PopJonanek API - Dokumentace

## Requesty

- CESTA - TYP REQUESTU - POPIS - VYŽADOVANÉ ÚDAJE DO BODY
- /api/reg - POST - Přihlášení - username, email, heslo, reheslo
- /api/log - POST - Registrace - EmailUsername, heslo
- /api/resetpassword - POST - Žádost o resetování hesla - email
- /api/resetpassword/check - POST - Checknutí resetování hesla po kliknutí na link v emailu, změna hesla - code
- /api/usercheck - GET - Informace jestli je uživatel přihlášen, když je tak základní údaje o něm - Nic
- /api/leaderboard - GET - TOP 10 klikačů - Nic
- /api/update - POST - Aktualizace počtu kliků - ClickCounter
- /api/userdelete - POST - Smazání účtu - Nic

## Kódy

- 0 - Úpsěšná akce
- 6001 - Nebylo vyplněné povinné pole
- 6002 - Zadnaá hesla se neshodují
- 6003 - Zadaný email není platný
- 6004 - Přezdívka je příliš krátká nebo příliš dlouhá (4-29 znaků)
- 6005 - Heslo nesplňuje požadavky. Musí být minimálně 8 a maximálně 4O znaků, musí mít alespoň jedno číslo, velké a malé písmeno
- 6006 - Zadaný email nebo uživatelské jméno již někdo využívá
- 6007 - Nastala chyba při zapisování nebo čtení z nebo do databáze
- 6008 - Zadané špatné uživatelské jméno nebo heslo
- 6009 - Zadán email, který není připojený k žádnému účtu
- 6010 - Kód pro resetování hesla již byl odeslán, další lze vygenerovat za 30 minut
- 6011 - Kód pro resetování hesla není platný
- 6012 - Kód pro resetování hesla expiroval (Funguje pouze 30 minut)
- 6013 - Akce pouze pro nepřihlášené uživatele (Login, registrace, resethesla)
- 6014 - Akce pouze pro přihlášené uživatele (Smazání účtu, odhlášení)
- 6015 - Zadaná přezdívka obsahuje nepovolené znaky
- 6016 - Kód pro smazání účtu již byl odeslán, další lze vygenerovat za 30 minut
- 6017 - Kód pro smazání účtu není platný
- 6018 - Kód pro smazání účtu expiroval (Funguje pouze 30 minut)
