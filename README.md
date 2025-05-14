# Project5_Books

## **Frontend**

React-põhine kasutajaliides rakendusele "Books". 

Võimalused:

- Vaadata raamatute nimekirja kategooriate kaupa
- Otsida raamatuid pealkirja, autori või kategooria järgi
- Vaadata raamatu detaile (kaas, kirjeldus, autorid, aasta)
- Registreeruda ja sisse logida
- Lisada kommentaare (ainult registreeritud kasutajad)
- Administreerida raamatuid (lisamine, muutmine, kustutamine) — ainult `admin` rolliga kasutajatele

## Tehnoloogiad

- **React** — kasutajaliidese loomiseks
- **React Router** — lehtede vahel liikumiseks
- **Material UI** — visuaalsed komponendid
- **Axios** — API-päringute tegemiseks
- **JWT** — autentimiseks ja autoriseerimiseks
- **LocalStorage** — kasutajaandmete ja tokeni salvestamiseks
- **Vite** — projekti arendamiseks ja käivitamiseks

## Paigaldus

```bash
cd frontend
npm install
```
## Käivitamine
``` npm run dev ```

Vaikimisi töötab rakendus aadressil:

```http://localhost:5173```

## Ühendus backendiga
``` http://localhost:3000 ```

## Kasutaja rollid
- **Tavaline kasutaja:** saab registreeruda, sisse logida ja jätta kommentaare

- **Administraator:** saab lisaks hallata raamatuid (lisada, muuta, kustutada)

## Projekti struktuur (olulisemad kaustad)
```
frontend/
├── src/
│   ├── components/      # UI komponendid
│   ├── pages/           # Erinevad lehed (raamatud, detailid, login jne)
│   ├── services/        # API-ga suhtlus
│   ├── context/         # Autentimise kontekst
│   └── App.jsx          # Peamine komponent
├── public/
├── index.html
└── vite.config.js
```

## **Backend**

## Funktsionaalsus
- Kasutajate registreerimine ja sisselogimine erinevate rollidega (administraator, kasutaja).
- Raamatute lisamine, muutmine ja kustutamine (ainult administraatorile).
- Kategooriate ja autorite lisamine ja muutmine (ainult administraatorile)
- Raamatute otsing kategooria, autori või pealkirja alusel (administraator, kasutaja). 
- Kommentaaride lisamine ja haldamine (administraator, kasutaja).
- Täielik API dokumentatsioon Swaggeri abil.

## Tehnoloogiad
- Node.js
- Express.js
- Sequelize (ORM andmebaasiga töötamiseks)
- JWT (JSON Web Tokens) autentimiseks
- Swagger (API dokumenteerimiseks)

## Paigaldamine
1. Klooni hoidla: `git clone https://github.com/JekaterinaShashkina/Project3_Books.git`
2. Mine projekti kausta: ` cd Project3_Books`
3. Paigalda sõltuvused: `npm install`
4. Loo `.env` fail ja määra järgmised keskkonnamuutujad:
`SECRET_ACCESS_TOKEN=your_secret_key`
`DATABASE_URL=your_database_url`
5. Käivita server: `node ./index.js` или `npx nodemon .\index.js `

## Kasutamine
Kui server on käivitatud, on see kättesaadav aadressil  **http://localhost:3000**. Sa saad kasutada tööriistu nagu Postman või Swagger UI, et testida ja kasutada API-d.

Swaggeri dokumentatsioon on saadaval aadressil: **http://localhost:3000/api-docs**

## Projekti struktuur

```
Project3_Books/
├── config/             # Konfiguratsioonifailid
├── controllers/        # Päringute kontrollijad
├── middleware/         # Autentimise ja autoriseerimise vahevara
├── models/             # Sequelize mudelid
├── routes/             # Marsruutide määratlused
├── swagger/            # Swaggeri konfiguratsioon
├── index.js            # Peamine rakenduse käivitusfail
├── package.json        # Sõltuvused ja skriptid
└── .gitignore          # Failide välistamine Gitist
```

## Rollid

- **Administraator** – saab lisada, muuta ja kustutada raamatuid, autoreid, kategooriaid ning hallata kõike.
- **Kasutaja** – saab vaadata raamatuid, otsida ning lisada kommentaare.

## API endpointid
Swaggeri täielik dokumentatsioon on saadaval aadressil: **http://localhost:3000/api-docs**.
### Autentimine
`POST /auth/signup` — Uue kasutaja registreerimine

`POST /auth/signin` — Kasutaja sisselogimine

### Raamatud
`POST /books` - Uue raamatu lisamine (ainult adminile)

`GET /books` - Kogu raamatute listi saamine

`GET /books/:id` - Ühe raamatu koos autorite, kategooria ja kommentidega saamine ID järgi 

`PUT /books/:id` - Raamatu info uuendamine (ainult adminile)

`DELETE /books/:id` - Raamatu kustutamine (ainult adminile)

### Otsing
`GET /search/author/:author` - Raamatute otsing autoori järgi

`GET /search/title/:title` - Raamatute otsing nimetuse järgi

`GET /search/category/:category_id` - Raamatute otsing kategooria järgi

### Kommentaarid
`POST /comments/:bookId` - Kommentaari lisamine raamatu kohta

`GET /comments/:id` - Kõik kommentide saamine

## Swagger
### Võimalused
- Kõik kättesaadavate endpointide vaatamine
- Päringute interaktiine testimine, saab saata **GET**, **POST**, **PUT**, **DELETE** päringud otse brauserist
- Turvaliste marsruutideks on vajalik sisestada JWT token

### Autoriseerimine Swaggeris
1. Vajuta nuppu **Authorize** paremas nurgas
2. Vormis sisesta token ilma **BEARER** 
Näidis: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
3. Vajuta **Authorize**, selleks et aktiveerida tokeni
4. Pärast autoriseerimist saab teha turvalised päringud.



## Autor
Projekt tehtud Jekaterina Šaškina poolt õppeaine “Web Programming” raames.

