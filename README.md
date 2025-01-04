En scraper for å finne pokemonkort-priser fra norske nettbutikker.
Pluss en liten web-app for å vise prisene (HTML/CSS er generert av ChatGPT).

For å kjøre scraperen:

```js
npm install
npm run scrape
```

Prisene blir lagt i `public/data.json`. 

For å se på de via web-appen, legg alt i /public på en webserver, for eksempel med:
```
cd public
python3 -m http.server 8000  
```

Hele greien kjører også i gcloud med en scheduler som oppdaterer data hver 8. time: https://storage.googleapis.com/pokemon-priser-data/index.html