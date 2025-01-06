const expansions = {
    EX_RUBY_SAPPHIRE: { id: 0, name: "EX Ruby & Sapphire" },
    EX_SANDSTORM: { id: 1, name: "EX Sandstorm" },
    EX_DRAGON: { id: 2, name: "EX Dragon" },
    EX_TEAM_MAGMA_VS_TEAM_AQUA: { id: 3, name: "EX Team Magma vs Team Aqua" },
    EX_HIDDEN_LEGENDS: { id: 4, name: "EX Hidden Legends" },
    EX_FIRERED_LEAFGREEN: { id: 5, name: "EX FireRed & LeafGreen" },
    EX_TEAM_ROCKET_RETURNS: { id: 6, name: "EX Team Rocket Returns" },
    EX_DEOXYS: { id: 7, name: "EX Deoxys" },
    EX_EMERALD: { id: 8, name: "EX Emerald" },
    EX_UNSEEN_FORCES: { id: 9, name: "EX Unseen Forces" },
    EX_DELTA_SPECIES: { id: 10, name: "EX Delta Species" },
    EX_LEGEND_MAKER: { id: 11, name: "EX Legend Maker" },
    EX_HOLON_PHANTOMS: { id: 12, name: "EX Holon Phantoms" },
    EX_CRYSTAL_GUARDIANS: { id: 13, name: "EX Crystal Guardians" },
    EX_DRAGON_FRONTIERS: { id: 14, name: "EX Dragon Frontiers" },
    EX_POWER_KEEPERS: { id: 15, name: "EX Power Keepers" },
    DIAMOND_PEARL: { id: 16, name: "Diamond & Pearl" },
    DIAMOND_PEARL_MYSTERIOUS_TREASURES: { id: 17, name: "Diamond & Pearl—Mysterious Treasures" },
    DIAMOND_PEARL_SECRET_WONDERS: { id: 18, name: "Diamond & Pearl—Secret Wonders" },
    DIAMOND_PEARL_GREAT_ENCOUNTERS: { id: 19, name: "Diamond & Pearl—Great Encounters" },
    DIAMOND_PEARL_MAJESTIC_DAWN: { id: 20, name: "Diamond & Pearl—Majestic Dawn" },
    DIAMOND_PEARL_LEGENDS_AWAKENED: { id: 21, name: "Diamond & Pearl—Legends Awakened" },
    DIAMOND_PEARL_STORMFRONT: { id: 22, name: "Diamond & Pearl—Stormfront" },
    PLATINUM: { id: 23, name: "Platinum" },
    PLATINUM_RISING_RIVALS: { id: 24, name: "Platinum—Rising Rivals" },
    PLATINUM_SUPREME_VICTORS: { id: 25, name: "Platinum—Supreme Victors" },
    PLATINUM_ARCEUS: { id: 26, name: "Platinum—Arceus" },
    HEARTGOLD_SOULSILVER: { id: 27, name: "HeartGold & SoulSilver" },
    POK_MON_TCG_HS_UNLEASHED: { id: 28, name: "Pokémon TCG: HS—Unleashed" },
    HS_UNDAUNTED: { id: 29, name: "HS—Undaunted" },
    POK_MON_TCG_HS_TRIUMPHANT: { id: 30, name: "Pokémon TCG: HS—Triumphant" },
    POK_MON_TCG_CALL_OF_LEGENDS: { id: 31, name: "Pokémon TCG: Call of Legends" },
    BLACK_WHITE: { id: 32, name: "Black & White" },
    BLACK_WHITE_EMERGING_POWERS: { id: 33, name: "Black & White—Emerging Powers" },
    BLACK_WHITE_NOBLE_VICTORIES: { id: 34, name: "Black & White—Noble Victories" },
    BLACK_WHITE_NEXT_DESTINIES: { id: 35, name: "Black & White—Next Destinies" },
    BLACK_WHITE_DARK_EXPLORERS: { id: 36, name: "Black & White—Dark Explorers" },
    BLACK_WHITE_DRAGONS_EXALTED: { id: 37, name: "Black & White—Dragons Exalted" },
    DRAGON_VAULT: { id: 38, name: "Dragon Vault" },
    BLACK_WHITE_BOUNDARIES_CROSSED: { id: 39, name: "Black & White—Boundaries Crossed" },
    BLACK_WHITE_PLASMA_STORM: { id: 40, name: "Black & White—Plasma Storm" },
    BLACK_WHITE_PLASMA_FREEZE: { id: 41, name: "Black & White—Plasma Freeze" },
    BLACK_WHITE_PLASMA_BLAST: { id: 42, name: "Black & White—Plasma Blast" },
    BLACK_WHITE_LEGENDARY_TREASURES: { id: 43, name: "Black & White—Legendary Treasures" },
    XY_KALOS_STARTER_SET: { id: 44, name: "XY—Kalos Starter Set" },
    XY: { id: 45, name: "XY" },
    XY_FLASHFIRE: { id: 46, name: "XY—Flashfire" },
    XY_FURIOUS_FISTS: { id: 47, name: "XY—Furious Fists" },
    XY_PHANTOM_FORCES: { id: 48, name: "XY—Phantom Forces" },
    XY_PRIMAL_CLASH: { id: 49, name: "XY—Primal Clash" },
    DOUBLE_CRISIS: { id: 50, name: "Double Crisis" },
    XY_ROARING_SKIES: { id: 51, name: "XY—Roaring Skies" },
    XY_ANCIENT_ORIGINS: { id: 52, name: "XY—Ancient Origins" },
    XY_BREAKTHROUGH: { id: 53, name: "XY—BREAKthrough" },
    XY_BREAKPOINT: { id: 54, name: "XY—BREAKpoint" },
    GENERATIONS: { id: 55, name: "Generations" },
    XY_FATES_COLLIDE: { id: 56, name: "XY—Fates Collide" },
    XY_STEAM_SIEGE: { id: 57, name: "XY—Steam Siege" },
    XY_EVOLUTIONS: { id: 58, name: "XY—Evolutions" },
    SUN_MOON: { id: 59, name: "Sun & Moon" },
    SUN_MOON_GUARDIANS_RISING: { id: 60, name: "Sun & Moon—Guardians Rising" },
    SUN_MOON_BURNING_SHADOWS: { id: 61, name: "Sun & Moon—Burning Shadows" },
    SHINING_LEGENDS: { id: 62, name: "Shining Legends" },
    SUN_MOON_CRIMSON_INVASION: { id: 63, name: "Sun & Moon—Crimson Invasion" },
    SUN_MOON_ULTRA_PRISM: { id: 64, name: "Sun & Moon—Ultra Prism" },
    SUN_MOON_FORBIDDEN_LIGHT: { id: 65, name: "Sun & Moon—Forbidden Light" },
    SUN_MOON_CELESTIAL_STORM: { id: 66, name: "Sun & Moon—Celestial Storm" },
    DRAGON_MAJESTY: { id: 67, name: "Dragon Majesty" },
    SUN_MOON_LOST_THUNDER: { id: 68, name: "Sun & Moon—Lost Thunder" },
    SUN_MOON_TEAM_UP: { id: 69, name: "Sun & Moon—Team Up" },
    DETECTIVE_PIKACHU: { id: 70, name: "Detective Pikachu" },
    SUN_MOON_UNBROKEN_BONDS: { id: 71, name: "Sun & Moon—Unbroken Bonds" },
    SUN_MOON_UNIFIED_MINDS: { id: 72, name: "Sun & Moon—Unified Minds" },
    HIDDEN_FATES: { id: 73, name: "Hidden Fates" },
    SUN_MOON_COSMIC_ECLIPSE: { id: 74, name: "Sun & Moon—Cosmic Eclipse" },
    SWORD_SHIELD_BASE: { id: 75, name: "Sword & Shield" },
    SWORD_SHIELD_REBEL_CLASH: { id: 76, name: "Sword & Shield—Rebel Clash" },
    SWORD_SHIELD_DARKNESS_ABLAZE: { id: 77, name: "Sword & Shield—Darkness Ablaze" },
    CHAMPION_S_PATH: { id: 78, name: "Champion’s Path" },
    SWORD_SHIELD_VIVID_VOLTAGE: { id: 79, name: "Sword & Shield—Vivid Voltage" },
    SHINING_FATES: { id: 80, name: "Shining Fates" },
    SWORD_SHIELD_BATTLE_STYLES: { id: 81, name: "Sword & Shield—Battle Styles" },
    SWORD_SHIELD_CHILLING_REIGN: { id: 82, name: "Sword & Shield—Chilling Reign" },
    SWORD_SHIELD_EVOLVING_SKIES: { id: 83, name: "Sword & Shield—Evolving Skies" },
    CELEBRATIONS: { id: 84, name: "Celebrations" },
    SWORD_SHIELD_FUSION_STRIKE: { id: 85, name: "Sword & Shield—Fusion Strike" },
    SWORD_SHIELD_BRILLIANT_STARS: { id: 86, name: "Sword & Shield—Brilliant Stars" },
    SWORD_SHIELD_ASTRAL_RADIANCE: { id: 87, name: "Sword & Shield—Astral Radiance" },
    POKEMON_GO: { id: 88, name: "Pokémon GO" },
    SWORD_SHIELD_LOST_ORIGIN: { id: 89, name: "Sword & Shield—Lost Origin" },
    SWORD_SHIELD_SILVER_TEMPEST: { id: 90, name: "Sword & Shield—Silver Tempest" },
    CROWN_ZENITH: { id: 91, name: "Crown Zenith" },
    SCARLET_VIOLET_BASE: { id: 92, name: "Scarlet & Violet" },
    SCARLET_VIOLET_PALDEA_EVOLVED: { id: 93, name: "Scarlet & Violet—Paldea Evolved" },
    SCARLET_VIOLET_OBSIDIAN_FLAMES: { id: 94, name: "Scarlet & Violet—Obsidian Flames" },
    SCARLET_VIOLET_151: { id: 95, name: "Scarlet & Violet—151" },
    SCARLET_VIOLET_PARADOX_RIFT: { id: 96, name: "Scarlet & Violet—Paradox Rift" },
    SCARLET_VIOLET_PALDEAN_FATES: { id: 97, name: "Scarlet & Violet—Paldean Fates" },
    SCARLET_VIOLET_TEMPORAL_FORCES: { id: 98, name: "Scarlet & Violet—Temporal Forces" },
    SCARLET_VIOLET_TWILIGHT_MASQUERADE: { id: 99, name: "Scarlet & Violet—Twilight Masquerade" },
    SCARLET_VIOLET_SHROUDED_FABLE: { id: 100, name: "Scarlet & Violet—Shrouded Fable" },
    SCARLET_VIOLET_STELLAR_CROWN: { id: 101, name: "Scarlet & Violet—Stellar Crown" },
    SCARLET_VIOLET_SURGING_SPARKS: { id: 102, name: "Scarlet & Violet—Surging Sparks" },
    SCARLET_VIOLET_PRISMATIC_EVOLUTIONS: { id: 103, name: "Scarlet & Violet—Prismatic Evolutions" }
}


