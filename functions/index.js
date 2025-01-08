import functions  from '@google-cloud/functions-framework';
import {Storage} from '@google-cloud/storage';
const storage = new Storage();
import {products} from './products.js';
import {scrapeAllProducts} from './scraper.js';
import compute from '@google-cloud/compute';
const {ComputeManagementClient} = compute;


async function saveJsonToBucket(bucketName, json, filename) {
    try {
        const filePath = `${filename}.json`;
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(filePath);
        await file.save(json, {metadata: {contentType: 'application/json'}, resumable: true});
        console.log(`JSON data saved to gs://${bucketName}/${filePath}`);
        return true;
    } catch (error) {
        console.error('Error saving JSON to bucket:', error);
        return false;
    }
}

const invalidateCache = async () => {
    const computeClient = new ComputeManagementClient();
    const project = 'pokemon-priser'; //Your Project ID
    const urlMap = 'pokemon-priser'; //Your URL Map Name

    // Construct the request
    const request = {
        project: project,
        urlMap: urlMap,
        paths: ['/master.json'], //Paths to invalidate
    };
    return await computeClient.urlMaps.invalidateCache(request).catch(e=> {
        console.error("Error invalidating CDN cache:", cdnError);
        // Ignore invalidation errors
    });
}

functions.http('getPrices', async (req, res) => {
    const bucketName = 'pokemon-priser-data';
    const mapped = await scrapeAllProducts(products);
    const json = JSON.stringify(mapped);
    const timestamp = Date.now();
    const masterSaveSuccess = await saveJsonToBucket(bucketName, json, 'master');

    const invalidate = invalidateCache()

    const uniqueFilename = `history/data-${timestamp}`;
    const uniqueSaveSuccess = await saveJsonToBucket(bucketName, json, uniqueFilename);
    await invalidate
    res.sendStatus(200);
    return true;
});



