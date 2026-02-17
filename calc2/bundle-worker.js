// Complete client-side code for calculator v2
// This replaces bundle.js and communicates with the worker

const WORKER_URL = 'https://calc2.t3li.workers.dev';

// ==================== TROOP DATA (from original bundle.js) ====================
const APP_VERSION = "0.1-Beta";

// Category definitions
const M = {
  Guardsmen: "Guardsmen",
  Specialists: "Specialists",
  Engineers: "Engineers",
  Monsters: "Monsters",
  Mercenaries: "Mercenaries"
};

// Flag definitions
const S = 1;   // Ranged
const x = 2;   // Melee
const b = 4;   // Mounted
const C = 8;   // Flying
const k = 16;  // Guardsman
const q = 64;  // Specialist
const G = 128; // ?
const V = 256; // ?
const T = 512; // ?
const A = 1024; // ?
const H = 2048; // ?
const R = 4096; // ?
const L = 8192; // ?
const D = 16384; // ?
const N = 32768; // ?
const B = 65536; // ?
const F = 131072; // ?
const P = 262144; // ?
const E = 524288; // ?
const O = 1048576; // ?

const j = 63; // Troop type mask

// Ratio maps
const J = {};
const W = {};
J[C] = 1;
J[b] = 10;
J[x] = 20;
J[S] = 20;
J[k] = 40;
W[C] = 1;
W[b] = 11;
W[x] = 23;
W[S] = 23;
W[k] = 47;

// Troop class
class K {
  constructor(name, category, tier, flags, strength, health, speed, initiative, foodConsumption, carryingCapacity, revivalCostGold, leadership, authority, dominance, subSortKey) {
    this.name = name;
    this.category = category;
    this.tier = tier;
    this.flags = flags;
    this.strength = strength || 0;
    this.health = health || 0;
    this.speed = speed || 0;
    this.initiative = initiative || 0;
    this.foodConsumption = foodConsumption || 0;
    this.carryingCapacity = carryingCapacity || 0;
    this.revivalCostGold = revivalCostGold || 0;
    this.revivalCostSilver = 10 * this.revivalCostGold;
    this.leadership = leadership;
    this.authority = authority;
    this.dominance = dominance;
    this.props = {};
    this.subSortKey = subSortKey || 0;
  }
  
  getTroopType() {
    return this.flags & j;
  }
  
  compare(e) {
    let t = this.health - e.health;
    if (0 == t) {
      t = this.subSortKey - e.subSortKey;
    }
    return t;
  }
}

// Helper to sort and add keys
const U = (e, t, a) => {
  a = a || "key";
  for (let i = 0; i < e.length; i++) {
    e[i][a] = i;
  }
  return e.sort(t);
};

// Guardsmen data
const z = {
  Ranged: U([
    new K("Archer I", M.Guardsmen, 1, S|q, 50, 150, 61, 10, 5, 100, 4, 1, 0, 0, -5000),
    new K("Archer II", M.Guardsmen, 2, S|q, 90, 270, 55, 10, 5, 100, 4, 1, 0, 0, -5000),
    new K("Archer III", M.Guardsmen, 3, S|q, 160, 480, 49, 10, 5, 100, 4, 1, 0, 0, -5000),
    new K("Archer IV", M.Guardsmen, 4, S|q, 290, 870, 44, 10, 5, 100, 4, 1, 0, 0, -5000),
    new K("Archer V", M.Guardsmen, 5, S|q, 520, 1560, 40, 10, 5, 100, 4, 1, 0, 0, -5000),
    new K("Heavy arbalester VI", M.Guardsmen, 6, S|q, 940, 2820, 36, 10, 5, 100, 4, 1, 0, 0, -4500),
    new K("Heavy arbalester VII", M.Guardsmen, 7, S|q, 1700, 5100, 32, 10, 5, 100, 4, 1, 0, 0, -4500),
    new K("Purifier I", M.Guardsmen, 8, S|q, 3060, 9180, 29, 10, 5, 100, 4, 1, 0, 0, -4500),
    new K("Purifier II", M.Guardsmen, 9, S|q, 5510, 16530, 26, 10, 5, 100, 4, 1, 0, 0, -4500)
  ], (e, t) => t.compare(e)),
  
  Melee: U([
    new K("Spearman I", M.Guardsmen, 1, x|q, 50, 150, 61, 10, 5, 100, 4, 1, 0, 0),
    new K("Spearman II", M.Guardsmen, 2, x|q, 90, 270, 55, 10, 5, 100, 4, 1, 0, 0),
    new K("Spearman III", M.Guardsmen, 3, x|q, 160, 480, 49, 10, 5, 100, 4, 1, 0, 0),
    new K("Spearman IV", M.Guardsmen, 4, x|q, 290, 870, 44, 10, 5, 100, 4, 1, 0, 0),
    new K("Spearman V", M.Guardsmen, 5, x|q, 520, 1560, 40, 10, 5, 100, 4, 1, 0, 0, -4500),
    new K("Heavy halberdier VI", M.Guardsmen, 6, x|q, 940, 2820, 36, 10, 5, 100, 4, 1, 0, 0, -4000),
    new K("Heavy halberdier VII", M.Guardsmen, 7, x|q, 1700, 5100, 32, 10, 5, 100, 4, 1, 0, 0, -4000),
    new K("Punisher I", M.Guardsmen, 8, x|q, 3060, 9180, 29, 10, 5, 250, 4, 1, 0, 0, -4000),
    new K("Punisher II", M.Guardsmen, 9, x|q, 5510, 16530, 26, 10, 5, 250, 4, 1, 0, 0, -4000)
  ], (e, t) => t.compare(e)),
  
  Mounted: U([
    new K("Rider I", M.Guardsmen, 1, b|q, 100, 300, 73, 10, 10, 200, 8, 2, 0, 0),
    new K("Rider II", M.Guardsmen, 2, b|q, 180, 540, 66, 10, 10, 200, 8, 2, 0, 0),
    new K("Rider III", M.Guardsmen, 3, b|q, 320, 960, 59, 10, 10, 200, 8, 2, 0, 0),
    new K("Rider IV", M.Guardsmen, 4, b|q, 580, 1740, 53, 10, 10, 200, 8, 2, 0, 0),
    new K("Rider V", M.Guardsmen, 5, b|q, 1050, 3150, 48, 10, 10, 200, 8, 2, 0, 0, -5000),
    new K("Mounted knight VI", M.Guardsmen, 6, b|q, 1900, 5700, 43, 10, 10, 200, 8, 2, 0, 0, -5000),
    new K("Mounted knight VII", M.Guardsmen, 7, b|q, 3400, 10200, 39, 10, 10, 200, 8, 2, 0, 0, -5000),
    new K("Smiter I", M.Guardsmen, 8, b|q, 6120, 18360, 35, 10, 10, 200, 8, 2, 0, 0, -5000),
    new K("Smiter II", M.Guardsmen, 9, b|q, 11020, 33060, 31, 10, 10, 200, 8, 2, 0, 0, -5000)
  ], (e, t) => t.compare(e)),
  
  Flying: U([
    new K("Battle griffin V", M.Guardsmen, 5, C|q, 10000, 30000, 60, 10, 100, 1000, 80, 20, 0, 0),
    new K("Battle griffin VI", M.Guardsmen, 6, C|q, 19000, 57000, 64, 10, 100, 1000, 80, 20, 0, 0),
    new K("Battle griffin VII", M.Guardsmen, 7, C|q, 34000, 102000, 49, 10, 100, 1000, 80, 20, 0, 0),
    new K("Corax I", M.Guardsmen, 8, C|q, 61200, 183600, 44, 10, 100, 1000, 80, 20, 0, 0),
    new K("Corax II", M.Guardsmen, 9, C|q, 110200, 330600, 39, 10, 100, 1000, 80, 20, 0, 0)
  ], (e, t) => t.compare(e))
};

