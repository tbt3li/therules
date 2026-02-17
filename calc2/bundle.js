"use strict";
var e = "0.49.0-alpha";
const t = e,
    a = "Create Profile",
    r = "Provide a name for your new profile. Letters, numbers, spaces, and hyphens are allowed.",
    n = "Confirm";

// Worker endpoint
//const WORKER_URL = 'https://calc2.t3li.workers.dev';

$(document).ready((() => {
    const e = $(".include-html");
    for (let t = 0; t < e.length; t++) {
        const a = e[t],
            r = $(a).attr("data-href");
        fetch(r).then((e => {
            if (!e.ok) throw new Error(e.statusText);
            return e
        })).then((e => e.text())).then((e => {
            $(a).replaceWith(e)
        })).catch((e => {
            console.log(`The document [${r}] could not be loaded: ${e}`)
        }))
    }
}));

const s = "uiSettings",
    i = "profileNames",
    o = () => window.localStorage[s],
    l = e => {
        e ? window.localStorage[s] = e : window.localStorage.removeItem(s)
    },
    c = () => window.localStorage[i] ?? "[]",
    d = e => {
        e ? window.localStorage[i] = e : window.localStorage.removeItem(i)
    },
    u = e => {
        e = e.toLowerCase();
        return c().indexOf(e) ? window.localStorage[e] : null
    },
    p = e => {
        e = e.toLowerCase();
        let t = JSON.parse(c()),
            a = -1;
        (a = t.indexOf(e)) >= 0 && (t.splice(a, 1), d(JSON.stringify(t))), window.localStorage.removeItem(e)
    },
    h = .95,
    v = !0,
    m = !0,
    g = !1,
    f = !1,
    w = {
        LADExample: (e => {
            const t = new Image;
            return t.source = e, t
        })("/img/march_lad.jpg")
    },
    y = {
        show: e => {
            $("#image-modal-image").prop("src", e.source), $("#image-modal").modal("show")
        }
    };

var I = new class {
    show = (e, t, a, r, n) => {
        $("#text-entry-modal-title").text(e ?? "Text Entry"), $("#text-entry-modal-description").text(t ?? "Please enter a value below: "), $("#text-entry-modal-button").text(a ?? "Confirm"), $("#text-entry-modal-text").val(r), $("#text-entry-modal-error").hide(), this.confirmationCallback = n, $("#text-entry-modal").modal("show")
    };
    onConfirm = () => {
        if (this.confirmationCallback) {
            const e = this.confirmationCallback($("#text-entry-modal-text").val());
            null == e && $("#text-entry-modal").modal("hide"), $("#text-entry-modal-error").text(`Error: ${e}`), $("#text-entry-modal-error").show()
        }
    };
    confirmationCallback = null
};

const M = {
        Guardsmen: "Guardsmen",
        Specialists: "Specialists",
        Engineers: "Engineers",
        Monsters: "Monsters",
        Mercenaries: "Mercenaries"
    },
    S = 1,
    x = 2,
    b = 4,
    C = 8,
    k = 16,
    q = 64,
    G = 128,
    V = 256,
    T = 512,
    A = 1024,
    H = 2048,
    R = 4096,
    L = 8192,
    D = 16384,
    N = 32768,
    B = 65536,
    F = 131072,
    P = 262144,
    E = 524288,
    O = 1048576,
    j = 63,
    J = {},
    W = {};
J[C] = 1, J[b] = 10, J[x] = 20, J[S] = 20, J[k] = 40, W[C] = 1, W[b] = 11, W[x] = 23, W[S] = 23, W[k] = 47;

class K {
    constructor(e, t, a, r, n, s, i, o, l, c, d, u, p, h, v) {
        this.name = e, this.category = t, this.tier = a, this.flags = r, this.strength = n ?? 0, this.health = s ?? 0, this.speed = i ?? 0, this.initiative = o ?? 0, this.foodConsumption = l ?? 0, this.carryingCapacity = c ?? 0, this.revivalCostGold = d ?? 0, this.revivalCostSilver = 10 * this.revivalCostGold, this.leadership = u, this.authority = p, this.dominance = h, this.props = {}, this.subSortKey = v ?? 0
    }
    getTroopType = () => this.flags & j;
    compare = e => {
        let t = this.health - e.health;
        return 0 == t && (t = this.subSortKey - e.subSortKey), t
    }
}