const shroudedFableEtb = {
    expansion: expansions.SCARLET_VIOLET_SHROUDED_FABLE,
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
        "https://www.outland.no/p-shrouded-fable-elite-trainer-box-scarlet-violet-shrouded-fable-pokemon-820650858536",
        "https://www.laboge.no/produkt/sealed/live-shrouded-fable-etb-1",
        "https://www.ringo.no/produkt/pokemon-scarlet-violet-shrouded-fable-elite-trainer-box/",
        "https://www.gameninja.no/produkt/pre-order-pokemon-sv6-5-shrouded-fable-elite-trainer-box/",
        "https://www.kanoncon.no/produkt/pokemon-shrouded-fable-elite-trainer-box/",
        "https://midgardgames.no/products/pokemon-scarlet-violet-6-5-shrouded-fable-elite-trainer-box",
        "https://poke-shop.no/produkt/alle-produkter/elite-trainer-box/pokemon-shrouded-fable-elite-trainer-box-1",
        "https://pokelageret.no/produkt/engelsk/elite-trainer-boks/shrouded-fable-elite-trainer-box",
        "https://baldbreakers.no/products/scarlet-violet-shrouded-fable-elite-trainer-box",
        "https://spillglede.no/produkt/pokemon/elite-trainer-box/pokemon-shrouded-fable-elite-trainer-box-2"

    ]
}

