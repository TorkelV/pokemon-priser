En scraper for å finne pokemonkort-priser fra norske nettbutikker.
Pluss en liten web-app for å vise prisene (HTML/CSS er generert av ChatGPT).

For å kjøre scraperen:

```js
npm install
node index.js
```

Prisene blir lagt i `public/data.json`. 

For å se på de via web-appen, legg alt i /public på en webserver, for eksempel med:
```
cd public
python3 -m http.server 8000  
```