const U = (e, t, a) => {
        a = a ?? "key";
        for (let t = 0; t < e.length; t++) e[t][a] = t;
        return e.sort(t)
    },
    z = {
        Ranged: U([new K("Archer I", M.Guardsmen, 1, S | q, 50, 150, 61, 10, 5, 100, 4, 1, 0, 0, -5e3), new K("Archer II", M.Guardsmen, 2, S | q, 90, 270, 55, 10, 5, 100, 4, 1, 0, 0, -5e3), new K("Archer III", M.Guardsmen, 3, S | q, 160, 480, 49, 10, 5, 100, 4, 1, 0, 0, -5e3), new K("Archer IV", M.Guardsmen, 4, S | q, 290, 870, 44, 10, 5, 100, 4, 1, 0, 0, -5e3), new K("Archer V", M.Guardsmen, 5, S | q, 520, 1560, 40, 10, 5, 100, 4, 1, 0, 0, -5e3), new K("Heavy arbalester VI", M.Guardsmen, 6, S | q, 940, 2820, 36, 10, 5, 100, 4, 1, 0, 0, -4500), new K("Heavy arbalester VII", M.Guardsmen, 7, S | q, 1700, 5100, 32, 10, 5, 100, 4, 1, 0, 0, -4500), new K("Purifier I", M.Guardsmen, 8, S | q, 3060, 9180, 29, 10, 5, 100, 4, 1, 0, 0, -4500), new K("Purifier II", M.Guardsmen, 9, S | q, 5510, 16530, 26, 10, 5, 100, 4, 1, 0, 0, -4500)], ((e, t) => t.compare(e))),
        Melee: U([new K("Spearman I", M.Guardsmen, 1, x | q, 50, 150, 61, 10, 5, 100, 4, 1, 0, 0), new K("Spearman II", M.Guardsmen, 2, x | q, 90, 270, 55, 10, 5, 100, 4, 1, 0, 0), new K("Spearman III", M.Guardsmen, 3, x | q, 160, 480, 49, 10, 5, 100, 4, 1, 0, 0), new K("Spearman IV", M.Guardsmen, 4, x | q, 290, 870, 44, 10, 5, 100, 4, 1, 0, 0), new K("Spearman V", M.Guardsmen, 5, x | q, 520, 1560, 40, 10, 5, 100, 4, 1, 0, 0, -4500), new K("Heavy halberdier VI", M.Guardsmen, 6, x | q, 940, 2820, 36, 10, 5, 100, 4, 1, 0, 0, -4e3), new K("Heavy halberdier VII", M.Guardsmen, 7, x | q, 1700, 5100, 32, 10, 5, 100, 4, 1, 0, 0, -4e3), new K("Punisher I", M.Guardsmen, 8, x | q, 3060, 9180, 29, 10, 5, 250, 4, 1, 0, 0, -4e3), new K("Punisher II", M.Guardsmen, 9, x | q, 5510, 16530, 26, 10, 5, 250, 4, 1, 0, 0, -4e3)], ((e, t) => t.compare(e))),
        Mounted: U([new K("Rider I", M.Guardsmen, 1, b | q, 100, 300, 73, 10, 10, 200, 8, 2, 0, 0), new K("Rider II", M.Guardsmen, 2, b | q, 180, 540, 66, 10, 10, 200, 8, 2, 0, 0), new K("Rider III", M.Guardsmen, 3, b | q, 320, 960, 59, 10, 10, 200, 8, 2, 0, 0), new K("Rider IV", M.Guardsmen, 4, b | q, 580, 1740, 53, 10, 10, 200, 8, 2, 0, 0), new K("Rider V", M.Guardsmen, 5, b | q, 1050, 3150, 48, 10, 10, 200, 8, 2, 0, 0, -5e3), new K("Mounted knight VI", M.Guardsmen, 6, b | q, 1900, 5700, 43, 10, 10, 200, 8, 2, 0, 0, -5e3), new K("Mounted knight VII", M.Guardsmen, 7, b | q, 3400, 10200, 39, 10, 10, 200, 8, 2, 0, 0, -5e3), new K("Smiter I", M.Guardsmen, 8, b | q, 6120, 18360, 35, 10, 10, 200, 8, 2, 0, 0, -5e3), new K("Smiter II", M.Guardsmen, 9, b | q, 11020, 33060, 31, 10, 10, 200, 8, 2, 0, 0, -5e3)], ((e, t) => t.compare(e))),
        Flying: U([new K("Battle griffin V", M.Guardsmen, 5, C | q, 1e4, 3e4, 60, 10, 100, 1e3, 80, 20, 0, 0), new K("Battle griffin VI", M.Guardsmen, 6, C | q, 19e3, 57e3, 64, 10, 100, 1e3, 80, 20, 0, 0), new K("Battle griffin VII", M.Guardsmen, 7, C | q, 34e3, 102e3, 49, 10, 100, 1e3, 80, 20, 0, 0), new K("Corax I", M.Guardsmen, 8, C | q, 61200, 183600, 44, 10, 100, 1e3, 80, 20, 0, 0), new K("Corax II", M.Guardsmen, 9, C | q, 110200, 330600, 39, 10, 100, 1e3, 80, 20, 0, 0)], ((e, t) => t.compare(e)))
    },
    Y = {
        Ranged: U([new K("Deadshot V", M.Specialists, 5, S | G, 520, 1560, 40, 10, 5, 100, 4, 1, 0, 0), new K("Deadshot VI", M.Specialists, 6, S | G, 940, 2820, 36, 10, 5, 100, 4, 1, 0, 0), new K("Deadshot VII", M.Specialists, 7, S | G, 1700, 5100, 32, 10, 5, 100, 4, 1, 0, 0), new K("Legitimist I", M.Specialists, 8, S | G, 3060, 9180, 29, 10, 5, 100, 4, 1, 0, 0), new K("Legitimist II", M.Specialists, 9, S | G, 5510, 16530, 26, 10, 5, 100, 4, 1, 0, 0)], ((e, t) => t.compare(e))),
        Melee: U([new K("Swordsman I", M.Specialists, 1, x | G, 50, 150, 61, 10, 5, 100, 4, 1, 0, 0, -4e3), new K("Swordsman II", M.Specialists, 2, x | G, 90, 270, 55, 10, 5, 100, 4, 1, 0, 0, -4e3), new K("Swordsman III", M.Specialists, 3, x | G, 160, 480, 49, 10, 5, 100, 4, 1, 0, 0, -4e3), new K("Swordsman IV", M.Specialists, 4, x | G, 290, 870, 44, 10, 5, 100, 4, 1, 0, 0, -4e3), new K("Swordsman V", M.Specialists, 5, x | G, 520, 1560, 40, 10, 5, 100, 4, 1, 0, 0, -4e3), new K("Heavy knight VI", M.Specialists, 6, x | G, 940, 2820, 36, 10, 5, 100, 4, 1, 0, 0, -3500), new K("Heavy knight VII", M.Specialists, 7, x | G, 1700, 5100, 32, 10, 5, 100, 4, 1, 0, 0, -3500), new K("Duelist I", M.Specialists, 8, x | G, 3060, 9180, 29, 10, 5, 250, 4, 1, 0, 0, -3500), new K("Duelist II", M.Specialists, 9, x | G, 5510, 16530, 26, 10, 5, 250, 4, 1, 0, 0, -3500)], ((e, t) => t.compare(e))),
        Mounted: U([new K("Lion rider V", M.Specialists, 5, b | G, 1050, 3150, 48, 10, 10, 200, 8, 2, 0, 0), new K("Lion rider VI", M.Specialists, 6, b | G, 1900, 5700, 43, 10, 10, 200, 8, 2, 0, 0), new K("Lion rider VII", M.Specialists, 7, b | G, 3400, 10200, 39, 10, 10, 200, 8, 2, 0, 0), new K("Whitemane I", M.Specialists, 8, b | G, 6120, 18360, 35, 10, 10, 200, 8, 2, 0, 0), new K("Whitemane II", M.Specialists, 9, b | G, 11020, 33060, 31, 10, 10, 200, 8, 2, 0, 0)], ((e, t) => t.compare(e))),
        Flying: U([new K("Vulture V", M.Specialists, 5, C | G, 520, 1560, 60, 10, 5, 100, 4, 1, 0, 0, -3500), new K("Vulture VI", M.Specialists, 6, C | G, 940, 2820, 54, 10, 5, 100, 4, 1, 0, 0, -5e3), new K("Vulture VII", M.Specialists, 7, C | G, 1700, 5100, 49, 10, 5, 100, 4, 1, 0, 0, -5e3), new K("Royal lion I", M.Specialists, 8, C | G, 61200, 183600, 44, 10, 100, 1e3, 80, 20, 0, 0), new K("Royal lion II", M.Specialists, 9, C | G, 110200, 330600, 39, 10, 100, 1e3, 80, 20, 0, 0)], ((e, t) => t.compare(e)))
    },
    _ = {
        "Mercenaries II": U([new K("Wyvern", M.Mercenaries, 9, C | V, 69e4, 207e4, 26, 10, 0, 31250, 500, 0, 63, 0), new K("Warden", M.Mercenaries, 9, b | B, 47e4, 141e4, 31, 10, 0, 21250, 340, 0, 43, 0), new K("Eternal Cannoneer", M.Mercenaries, 9, S | T, 444e3, 132e4, 26, 10, 0, 2e4, 320, 0, 40, 0), new K("Demonic Salamander", M.Mercenaries, 9, x | D, 41e4, 123e4, 26, 10, 0, 18750, 300, 0, 38, 0), new K("Warregal", M.Mercenaries, 9, C | q | A, 22e4, 66e4, 39, 10, 0, 1e3, 160, 0, 20, 0), new K("Jago", M.Mercenaries, 9, C | q | A, 22e4, 66e4, 39, 10, 0, 1e3, 160, 0, 20, 0), new K("Sup Epic Monster Hunter", M.Mercenaries, 9, q | O, 25e3, 75e3, 39, 10, 0, 100, 8, 0, 1, 0), new K("Elder Bounty Hunter", M.Mercenaries, 9, q | F, 25e3, 75e3, 39, 10, 0, 100, 8, 0, 1, 0), new K("Quicksand", M.Mercenaries, 9, q | N | b, 22e3, 66e3, 31, 10, 0, 200, 16, 0, 2, 0), new K("Galloper", M.Mercenaries, 9, G | N | b, 22e3, 66e3, 31, 10, 0, 200, 16, 0, 2, 0), new K("Highlander", M.Mercenaries, 9, q | N | S, 11e3, 33e3, 26, 10, 0, 100, 8, 0, 1, 0), new K("Slavic warrior", M.Mercenaries, 9, G | N | x, 11e3, 33e3, 26, 10, 0, 100, 8, 0, 1, 0), new K("Pounder", M.Mercenaries, 9, G | N | S, 11e3, 33e3, 26, 10, 0, 100, 8, 0, 1, 0), new K("Scarface", M.Mercenaries, 9, G | N | x, 11e3, 33e3, 26, 10, 0, 100, 8, 0, 1, 0)], ((e, t) => t.compare(e))),
        "Mercenaries 7": U([new K("Lightning Lord", M.Mercenaries, 7, S | H, 153e3, 46e4, 32, 10, 0, 4500, 360, 0, 45, 0), new K("Sea Lord", M.Mercenaries, 7, R | b, 14e4, 42e4, 39, 10, 0, 4e3, 320, 0, 40, 0), new K("Jungle King", M.Mercenaries, 7, A | x, 11e4, 33e4, 32, 10, 0, 3300, 264, 0, 33, 0), new K("Epic Monster Hunter VII", M.Mercenaries, 7, q | O, 3740, 11220, 49, 10, 0, 10, 8, 0, 1, 0), new K("Chariot", M.Mercenaries, 7, q | b | N, 6800, 20400, 43, 10, 0, 200, 16, 0, 2, 0), new K("Legionary", M.Mercenaries, 7, q | x | N, 3400, 10200, 36, 10, 0, 250, 8, 0, 1, 0), new K("Arbalester", M.Mercenaries, 7, q | S | N, 3400, 10200, 36, 10, 0, 100, 8, 0, 1, 0), new K("Rhino Rider", M.Mercenaries, 7, G | b | N, 6800, 20400, 43, 10, 0, 200, 16, 0, 2, 0), new K("Knight VI", M.Mercenaries, 7, G | x | N, 3400, 10200, 36, 10, 0, 100, 8, 0, 1, 0), new K("Trailseeker", M.Mercenaries, 7, G | S | N, 3400, 10200, 36, 10, 0, 100, 8, 0, 1, 0), new K("Sphynx", M.Mercenaries, 7, q | C | A, 136e3, 408e3, 54, 10, 0, 2e3, 320, 0, 40, 0), new K("Shedu", M.Mercenaries, 7, G | C | A, 136e3, 408e3, 54, 10, 0, 2e3, 320, 0, 40, 0)], ((e, t) => t.compare(e))),
        "Mercenaries 6": U([new K("Ent", M.Mercenaries, 6, x | R | B, 73e3, 219e3, 36, 10, 0, 3850, 310, 0, 39, 0), new K("Death Chariot", M.Mercenaries, 6, b | T, 57e3, 171e3, 43, 10, 0, 3e3, 240, 0, 30, 0), new K("Sphynx", M.Mercenaries, 6, q | C | A, 18900, 56700, 54, 10, 0, 500, 80, 0, 10, 0), new K("Chariot", M.Mercenaries, 6, q | b | N, 3800, 11400, 43, 10, 0, 200, 16, 0, 2, 0), new K("Rhino Rider", M.Mercenaries, 6, G | b | N, 3780, 11340, 43, 10, 0, 200, 16, 0, 2, 0), new K("Epic Monster Hunter VI", M.Mercenaries, 6, q | O, 2030, 6090, 54, 10, 0, 100, 8, 0, 1, 0), new K("Legionary", M.Mercenaries, 6, q | x | N, 1900, 5700, 36, 10, 0, 250, 8, 0, 1, 0), new K("Arbalester", M.Mercenaries, 6, q | S | N, 1900, 5700, 36, 10, 0, 100, 8, 0, 1, 0), new K("Knight VI", M.Mercenaries, 6, G | x | N, 1900, 5700, 36, 10, 0, 100, 8, 0, 1, 0), new K("Trailseeker", M.Mercenaries, 6, G | S | N, 1890, 5670, 36, 10, 0, 100, 8, 0, 1, 0), new K("Combat Anteater VI", M.Mercenaries, 6, q | b | E, 2e3, 6e3, 60, 10, 0, 100, 8, 0, 1, 0), new K("Chitinous Defender VI", M.Mercenaries, 6, q | x | E, 1950, 5850, 60, 10, 0, 100, 8, 0, 1, 0), new K("Grim Stalker VII", M.Mercenaries, 6, q | S | E, 1800, 5400, 60, 10, 0, 100, 8, 0, 1, 0), new K("Wasp-Man V", M.Mercenaries, 6, q | C | E, 1800, 5400, 60, 10, 0, 100, 8, 0, 1, 0), new K("Bounty Hunter VI", M.Mercenaries, 6, q | C | E, 2030, 6090, 54, 10, 0, 100, 8, 0, 1, 0)], ((e, t) => t.compare(e))),
        "Mercenaries 5": U([new K("Cyclops", M.Mercenaries, 5, S | H | P, 45e3, 135e3, 40, 10, 0, 4250, 340, 0, 43, 0), new K("Bear", M.Mercenaries, 5, x | A | B, 22e3, 66e3, 40, 10, 0, 2050, 160, 0, 21, 0), new K("Gargoyle", M.Mercenaries, 5, C | A | T, 19e3, 57e3, 40, 10, 0, 1850, 150, 0, 19, 0), new K("Swift Marksman", M.Mercenaries, 5, q | S | N, 1050, 3150, 48, 10, 0, 100, 8, 0, 1, 0), new K("Epic Monster Hunter V", M.Mercenaries, 5, q | O, 1050, 3150, 60, 10, 0, 100, 8, 0, 1, 0)], ((e, t) => t.compare(e)))
    },
    Q = {
        "Monsters 9": U([new K("Trickster II", M.Monsters, 9, S | A, 115e4, 345e4, 26, 10, 1040, 10400, 832, 0, 0, 52), new K("Kraken II", M.Monsters, 9, x | H, 121e4, 363e4, 26, 10, 1100, 11e3, 880, 0, 0, 55), new K("Devastator II", M.Monsters, 9, b | L, 117e4, 351e4, 31, 10, 1060, 10600, 848, 0, 0, 53), new K("Fire Phoenix II", M.Monsters, 9, C | R, 119e4, 357e4, 39, 10, 1080, 10800, 864, 0, 0, 54)], ((e, t) => t.compare(e))),
        "Monsters 8": U([new K("Trickster I", M.Monsters, 8, S | A, 64e4, 192e4, 29, 10, 1040, 10400, 832, 0, 0, 52), new K("Kraken I", M.Monsters, 8, x | H, 67e4, 201e4, 29, 10, 1100, 11e3, 880, 0, 0, 55), new K("Devastator I", M.Monsters, 8, b | L, 65e4, 195e4, 35, 10, 1060, 10600, 848, 0, 0, 53), new K("Fire Phoenix I", M.Monsters, 8, C | R, 66e4, 198e4, 44, 10, 1080, 10800, 864, 0, 0, 54)], ((e, t) => t.compare(e))),
        "Monsters 7": U([new K("Wind Lord", M.Monsters, 7, x | R, 31e4, 93e4, 32, 10, 900, 9e3, 720, 0, 0, 45), new K("Black Dragon", M.Monsters, 7, C | L, 3e5, 9e5, 32, 10, 880, 8800, 704, 0, 0, 44), new K("Destructive Colossus", M.Monsters, 7, S | H, 29e4, 87e4, 32, 10, 860, 8600, 688, 0, 0, 43), new K("Ancient Terror", M.Monsters, 7, b | A, 28e4, 84e4, 32, 10, 820, 8200, 656, 0, 0, 41)], ((e, t) => t.compare(e))),
        "Monsters 6": U([new K("Ruby Golem", M.Monsters, 6, x | R, 13e4, 39e4, 32, 10, 700, 7e3, 560, 0, 0, 35), new K("Jungle Destroyer", M.Monsters, 6, x | A, 13e4, 39e4, 36, 10, 680, 6800, 544, 0, 0, 34), new K("Crystal Dragon", M.Monsters, 6, x | L, 12e4, 36e4, 36, 10, 660, 6600, 528, 0, 0, 33), new K("Troll Rider", M.Monsters, 6, b | H, 11e4, 33e4, 36, 10, 600, 6e3, 480, 0, 0, 30)], ((e, t) => t.compare(e))),
        "Monsters 5": U([new K("Ettin", M.Monsters, 5, x | H, 48e3, 144e3, 40, 10, 460, 4600, 368, 0, 0, 23), new K("Fearsome Manticore", M.Monsters, 5, C | A, 46e3, 138e3, 40, 10, 440, 4400, 352, 0, 0, 22), new K("Flaming Centaur", M.Monsters, 5, x | R, 44e3, 132e3, 40, 10, 420, 4200, 336, 0, 0, 21), new K("Desert Vanquisher", M.Monsters, 5, b | L, 42e3, 126e3, 40, 10, 400, 4e3, 320, 0, 0, 20)], ((e, t) => t.compare(e))),
        "Monsters 4": U([new K("Ice Phoenix", M.Monsters, 4, C | R, 17e3, 51e3, 44, 10, 300, 3e3, 240, 0, 0, 15), new K("Many-Armed Guardian", M.Monsters, 4, x | H, 13e3, 39e3, 44, 10, 220, 2200, 176, 0, 0, 11), new K("Gorgon Medusa", M.Monsters, 4, S | A, 12e3, 36e3, 44, 10, 200, 2e3, 160, 0, 0, 10), new K("Magic Dragon", M.Monsters, 4, S | L, 15e3, 45e3, 44, 10, 260, 2600, 208, 0, 0, 13)], ((e, t) => t.compare(e))),
        "Monsters 3": U([new K("Water Elemental", M.Monsters, 3, S | R, 1900, 5700, 49, 10, 60, 600, 48, 0, 0, 3), new K("Battle Boar", M.Monsters, 3, b | A, 3900, 11700, 49, 10, 120, 1200, 96, 0, 0, 6), new K("Emerald Dragon", M.Monsters, 3, C | L, 4500, 13500, 49, 10, 140, 1400, 112, 0, 0, 7), new K("Stone Gargoyle", M.Monsters, 3, C | H, 5200, 15600, 49, 10, 160, 1600, 128, 0, 0, 8)], ((e, t) => t.compare(e)))
    },
    Z = {},
    X = {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "I",
        9: "II"
    };
