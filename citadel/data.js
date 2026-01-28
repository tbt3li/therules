
        // Data from the Excel file
        const citadelData = {
			30: [
				{ type: "Fortifications", quantity: 135000, strength: 10000, health: 30000, 
				  extraDamage: { Melee: 1, Mounted: 1, Ranged: 1} },
				{ type: "Mounted", quantity: 49000, strength: 2600, health: 7800,
				  extraDamage: { Ranged: 0.5} },
				{ type: "Melee", quantity: 12000, strength: 22000, health: 66000,
				  extraDamage: { Mounted: 0.7, Elementals: 0.5} },
				{ type: "Melee, Elemental", quantity: 4300, strength: 73000, health: 219000,
				  extraDamage: { Ranged: 0.55, Dragons: 0.45} },
				{ type: "Flying, Dragon", quantity: 2300, strength: 240000, health: 720000,
				  extraDamage: { Mounted: 0.6, Giants: 0.5 } },
				{ type: "Flying", quantity: 21000, strength: 8200, health: 24600,
				  extraDamage: { Melee: 0.6, Dragons: 0.5} }
			],
			25: [
				{ type: "Fortifications", quantity: 31900, strength: 10000, health: 30000,
				  extraDamage: { Melee: 1, Mounted: 1, Ranged: 1} },
				{ type: "Mounted", quantity: 10000, strength: 2600, health: 7800,
				  extraDamage: { Ranged: 0.5} },
				{ type: "Melee", quantity: 2400, strength: 22000, health: 66000,
				  extraDamage: { Mounted: 0.7, Elementals: 0.5} },
				{ type: "Melee, Elemental", quantity: 880, strength: 73000, health: 219000,
				  extraDamage: { Ranged: 0.55, Dragons: 0.45} },
				{ type: "Flying, Dragon", quantity: 480, strength: 240000, health: 720000,
				  extraDamage: { Mounted: 0.6, Giants: 0.5 } },
				{ type: "Flying", quantity: 4300, strength: 8200, health: 24600,
				  extraDamage: { Melee: 0.6, Dragons: 0.5} }
			],
			20: [
				{ type: "Fortifications", quantity: 3650, strength: 10000, health: 30000,
				  extraDamage: { Melee: 1, Mounted: 1, Ranged: 1} },
				{ type: "Ranged", quantity: 3600, strength: 900, health: 2700,
				  extraDamage: { Melee: 0.25} },
				{ type: "Mounted", quantity: 2500, strength: 2600, health: 7800,
				  extraDamage: { Ranged: 0.5} },
				{ type: "Melee", quantity: 230, strength: 22000, health: 66000,
				  extraDamage: { Mounted: 0.7, Elementals: 0.5} },
				{ type: "Melee, Elemental", quantity: 110, strength: 73000, health: 219000,
				  extraDamage: { Ranged: 0.55, Dragons: 0.45} },
				{ type: "Flying, Dragon", quantity: 41, strength: 240000, health: 720000,
				  extraDamage: { Mounted: 0.6, Giants: 0.5 } }
			],
			15: [
				{ type: "Fortifications", quantity: 700, strength: 10000, health: 30000,
				  extraDamage: { Melee: 1, Mounted: 1, Ranged: 1} },
				{ type: "Ranged", quantity: 5000, strength: 100, health: 300,
				  extraDamage: { Melee: 0.35} },
				{ type: "Ranged", quantity: 1100, strength: 900, health: 2700,
				  extraDamage: { Melee: 0.25} },
				{ type: "Mounted", quantity: 290, strength: 2600, health: 7800,
				  extraDamage: { Ranged: 0.5} },
				{ type: "Melee, Elemental", quantity: 21, strength: 73000, health: 219000,
				  extraDamage: { Ranged: 0.55, Dragons: 0.45} },
				{ type: "Mounted", quantity: 47, strength: 27000, health: 81000,
				  extraDamage: { Ranged: 0.65} }
			],
			10: [
				{ type: "Fortifications", quantity: 90, strength: 10000, health: 30000,
				  extraDamage: { Melee: 1, Mounted: 1, Ranged: 1} },
				{ type: "Melee", quantity: 2200, strength: 28, health: 84,
				  extraDamage: { Mounted: 0.1} },
				{ type: "Ranged", quantity: 1200, strength: 100, health: 300,
				  extraDamage: { Melee: 0.35} },
				{ type: "Ranged", quantity: 100, strength: 900, health: 2700,
				  extraDamage: { Melee: 0.25} },
				{ type: "Melee", quantity: 9, strength: 22000, health: 66000,
				  extraDamage: { Mounted: 0.7, Elementals: 0.5} },
				{ type: "Flying", quantity: 19, strength: 8200, health: 24600,
				  extraDamage: { Melee: 0.6, Dragons: 0.5} }
			]
		};

        // Army Type Data (Sheet 3)
        const armyTypeData = {
            guard: {
                9: { Flying: { strength: 110200, health: 330600 }, Mounted: { strength: 11020, health: 33060 }, 
                     Ranged: { strength: 5510, health: 16530 }, Melee: { strength: 5510, health: 16530 } },
                8: { Flying: { strength: 61200, health: 183600 }, Mounted: { strength: 6120, health: 18360 }, 
                     Ranged: { strength: 3060, health: 9180 }, Melee: { strength: 3060, health: 9180 } },
                7: { Flying: { strength: 34000, health: 102000 }, Mounted: { strength: 3400, health: 10200 }, 
                     Ranged: { strength: 1700, health: 5100 }, Melee: { strength: 1700, health: 5100 } },
                6: { Flying: { strength: 19000, health: 57000 }, Mounted: { strength: 1900, health: 5700 }, 
                     Ranged: { strength: 940, health: 2820 }, Melee: { strength: 940, health: 2820 } },
                5: { Flying: { strength: 10000, health: 30000 }, Mounted: { strength: 1050, health: 3150 }, 
                     Ranged: { strength: 520, health: 1560 }, Melee: { strength: 520, health: 1560 } },
                4: { Mounted: { strength: 580, health: 1740 }, Ranged: { strength: 290, health: 870 }, 
                     Melee: { strength: 290, health: 870 } },
                3: { Mounted: { strength: 320, health: 960 }, Ranged: { strength: 160, health: 480 }, 
                     Melee: { strength: 160, health: 480 } },
                2: { Mounted: { strength: 180, health: 540 }, Ranged: { strength: 90, health: 270 }, 
                     Melee: { strength: 90, health: 270 } },
                1: { Mounted: { strength: 100, health: 300 }, Ranged: { strength: 50, health: 150 }, 
                     Melee: { strength: 50, health: 150 } }
            },
            special: {
                9: { Flying: { strength: 110200, health: 330600 }, Mounted: { strength: 11020, health: 33060 }, 
                     Ranged: { strength: 5510, health: 16530 }, Melee: { strength: 5510, health: 16530 } },
                8: { Flying: { strength: 61200, health: 183600 }, Mounted: { strength: 6120, health: 18360 }, 
                     Ranged: { strength: 3060, health: 9180 }, Melee: { strength: 3060, health: 9180 } },
                7: { Flying: { strength: 1700, health: 5100 }, Mounted: { strength: 3400, health: 10200 }, 
                     Ranged: { strength: 1700, health: 5100 }, Melee: { strength: 1700, health: 5100 } },
                6: { Flying: { strength: 940, health: 2820 }, Mounted: { strength: 1900, health: 5700 }, 
                     Ranged: { strength: 940, health: 2820 }, Melee: { strength: 940, health: 2820 } },
                5: { Flying: { strength: 520, health: 1560 }, Mounted: { strength: 1050, health: 3150 }, 
                     Ranged: { strength: 520, health: 1560 }, Melee: { strength: 520, health: 1560 } },
                4: { Mounted: { strength: 580, health: 1740 }, Ranged: { strength: 290, health: 870 }, 
                     Melee: { strength: 290, health: 870 } },
                3: { Mounted: { strength: 320, health: 960 }, Ranged: { strength: 160, health: 480 }, 
                     Melee: { strength: 160, health: 480 } },
                2: { Mounted: { strength: 180, health: 540 }, Ranged: { strength: 90, health: 270 }, 
                     Melee: { strength: 90, health: 270 } },
                1: { Mounted: { strength: 100, health: 300 }, Ranged: { strength: 50, health: 150 }, 
                     Melee: { strength: 50, health: 150 } }
            },
            engineer: {
                9: { Siege: { strength: 27550, health: 165300 } },
                8: { Siege: { strength: 15310, health: 91800 } },
                7: { Siege: { strength: 8500, health: 51000 } },
                6: { Siege: { strength: 4730, health: 28400 } },
                5: { Siege: { strength: 2630, health: 15800 } },
                4: { Siege: { strength: 1460, health: 8750 } },
                3: { Siege: { strength: 810, health: 4860 } },
                2: { Siege: { strength: 450, health: 2700 } },
                1: { Siege: { strength: 250, health: 1500 } }
            }
        };

        // Dragons Army Data (Sheet 2)
        const dragonData = {
            9: [
                { name: "Trickster II", category: "Beast", strength: 1150000, health: 3450000 },
                { name: "Kraken II", category: "Giant", strength: 1210000, health: 3630000 },
                { name: "Fire Phoenix II", category: "Elemental", strength: 1190000, health: 3570000 },
                { name: "Devastator II", category: "Dragon", strength: 1170000, health: 3510000 }
            ],
            8: [
                { name: "Trickster I", category: "Beast", strength: 640000, health: 1920000 },
                { name: "Kraken I", category: "Giant", strength: 670000, health: 2010000 },
                { name: "Fire Phoenix I", category: "Elemental", strength: 660000, health: 1980000 },
                { name: "Devastator I", category: "Dragon", strength: 650000, health: 1950000 }
            ],
            7: [
                { name: "Wind Lord", category: "Elemental", strength: 310000, health: 930000 },
                { name: "Destructive", category: "Giant", strength: 290000, health: 870000 },
                { name: "Black Dragon", category: "Dragon", strength: 300000, health: 900000 },
                { name: "Ancient Terror", category: "Beast", strength: 280000, health: 840000 }
            ],
            6: [
                { name: "Troll Rider", category: "Giant", strength: 110000, health: 330000 },
                { name: "Ruby Golem", category: "Elemental", strength: 130000, health: 390000 },
                { name: "Jungle Destoyer", category: "Beast", strength: 130000, health: 390000 },
                { name: "Crystal Dragon", category: "Dragon", strength: 120000, health: 360000 }
            ],
            5: [
                { name: "Flaming", category: "Elemental", strength: 44000, health: 132000 },
                { name: "Fearsome", category: "Beast", strength: 46000, health: 138000 },
                { name: "Ettin", category: "Giant", strength: 48000, health: 144000 },
                { name: "Desert Vanq", category: "Dragon", strength: 42000, health: 126000 }
            ],
            4: [
                { name: "Many-Armed", category: "Giant", strength: 13000, health: 39000 },
                { name: "Magic Dragon", category: "Dragon", strength: 15000, health: 45000 },
                { name: "Ice Phoenix", category: "Elemental", strength: 17000, health: 51000 },
                { name: "Gorgon Medusa", category: "Beast", strength: 12000, health: 36000 }
            ],
            3: [
                { name: "Water Elemental", category: "Elemental", strength: 1900, health: 5700 },
                { name: "Stone Gargoyle", category: "Giant", strength: 5200, health: 15600 },
                { name: "Emerald Dragon", category: "Dragon", strength: 4500, health: 13500 },
                { name: "Battle Roar", category: "Beast", strength: 3900, health: 11700 }
            ]
        };
	