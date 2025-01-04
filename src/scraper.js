import jsdom from 'jsdom';
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

const parsePris = (pris) => {
    const p = pris.includes(".") && pris.includes(",") ? pris.replace(".","") : pris
    return +p?.replace(",",".").replace(/[^0-9.]/g,"").replace(/\.$/,"")
}


const pokestorePris = async (doc) => {
    const price = parsePris(doc.querySelector('[property="product:price:amount"]').getAttribute("content"));
    const inStock = doc.querySelector('[property="product:availability"]').getAttribute("content") == "instock";
    return { price, inStock};
}

const gamezonePris = async (doc) => {
    const price = parsePris(doc.querySelector(".current-price-container > .PriceLabel")?.getAttribute("data-priceincvat"));
    const inStock = doc.querySelector(".utsolgt-partivare-knapp") === null
    return {  price, inStock: inStock }
}

const computersalgPris = async(doc) => {
    const price = +doc.querySelector('[itemprop="price"]').getAttribute("content")
    const inStock = doc?.querySelector('[itemprop="availability"]')?.getAttribute("content") === "https://schema.org/InStock"
    return {price, inStock }
}

const pokuPris = async(doc) => {
    const price = parsePris(doc.querySelector(".summary-inner .woocommerce-Price-amount.amount bdi").textContent)
    const inStock = true;
    return {price, inStock }
}

const proshopPris = async(doc) => {
    const price = parsePris(doc.querySelector(".site-currency-attention").textContent)
    const inStock = true;
    return {price, inStock }
}

const collectiblePris = async(doc) => {
    const price = parsePris(doc.querySelector('[property="product:price:amount"]').getAttribute("content"));
    const inStock = doc.querySelector('[property="product:availability"]')?.getAttribute("content") == "instock";
    return {price, inStock }
}

const extralekerPris = async(doc) => {
    const price = +doc.querySelector('[itemprop="price"]').getAttribute("content")
    const inStock = doc?.querySelector('.stock.unavailable') == null
    return {price, inStock }
}

const lekekassenPris = async(doc) => {
    const price = parsePris(doc.querySelector('[data-price-amount]').textContent)
    const inStock = doc.querySelector('[data-action="https://lekekassen.no/xnotif/email/stock/"]') == null
    return {price, inStock }
}

const norliPris = async(doc) => {
    const price = parsePris(
        [...doc.querySelectorAll("span")]
            .find(e=>[...e.classList]
            .some(e=>e.startsWith("productFullDetail-productPriceDetail"))).textContent
        )
    const inStock = [...doc.querySelectorAll("div")]
            .find(e=>[...e.classList]
            .some(e=>e.startsWith("productStockStatus")))?.textContent?.startsWith("Utsolgt") == false
        
    return {price, inStock}
}

const cardcenterPris = async (doc) => {
    const price = parsePris(doc.querySelector(".price").textContent);
    const inStock = doc.querySelector(".product-form__payment-container .button.button--disabled") == null
    return {price, inStock}
}

const pokemadnessPris = async (doc) => {
    const price = +doc.querySelector('[itemprop="price"]').getAttribute("content")
    const inStock = doc.querySelectorAll(".product-unavailable") == null
    return {price, inStock}
}

const pokiheavenPris = async (doc) => {
    const price = parsePris(doc.querySelector('[property="product:price:amount"]').getAttribute("content"));
    const inStock = doc.querySelector('[property="product:availability"]').getAttribute("content") == "instock";
    return {price, inStock}
}

const pokelinkPris = async (doc) => {
    const price = parsePris(doc.querySelector('[property="og:price:amount"]').getAttribute("content"))
    const inStock = doc.querySelector(".payment-button")?.getAttribute("disabled") == null
    return {price, inStock}
}

const coolshopPris = async (doc) => {
    const price = parsePris(doc.querySelector('[property="product:price:amount"]').getAttribute("content"));
    const inStock = doc.querySelector('[property="product:availability"]').getAttribute("content") == "in stock";
    return {price, inStock}
}

const cardstorePris = async (doc) => {
    const price = parsePris([...doc.querySelectorAll("p")].find(e=>/^\d.+kr$/.test(e.textContent)).textContent)
    const inStock = !!price
    return {price, inStock}
}

const outlandPris = async (doc) => {
    const price = parsePris(doc.querySelector('[property="product:price:amount"]').getAttribute("content"));
    const inStock = doc.querySelector('script[type="application/ld+json"]')?.textContent?.includes("https://schema.org/OutOfStock")
    return {price, inStock}
}

const labogePris = async (doc) => {
    const price = parsePris(doc.querySelector('[property="product:price:amount"]').getAttribute("content"));
    const inStock = doc.querySelector('[property="product:availability"]').getAttribute("content") == "instock";
    return {price, inStock} 
}


// TODO:
// Nille
// Gameninja
// Ringo
// Kanoncon
// Cardstore

const parsers = {
    "https://pokestore.no": pokestorePris,
    "https://proshop.no": proshopPris,
    "https://poku.no": pokuPris,
    "https://computersalg.no": computersalgPris,
    "https://gamezone.no": gamezonePris,
    "https://collectible.no/": collectiblePris,
    "https://extra-leker.no": extralekerPris,
    "https://lekekassen.no": lekekassenPris,
    "https://norli.no": norliPris,
    "https://cardcenter.no": cardcenterPris,
    "https://pokelink.no": pokelinkPris,
    "https://poki-heaven.no": pokiheavenPris,
    "https://pokemadness.no/": pokemadnessPris,
    "https://no.coolshop.com/": coolshopPris,
    "https://cardstore.no": cardstorePris,
    "https://outland.no": outlandPris,
    "https://laboge.no": labogePris

}

const headers= {
    "https://norli.no": { "User-Agent": "googlebot" }
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