// Specialists data
const Y = {
  Ranged: U([
    new K("Deadshot V", M.Specialists, 5, S|G, 520, 1560, 40, 10, 5, 100, 4, 1, 0, 0),
    new K("Deadshot VI", M.Specialists, 6, S|G, 940, 2820, 36, 10, 5, 100, 4, 1, 0, 0),
    new K("Deadshot VII", M.Specialists, 7, S|G, 1700, 5100, 32, 10, 5, 100, 4, 1, 0, 0),
    new K("Legitimist I", M.Specialists, 8, S|G, 3060, 9180, 29, 10, 5, 100, 4, 1, 0, 0),
    new K("Legitimist II", M.Specialists, 9, S|G, 5510, 16530, 26, 10, 5, 100, 4, 1, 0, 0)
  ], (e, t) => t.compare(e)),
  
  Melee: U([
    new K("Swordsman I", M.Specialists, 1, x|G, 50, 150, 61, 10, 5, 100, 4, 1, 0, 0, -4000),
    new K("Swordsman II", M.Specialists, 2, x|G, 90, 270, 55, 10, 5, 100, 4, 1, 0, 0, -4000),
    new K("Swordsman III", M.Specialists, 3, x|G, 160, 480, 49, 10, 5, 100, 4, 1, 0, 0, -4000),
    new K("Swordsman IV", M.Specialists, 4, x|G, 290, 870, 44, 10, 5, 100, 4, 1, 0, 0, -4000),
    new K("Swordsman V", M.Specialists, 5, x|G, 520, 1560, 40, 10, 5, 100, 4, 1, 0, 0, -4000),
    new K("Heavy knight VI", M.Specialists, 6, x|G, 940, 2820, 36, 10, 5, 100, 4, 1, 0, 0, -3500),
    new K("Heavy knight VII", M.Specialists, 7, x|G, 1700, 5100, 32, 10, 5, 100, 4, 1, 0, 0, -3500),
    new K("Duelist I", M.Specialists, 8, x|G, 3060, 9180, 29, 10, 5, 250, 4, 1, 0, 0, -3500),
    new K("Duelist II", M.Specialists, 9, x|G, 5510, 16530, 26, 10, 5, 250, 4, 1, 0, 0, -3500)
  ], (e, t) => t.compare(e)),
  
  Mounted: U([
    new K("Lion rider V", M.Specialists, 5, b|G, 1050, 3150, 48, 10, 10, 200, 8, 2, 0, 0),
    new K("Lion rider VI", M.Specialists, 6, b|G, 1900, 5700, 43, 10, 10, 200, 8, 2, 0, 0),
    new K("Lion rider VII", M.Specialists, 7, b|G, 3400, 10200, 39, 10, 10, 200, 8, 2, 0, 0),
    new K("Whitemane I", M.Specialists, 8, b|G, 6120, 18360, 35, 10, 10, 200, 8, 2, 0, 0),
    new K("Whitemane II", M.Specialists, 9, b|G, 11020, 33060, 31, 10, 10, 200, 8, 2, 0, 0)
  ], (e, t) => t.compare(e)),
  
  Flying: U([
    new K("Vulture V", M.Specialists, 5, C|G, 520, 1560, 60, 10, 5, 100, 4, 1, 0, 0, -3500),
    new K("Vulture VI", M.Specialists, 6, C|G, 940, 2820, 54, 10, 5, 100, 4, 1, 0, 0, -5000),
    new K("Vulture VII", M.Specialists, 7, C|G, 1700, 5100, 49, 10, 5, 100, 4, 1, 0, 0, -5000),
    new K("Royal lion I", M.Specialists, 8, C|G, 61200, 183600, 44, 10, 100, 1000, 80, 20, 0, 0),
    new K("Royal lion II", M.Specialists, 9, C|G, 110200, 330600, 39, 10, 100, 1000, 80, 20, 0, 0)
  ], (e, t) => t.compare(e))
};