const prismaticEvolutionEtb = {
    expansion: expansions.SCARLET_VIOLET_PRISMATIC_EVOLUTIONS,
    name: "Prismatic Evolutions Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-prismatic-evolutions-elite-trainer-box-4",
        "https://gamezone.no/samlekort/162855/pokemon-prismatic-evolutions-etb-elite-trainer-box",
        "https://www.collectible.no/home/pokemon-prismatic-evolutions-elite-trainer-box/",
        "https://cardcenter.no/products/pokemon-prismatic-evolutions-elite-trainer-box",
        "https://www.gameninja.no/produkt/prismatic-evolutions-elite-trainer-box/",
        "https://www.playlot.no/produkt/pokemon/prismatic-evolution-2025/prismatic-evolution-elite-trainer-boks",


    ]
}

const silverTempestEtb = {
    expansion: expansions.SWORD_SHIELD_SILVER_TEMPEST,
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
        "https://www.gameninja.no/produkt/pokemon-silver-tempest-swsh12-elite-trainer-box/",
        "https://www.kanoncon.no/produkt/pokemon-sword-shield-silver-tempest-elite-trainer-box-copy/",
        "https://poke-shop.no/produkt/alle-produkter/elite-trainer-box/pokemon-silver-tempest-elite-trainer-box",
        "https://spillglede.no/produkt/pokemon/elite-trainer-box/pokemon-silver-tempest-elite-trainer-box"




    ]
}