Z[M.Guardsmen] = z, Z[M.Specialists] = Y, Z[M.Mercenaries] = _, Z[M.Monsters] = Q;

let ee = 0;
for (let e in Z)
    for (let t in Z[e]) ee += Z[e][t].length;

const te = {
    CurrentProfile: null
};

let ae = {
        selected: [],
        reference: null
    },
    re = null;

// MODIFIED: Send calculation to worker instead of doing locally
const ne = e => {
    $(".lad-amount").text("0 of"), $(".lad-display").removeClass("alerted-input"), re = null, $("#required-leadership").val(""), $(".troop-count").hide().removeClass("troop-count-warning");
    
    const t = parseInt($("#available-leadership").val());
    
    // Get selected troops
    const selectedTroops = getSelectedTroopData();
    
    if (selectedTroops.length === 0) {
        $("#find-count").prop("disabled", true);
        return;
    }
    
    // Prepare config for worker
    const config = {
        referenceCount: parseInt($("#reference-count").val()),
        revivalCostReduction: parseFloat($("#revival-cost-reduction").val()),
        enemyStackCount: parseInt($("#enemy-stack-count").val()),
        specialistAdjustment: parseInt($("#specialist-adjustment").val()),
        availableLeadership: parseInt($("#available-leadership").val()),
        availableAuthority: parseInt($("#available-authority").val()),
        availableDominance: parseInt($("#available-dominance").val()),
        healthBonusFlying: parseInt($("#health-bonus-Flying").val()) || 0,
        healthBonusMounted: parseInt($("#health-bonus-Mounted").val()) || 0,
        healthBonusMelee: parseInt($("#health-bonus-Melee").val()) || 0,
        healthBonusRanged: parseInt($("#health-bonus-Ranged").val()) || 0,
        healthBonusGuardsman: parseInt($("#health-bonus-Guardsman").val()) || 0,
        healthBonusSpecialist: parseInt($("#health-bonus-Specialist").val()) || 0,
        healthBonusMonster: parseInt($("#health-bonus-Monster").val()) || 0
    };
    
    // Send to worker
    fetch(WORKER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            selectedTroops: selectedTroops,
            config: config
        })
    })
    .then(response => response.json())
    .then(result => {
        re = result;
        updateUIFromWorker(result);
        $("#find-count").prop("disabled", t < 1);
        te.CurrentProfile && $("#save-profile-button").prop("disabled", !1);
    })
    .catch(error => {
        console.error('Worker error:', error);
    });
};

