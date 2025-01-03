const jsdom = require('jsdom');
const { JSDOM } = jsdom;
require('util').inspect.defaultOptions.depth = 10

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
    "https://outland.no": outlandPris

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

const handleProduct = async (product) => {
    const prices = await Promise.all(product.urls.map(url => getPrice(url)))
    return {
        name: product.name,
        prices: prices.filter(e=>e).sort((a,b)=>a.price-b.price)
    }
}

const handleAllProducts = async (products) => {
    return await Promise.all(products.map(handleProduct))
}



const shroudedFableEtb = {
    name: "Shrouded Fable Elite Trainer Box",
    urls: [
        "https://gamezone.no/samlekort/160903/pokemon-shrouded-fable-elite-trainer-box",
        "https://www.poku.no/produkt/tcg/pokemon/elite-trainer-box/pokemon-tcg-shrouded-fable-elite-trainer-box/",
        "https://www.computersalg.no/i/21037554/pok%c3%a9mon-poke-elite-trainer-box-sv6-5-rel-2-8",
        "https://pokestore.no/produkt/engelsk/etb/pokemon-shrouded-fable-elite-trainer-box-4",
        "https://www.proshop.no/Pokemon/Pokemon-TCG-Elite-Trainer-Box-Scarlet-Violet-Shrouded-Fable/3275607",
        "https://www.collectible.no/home/pokemon-shrouded-fable-elite-trainer-box/",
        "https://www.extra-leker.no/pokemon-sv6-5-shrouded-fable-elite-trainer-box",
        "https://lekekassen.no/pokemon-tcg-shrouded-fable-elite-trainer-box-pok87853",
        "https://www.norli.no/leker/kreative-leker/samlekort/pokemonkort/pokemon-elite-trainer-box-sv6-5",
        "https://cardcenter.no/products/pokemon-shrouded-fable-elite-trainer-box",
        "https://pokelink.no/products/pokemon-sv6-5-scarlet-violet-shrouded-fable-elite-trainer-box",
        "https://www.pokemadness.no/elite-trainer-boks/1574-shrouded-fable-elite-trainer-boks-820650858536.html",
        "https://www.poki-heaven.no/produkt/pokemon-tcg/elite-trainer-box/pokemon-shrouded-fable-elite-trainer-box-5",
        "https://no.coolshop.com/produkt/pokemon-sv6-5-shrouded-fable-elite-trainer-box-pok87853/23MG4X/",
        "https://www.cardstore.no/produkter/shrouded-fable-elite-trainer-box",
        "https://www.outland.no/p-shrouded-fable-elite-trainer-box-scarlet-violet-shrouded-fable-pokemon-820650858536"
    ]
}

const prismaticEvolutionEtb = {
    name: "Prismatic Evolutions Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-prismatic-evolutions-elite-trainer-box-4",
        "https://gamezone.no/samlekort/162855/pokemon-prismatic-evolutions-etb-elite-trainer-box",
        "https://www.collectible.no/home/pokemon-prismatic-evolutions-elite-trainer-box/",
        "https://cardcenter.no/products/pokemon-prismatic-evolutions-elite-trainer-box"
    ]
}

const silverTempestEtb = {
    name: "Silver Tempest Elite Trainer Box",
    urls: [
        "https://proshop.no/Pokemon/Pokemon-TCG-Elite-Trainer-Box-Sword-Shield-Silver-Tempest/3119983",
        "https://www.computersalg.no/i/8730083/pok%c3%a9mon-poke-swsh12-elite-trainer-box",
        "https://pokestore.no/produkt/engelsk/etb/pokemon-silver-tempest-elite-trainer-box-6",
        "https://www.collectible.no/home/pokemon-silver-tempest-elite-trainer-box/",
        "https://www.norli.no/leker/kreative-leker/samlekort/pokemonkort/pokemon-swsh12-elite-trainer-box",
        "https://cardcenter.no/products/pokemon-silver-tempest-elite-trainer-box",
        "https://pokelink.no/products/pokemon-silver-tempest-elite-trainer-box",
        "https://www.outland.no/p-sword-shield-silver-tempest-elite-trainer-box-pokemon-tcg-820650851070",


        

    ]
}