const twilightMasqETB = {
    expansion: expansions.SCARLET_VIOLET_TWILIGHT_MASQUERADE,
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
        "https://www.cardstore.no/produkter/twilight-masquerade-elite-trainer-box",
        "https://www.ringo.no/produkt/pokemon-elite-trainer-box-sv6-twilight-masquerade/",
        "https://www.gameninja.no/produkt/poke-sv6-elite-trainer-box-twilight-masquerade/",
        "https://kortkjelleren.no/products/pokemon-twilight-masquerade-elite-trainer",
        "https://gamingsjappa.no/products/pokemon-tcg-kort-scarlet-violet-6-twilight-masquerade-elite-trainer-box",
        "https://poke-shop.no/produkt/alle-produkter/elite-trainer-box/pokemon-twilight-masquerade-elite-trainer-box-1",
        "https://baldbreakers.no/products/scarlet-violet-twilight-masquerade-elite-trainer-box"


    ]
}

const temporalForcesEtb = {
    expansion: expansions.SCARLET_VIOLET_TEMPORAL_FORCES,
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
        "https://www.ringo.no/produkt/pokemon-elite-trainer-box-sv5-temporal-forces/",
        "https://www.gameninja.no/produkt/poke-sv5-elite-trainer-box-iron-thorns/",
        "https://www.gameninja.no/produkt/poke-sv5-elite-trainer-box-flutter-mane/",
        "https://www.kanoncon.no/produkt/temporal-forces-elite-trainer-box-iron-leaves/",
        "https://www.kanoncon.no/produkt/temporal-forces-elite-trainer-box-walking-wake/",
        "https://gamingsjappa.no/products/pokemon-tcg-kort-scarlet-violet-5-temporal-forces-elite-trainer-box",
        "https://www.ark.no/produkt/pokemon-elite-trainer-boks-sv5-820650856570",
        "https://spillglede.no/produkt/pokemon/elite-trainer-box/pokemon-temporal-forces-elite-trainer-box-walking-wake",
        "https://spillglede.no/produkt/pokemon/elite-trainer-box/pokemon-temporal-forces-elite-trainer-box-iron-leaves"


    ]
}