// Helper function to get selected troop data
function getSelectedTroopData() {
    let selected = [];
    for (const category in Z) {
        const families = Z[category];
        for (const family in families) {
            const troops = families[family];
            for (const troop of troops) {
                const checkbox = $(`#${troop.props.baseId}-checkbox`);
                if (checkbox.prop("checked")) {
                    selected.push({
                        name: troop.name,
                        category: troop.category,
                        tier: troop.tier,
                        flags: troop.flags,
                        strength: troop.strength,
                        health: troop.health,
                        leadership: troop.leadership || 0,
                        authority: troop.authority || 0,
                        dominance: troop.dominance || 0,
                        revivalCostGold: troop.revivalCostGold || 0
                    });
                }
            }
        }
    }
    return selected;
}

// Update UI with worker results
function updateUIFromWorker(result) {
    // Update leadership/authority/dominance displays
    $("#required-leadership").val(le(result.troops.requiredLeadership) + 
        (result.troops.requiredLeadership > 0 ? " / " + le($("#available-leadership").val()) : ""));
    $("#required-authority").val(le(result.mercenaries.requiredAuthority) + 
        (result.mercenaries.requiredAuthority > 0 ? " / " + le($("#available-authority").val()) : ""));
    $("#required-dominance").val(le(result.monsters.requiredDominance) + 
        (result.monsters.requiredDominance > 0 ? " / " + le($("#available-dominance").val()) : ""));
    
    $("#leadership-amount").text(`${le(result.troops.requiredLeadership)} of`);
    $("#authority-amount").text(`${le(result.mercenaries.requiredAuthority)} of`);
    $("#dominance-amount").text(`${le(result.monsters.requiredDominance)} of`);
    
    // Update troop counts in UI
    updateTroopCounts(result);
    
    // Generate report
    generateReportHTML(result);
    
    // Enable/disable generate button
    $("#generate-report").prop("disabled", result.troops.squads.length === 0);
}

