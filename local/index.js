import { products } from '../functions/products.js';
import { scrapeAllProducts } from '../functions/scraper.js';
import fs from 'node:fs'
import util from 'util';
util.inspect.defaultOptions.depth = 10;

(async () => {

  const mapped = await scrapeAllProducts(products);
  console.dir(mapped)

  fs.writeFile('public/master.json', JSON.stringify(mapped), err => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });

})()