const stellarCrownEtb = {
    expansion: expansions.SCARLET_VIOLET_STELLAR_CROWN,
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
        "https://www.ringo.no/produkt/pokemon-elite-trainer-box-scarlet-violet-stellar-crown/",
        "https://www.gameninja.no/produkt/pre-order-13-09-pokemon-sv7-stellar-crown-elite-trainer-box/",
        "https://www.kanoncon.no/produkt/pokemon-stellar-crown-elite-trainer-box/",
        "https://epicards.no/products/pokemon-tcg-stellar-crown-elite-trainer-box-med-samlekort-og-tilbehor",
        "https://poke-shop.no/produkt/alle-produkter/elite-trainer-box/pokemon-stellar-crown-elite-trainer-box-4",
        "https://baldbreakers.no/products/scarlet-violet-stellar-crown-elite-trainer-box"




    ]
}

const surgingsparksEtb = {
    expansion: expansions.SCARLET_VIOLET_SURGING_SPARKS,
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
        "https://www.ringo.no/produkt/pokemon-elite-trainer-box-scarlet-violet-surging-sparks/",
        "https://poke-shop.no/produkt/alle-produkter/elite-trainer-box/pokemon-surging-sparks-elite-trainer-box-1"


    ]
}

const paradoxriftEtb = {
    expansion: expansions.SCARLET_VIOLET_PARADOX_RIFT,
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
        "https://www.outland.no/p-scarlet-violet-paradox-rift-elite-trainer-box-pokemon-tcg-scarlet-violet-paradox-rift-pokemon-16054",
        "https://www.ringo.no/produkt/pokemon-elite-trainer-box-sv4-paradox-rift/",
        "https://www.gameninja.no/produkt/pokemon-paradox-rift-sv4-elite-trainer-box/",
        "https://kortkjelleren.no/products/paradox-rift-elite-trainer-box-roaring-moon",
        "https://gamingsjappa.no/products/pokemon-tcg-kort-scarlet-violet-4-paradox-rift-elite-trainer-box",
        "https://baldbreakers.no/products/scarlet-violet-paradox-rift-elite-trainer-box-roaring-moon",
        "https://baldbreakers.no/products/scarlet-violet-paradox-rift-elite-trainer-box-iron-valiant",
        "https://spillglede.no/produkt/pokemon/elite-trainer-box/pokemon-paradox-rift-2-pack-elite-trainer-box-roaring-moon-iron-valiant",
        "https://retroworld.no/produkt/pokemon/pokemon-paradox-rift-elite-trainer-box-etb-4"
    ]
}

const paldeaEvolvedEtb = {
    expansion: expansions.SCARLET_VIOLET_PALDEA_EVOLVED,
    name: "Paldea Evolved Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-paldea-evolved-elite-trainer-box-7",
        "https://www.computersalg.no/i/10268915/pok%c3%a9mon-poke-sv2-elite-trainer-box",
        "https://www.collectible.no/home/sv-paldea-evolved-elite-trainer-box/",
        "https://lekekassen.no/pokemon-tcg-scarlet-and-violet-2-paldea-evolved-elite-trainer-box-pok85366",
        "https://www.outland.no/p-scarlet-violet-paldea-evolved-elite-trainer-box-pokemon-tcg-pokemon-820650853661",
        "https://www.ringo.no/produkt/pokemon-elite-trainer-box-scarlet-violet-2/",
        "https://midgardgames.no/products/pokemon-tcg-scarlet-violet-2-paldea-evolved-elite-trainer-box",
        "https://gamingsjappa.no/products/pokemon-tcg-kort-scarlet-violet-2-paldea-evolved-elite-trainer-box",
        "https://retroworld.no/produkt/pokemon/pokemon-scarlet-violet-paldea-evolved-elite-trainer-box-etb"



    ]
}