// Update individual troop counts
function updateTroopCounts(result) {
    // Clear all counts first
    $(".troop-count").hide().text("");
    
    // Update from troops squads
    result.troops.squads.forEach(squad => {
        const countElement = $(`#${getBaseIdFromName(squad.name)}-count`);
        countElement.text(le(Math.trunc(squad.count))).show();
        countElement.attr("title", `Total health: ${le(Math.trunc(squad.totalHealth))}`);
    });
    
    result.mercenaries.squads.forEach(squad => {
        const countElement = $(`#${getBaseIdFromName(squad.name)}-count`);
        countElement.text(le(Math.trunc(squad.count))).show();
        countElement.attr("title", `Total health: ${le(Math.trunc(squad.totalHealth))}`);
    });
    
    result.monsters.squads.forEach(squad => {
        const countElement = $(`#${getBaseIdFromName(squad.name)}-count`);
        countElement.text(le(Math.trunc(squad.count))).show();
        countElement.attr("title", `Total health: ${le(Math.trunc(squad.totalHealth))}`);
    });
}

// Helper to get baseId from troop name (you might need to adjust this mapping)
function getBaseIdFromName(name) {
    // This is a simplified version - you might need to create a proper mapping
    return name.replace(/[^a-zA-Z0-9]/g, "");
}