// Mercenaries data
const _ = {
  "Mercenaries II": U([
    new K("Wyvern", M.Mercenaries, 9, C|V, 690000, 2070000, 26, 10, 0, 31250, 500, 0, 63, 0),
    new K("Warden", M.Mercenaries, 9, b|B, 470000, 1410000, 31, 10, 0, 21250, 340, 0, 43, 0),
    new K("Eternal Cannoneer", M.Mercenaries, 9, S|T, 444000, 1320000, 26, 10, 0, 20000, 320, 0, 40, 0),
    new K("Demonic Salamander", M.Mercenaries, 9, x|D, 410000, 1230000, 26, 10, 0, 18750, 300, 0, 38, 0),
    new K("Warregal", M.Mercenaries, 9, C|q|A, 220000, 660000, 39, 10, 0, 1000, 160, 0, 20, 0),
    new K("Jago", M.Mercenaries, 9, C|q|A, 220000, 660000, 39, 10, 0, 1000, 160, 0, 20, 0),
    new K("Superior Epic Monster Hunter", M.Mercenaries, 9, q|O, 25000, 75000, 39, 10, 0, 100, 8, 0, 1, 0),
    new K("Elder Bounty Hunter", M.Mercenaries, 9, q|F, 25000, 75000, 39, 10, 0, 100, 8, 0, 1, 0),
    new K("Quicksand", M.Mercenaries, 9, q|N|b, 22000, 66000, 31, 10, 0, 200, 16, 0, 2, 0),
    new K("Galloper", M.Mercenaries, 9, G|N|b, 22000, 66000, 31, 10, 0, 200, 16, 0, 2, 0),
    new K("Highlander", M.Mercenaries, 9, q|N|S, 11000, 33000, 26, 10, 0, 100, 8, 0, 1, 0),
    new K("Slavic warrior", M.Mercenaries, 9, G|N|x, 11000, 33000, 26, 10, 0, 100, 8, 0, 1, 0),
    new K("Pounder", M.Mercenaries, 9, G|N|S, 11000, 33000, 26, 10, 0, 100, 8, 0, 1, 0),
    new K("Scarface", M.Mercenaries, 9, G|N|x, 11000, 33000, 26, 10, 0, 100, 8, 0, 1, 0)
  ], (e, t) => t.compare(e)),
  
  "Mercenaries 7": U([
    new K("Lightning Lord", M.Mercenaries, 7, S|H, 153000, 460000, 32, 10, 0, 4500, 360, 0, 45, 0),
    new K("Sea Lord", M.Mercenaries, 7, R|b, 140000, 420000, 39, 10, 0, 4000, 320, 0, 40, 0),
    new K("Jungle King", M.Mercenaries, 7, A|x, 110000, 330000, 32, 10, 0, 3300, 264, 0, 33, 0),
    new K("Epic Monster Hunter VII", M.Mercenaries, 7, q|O, 3740, 11220, 49, 10, 0, 10, 8, 0, 1, 0),
    new K("Chariot", M.Mercenaries, 7, q|b|N, 6800, 20400, 43, 10, 0, 200, 16, 0, 2, 0),
    new K("Legionary", M.Mercenaries, 7, q|x|N, 3400, 10200, 36, 10, 0, 250, 8, 0, 1, 0),
    new K("Arbalester", M.Mercenaries, 7, q|S|N, 3400, 10200, 36, 10, 0, 100, 8, 0, 1, 0),
    new K("Rhino Rider", M.Mercenaries, 7, G|b|N, 6800, 20400, 43, 10, 0, 200, 16, 0, 2, 0),
    new K("Knight VI", M.Mercenaries, 7, G|x|N, 3400, 10200, 36, 10, 0, 100, 8, 0, 1, 0),
    new K("Trailseeker", M.Mercenaries, 7, G|S|N, 3400, 10200, 36, 10, 0, 100, 8, 0, 1, 0),
    new K("Sphynx", M.Mercenaries, 7, q|C|A, 136000, 408000, 54, 10, 0, 2000, 320, 0, 40, 0),
    new K("Shedu", M.Mercenaries, 7, G|C|A, 136000, 408000, 54, 10, 0, 2000, 320, 0, 40, 0)
  ], (e, t) => t.compare(e)),
  
  "Mercenaries 6": U([
    new K("Ent", M.Mercenaries, 6, x|R|B, 73000, 219000, 36, 10, 0, 3850, 310, 0, 39, 0),
    new K("Death Chariot", M.Mercenaries, 6, b|T, 57000, 171000, 43, 10, 0, 3000, 240, 0, 30, 0),
    new K("Sphynx", M.Mercenaries, 6, q|C|A, 18900, 56700, 54, 10, 0, 500, 80, 0, 10, 0),
    new K("Chariot", M.Mercenaries, 6, q|b|N, 3800, 11400, 43, 10, 0, 200, 16, 0, 2, 0),
    new K("Rhino Rider", M.Mercenaries, 6, G|b|N, 3780, 11340, 43, 10, 0, 200, 16, 0, 2, 0),
    new K("Epic Monster Hunter VI", M.Mercenaries, 6, q|O, 2030, 6090, 54, 10, 0, 100, 8, 0, 1, 0),
    new K("Legionary", M.Mercenaries, 6, q|x|N, 1900, 5700, 36, 10, 0, 250, 8, 0, 1, 0),
    new K("Arbalester", M.Mercenaries, 6, q|S|N, 1900, 5700, 36, 10, 0, 100, 8, 0, 1, 0),
    new K("Knight VI", M.Mercenaries, 6, G|x|N, 1900, 5700, 36, 10, 0, 100, 8, 0, 1, 0),
    new K("Trailseeker", M.Mercenaries, 6, G|S|N, 1890, 5670, 36, 10, 0, 100, 8, 0, 1, 0),
    new K("Combat Anteater VI", M.Mercenaries, 6, q|b|E, 2000, 6000, 60, 10, 0, 100, 8, 0, 1, 0),
    new K("Chitinous Defender VI", M.Mercenaries, 6, q|x|E, 1950, 5850, 60, 10, 0, 100, 8, 0, 1, 0),
    new K("Grim Stalker VII", M.Mercenaries, 6, q|S|E, 1800, 5400, 60, 10, 0, 100, 8, 0, 1, 0),
    new K("Wasp-Man V", M.Mercenaries, 6, q|C|E, 1800, 5400, 60, 10, 0, 100, 8, 0, 1, 0),
    new K("Bounty Hunter VI", M.Mercenaries, 6, q|C|E, 2030, 6090, 54, 10, 0, 100, 8, 0, 1, 0)
  ], (e, t) => t.compare(e)),
  
  "Mercenaries 5": U([
    new K("Cyclops", M.Mercenaries, 5, S|H|P, 45000, 135000, 40, 10, 0, 4250, 340, 0, 43, 0),
    new K("Bear", M.Mercenaries, 5, x|A|B, 22000, 66000, 40, 10, 0, 2050, 160, 0, 21, 0),
    new K("Gargoyle", M.Mercenaries, 5, C|A|T, 19000, 57000, 40, 10, 0, 1850, 150, 0, 19, 0),
    new K("Swift Marksman", M.Mercenaries, 5, q|S|N, 1050, 3150, 48, 10, 0, 100, 8, 0, 1, 0),
    new K("Epic Monster Hunter V", M.Mercenaries, 5, q|O, 1050, 3150, 60, 10, 0, 100, 8, 0, 1, 0)
  ], (e, t) => t.compare(e))
};

