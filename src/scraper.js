import jsdom from 'jsdom';
import { headers, parsers } from './parsers.js';
const { JSDOM } = jsdom;

const getDoc=(data) => {
    const virtualConsole = new jsdom.VirtualConsole();
    virtualConsole.on("error", () => {
    // No-op to skip console errors.
    });
    return new JSDOM(data, { virtualConsole }).window.document;
}

const getDom = async (url,headers) => {
    return fetch(url, {
        method  : 'GET', 
        headers: headers,
    })
    .then(response => response.text())
    .then(data => getDoc(data))
}

const getParser = (url) => {
    const cleanUrl = url.replace("https://www.", "https://")
    const key =  Object.keys(parsers).find(u => cleanUrl.startsWith(u))
    return parsers[key] ?? (() => {});
};

const getHeaders = (url) => {
    const cleanUrl = url.replace("https://www.", "https://")
    const key =  Object.keys(headers).find(u => cleanUrl.startsWith(u))
    return headers[key] ?? {};
};

const getPrice = async (url) => {
    const parser = getParser(url);
    const headers = getHeaders(url)
    const price = await getDom(url,headers).then(doc=>parser(doc)).catch(e=>{
        console.error(`Failed to get price for: ${url}`, e)
        return {}
    });
    return {url, ...price};
};

const scrapeProduct = async (product) => {
    const prices = await Promise.all(product.urls.map(url => getPrice(url)))
    return {
        name: product.name,
        prices: prices.filter(e=>e?.price).sort((a,b)=>a.price-b.price)
    }
}

export const scrapeAllProducts = async (products) => {
    return await Promise.all(products.map(scrapeProduct))
}