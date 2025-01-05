
const getApplicationLdJson = (doc) => {
    return [...doc.querySelectorAll('script[type="application/ld+json"]')].map(e => JSON.parse(e.textContent)).find(e => e["@type"] == "Product")
}

const fromApplicationLdJson = (doc) => {
    const json = getApplicationLdJson(doc)
    const offer = Array.isArray(json.offers) ? json.offers[0] : json.offers
    const price = +offer.price;
    const inStock = offer.availability?.includes("InStock") === true
    return { price, inStock }
}

const fromProductPriceAmountAndProductAvailabilityProps = doc => {
    const price = parsePris(doc.querySelector('[property="product:price:amount"]').getAttribute("content"));
    const stockProp = doc.querySelector('[property="product:availability"]')?.getAttribute("content")?.toLowerCase()
    const inStock = ["instock", "in stock"].includes(stockProp);
    return { price, inStock }
}

const parsePris = (pris) => {
    const p = pris.includes(".") && pris.includes(",") ? pris.replace(".", "") : pris
    return +p?.replace(",", ".").replace(/[^0-9.]/g, "").replace(/\.$/, "")
}

const pokestorePris = async (doc) => {
    const price = parsePris(doc.querySelector('[property="product:price:amount"]').getAttribute("content"));
    const inStock = doc.querySelector('[property="product:availability"]').getAttribute("content") == "instock";
    return { price, inStock };
}

const computersalgPris = async (doc) => {
    const price = +doc.querySelector('[itemprop="price"]').getAttribute("content")
    const inStock = doc?.querySelector('[itemprop="availability"]')?.getAttribute("content") === "https://schema.org/InStock"
    return { price, inStock }
}

const pokuPris = async (doc) => {
    const price = parsePris(doc.querySelector(".summary-inner .woocommerce-Price-amount.amount bdi").textContent)
    const inStock = true;
    return { price, inStock }
}

const extralekerPris = async (doc) => {
    const price = +doc.querySelector('[itemprop="price"]').getAttribute("content")
    const inStock = doc?.querySelector('.stock.unavailable') == null
    return { price, inStock }
}

const lekekassenPris = async (doc) => {
    const price = parsePris(doc.querySelector('[data-price-amount]').textContent)
    const inStock = doc.querySelector('[data-action="https://lekekassen.no/xnotif/email/stock/"]') == null
    return { price, inStock }
}

const norliPris = async (doc) => {
    const price = parsePris(
        [...doc.querySelectorAll("span")]
            .find(e => [...e.classList]
                .some(e => e.startsWith("productFullDetail-productPriceDetail"))).textContent
    )
    const inStock = [...doc.querySelectorAll("div")]
        .find(e => [...e.classList]
            .some(e => e.startsWith("productStockStatus")))?.textContent?.startsWith("Utsolgt") == false

    return { price, inStock }
}

const cardcenterPris = async (doc) => {
    const price = parsePris(doc.querySelector(".price").textContent);
    const inStock = doc.querySelector(".product-form__payment-container .button.button--disabled") == null
    return { price, inStock }
}

const pokemadnessPris = async (doc) => {
    const price = +doc.querySelector('[itemprop="price"]').getAttribute("content")
    const inStock = doc.querySelectorAll(".product-unavailable") == null
    return { price, inStock }
}

const midgardgamesPris = async (doc) => {
    const inStock = doc.querySelector('[itemprop="availability"]').getAttribute("href") == "http://schema.org/InStock";
    const price = parsePris(doc.querySelector('[property="og:price:amount"]').getAttribute("content")) * 1.25;
    return { price, inStock }
}

const arkPris = async (doc) => {
    const price = JSON.parse([...doc.querySelectorAll('script[type="application/ld+json"]')].find(e => e.textContent?.includes('offers":{"price":'))?.textContent).offers.price
    const inStock = [...doc.querySelectorAll("script")].some(e => /onlineAvailability.....Available/i.test(e.textContent))
    return { price, inStock }
}

const gamezonePris = async (doc) => {
    return fromApplicationLdJson(doc)
}

const proshopPris = async (doc) => {
    return fromApplicationLdJson(doc);
}

const pokelinkPris = async (doc) => {
    return fromApplicationLdJson(doc)
}

const cardstorePris = async (doc) => {
    return fromApplicationLdJson(doc)
}

const outlandPris = async (doc) => {
    return fromApplicationLdJson(doc);
}

const kortkjellerenPris = async (doc) => {
    return fromApplicationLdJson(doc)
}

const epicardsPris = async (doc) => {
    return fromApplicationLdJson(doc);
}

const gamingsjappaPris = async (doc) => {
    return fromApplicationLdJson(doc);
}

const pokeshopPris = async (doc) => {
    return fromApplicationLdJson(doc)
}

const baldbreakersPris = async (doc) => {
    return fromApplicationLdJson(doc);
}

const coolshopPris = async (doc) => {
    return fromProductPriceAmountAndProductAvailabilityProps(doc)
}

const collectiblePris = async (doc) => {
    return fromProductPriceAmountAndProductAvailabilityProps(doc);
}

const pokiheavenPris = async (doc) => {
    return fromProductPriceAmountAndProductAvailabilityProps(doc);
}

const labogePris = async (doc) => {
    return fromProductPriceAmountAndProductAvailabilityProps(doc);
}

const ringoPris = async (doc) => {
    return fromProductPriceAmountAndProductAvailabilityProps(doc);
}

const gameninjaPris = async (doc) => {
    return fromProductPriceAmountAndProductAvailabilityProps(doc);
}

const kanonconPris = async (doc) => {
    return fromProductPriceAmountAndProductAvailabilityProps(doc);
}

const playlotPris = async (doc) => {
    return fromProductPriceAmountAndProductAvailabilityProps(doc);
}

const pokelageretPris = async (doc) => {
    return fromProductPriceAmountAndProductAvailabilityProps(doc);
}

const spillgledePris = async (doc) => {
    return fromProductPriceAmountAndProductAvailabilityProps(doc);
}

const retroworldPris = async (doc) => {
    return fromProductPriceAmountAndProductAvailabilityProps(doc);
}

const boosterpakkerPris = async (doc) => {
    return fromProductPriceAmountAndProductAvailabilityProps(doc);
}

const lekiaPris = async (doc) => {
    return fromProductPriceAmountAndProductAvailabilityProps(doc);
}

export const parsers = {
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
    "https://laboge.no": labogePris,
    "https://ringo.no": ringoPris,
    "https://gameninja.no": gameninjaPris,
    "https://kanoncon.no": kanonconPris,
    "https://playlot.no": playlotPris,
    "https://kortkjelleren.no": kortkjellerenPris,
    "https://midgardgames.no": midgardgamesPris,
    "https://epicards.no": epicardsPris,
    "https://gamingsjappa.no": gamingsjappaPris,
    "https://ark.no": arkPris,
    "https://pokelageret.no": pokelageretPris,
    "https://pokeshop.no": pokeshopPris,
    "https://baldbreakers.no": baldbreakersPris,
    "https://spillglede.no": spillgledePris,
    "https://retroworld.no": retroworldPris,
    "https://boosterpakker.no": boosterpakkerPris,
    "https://lekia.no": lekiaPris
}

export const headers = {
    "https://norli.no": { "User-Agent": "googlebot" }
}