// Monsters data
const Q = {
  "Monsters 9": U([
    new K("Trickster II", M.Monsters, 9, S|A, 1150000, 3450000, 26, 10, 1040, 10400, 832, 0, 0, 52),
    new K("Kraken II", M.Monsters, 9, x|H, 1210000, 3630000, 26, 10, 1100, 11000, 880, 0, 0, 55),
    new K("Devastator II", M.Monsters, 9, b|L, 1170000, 3510000, 31, 10, 1060, 10600, 848, 0, 0, 53),
    new K("Fire Phoenix II", M.Monsters, 9, C|R, 1190000, 3570000, 39, 10, 1080, 10800, 864, 0, 0, 54)
  ], (e, t) => t.compare(e)),
  
  "Monsters 8": U([
    new K("Trickster I", M.Monsters, 8, S|A, 640000, 1920000, 29, 10, 1040, 10400, 832, 0, 0, 52),
    new K("Kraken I", M.Monsters, 8, x|H, 670000, 2010000, 29, 10, 1100, 11000, 880, 0, 0, 55),
    new K("Devastator I", M.Monsters, 8, b|L, 650000, 1950000, 35, 10, 1060, 10600, 848, 0, 0, 53),
    new K("Fire Phoenix I", M.Monsters, 8, C|R, 660000, 1980000, 44, 10, 1080, 10800, 864, 0, 0, 54)
  ], (e, t) => t.compare(e)),
  
  "Monsters 7": U([
    new K("Wind Lord", M.Monsters, 7, x|R, 310000, 930000, 32, 10, 900, 9000, 720, 0, 0, 45),
    new K("Black Dragon", M.Monsters, 7, C|L, 300000, 900000, 32, 10, 880, 8800, 704, 0, 0, 44),
    new K("Destructive Colossus", M.Monsters, 7, S|H, 290000, 870000, 32, 10, 860, 8600, 688, 0, 0, 43),
    new K("Ancient Terror", M.Monsters, 7, b|A, 280000, 840000, 32, 10, 820, 8200, 656, 0, 0, 41)
  ], (e, t) => t.compare(e)),
  
  "Monsters 6": U([
    new K("Ruby Golem", M.Monsters, 6, x|R, 130000, 390000, 32, 10, 700, 7000, 560, 0, 0, 35),
    new K("Jungle Destroyer", M.Monsters, 6, x|A, 130000, 390000, 36, 10, 680, 6800, 544, 0, 0, 34),
    new K("Crystal Dragon", M.Monsters, 6, x|L, 120000, 360000, 36, 10, 660, 6600, 528, 0, 0, 33),
    new K("Troll Rider", M.Monsters, 6, b|H, 110000, 330000, 36, 10, 600, 6000, 480, 0, 0, 30)
  ], (e, t) => t.compare(e)),
  
  "Monsters 5": U([
    new K("Ettin", M.Monsters, 5, x|H, 48000, 144000, 40, 10, 460, 4600, 368, 0, 0, 23),
    new K("Fearsome Manticore", M.Monsters, 5, C|A, 46000, 138000, 40, 10, 440, 4400, 352, 0, 0, 22),
    new K("Flaming Centaur", M.Monsters, 5, x|R, 44000, 132000, 40, 10, 420, 4200, 336, 0, 0, 21),
    new K("Desert Vanquisher", M.Monsters, 5, b|L, 42000, 126000, 40, 10, 400, 4000, 320, 0, 0, 20)
  ], (e, t) => t.compare(e)),
  
  "Monsters 4": U([
    new K("Ice Phoenix", M.Monsters, 4, C|R, 17000, 51000, 44, 10, 300, 3000, 240, 0, 0, 15),
    new K("Many-Armed Guardian", M.Monsters, 4, x|H, 13000, 39000, 44, 10, 220, 2200, 176, 0, 0, 11),
    new K("Gorgon Medusa", M.Monsters, 4, S|A, 12000, 36000, 44, 10, 200, 2000, 160, 0, 0, 10),
    new K("Magic Dragon", M.Monsters, 4, S|L, 15000, 45000, 44, 10, 260, 2600, 208, 0, 0, 13)
  ], (e, t) => t.compare(e)),
  
  "Monsters 3": U([
    new K("Water Elemental", M.Monsters, 3, S|R, 1900, 5700, 49, 10, 60, 600, 48, 0, 0, 3),
    new K("Battle Boar", M.Monsters, 3, b|A, 3900, 11700, 49, 10, 120, 1200, 96, 0, 0, 6),
    new K("Emerald Dragon", M.Monsters, 3, C|L, 4500, 13500, 49, 10, 140, 1400, 112, 0, 0, 7),
    new K("Stone Gargoyle", M.Monsters, 3, C|H, 5200, 15600, 49, 10, 160, 1600, 128, 0, 0, 8)
  ], (e, t) => t.compare(e))
};