// Generate report HTML from worker result
function generateReportHTML(result) {
    let t = "";
    
    if (result.troops.squads.length || result.mercenaries.squads.length || result.monsters.squads.length) {
        const { statistics: r } = result;
        
        t += '<div class="flex-container flex-row-container">';
        t += '  <div class="rating-display flex-container flex-column-container">';
        t += '    <div class="rating-title">Power score</div>';
        t += `    <div class="rating-value">${he(r.overallRating)}</div>`;
        t += "  </div>";
        t += '  <div class="rating-display flex-container flex-column-container">';
        t += '    <div class="rating-title">Strength</div>';
        t += `    <div class="rating-value">${he(r.armyStrength)}</div>`;
        t += "  </div>";
        t += '<div class="rating-display flex-container flex-column-container">';
        t += '  <div class="rating-title">Leadership</div>';
        t += `  <div class="rating-value">${he(result.troops.requiredLeadership)}</div>`;
        t += "</div>";
        
        if (result.mercenaries.requiredAuthority > 0) {
            t += '<div class="rating-display flex-container flex-column-container">';
            t += '  <div class="rating-title">Authority</div>';
            t += `  <div class="rating-value">${he(result.mercenaries.requiredAuthority)}</div>`;
            t += "</div>";
        }
        
        if (result.monsters.requiredDominance > 0) {
            t += '<div class="rating-display flex-container flex-column-container">';
            t += '  <div class="rating-title">Dominance</div>';
            t += `  <div class="rating-value">${he(result.monsters.requiredDominance)}</div>`;
            t += "</div>";
        }
        
        t += '<div class="rating-display flex-container flex-column-container">';
        t += '  <div class="rating-title">Revival cost (g)</div>';
        t += `  <div class="rating-value">${he(r.actualRevivalCost)}</div>`;
        t += "</div>";
        
        const { attackInfo: n } = r;
        if (n.rounds > 0) {
            const { rounds: e, minAttacks: a, maxAttacks: r, enemyAttacks: s, role: i } = n;
            t += '<div class="rating-display flex-container flex-column-container">';
            t += '  <div class="rating-title">Rounds</div>';
            t += `  <div class="rating-value">${le(e)}</div>`;
            t += "</div>";
            t += '<div class="rating-display flex-container flex-column-container">';
            t += '  <div class="rating-title">Your hits</div>';
            t += `  <div class="rating-value">${le(a)} - ${le(r)}</div>`;
            t += "</div>";
            t += '<div class="rating-display flex-container flex-column-container">';
            t += '  <div class="rating-title">Enemy hits</div>';
            t += `  <div class="rating-value">${le(s)}</div>`;
            t += "</div>";
            t += '<div class="rating-display flex-container flex-column-container">';
            t += '  <div class="rating-title">Total hits</div>';
            t += `  <div class="rating-value">${le(a+s)} - ${le(r+s)}</div>`;
            t += "</div>";
            t += '<div class="rating-display flex-container flex-column-container">';
            t += '  <div class="rating-title">Your role</div>';
            t += `  <div class="rating-value">~${(100*i).toFixed(1)}%</div>`;
            t += "</div>";
        }
        
        t += "</div>";
        t += '<h4 class="separator">Your Army</h4>';
        
        if (result.mercenaries.squads.length > 0) {
            t += "<h5>Mercenaries</h5>";
            t += '<div class="flex-container flex-column-container report-section">';
            let r = null;
            for (var a in result.mercenaries.squads) {
                const n = result.mercenaries.squads[a];
                r && r.tier != n.tier && (t += '<div style="margin-bottom: 21px;"></div>');
                let s = "";
                n.totalHealthBonus > 0 && (s = `<span class="bonus-tag">+${le(n.totalHealthBonus)}</span>`);
                t += '<div class="report-squad">';
                t += '  <div class="report-squad-basic flex-container flex-row-container">';
                t += `    <div class="report-squad-name">${n.name} ${me(n.category, n.tier)}</div>`;
                t += `    <div class="report-squad-count">${le(n.count)}</div>`;
                t += "  </div>";
                t += '  <div class="report-squad-details flex-container flex-row-container">';
                t += `    <div>Health: ${le(n.totalHealth)} ${s}</div>`;
                t += `    <div>Strength: ${le(n.totalStrength)}</div>`;
                t += `    <div>Authority: ${le(n.totalAuthority)}</div>`;
                t += "  </div>";
                t += "</div>";
                r = n;
            }
            t += "</div>";
        }
        
        if (result.monsters.squads.length > 0) {
            t += "<h5>Monsters</h5>";
            t += '<div class="flex-container flex-column-container report-section">';
            let r = null;
            for (var a in result.monsters.squads) {
                const n = result.monsters.squads[a];
                r && r.tier != n.tier && (t += '<div style="margin-bottom: 21px;"></div>');
                let s = "";
                n.totalHealthBonus > 0 && (s = `<span class="bonus-tag">+${le(n.totalHealthBonus)}</span>`);
                t += '<div class="report-squad">';
                t += '  <div class="report-squad-basic flex-container flex-row-container">';
                t += `    <div class="report-squad-name">${n.name} ${me(n.category, n.tier)}</span></div>`;
                t += `    <div class="report-squad-count">${le(n.count)}</div>`;
                t += "  </div>";
                t += '  <div class="report-squad-details flex-container flex-row-container">';
                t += `    <div>Health: ${le(n.totalHealth)} ${s}</div>`;
                t += `    <div>Strength: ${le(n.totalStrength)}</div>`;
                t += `    <div>Dominance: ${le(n.totalDominance)}</div>`;
                t += "  </div>";
                t += "</div>";
                r = n;
            }
            t += "</div>";
        }
        
        if (result.troops.squads.length > 0) {
            t += "<h5>Normal Troops</h5>";
            t += '<div class="flex-container flex-column-container report-section">';
            let r = null;
            for (var a in result.troops.squads) {
                const n = result.troops.squads[a];
                r && (r.tier != n.tier && r.troopType != n.troopType || r.category == "Specialists" && n.category == "Guardsmen" && r.tier != n.tier) && (t += '<div style="margin-bottom: 21px;"></div>');
                let s = "";
                n.totalHealthBonus > 0 && (s = `<span class="bonus-tag">+${le(n.totalHealthBonus)}</span>`);
                t += '<div class="report-squad">';
                t += '  <div class="report-squad-basic flex-container flex-row-container">';
                t += `    <div class="report-squad-name">${n.name} ${me(n.category, n.tier)}</div>`;
                t += `    <div class="report-squad-count">${le(n.count)}</div>`;
                t += "  </div>";
                t += '  <div class="report-squad-details flex-container flex-row-container">';
                t += `    <div>Health: ${le(n.totalHealth)} ${s}</div>`;
                t += `    <div>Strength: ${le(n.totalStrength)}</div>`;
                t += `    <div>Leadership: ${le(n.totalLeadership)}</div>`;
                t += "  </div>";
                t += "</div>";
                r = n;
            }
            t += "</div>";
        }
        
        $("#generate-report").prop("disabled", !1);
    } else {
        $("#generate-report").prop("disabled", !0);
    }
    
    $("#report-body").html(t);
}

