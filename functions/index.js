import functions from '@google-cloud/functions-framework';
import { Storage } from '@google-cloud/storage';
const storage = new Storage();
import { products } from './products.js';
import { scrapeAllProducts } from './scraper.js';

async function saveJsonToBucket(bucketName, json, filename) {
    try {
        const filePath = `${filename}.json`;
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(filePath);
        await file.save(json, { metadata: { contentType: 'application/json' }, resumable: true });
        console.log(`JSON data saved to gs://${bucketName}/${filePath}`);
        return true;
    } catch (error) {
        console.error('Error saving JSON to bucket:', error);
        return false;
    }
}

functions.http('getPrices', async (req, res) => {
    const bucketName = 'pokemon-priser-data';
    const mapped = await scrapeAllProducts(products);
    const json = JSON.stringify(mapped);
    const timestamp = Date.now();
    const masterSaveSuccess = await saveJsonToBucket(bucketName, json, 'master');
    const uniqueFilename = `data-${timestamp}`;
    const uniqueSaveSuccess = await saveJsonToBucket(bucketName, json, uniqueFilename);
    res.sendStatus(200);
    return true
});