// Master troop collection
const Z = {};
Z[M.Guardsmen] = z;
Z[M.Specialists] = Y;
Z[M.Mercenaries] = _;
Z[M.Monsters] = Q;

// Tier display mapping
const X = {1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"I",9:"II"};

// Count total troops
let totalTroops = 0;
for (let e in Z) {
  for (let t in Z[e]) {
    totalTroops += Z[e][t].length;
  }
}

// ==================== UI Generation Functions ====================

// Generate troop category HTML
function generateTroopCategory(container, category) {
  let data = Z[category];
  let html = "";
  let count = 0;
  
  html += `<div id="${category}" class="category-container">`;
  html += `<div class="category-name">${category}</div>`;
  html += '<div class="troop-families-container">';
  
  if (data) {
    for (let family in data) {
      html += `<div id="${category}-${family}" class="troop-family-container">`;
      html += `<div class="troop-family-name">${family}</div>`;
      
      const troops = data[family].sort((a, b) => b.compare(a));
      
      for (let i = 0; i < troops.length; i++) {
        const troop = troops[i];
        const key = i;
        const tier = troop.tier;
        const baseId = `${category}-${family}-key${key}`.replace(/\s+/g, '');
        const checkboxId = `${baseId}-checkbox`;
        const countId = `${baseId}-count`;
        const troopClass = `tier-${tier} category-${category}`;
        
        // Store troop data on the element
        troop.props.baseId = baseId;
        
        html += `<div class="troop-item ${troopClass}" onclick="window.onTroopClicked('#${checkboxId}', ${tier}, '${category}', event)">`;
        html += `  <input type="checkbox" name="${checkboxId}" id="${checkboxId}" class="troop-checkbox" onchange="window.updateTroops(this)">`;
        html += `  <label for="${checkboxId}" class="troop-type-label">${troop.name}</label>`;
        html += `  <div class="troop-count" id="${countId}" style="display: none;"></div>`;
        html += "</div>";
        
        count++;
      }
      html += "</div>";
    }
  } else {
    html += "<div><em>(Not yet implemented)</em></div>";
  }
  
  html += "</div>";
  html += "</div>";
  
  $(container).html(html);
  return count;
}

// ==================== Modal Loading ====================

// Function to load modals from HTML files
async function loadModals() {
  const modalPromises = [];
  
  $(".include-html").each(function() {
    const element = this;
    const url = $(element).attr("data-href");
    
    const promise = fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        return response.text();
      })
      .then(html => {
        $(element).replaceWith(html);
      })
      .catch(error => {
        console.error(`Error loading modal ${url}:`, error);
      });
    
    modalPromises.push(promise);
  });
  
  return Promise.all(modalPromises);
}

// ==================== State Management ====================

let currentConfig = {
  referenceCount: 50,
  specialistAdjustment: 10,
  healthBonuses: {
    flying: 0,
    mounted: 0,
    melee: 0,
    ranged: 0,
    guardsman: 0,
    specialist: 0,
    monster: 0
  },
  availableLeadership: 0,
  availableAuthority: 0,
  availableDominance: 0,
  enemyStackCount: 4,
  revivalCostReduction: 1
};

let currentProfile = null;

// ==================== Profile Management ====================

function saveProfile(name, data) {
  const key = name.toLowerCase();
  localStorage[key] = data;
  
  let profiles = JSON.parse(localStorage.profileNames || "[]");
  if (!profiles.includes(key)) {
    profiles.push(key);
    localStorage.profileNames = JSON.stringify(profiles);
  }
}

function loadProfile(name) {
  const key = name.toLowerCase();
  return localStorage[key];
}

function deleteProfile(name) {
  const key = name.toLowerCase();
  localStorage.removeItem(key);
  
  let profiles = JSON.parse(localStorage.profileNames || "[]");
  profiles = profiles.filter(p => p !== key);
  localStorage.profileNames = JSON.stringify(profiles);
}

function refreshProfileList(selected) {
  const selector = $("#profile-selector");
  selector.empty();
  selector.append('<option id="profile-default" selected>Select a profile...</option>');
  
  const profiles = JSON.parse(localStorage.profileNames || "[]");
  for (let i = 0; i < profiles.length; i++) {
    const profile = profiles[i];
    selector.append(`<option value="${profile}" ${selected === profile ? "selected" : ""}>${profile}</option>`);
  }
}

// ==================== Settings Management ====================

function loadSettingsFromString(settingsString) {
  try {
    const settings = JSON.parse(settingsString);
    
    if (settings && typeof settings.referenceCount === "number") {
      // Clear existing selections
      $(".troop-checkbox").prop("checked", false);
      
      // Apply settings
      $("#reference-count").val(settings.referenceCount || 50);
      $("#revival-cost-reduction").val(settings.revivalCostReduction || 1);
      $("#enemy-stack-count").val(settings.enemyStackCount || 4);
      $("#specialist-adjustment").val(settings.specialistAdjustment || 10);
      $("#available-leadership").val(settings.availableLeadership || 0);
      $("#available-authority").val(settings.availableAuthority || 0);
      $("#available-dominance").val(settings.availableDominance || 0);
      
      // Check selected troops
      if (settings.selected && settings.selected.length > 0) {
        for (let i = 0; i < settings.selected.length; i++) {
          const selector = settings.selected[i];
          $(selector).prop("checked", true);
        }
      }
      
      window.updateTroops();
    }
  } catch (e) {
    console.error("Error loading settings:", e);
  }
}