const twilightMasqETB = {
    name: "Twilight Masquerade Elite Trainer Box",
    urls: [
        "https://www.computersalg.no/i/20959537/pok%c3%a9mon-pokemon-poke-elite-trainer-box-scarlet-violet-twilight-masquerade",
        "https://gamezone.no/samlekort/159403/pokemon-twilight-masquerade-elitetrainer-elite-trainer-box",
        "https://pokestore.no/produkt/engelsk/etb/pokemon-twilight-masquerade-elite-trainer-box-3",
        "https://www.collectible.no/home/pokemon-twilight-masquerade-elite-trainer-box/",
        "https://www.extra-leker.no/pokemon-sv6-twilight-masquerade-elite-trainer-box-teal-mask-ogerpon",
        "https://lekekassen.no/pokemon-tcg-twilight-masquerade-elite-trainer-box-med-samlekort-pok85798",
        "https://www.norli.no/leker/kreative-leker/samlekort/pokemonkort/pokemon-sv6-elite-trainer-box",
        "https://cardcenter.no/products/pokemon-twilight-masquerade-elite-trainer-box",
        "https://www.cardstore.no/produkter/twilight-masquerade-elite-trainer-box"
    ]
}

const temporalForcesEtb = {
    name: "Temporal Forces Elite Trainer Box",
    urls: [
        "https://gamezone.no/samlekort/158434/pokemon-temporal-forces-elite-trainer--hash-1-turkis-boks-flutter-mane",
        "https://gamezone.no/samlekort/158435/pokemon-temporal-forces-elite-trainer--hash-2-gr%c3%b8nn-boks-iron-thorns",
        "https://www.computersalg.no/i/20761779/pok%c3%a9mon-pok%c3%a9mon-sv5-elite-trainer-box-assorted",
        "https://poku.no/produkt/tcg/pokemon/elite-trainer-box/pokemon-tcg-temporal-forces-elite-trainer-box-iron-leaves/",
        "https://pokestore.no/produkt/engelsk/etb/pokemon-temporal-forces-elite-trainer-box-iron-leaves-3",
        "https://pokestore.no/produkt/engelsk/etb/pokemon-temporal-forces-elite-trainer-box-walking-wake-3",
        "https://www.collectible.no/home/pokemon-temporal-forces-elite-trainer-box-iron-leaves/",
        "https://www.collectible.no/home/pokemon-temporal-forces-elite-trainer-box-walking-wake/",
        "https://www.extra-leker.no/pokemon-sv5-temporal-forces-elite-trainer-box-walking-wake",
        "https://www.extra-leker.no/pokemon-sv5-temporal-forces-elite-trainer-box-iron-leaves",
        "https://lekekassen.no/pokemon-tcg-temporal-forces-elite-trainer-boks-med-byttekort-og-tilbehor-iron-leaves-pok85657",
        "https://cardcenter.no/products/pokemon-temporal-forces-elite-trainer-box-walking-wake",
        "https://cardcenter.no/products/pokemon-temporal-forces-elite-trainer-box-iron-leaves",
        "https://pokelink.no/products/pokemon-sv5-temporal-force-elite-trainer-box-iron-leaves",
        "https://no.coolshop.com/produkt/pokemon-sv5-temporal-forces-elite-trainer-box-iron-leaves-pok85657/23JF7C/",
        "https://no.coolshop.com/produkt/pokemon-sv5-temporal-forces-elite-trainer-box-walking-wake-pok85657/23JF7D/",
    ]
}

const stellarCrownEtb = {
    name: "Stellar Crown Elite Trainer Box",
    urls: [
        "https://www.proshop.no/Pokemon/Pokemon-TCG-Elite-Trainer-Box-Scarlet-Violet-Stellar-Crown/3298607",
        "https://www.computersalg.no/i/21434520/pok%c3%a9mon-pok%c3%a9mon-stellar-crown-elite-trainer-box",
        "https://gamezone.no/samlekort/161139/pokemon-stellar-crown-elite-trainer-box",
        "https://pokestore.no/produkt/engelsk/etb/pokemon-stellar-crown-elite-trainer-box-1",
        "https://www.collectible.no/home/pokemon-stellar-crown-elite-trainer-box/",
        "https://www.extra-leker.no/pokemon-sv7-stellar-crown-elite-trainer-box-terastal-terapagos",
        "https://lekekassen.no/pokemon-tcg-stellar-crown-elite-trainer-box",
        "https://www.norli.no/leker/kreative-leker/samlekort/pokemonkort/pokemon-sv7-elite-trainer-box",
        "https://cardcenter.no/products/stellar-crown-elite-trainer-box",
        "https://pokelink.no/products/pokemon-sv7-stellar-crown-elite-trainer-box",
        "https://www.pokemadness.no/elite-trainer-boks/1614-stellar-crown-elite-trainer-boks-820650859229.html",
        "https://no.coolshop.com/produkt/pokemon-sv7-elite-trainer-box-pok85922/23MG5E/",
        "https://www.cardstore.no/produkter/stellar-crown-elite-trainer-box",


    ]
}

