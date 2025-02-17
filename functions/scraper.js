import jsdom from 'jsdom';
import { headers, parsers } from './parsers.js';
const { JSDOM } = jsdom;

const getDoc = (data) => {
    const virtualConsole = new jsdom.VirtualConsole();
    virtualConsole.on("error", () => {
        // No-op to skip console errors.
    });
    return new JSDOM(data, { virtualConsole }).window.document;
}

const getDom = async (url, headers) => {
    return fetch(url, {
        method: 'GET',
        headers: headers,
    }).then(response => {
            if(response.status == 404) throw Error("404")
            return response.text()
        })
        .then(data => getDoc(data))
}

const getParser = (url) => {
    const cleanUrl = url.replace("https://www.", "https://")
    const key = Object.keys(parsers).find(u => cleanUrl.startsWith(u))
    return parsers[key] ?? (() => { });
};

const getHeaders = (url) => {
    const cleanUrl = url.replace("https://www.", "https://")
    const key = Object.keys(headers).find(u => cleanUrl.startsWith(u))
    return headers[key] ?? {};
};

const getPrice = async (url) => {
    const parser = getParser(url);
    const headers = getHeaders(url)
    const price = await getDom(url, headers).then(doc => parser(doc)).catch(e => {
        if(e.message == "404"){
            console.error(`Not found: ${url}`)
        } else {
            console.error(`Failed to get price for: ${url}`, e)
        }
        return {}
    });
    return { url, ...price };
};

const scrapeProduct = async (product) => {
    const prices = await Promise.all(product.urls.map(url => getPrice(url)))
    .then(prices => prices.filter(price => price?.price))
    .then(prices => 
        prices.sort((a, b) => a.price - b.price)
            .map(price => {
                return {
                    ...price, 
                    pricePerBooster: Math.round(price.price / product.packs, 2),
                }
            }).filter(price => price.pricePerBooster > 20) // If price is that low it's probably wrong data
        ) 
    return {
        name: product.name,
        expansion: product.expansion,
        image: product.image,
        packs: product.packs,
        prices: prices
    }
}

export const scrapeAllProducts = async (products) => {
    const productWithPrices = await Promise.all(products.map(scrapeProduct))
    return productWithPrices.filter(p=>p).sort((a, b) => b.expansion.id - a.expansion.id)
}