// ==================== Helper Functions ====================

function formatNumber(num) {
  if (num === undefined || num === null) return "0";
  return Intl.NumberFormat().format(Math.trunc(num));
}

function formatCompact(num) {
  if (num === undefined || num === null) return "0";
  const abs = Math.abs(num);
  if (abs >= 1e12) return `${(num/1e12).toFixed(1)}T`;
  if (abs >= 1e9) return `${(num/1e9).toFixed(1)}B`;
  if (abs >= 1e6) return `${(num/1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${(num/1e3).toFixed(1)}k`;
  return formatNumber(num);
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getTierTag(category, tier) {
  const tierMap = {1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"I",9:"II"};
  let prefix = "";
  
  switch(category) {
    case "Guardsmen": prefix = "G"; break;
    case "Specialists": prefix = "S"; break;
    case "Monsters": prefix = "M"; break;
    default: prefix = "";
  }
  
  return `<span class="tag visual-tier-${tier}">${prefix}${tierMap[tier] || tier}</span>`;
}

// ==================== Worker Communication ====================

async function calculateWithWorker(referenceCount) {
  const selectedTroops = getSelectedTroopsWithFlags();
  if (selectedTroops.length === 0) return null;
  
  const referenceTroop = findReferenceTroop(selectedTroops);
  const troopsWithRef = selectedTroops.map(t => ({
    ...t,
    isReference: t === referenceTroop
  }));

  const requestData = {
    troops: troopsWithRef,
    config: {
      ...currentConfig,
      referenceCount: referenceCount
    }
  };

  try {
    $("#report-body").html('<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>');
    
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`Worker error: ${response.status}`);
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error calling worker:', error);
    $("#report-body").html(`<div class="alert alert-danger">Error: ${error.message}</div>`);
    return null;
  }
}

function getSelectedTroopsWithFlags() {
  const selected = [];
  const checkboxes = $("input:checked.troop-checkbox");
  
  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    const id = $(checkbox).attr('id');
    
    // Find the troop data by searching through Z
    for (const category in Z) {
      for (const family in Z[category]) {
        const troops = Z[category][family];
        for (let j = 0; j < troops.length; j++) {
          const troop = troops[j];
          const expectedId = `${category}-${family}-key${j}-checkbox`.replace(/\s+/g, '');
          if (expectedId === id) {
            selected.push(troop);
            break;
          }
        }
      }
    }
  }
  
  return selected;
}

function findReferenceTroop(troops) {
  return troops
    .filter(t => t.category === "Guardsmen" || t.category === "Specialists")
    .reduce((max, t) => !max || t.health > max.health ? t : max, null);
}

function clearDisplay() {
  $("#report-body").html("");
  $(".lad-amount").text("0 of");
  $(".troop-count").text("0").hide();
  $("#generate-report").prop("disabled", true);
  $("#find-count").prop("disabled", true);
}

function updateTroopCounts(squads) {
  squads.forEach(squad => {
    // Find the element by searching through the DOM
    $(".troop-count").each(function() {
      const countId = $(this).attr('id');
      if (countId && squad.props && squad.props.baseId && countId.includes(squad.props.baseId)) {
        $(this).text(formatNumber(squad.count)).show();
        $(this).attr("title", `Total health: ${formatNumber(squad.totalHealth)}`);
      }
    });
  });
}

function createRatingDisplay(title, value) {
  return `
    <div class="rating-display flex-container flex-column-container" style="min-width: 120px; margin: 5px;">
      <div class="rating-title">${title}</div>
      <div class="rating-value">${value}</div>
    </div>
  `;
}

function generateSquadHTML(squads, resourceType) {
  let html = '';
  let lastTier = null;
  let lastCategory = null;
  
  squads.forEach(squad => {
    if (lastTier && lastTier !== squad.tier && lastCategory !== squad.category) {
      html += '<div style="margin-bottom: 21px;"></div>';
    }
    
    const bonusTag = squad.totalHealthBonus > 5 
      ? `<span class="bonus-tag">+${formatNumber(Math.round(squad.totalHealthBonus))}</span>`
      : '';
    
    html += `
      <div class="report-squad">
        <div class="report-squad-basic flex-container flex-row-container">
          <div class="report-squad-name">${squad.name} ${getTierTag(squad.category, squad.tier)}</div>
          <div class="report-squad-count">${formatNumber(squad.count)}</div>
        </div>
        <div class="report-squad-details flex-container flex-row-container">
          <div>Health: ${formatNumber(squad.totalHealth)} ${bonusTag}</div>
          <div>Strength: ${formatNumber(squad.totalStrength)}</div>
          <div>${capitalizeFirst(resourceType)}: ${formatNumber(squad[`total${capitalizeFirst(resourceType)}`] || 0)}</div>
        </div>
      </div>
    `;
    
    lastTier = squad.tier;
    lastCategory = squad.category;
  });
  
  return html;
}