// Format numbers with commas
const le = e => Intl.NumberFormat().format(e);

// Format with suffixes (k, M, B, T)
const he = e => {
    const t = Math.abs(e);
    if (t >= 1e12) return `${le(new Number(e/1e12).toFixed(1))}T`;
    if (t >= 1e9) return `${le(new Number(e/1e9).toFixed(1))}B`;
    if (t >= 1e6) return `${le(new Number(e/1e6).toFixed(1))}M`;
    if (t >= 1e3) return `${le(new Number(e/1e3).toFixed(1))}k`;
    return le(new Number(e).toFixed(1));
};

// Tag helper
const me = (e, t) => {
    const X = {1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "I", 9: "II"};
    let prefix = "";
    switch(e) {
        case "Guardsmen": prefix = "G"; break;
        case "Specialists": prefix = "S"; break;
        case "Monsters": prefix = "M"; break;
        default: prefix = "";
    }
    return `<span class="tag visual-tier-${t}">${prefix}${X[t]}</span>`;
};

const fe = () => {
    const e = we();
    $("#reference-troop").val(e.reference?.name), ae = e;
};

const we = () => {
    let e = [], t = null;
    for (const a in Z) {
        const r = Z[a];
        for (const n in r) {
            const s = r[n];
            for (const r in s) {
                const n = s[r], i = n.props.baseId;
                $(`#${i}-checkbox`).prop("checked") && (a != "Guardsmen" && a != "Specialists" || (null == t || n.health > t.health) && (t = n), e.push(n));
            }
        }
    }
    return { selected: e, reference: t };
};

const ye = (e, t) => {
    let a = Z[t], r = "", n = 0;
    r += `<div id="${t}" class="category-container">`;
    r += `<div class="category-name">${t}</div>`;
    r += '<div class="troop-families-container">';
    if (a) {
        for (var s in a) {
            r += `<div id="${t}-${s}" class="troop-family-container">`;
            r += `<div class="troop-family-name">${s}</div>`;
            const e = a[s].sort(((e, t) => t.compare(e)));
            for (let a = 0; a < e.length; a++) {
                const i = e[a], { key: o, tier: l } = i, c = `${t}-${s}-key${o}`.replace(" ", ""), d = `${c}-checkbox`, u = `${c}-count`, p = `tier-${l} category-${t}`;
                i.props.baseId = c;
                r += `<div class="troop-item ${p}" onclick="onTroopClicked('#${d}', ${l}, '${t}', event)">`;
                r += `  <input type="checkbox" name="${d}" id="${d}" class="troop-checkbox" checkbox onchange="updateTroops(this)">`;
                r += `  <label for="${d}" class="troop-type-label">${i.name}</label>`;
                r += `  <div class="troop-count" id="${u}" style="display: none;"></div>`;
                r += "</div>";
                ++n;
            }
            r += "</div>";
        }
    } else {
        r += "<div><em>(Not yet implemented)</em></div>";
    }
    r += "</div></div>";
    e.innerHTML = r;
    return n;
};

const $e = e => {
    if (e) {
        const t = JSON.parse(e);
        if (t && "number" == typeof t.referenceCount && "object" == typeof t.selected) {
            Se();
            $("#reference-count").val(t.referenceCount ?? 50);
            $("#revival-cost-reduction").val(t.revivalCostReduction ?? 1);
            $("#enemy-stack-count").val(t.enemyStackCount ?? 4);
            $("#specialist-adjustment").val(t.specialistAdjustment ?? 10);
            $("#available-leadership").val(t.availableLeadership ?? 0);
            $("#available-authority").val(t.availableAuthority ?? 0);
            $("#available-dominance").val(t.availableDominance ?? 0);
            if (t.selected?.length > 0) {
                let e = "";
                for (let a = 0; a < t.selected.length; a++) {
                    e = e.replaceAll("ercinar", "ercenar");
                    e += `${t.selected[a]},`;
                }
                $(e.substring(0, e.length - 1)).prop("checked", !0);
            }
            ne();
        }
    }
};

const Ie = () => {
    $e(localStorage.uiSettings);
};

const Me = e => {
    const t = {
        referenceCount: e ?? parseInt($("#reference-count").val()),
        revivalCostReduction: parseFloat($("#revival-cost-reduction").val()),
        enemyStackCount: parseInt($("#enemy-stack-count").val()),
        specialistAdjustment: parseInt($("#specialist-adjustment").val()),
        availableLeadership: parseInt($("#available-leadership").val()),
        availableAuthority: parseInt($("#available-authority").val()),
        availableDominance: parseInt($("#available-dominance").val()),
        selected: []
    };
    const a = $("input:checked.troop-checkbox");
    for (let e = 0; e < a.length; e++) t.selected.push(`#${$(a[e]).prop("id")}`);
    l(JSON.stringify(t));
};

const Se = () => {
    $(".troop-checkbox").prop("checked", !1);
    $("#generate-report").prop("disabled", !0);
    ne();
    Me();
};

const xe = e => {
    Me();
    ((e, t) => {
        e = e?.toLowerCase();
        let a = JSON.parse(c());
        a.indexOf(e) < 0 && (a.push(e), d(JSON.stringify(a)));
        window.localStorage[e] = t;
    })(e, o());
    ke(e);
};

