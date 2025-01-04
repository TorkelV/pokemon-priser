import { products } from '../src/products.js';
import { scrapeAllProducts } from '../src/scraper.js';
import fs from 'node:fs'
import util from 'util';
util.inspect.defaultOptions.depth = 10;

(async () => {

  const mapped = await scrapeAllProducts(products);
  console.dir(mapped)

  fs.writeFile('public/data.json', JSON.stringify(mapped), err => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });

})()