function generateReportHTML(result) {
  const { statistics, troops, mercenaries, monsters } = result;
  let html = '<div class="flex-container flex-row-container" style="flex-wrap: wrap;">';
  
  // Rating displays
  html += createRatingDisplay("Power score", formatCompact(statistics.overallRating));
  html += createRatingDisplay("Strength", formatCompact(statistics.armyStrength));
  html += createRatingDisplay("Leadership", formatCompact(troops.requiredLeadership));
  
  if (mercenaries.requiredAuthority > 0) {
    html += createRatingDisplay("Authority", formatCompact(mercenaries.requiredAuthority));
  }
  
  if (monsters.requiredDominance > 0) {
    html += createRatingDisplay("Dominance", formatCompact(monsters.requiredDominance));
  }
  
  html += createRatingDisplay("Revival cost (g)", formatCompact(statistics.actualRevivalCost));
  
  // Attack info
  if (statistics.attackInfo && statistics.attackInfo.rounds > 0) {
    const { rounds, minAttacks, maxAttacks, enemyAttacks, role } = statistics.attackInfo;
    html += createRatingDisplay("Rounds", formatNumber(rounds));
    html += createRatingDisplay("Your hits", `${formatNumber(minAttacks)} - ${formatNumber(maxAttacks)}`);
    html += createRatingDisplay("Enemy hits", formatNumber(enemyAttacks));
    html += createRatingDisplay("Total hits", `${formatNumber(minAttacks + enemyAttacks)} - ${formatNumber(maxAttacks + enemyAttacks)}`);
    html += createRatingDisplay("Your role", `~${(role * 100).toFixed(1)}%`);
  }
  
  html += '</div>';
  
  // Army sections
  html += '<h4 class="separator">Your Army</h4>';
  
  if (mercenaries.squads.length > 0) {
    html += '<h5>Mercenaries</h5>';
    html += '<div class="flex-container flex-column-container report-section">';
    html += generateSquadHTML(mercenaries.squads, 'authority');
    html += '</div>';
  }
  
  if (monsters.squads.length > 0) {
    html += '<h5>Monsters</h5>';
    html += '<div class="flex-container flex-column-container report-section">';
    html += generateSquadHTML(monsters.squads, 'dominance');
    html += '</div>';
  }
  
  if (troops.squads.length > 0) {
    html += '<h5>Normal Troops</h5>';
    html += '<div class="flex-container flex-column-container report-section">';
    html += generateSquadHTML(troops.squads, 'leadership');
    html += '</div>';
  }
  
  return html;
}

function displayResults(result) {
  const { statistics, troops, mercenaries, monsters } = result;
  
  // Update LAD displays
  $("#required-leadership").val(formatNumber(troops.requiredLeadership));
  $("#required-authority").val(formatNumber(mercenaries.requiredAuthority));
  $("#required-dominance").val(formatNumber(monsters.requiredDominance));
  
  $("#leadership-amount").text(`${formatNumber(troops.requiredLeadership)} of`);
  $("#authority-amount").text(`${formatNumber(mercenaries.requiredAuthority)} of`);
  $("#dominance-amount").text(`${formatNumber(monsters.requiredDominance)} of`);
  
  // Update troop counts
  updateTroopCounts([...troops.squads, ...mercenaries.squads, ...monsters.squads]);
  
  // Generate report HTML
  const reportHTML = generateReportHTML(result);
  $("#report-body").html(reportHTML);
  
  // Enable buttons
  $("#generate-report").prop("disabled", false);
  $("#find-count").prop("disabled", currentConfig.availableLeadership <= 0);
}

function updateUIFromResult(result) {
  const { troops, mercenaries, monsters } = result;
  
  // Check limits and apply warning classes
  const leadership = parseInt($("#available-leadership").val()) || 0;
  const authority = parseInt($("#available-authority").val()) || 0;
  const dominance = parseInt($("#available-dominance").val()) || 0;
  
  $(".leadership-display").toggleClass("alerted-input", 
    leadership > 0 && troops.requiredLeadership > leadership);
  $(".authority-display").toggleClass("alerted-input", 
    authority > 0 && mercenaries.requiredAuthority > authority);
  $(".dominance-display").toggleClass("alerted-input", 
    dominance > 0 && monsters.requiredDominance > dominance);
}

// ==================== Global Functions ====================

window.onChangeWithIntValidation = function(element, min, max, callback) {
  const value = parseInt($(element).val());
  if (Number.isNaN(value)) {
    $(element).addClass("alerted-input");
  } else {
    $(element).val(Math.min(Math.max(value, min), max)).removeClass("alerted-input");
    callback();
  }
};

window.onChangeWithFloatValidation = function(element, min, max, decimals, callback) {
  const value = parseFloat($(element).val());
  if (Number.isNaN(value)) {
    $(element).addClass("alerted-input");
  } else {
    $(element).val(Math.min(Math.max(value, min), max).toFixed(decimals)).removeClass("alerted-input");
    callback();
  }
};

window.clearTroopSelection = function() {
  $(".troop-checkbox").prop("checked", false);
  $("#generate-report").prop("disabled", true);
  window.updateTroops();
  window.saveSettings();
};

window.onTroopClicked = function(selector, tier, category, event) {
  if (event.getModifierState("Shift") || event.getModifierState("Alt") || event.getModifierState("Control")) {
    const checkboxSelector = `.tier-${tier}.category-${category} input`;
    const isChecked = $(selector).prop("checked");
    $(checkboxSelector).prop("checked", isChecked);
  }
};

window.reverseCalculateArmy = async function(triggerReport) {
  const leadership = parseInt($("#available-leadership").val());
  if (leadership <= 0) return;
  
  // First calculate with current reference count
  let result = await calculateWithWorker(100);
  if (!result) return;
  
  const ratio = leadership / result.troops.requiredLeadership;
  
  // Calculate with new reference count
  result = await calculateWithWorker(100 * ratio);
  
  if (result && result.troops && result.troops.squads && result.troops.squads.length > 0) {
    $("#reference-count").val(result.troops.squads[0].count);
    if (triggerReport) {
      $("#generate-report").click();
    }
  }
};