const be = () => {
    I.show(a, r, n, "", Ce);
};

const Ce = e => {
    e = e?.toString();
    if ("" == (e ?? "").trim()) return "No value was provided.";
    if (e.match(/[^a-zA-Z0-9 _\-]/)) return "Only letters, numbers, spaces, hyphens, and underscore characters are allowed.";
    if (u(e)) return `A profile named '${e}' already exists.`;
    xe(e);
};

const ke = e => {
    e = e?.toLowerCase();
    $("#profile-selector").empty();
    $("#profile-selector").append(`<option ${e?"":"selected"} id="profile-default">Select a profile...</option>`);
    let t = JSON.parse(c());
    for (let a = 0; a < t.length; a++) {
        const r = t[a];
        $("#profile-selector").append(`<option value="${r}" ${e==r?"selected":""}>${r}</option>`);
    }
    te.CurrentProfile = e;
};

$(document).ready((() => {
    $("#app-version-number").text(t);
    for (const e in M) {
        const t = document.getElementById(`${e}-category`);
        t && ye(t, e);
    }
    Ie(), ke();
}));

(e => {
    for (var t in e) window[t] = e[t];
})({
    addNewProfile: be,
    clearTroopSelection: Se,
    factoryReset: () => {
        l(null);
        (() => {
            const e = JSON.parse(c());
            for (let t = 0; t < e.length; t++) p(e[t]);
            d(null);
        })();
        window.location.reload();
    },
    importSelectedFile: e => {
        const t = e?.target;
        if (!t?.files?.length) return void console.log("No file selected");
        const a = new FileReader;
        a.onload = () => {
            const e = a.result;
            $e(e);
        };
        a.readAsText(t.files[0]);
    },
    loadSettings: Ie,
    onChangeWithIntValidation: (e, t, a, r) => {
        const n = parseInt($(e).val());
        Number.isNaN(n) ? $(e).addClass("alerted-input") : ($(e).val(Math.min(Math.max(n, t), a)).removeClass("alerted-input"), r());
    },
    onChangeWithFloatValidation: (e, t, a, r, n) => {
        const s = parseFloat($(e).val());
        Number.isNaN(s) ? $(e).addClass("alerted-input") : ($(e).val(Math.min(Math.max(s, t), a).toFixed(r)).removeClass("alerted-input"), n());
    },
    onProfileSelected: () => {
        const e = $("#profile-selector").prop("selectedIndex");
        if (te.CurrentProfile = null, $("#save-profile-button, #delete-profile-button").prop("disabled", !0), e <= 0) return void te.prof;
        const t = $("#profile-selector").val(), a = u(t);
        a && ($("#delete-profile-button").prop("disabled", !1), $e(a), te.CurrentProfile = t.toLowerCase());
    },
    onTroopClicked: (e, t, a, r) => {
        if (r.getModifierState("Shift") || r.getModifierState("Alt") || r.getModifierState("Control")) {
            const r = `.tier-${t}.category-${a} input`, n = $(e).prop("checked");
            $(`${r}`).prop("checked", n);
        }
    },
    readSettingsValue: o,
    removeCurrentProfile: () => {
        te.CurrentProfile && (p(te.CurrentProfile), ke());
    },
    reverseCalculateArmy: e => {
        const t = parseInt($("#available-leadership").val());
        if (t <= 0) return;
        parseInt($("#available-authority").val());
        parseInt($("#available-dominance").val());
        
        // Send to worker with initial count of 100
        const selectedTroops = getSelectedTroopData();
        if (selectedTroops.length === 0) return;
        
        const config = {
            referenceCount: 100,
            revivalCostReduction: parseFloat($("#revival-cost-reduction").val()),
            enemyStackCount: parseInt($("#enemy-stack-count").val()),
            specialistAdjustment: parseInt($("#specialist-adjustment").val()),
            availableLeadership: parseInt($("#available-leadership").val()),
            availableAuthority: parseInt($("#available-authority").val()),
            availableDominance: parseInt($("#available-dominance").val()),
            healthBonusFlying: parseInt($("#health-bonus-Flying").val()) || 0,
            healthBonusMounted: parseInt($("#health-bonus-Mounted").val()) || 0,
            healthBonusMelee: parseInt($("#health-bonus-Melee").val()) || 0,
            healthBonusRanged: parseInt($("#health-bonus-Ranged").val()) || 0,
            healthBonusGuardsman: parseInt($("#health-bonus-Guardsman").val()) || 0,
            healthBonusSpecialist: parseInt($("#health-bonus-Specialist").val()) || 0,
            healthBonusMonster: parseInt($("#health-bonus-Monster").val()) || 0
        };
        
        fetch(WORKER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ selectedTroops, config })
        })
        .then(response => response.json())
        .then(result => {
            const ratio = t / result.troops.requiredLeadership;
            const newCount = Math.floor(100 * ratio);
            
            // Calculate with new count
            config.referenceCount = newCount;
            return fetch(WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ selectedTroops, config })
            });
        })
        .then(response => response.json())
        .then(result => {
            $("#reference-count").val(result.troops.squads[0]?.count || 0);
            if (e) $("#generate-report").click();
            updateUIFromWorker(result);
        })
        .catch(error => console.error('Worker error:', error));
    },
    saveConfigurationToFile: async () => {
        const e = localStorage.uiSettings;
        if (!e) return;
        const t = JSON.parse(e);
        if (t && "number" == typeof t.referenceCount && "object" == typeof t.selected) {
            const e = new File([JSON.stringify(t)], "tbstacking-settings.json", { type: "application/json" });
            const a = URL.createObjectURL(e);
            const r = document.createElement("a");
            r.href = a;
            r.download = e.name;
            r.click();
            URL.revokeObjectURL(a);
        }
    },
    saveCurrentProfile: () => {
        const e = te.CurrentProfile;
        e ? xe(e) : be();
        $("#save-profile-button").prop("disabled", !0);
    },
    saveSettings: Me,
    selectFileForImport: () => {
        $("#import-file").click();
    },
    updateTroops: ne,
    ImageBox: y,
    SharedImages: w,
    TextModal: I
});