const obsidianFlamesEtb = {
    expansion: expansions.SCARLET_VIOLET_OBSIDIAN_FLAMES,
    name: "Obsidian Flames Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-obsidian-flames-elite-trainer-box-4",
        "https://www.computersalg.no/i/10401232/pok%c3%a9mon-poke-sv3-elite-trainer-box",
        "https://www.collectible.no/home/obsidian-flames-elite-trainer-box/",
        "https://cardcenter.no/products/pokemon-obsidian-flames-elite-trainer-box",
        "https://www.gameninja.no/produkt/poke-sv3-elite-trainer-box/",
        "https://midgardgames.no/products/pokemon-tcg-obsidian-flames-elite-trainer-box",
        "https://retroworld.no/produkt/pokemon/pokemon-scarlet-violet-obsidian-flames-elite-trainer-box-etb"



    ]
}

const pokemonGoEtb = {
    expansion: expansions.POKEMON_GO,
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
    expansion: expansions.SCARLET_VIOLET_BASE,
    name: "Scarlet and Violet Elite Trainer Box",
    urls: [
        "https://www.computersalg.no/i/8532722/pok%c3%a9mon-poke-elite-trainer-box-go-swsh10-5",
        "https://pokestore.no/produkt/engelsk/etb/pokemon-scarlet-violet-elite-trainer-box-koraidon-1",
        "https://pokestore.no/produkt/engelsk/etb/pokemon-scarlet-violet-elite-trainer-box-miraidon-6",
        "https://www.collectible.no/home/scarlet-violet-elite-trainer-box-koraidon/",
        "https://www.collectible.no/home/scarlet-violet-elite-trainer-box-miraidon/",
        "https://cardcenter.no/products/pokemon-scarlet-violet-elite-trainer-box",
        "https://no.coolshop.com/produkt/pokemon-sv1-elite-trainer-box-pok85341/23E5SP/",
        "https://midgardgames.no/products/pokemon-tcg-scarlet-violet-elite-trainer-box-koraidon",
        "https://midgardgames.no/products/pokemon-tcg-scarlet-violet-elite-trainer-box-miraidon",
        "https://retroworld.no/produkt/pokemon/samlerbokser-etb/pokemon-scarlet-violet-elite-trainer-box-etb",
        "https://retroworld.no/produkt/pokemon/samlerbokser-etb/pokemon-scarlet-violet-elite-trainer-box-etb-2"

    ]
}

const brilliantStarsEtb = {
    expansion: expansions.SWORD_SHIELD_BRILLIANT_STARS,
    name: "Brilliant Stars Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-brilliant-stars-elite-trainer-box",
        "https://www.computersalg.no/i/8075955/pok%c3%a9mon-poke-swsh9-elite-trainer-box",
        "https://retroworld.no/produkt/pokemon/samlerbokser-etb/pokemon-brilliant-star-elite-trainer-box-etb"
    ]
}

const chillingReignEtb = {
    expansion: expansions.SWORD_SHIELD_CHILLING_REIGN,
    name: "Chilling Reign Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-chilling-reign-elite-trainer-box-ice-rider-calyrex",
        "https://www.extra-leker.no/pokemon-swsh-chilling-reign-elite-trainer-box-shadow-rider-calyrex",
        "https://www.extra-leker.no/pokemon-swsh-chilling-reign-elite-trainer-box-ice-rider-calyrex",
        "https://www.outland.no/sword-shield-shadow-rider-calyrex-chilling-reign-elite-trainer-box",
        "https://www.outland.no/sword-shield-ice-rider-calyrex-chilling-reign-elite-trainer-box",
        "https://retroworld.no/produkt/pokemon/samlerbokser-etb/pokemon-chilling-reign-elite-trainer-box-etb-3"
    ]
}