window.saveConfigurationToFile = async function() {
  const settings = localStorage.uiSettings;
  if (!settings) return;
  
  try {
    const parsed = JSON.parse(settings);
    if (parsed && typeof parsed.referenceCount === "number" && typeof parsed.selected === "object") {
      const file = new File([JSON.stringify(parsed)], "tbstacking-settings.json", { type: "application/json" });
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  } catch (e) {
    console.error("Error saving configuration:", e);
  }
};

window.selectFileForImport = function() {
  $("#import-file").click();
};

window.importSelectedFile = function(event) {
  const input = event?.target;
  if (!input?.files?.length) return;
  
  const reader = new FileReader();
  reader.onload = function() {
    try {
      const settings = reader.result;
      if (settings) {
        loadSettingsFromString(settings);
      }
    } catch (e) {
      console.error("Error importing file:", e);
    }
  };
  reader.readAsText(input.files[0]);
};

window.saveSettings = function() {
  const settings = {
    referenceCount: parseInt($("#reference-count").val()) || 50,
    revivalCostReduction: parseFloat($("#revival-cost-reduction").val()) || 1,
    enemyStackCount: parseInt($("#enemy-stack-count").val()) || 4,
    specialistAdjustment: parseInt($("#specialist-adjustment").val()) || 10,
    availableLeadership: parseInt($("#available-leadership").val()) || 0,
    availableAuthority: parseInt($("#available-authority").val()) || 0,
    availableDominance: parseInt($("#available-dominance").val()) || 0,
    selected: []
  };
  
  const checkboxes = $("input:checked.troop-checkbox");
  for (let i = 0; i < checkboxes.length; i++) {
    settings.selected.push(`#${$(checkboxes[i]).prop("id")}`);
  }
  
  localStorage.uiSettings = JSON.stringify(settings);
};

window.loadSettings = function() {
  const settings = localStorage.uiSettings;
  if (settings) {
    loadSettingsFromString(settings);
  }
};

window.factoryReset = function() {
  if (confirm("Are you sure you want to reset all settings? The page will reload.")) {
    localStorage.removeItem("uiSettings");
    localStorage.removeItem("profileNames");
    window.location.reload();
  }
};

window.onProfileSelected = function() {
  const selector = $("#profile-selector");
  const selectedIndex = selector.prop("selectedIndex");
  
  if (selectedIndex <= 0) {
    $("#save-profile-button, #delete-profile-button").prop("disabled", true);
    return;
  }
  
  const profileName = selector.val();
  const profileData = loadProfile(profileName);
  
  if (profileData) {
    $("#delete-profile-button").prop("disabled", false);
    loadSettingsFromString(profileData);
    currentProfile = profileName.toLowerCase();
    $("#save-profile-button").prop("disabled", false);
  }
};

window.addNewProfile = function() {
  const name = prompt("Enter profile name (letters, numbers, spaces, and hyphens only):");
  if (!name || !name.trim()) return;
  
  if (!/^[a-zA-Z0-9 _\-]+$/.test(name)) {
    alert("Only letters, numbers, spaces, hyphens, and underscore characters are allowed.");
    return;
  }
  
  if (loadProfile(name)) {
    alert(`A profile named '${name}' already exists.`);
    return;
  }
  
  saveProfile(name, localStorage.uiSettings);
  refreshProfileList(name);
  currentProfile = name.toLowerCase();
  $("#save-profile-button, #delete-profile-button").prop("disabled", false);
};

window.removeCurrentProfile = function() {
  if (!currentProfile) return;
  
  if (confirm(`Are you sure you want to delete profile '${currentProfile}'?`)) {
    deleteProfile(currentProfile);
    refreshProfileList();
    currentProfile = null;
    $("#save-profile-button, #delete-profile-button").prop("disabled", true);
  }
};

window.saveCurrentProfile = function() {
  if (currentProfile) {
    saveProfile(currentProfile, localStorage.uiSettings);
    alert(`Profile '${currentProfile}' saved.`);
  } else {
    window.addNewProfile();
  }
};

window.updateTroops = async function() {
  // Update config from UI
  currentConfig = {
    referenceCount: parseInt($("#reference-count").val()) || 50,
    specialistAdjustment: parseInt($("#specialist-adjustment").val()) || 10,
    healthBonuses: {
      flying: parseInt($("#health-bonus-Flying").val()) || 0,
      mounted: parseInt($("#health-bonus-Mounted").val()) || 0,
      melee: parseInt($("#health-bonus-Melee").val()) || 0,
      ranged: parseInt($("#health-bonus-Ranged").val()) || 0,
      guardsman: parseInt($("#health-bonus-Guardsman").val()) || 0,
      specialist: parseInt($("#health-bonus-Specialist").val()) || 0,
      monster: parseInt($("#health-bonus-Monster").val()) || 0
    },
    availableLeadership: parseInt($("#available-leadership").val()) || 0,
    availableAuthority: parseInt($("#available-authority").val()) || 0,
    availableDominance: parseInt($("#available-dominance").val()) || 0,
    enemyStackCount: parseInt($("#enemy-stack-count").val()) || 4,
    revivalCostReduction: parseFloat($("#revival-cost-reduction").val()) || 1
  };

  const selectedTroops = getSelectedTroopsWithFlags();
  
  if (selectedTroops.length === 0) {
    clearDisplay();
    window.saveSettings();
    return;
  }

  const result = await calculateWithWorker(currentConfig.referenceCount);
  
  if (result) {
    displayResults(result);
    updateUIFromResult(result);
  }
  
  // Save settings after update
  window.saveSettings();
};

// ==================== Initialization ====================

$(document).ready(async function() {
  console.log("Calculator v2 initializing...");
  
  // Set version number
  $("#app-version-number").text(APP_VERSION);
  
  // First, load all modals
  await loadModals();
  
  // Then generate troop categories
  for (const category in M) {
    const container = document.getElementById(`${category}-category`);
    if (container) {
      generateTroopCategory(container, M[category]);
    }
  }
  
  // Load saved settings
  window.loadSettings();
  
  // Initialize tooltips if Bootstrap is available
  if (typeof bootstrap !== 'undefined') {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltips.forEach(t => new bootstrap.Tooltip(t));
    }, 100);
  }
  
  // Refresh profile list
  refreshProfileList();
  
  console.log("Calculator v2 initialized");
});