const surgingsparksEtb = {
    name: "Surging sparks Elite Trainer Box",
    urls: [
        "https://www.collectible.no/home/pokemon-surging-sparks-elite-trainer-box/",
        "https://www.computersalg.no/i/21696718/pok%c3%a9mon-pok%c3%a9mon-sv8-surging-sparks-elite-trainer-box-pok85952",
        "https://pokestore.no/produkt/engelsk/etb/pokemon-surging-sparks-elite-trainer-box-4",
        "https://www.extra-leker.no/pokemon-sv8-surging-sparks-elite-trainer-box",
        "https://lekekassen.no/pokemon-tcg-surging-sparks-elite-trainer-box",
        "https://www.norli.no/leker/kreative-leker/samlekort/pokemonkort/pokemon-sv8-elite-trainer-box",
        "https://pokelink.no/products/pokemon-sv8-surging-sparks-elite-trainer-box",
        "https://www.pokemadness.no/elite-trainer-boks/1920-surging-sparks-elite-trainer-box-820650859526.html",


    ]
}

const paradoxriftEtb = {
    name: "Paradox Rift Elite Trainer Box",
    urls: [
        "https://www.computersalg.no/i/10979960/the-pok%c3%a9mon-tcg-scarlet-violet-4-paradox-rift-elite-trainer-box-iron-valiant",
        "https://pokestore.no/produkt/engelsk/etb/pokemon-paradox-rift-elite-trainer-box-iron-valiant-9",
        "https://pokestore.no/produkt/engelsk/etb/pokemon-paradox-rift-elite-trainer-box-roaring-moon-9",
        "https://www.collectible.no/home/pokemon-paradox-rift-elite-trainer-box-iron-valiant/",
        "https://www.collectible.no/home/pokemon-paradox-rift-elite-trainer-box-roaring-moon/",
        "https://lekekassen.no/pokemon-tcg-paradox-rift-elite-trainer-box-roaring-moon-pok85416",
        "https://www.norli.no/leker/kreative-leker/samlekort/pokemonkort/pokemon-sv5-elite-trainer-box",
        "https://cardcenter.no/products/pokemon-paradox-rift-elite-trainer-box-iron-valiant",
        "https://cardcenter.no/products/pokemon-paradox-rift-elite-trainer-box-roaring-moon",
        "https://pokelink.no/products/pokemon-sv4-paradox-rift-elite-trainer-box",
        "https://www.outland.no/p-scarlet-violet-paradox-rift-elite-trainer-box-pokemon-tcg-scarlet-violet-paradox-rift-pokemon-16055",
        "https://www.outland.no/p-scarlet-violet-paradox-rift-elite-trainer-box-pokemon-tcg-scarlet-violet-paradox-rift-pokemon-16054"
        ]
}

const paldeaEvolvedEtb = {
    name: "Paldea Evolved Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-paldea-evolved-elite-trainer-box-7",
        "https://www.computersalg.no/i/10268915/pok%c3%a9mon-poke-sv2-elite-trainer-box",
        "https://www.collectible.no/home/sv-paldea-evolved-elite-trainer-box/",
        "https://lekekassen.no/pokemon-tcg-scarlet-and-violet-2-paldea-evolved-elite-trainer-box-pok85366",
        "https://www.norli.no/leker/kreative-leker/samlekort/pokemonkort/pokemon-sv2-elite-trainer-box",
        "https://www.outland.no/p-scarlet-violet-paldea-evolved-elite-trainer-box-pokemon-tcg-pokemon-820650853661"


    ]
}

const obsidianFlamesEtb = {
    name: "Obsidian Flames Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-obsidian-flames-elite-trainer-box-4",
        "https://www.computersalg.no/i/10401232/pok%c3%a9mon-poke-sv3-elite-trainer-box",
        "https://www.collectible.no/home/obsidian-flames-elite-trainer-box/",
        "https://cardcenter.no/products/pokemon-obsidian-flames-elite-trainer-box",


    ]
}

const pokemonGoEtb = {
    name: "Pokemon Go Elite Trainer Box",
    urls: [
        "https://www.computersalg.no/i/8532722/pok%c3%a9mon-poke-elite-trainer-box-go-swsh10-5",
        "https://pokestore.no/produkt/engelsk/etb/pokemon-go-elite-trainer-box-11",
        "https://www.collectible.no/home/pokemon-go-elite-trainer-box/",
        "https://www.extra-leker.no/poke-elite-trainer-box-go-swsh10-5",
        "https://www.norli.no/leker/kreative-leker/samlekort/pokemonkort/pokemon-elite-trainer-box-go-swsh10-5",

    ]
}