const paldeanFatesEtb = {
    expansion: expansions.SCARLET_VIOLET_PALDEAN_FATES,
    name: "Paldean Fates Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-paldean-fates-elite-trainer-box-9",
        "https://www.collectible.no/home/pokemon-paldean-fates-elite-trainer-box/",
        "https://lekekassen.no/pokemon-tcg-elite-trainer-box-paldean-fates-pok85618",
        "https://cardcenter.no/products/pokemon-paldean-fates-elite-trainer-box",
        "https://www.ringo.no/produkt/pokemon-elite-trainer-box-sv4-5-paldean-fates/",
        "https://www.gameninja.no/produkt/poke-elite-trainer-box-sv4-5/",
        "https://kortkjelleren.no/products/paldean-fates-elite-trainer-box",
        "https://gamingsjappa.no/products/pokemon-tcg-kort-scarlet-violet-4-5-paldean-fates-elite-trainer-box",
        "https://spillglede.no/produkt/pokemon/elite-trainer-box/pokemon-paldean-fates-elite-trainer-box-2"



    ]
}

const crownZenithEtb = {
    expansion: expansions.CROWN_ZENITH,
    name: "Crown Zenith Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-crown-zenith-elite-trainer-box-4",
        "https://spillglede.no/produkt/pokemon/elite-trainer-box/pokemon-crown-zenith-elite-trainer-box"
    ]
}

const fusionStrikeEtb = {
    expansion: expansions.SWORD_SHIELD_FUSION_STRIKE,
    name: "Fusion Strike Elite Trainer Box",
    urls: [
        "https://retroworld.no/produkt/pokemon/samlerbokser-etb/pokemon-fusion-strike-elite-trainer-box-etb"
    ]
}

const lostOriginEtb = {
    expansion: expansions.SWORD_SHIELD_LOST_ORIGIN,
    name: "Lost Origin Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-lost-origin-elite-trainer-box-10",
        "https://www.collectible.no/home/pokemon-lost-origin-elite-trainer-box/",
        "https://www.norli.no/leker/kreative-leker/samlekort/pokemonkort/pokemon-swsh11-elite-trainer-box",
        "https://cardcenter.no/products/lost-origin-elite-trainer-box",
        "https://spillglede.no/produkt/pokemon/elite-trainer-box/pokemon-lost-origin-elite-trainer-box"

    ]
}

const shiningFatesEtb = {
    expansion: expansions.SHINING_FATES,
    name: "Shining Fates Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-shining-fates-elite-trainer-box",
        "https://www.collectible.no/home/pokemon-shining-fates-elite-trainer-box/",
        "https://www.outland.no/shining-fates-elite-trainer-box",


    ]
}

const vividVoltageEtb = {
    expansion: expansions.SWORD_SHIELD_VIVID_VOLTAGE,
    name: "Vivid Voltage Elite Trainer Box",
    urls: [
        "https://www.collectible.no/home/pokemon-vivid-voltage-elite-trainer-box/",
        "https://pokestore.no/produkt/engelsk/etb/pokemon-vivid-voltage-elite-trainer-box"
    ]
}

const astralRadianceEtb = {
    expansion: expansions.SWORD_SHIELD_ASTRAL_RADIANCE,
    name: "Astral Radiance Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-astral-radiance-elite-trainer-box-1",
        "https://www.kanoncon.no/produkt/pokemon-sword-shield-astral-radiance-elite-trainer-box/"
    ]
}

const darknessAblazeEtb = {
    expansion: expansions.SWORD_SHIELD_DARKNESS_ABLAZE,
    name: "Darkness Ablaze Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-darkness-ablaze-elite-trainer-box-4",
        "https://www.collectible.no/home/pokemon-darkness-ablaze-elite-trainer-box/",
        "https://gamingsjappa.no/products/pokemon-tcg-kort-sword-shield-3-darkness-ablaze-elite-trainer-box"

    ]
}

const hiddenFatesEtb = {
    expansion: expansions.HIDDEN_FATES,
    name: "Hidden Fates Elite Trainer Box",
    urls: [
        "https://pokestore.no/produkt/engelsk/etb/pokemon-hidden-fates-elite-trainer-box",
        "https://retroworld.no/produkt/pokemon/pokemon-hidden-fates-elite-trainer-box-etb-na-pa-lager-igjen"
    ]
}

export const products = [
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
    paldeanFatesEtb,
    fusionStrikeEtb
];