const scarletAndVioletEtb = {
    name: "Scarlet and Violet Elite Trainer Box",
    urls: [
        "https://www.computersalg.no/i/8532722/pok%c3%a9mon-poke-elite-trainer-box-go-swsh10-5",
        "https://pokestore.no/produkt/engelsk/etb/pokemon-scarlet-violet-elite-trainer-box-koraidon-1",
        "https://pokestore.no/produkt/engelsk/etb/pokemon-scarlet-violet-elite-trainer-box-miraidon-6",
        "https://www.collectible.no/home/scarlet-violet-elite-trainer-box-koraidon/",
        "https://www.collectible.no/home/scarlet-violet-elite-trainer-box-miraidon/",
        "https://cardcenter.no/products/pokemon-scarlet-violet-elite-trainer-box",
        "https://no.coolshop.com/produkt/pokemon-sv1-elite-trainer-box-pok85341/23E5SP/"
    ]
}

const brilliantStarsEtb = {
    name: "Brilliant Stars Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-brilliant-stars-elite-trainer-box",
        "https://www.computersalg.no/i/8075955/pok%c3%a9mon-poke-swsh9-elite-trainer-box"
    ]
}

const chillingReignEtb = {
    name: "Chilling Reign Elite Trainer Box",
    urls: [ 
        "https://pokestore.no/produkt/engelsk/etb/pokemon-chilling-reign-elite-trainer-box-ice-rider-calyrex",
        "https://www.extra-leker.no/pokemon-swsh-chilling-reign-elite-trainer-box-shadow-rider-calyrex",
        "https://www.extra-leker.no/pokemon-swsh-chilling-reign-elite-trainer-box-ice-rider-calyrex",
        "https://www.outland.no/sword-shield-shadow-rider-calyrex-chilling-reign-elite-trainer-box",
        "https://www.outland.no/sword-shield-ice-rider-calyrex-chilling-reign-elite-trainer-box"
        ]
}

const paldeanFatesEtb = {
    name: "Paldean Fates Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-paldean-fates-elite-trainer-box-9",
        "https://www.collectible.no/home/pokemon-paldean-fates-elite-trainer-box/",
        "https://lekekassen.no/pokemon-tcg-elite-trainer-box-paldean-fates-pok85618",
        "https://cardcenter.no/products/pokemon-paldean-fates-elite-trainer-box",



    ]
}

const crownZenithEtb = {
    name: "Crown Zenith Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-crown-zenith-elite-trainer-box-4"
    ]
}

const lostOriginEtb = {
    name: "Lost Origin Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-lost-origin-elite-trainer-box-10",
        "https://www.collectible.no/home/pokemon-lost-origin-elite-trainer-box/",
        "https://www.norli.no/leker/kreative-leker/samlekort/pokemonkort/pokemon-swsh11-elite-trainer-box",
        "https://cardcenter.no/products/lost-origin-elite-trainer-box"

    ]
}

const shiningFatesEtb = {
    name: "Shining Fates Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-shining-fates-elite-trainer-box",
        "https://www.collectible.no/home/pokemon-shining-fates-elite-trainer-box/",
        "https://www.outland.no/shining-fates-elite-trainer-box",


    ]
}

const vividVoltageEtb = {
    name: "Vivid Voltage Elite Trainer Box",
    urls: [
        "https://www.collectible.no/home/pokemon-vivid-voltage-elite-trainer-box/",
        "https://pokestore.no/produkt/engelsk/etb/pokemon-vivid-voltage-elite-trainer-box"
    ]
}

const astralRadianceEtb = {
    name: "Astral Radiance Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-astral-radiance-elite-trainer-box-1"
    ]
}

const darknessAblazeEtb = {
    name: "Darkness Ablaze Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-darkness-ablaze-elite-trainer-box-4",
        "https://www.collectible.no/home/pokemon-darkness-ablaze-elite-trainer-box/",

    ]
}

const hiddenFatesEtb = {
    name: "Hidden Fates Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-hidden-fates-elite-trainer-box"
    ]
}

const products = [
    darknessAblazeEtb,
    hiddenFatesEtb,
    vividVoltageEtb,
    astralRadianceEtb,
    shiningFatesEtb,
    lostOriginEtb,
    crownZenithEtb,
    shroudedFableEtb,
    prismaticEvolutionEtb,
    silverTempestEtb,
    twilightMasqETB,
    brilliantStarsEtb,
    scarletAndVioletEtb,
    obsidianFlamesEtb,
    pokemonGoEtb,
    paldeaEvolvedEtb,
    paradoxriftEtb,
    surgingsparksEtb,
    stellarCrownEtb,
    temporalForcesEtb,
    chillingReignEtb,
    paldeanFatesEtb
];


  (async () => {
    const mapped = await handleAllProducts(products);
    console.dir(mapped)

    const fs = require('node:fs');
    fs.writeFile('public/data.json', JSON.stringify(mapped), err => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    });

  })()