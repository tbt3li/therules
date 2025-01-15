const maxStacks = '3'; //This will be configurable later, but if you know how to modify this in the console/dev tools, feel free :)

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

const configForm = document.querySelector('#configForm');

// Add an event listener for the "submit" event
configForm.addEventListener('submit', (event) => {
  event.preventDefault(); 

});
// Alpine Init
document.addEventListener('alpine:init', () => {
  window.pageSetup = function () {
    return {
      leadershipUsed: 0,
      totalArmyHP: 0,
      enemy: getParamOrDefault('enemy','pve',false),
      sortMode: getParamOrDefault('sortMode','normal',false),
      leadership: getParamOrDefault('L','100000',false),
      minG: getParamOrDefault('minG','6',false),
      maxG: getParamOrDefault('maxG','8',false),
      minS: getParamOrDefault('minS','6',false),
      maxS: getParamOrDefault('maxS','7',false),
      minM: getParamOrDefault('minM','6',false),
      maxM: getParamOrDefault('maxM','7',false),
      maxSf: getParamOrDefault('maxSf','1',true),  
      maxSmo: getParamOrDefault('maxSmo','1',true),
      maxSme: getParamOrDefault('maxSme','1',true),
      maxSr: getParamOrDefault('maxSr','1',true),  
      maxGf: getParamOrDefault('maxGf','1',true),  
      maxGmo: getParamOrDefault('maxGmo','1',true),
      maxGme: getParamOrDefault('maxGme','1',true),
      maxGr: getParamOrDefault('maxGr','1',true),  
      allF: getParamOrDefault('allF','1',true),    
      allMe:  getParamOrDefault('allMe','1',true), 
      allMo:  getParamOrDefault('allMo','1',true), 
      allR:  getParamOrDefault('allR','1',true), 
      allE:  getParamOrDefault('allE','0',true), 
      allS:  getParamOrDefault('allS','0',true),  
      // Other functions and settings
      handleInput: function(param, value, isCheckbox = false) {
        this.updateUrlParameter(param, value, isCheckbox);  // Update URL parameter
        this.fetchDataAndUpdate();  // Fetch and update the data
      },
      updateUrlParameter,
      validateAndUpdate(value, targetProp, isMin) {
        const intValue = parseInt(value);
        if (isMin && intValue > parseInt(this[targetProp])) {
          this[targetProp] = intValue;
        } else if (!isMin && intValue < parseInt(this[targetProp])) {
          this[targetProp] = intValue;
        }
        this.handleInput(targetProp, this[targetProp]); // Trigger data fetch
      },
      handleInput(param, value) {
        this.updateUrlParameter(param, value);
        this.fetchDataAndUpdate();
      },
      processData: function(data) {
        //Log the initialized states to verify correctness
        /*
        console.log("Initial allF (Send Flying):", this.allF);
        console.log("Initial allMe (Send Melee):", this.allMe);
        console.log("Initial allMo (Send Mounted):", this.allMo);
        console.log("Initial allR (Send Ranged):", this.allR);
        console.log("Initial allE (Send Engineers):", this.allE);
        console.log("Initial allS (Send Scouts):", this.allS);
        console.log("Max G Flyer:",this.maxGf);
        console.log("Max G Mounted:",this.maxGmo);
        console.log("Max G Melee:",this.maxGme);
        console.log("Max G Ranged:",this.maxGr);
        console.log("Max S Flyer:",this.maxSf);
        console.log("Max S Mounted:",this.maxSmo);
        console.log("Max S Melee:",this.maxSme);
        console.log("Max S Ranged:",this.maxSr);
        */
        // Calculate dynamic bounds for filtering
        let maxG = parseInt(this.maxG);
        let maxMerc;

        if (maxG === 5) {
          maxMerc = 7;
        } else {
          maxMerc = Math.min(9, maxG + 3);
        }
        //console.log("Calculated maxMerc:", maxMerc);
        //console.log("|allF:"+this.allF+"|allMo:"+this.allMo+"|allMe:"+this.allMe+"|allR:"+this.allR);
        //console.log("Unfiltered: " + data.length)
        //console.log(data)
        // Global Filters
        let filteredTroops = data.filter(item => {
          if (item.type === "flyer" && this.allF == 0) return false;
          if (item.type === "mounted" && this.allMo == 0) return false;
          if (item.type === "melee" && this.allMe == 0) return false;
          if (item.type === "ranged" && this.allR == 0) return false;
          if (item.type === "scout" && this.allS == 0) return false;
          if (item.type === "engineer" && this.allE == 0) return false;
          return true;
        });
        //console.log("Globally Filtered:" + filteredTroops.length);
        //console.log(filteredTroops);
        // Max Level filters 6, 7, 8
        filteredTroops = filteredTroops.filter(item => {
          if (item.category === "Guardsmen" && item.tier >= this.minG && item.tier <= this.maxG) return true;
          if (item.category === "Specialist" && item.tier >= this.minS && item.tier <= this.maxS) return true;
          if (item.category === "Monster" && item.tier >= this.minM && item.tier <= this.maxM) return true;
          if (item.category === "Merc" && item.tier == maxMerc) return true;
          return false;
        });
        //console.log("Filtered by Max Level: " + filteredTroops.length) 
        //console.log(filteredTroops)
        //Max UnitType filters
        filteredTroops = filteredTroops.filter(item => {
          if (item.category === "Guardsmen" && (item.type === "flyer" && this.maxGf == 0 && item.tier <= this.maxG)) return false;
          if (item.category === "Guardsmen" && (item.type === "mounted" && this.maxGmo == 0 && item.tier == this.maxG)) return false;
          if (item.category === "Guardsmen" && (item.type === "melee" && this.maxGme == 0 && item.tier == this.maxG)) return false;
          if (item.category === "Guardsmen" && (item.type === "ranged" && this.maxGr == 0 && item.tier == this.maxG)) return false;
          if (item.category === "Specialist" && (item.type === "flyer" && this.maxSf == 0 && item.tier == this.maxS)) return false;
          if (item.category === "Specialist" && (item.type === "mounted" && this.maxSmo == 0 && item.tier == this.maxS)) return false;
          if (item.category === "Specialist" && (item.type === "melee" && this.maxSme == 0 && item.tier == this.maxS)) return false;
          if (item.category === "Specialist" && (item.type === "ranged" && this.maxSr == 0 && item.tier == this.maxS)) return false;
          return true;
        })
        //console.log("Filtered by Max UnitType:" + filteredTroops.length)
        //console.log("filtered troops sent to calculate",filteredTroops)
        let fixedTroops = calculateOptimalTroops(filteredTroops,this.leadership,this.sortMode,this.enemy); // Apply additional processing
        //console.log(fixedTroops);
      },
      troops: [],  // initialize the troops array in the state
      fetchDataAndUpdate: function() {
        fetch('./assets/data/troops.json')
          .then(response => response.json())
          .then(data => {
            this.processData(data);
          })
          .catch(error => {
            console.error('Error loading the data:', error);
            this.troops = [];
          });
      },
      init() {
        this.fetchDataAndUpdate();
        this.$watch('minG', newValue => this.validateAndUpdate(newValue, 'maxG', true));
        this.$watch('maxG', newValue => this.validateAndUpdate(newValue, 'minG', false));
        // Watches for Specialists
        this.$watch('minS', newValue => this.validateAndUpdate(newValue, 'maxS', true));
        this.$watch('maxS', newValue => this.validateAndUpdate(newValue, 'minS', false));
        // Watches for Monsters
        this.$watch('minM', newValue => this.validateAndUpdate(newValue, 'maxM', true));
        this.$watch('maxM', newValue => this.validateAndUpdate(newValue, 'minM', false));
      },
    };
  };
});

// Function to update URL parameters
function updateUrlParameter(param, value) {
  const url = new URL(window.location);
  const isCheckbox = typeof value === 'boolean';
  url.searchParams.set(param, isCheckbox ? (value ? '1' : '0') : value);
  window.history.pushState({ path: url.href }, '', url.href);
}

function getParamOrDefault(paramName, defaultValue, isCheckbox = false) {
  const paramValue = new URLSearchParams(window.location.search).get(paramName);
  if (isCheckbox) {
    // Explicitly return defaultValue if paramValue is null
    if (paramValue === null) {
      return defaultValue === '1'; // Return true if defaultValue is '1'
    }
    return paramValue === '1'; // Return true if paramValue is '1', false otherwise
  }
  return paramValue || defaultValue; // Use defaultValue if paramValue is null
}

function calculateOptimalTroops(troopData, maxLeadership, sortMode, enemy) {
  // Find the apex unit among Guardsmen based on the highest HP
  let apexTroop = findApexUnit(troopData);

  // Group troops by category and tier for subApex calculations
  const groupedByCategoryAndTier = groupTroopsByCategoryAndTier(troopData);

  // Initialize and calculate subApex ratios
  initializeAndCalculateRatios(groupedByCategoryAndTier, apexTroop, enemy);

  let totalLeadershipUsed = 0;
  let totalArmyHP = 0;

  function calculateTotals() {
    totalLeadershipUsed = 0;
    totalArmyHP = 0;
    troopData.forEach(troop => {
      if (['Guardsmen', 'Specialist'].includes(troop.category)) {
        totalLeadershipUsed += troop.totalUnitSize;
        totalArmyHP += troop.totalUnitHP;
      }
    });
  }

  // Start with initial count of the apex troop and adjust counts of all troops
  // Start with initial count of the apex troop and adjust counts of all troops
  let apexTroopCount = 1;
  do {
    incrementTroops(groupedByCategoryAndTier, apexTroop, apexTroopCount);
    calculateTotals();

    if (totalLeadershipUsed > maxLeadership) {
      // Decrement to last valid setup
      apexTroopCount--;

      incrementTroops(groupedByCategoryAndTier, apexTroop, apexTroopCount);
      calculateTotals(); // Recalculate totals to ensure they are within limits

      // Pad the lowest-tier and lowest-leadership troops
      padLowestTierTroops(troopData, maxLeadership, totalLeadershipUsed, enemy);
      calculateTotals(); // Recalculate totals after padding

      break; // Ensure no further processing if max leadership is exceeded
    }

    apexTroopCount++; // Increment and test if another unit can fit
  } while (totalLeadershipUsed <= maxLeadership);

  // Process Mercs and Monsters based on the apex unit's totalUnitHP
  processMercsAndMonsters(troopData, apexTroop);

  let pctLeadership = (totalLeadershipUsed / maxLeadership * 100).toFixed(2) + "%";

  updateTables(troopData, sortMode);
  updateStatistics(parseInt(totalLeadershipUsed).toLocaleString() + " (" + pctLeadership + ")", parseInt(totalArmyHP).toLocaleString(), parseInt(apexTroop.totalUnitHP).toLocaleString());
}

function padLowestTierTroops(troopData, maxLeadership, totalLeadershipUsed, enemy) {
  let remainingLeadership = maxLeadership - totalLeadershipUsed;

  let lowestTierTroops = troopData
    .filter(troop => (enemy === 'pvp' && troop.category === 'Guardsmen') || 
                     ((enemy === 'pve' || enemy === 'even') && troop.category === 'Specialist'))
    .sort((a, b) => a.tier - b.tier || a.size - b.size) // Sort by tier then size
    .slice(0, 2); // Get the two lowest tier and size troops

  if (remainingLeadership > 0 && lowestTierTroops.length > 0) {
    if (lowestTierTroops.length === 1) {
      // If there's only one troop, give it all the remaining leadership
      let troop = lowestTierTroops[0];
      troop.count += remainingLeadership;
      troop.totalUnitSize = troop.count * troop.size;
      troop.totalUnitHP = troop.count * troop.hp;
    } else {
      if (remainingLeadership % 2 === 0) {
        let additionalCount = remainingLeadership / 2;
        lowestTierTroops.forEach(troop => {
          troop.count += additionalCount;
          troop.totalUnitSize = troop.count * troop.size;
          troop.totalUnitHP = troop.count * troop.hp;
        });
      } else {
        let additionalCount = Math.floor(remainingLeadership / 2);
        lowestTierTroops[0].count += additionalCount + 1;
        lowestTierTroops[1].count += additionalCount;
        lowestTierTroops.forEach(troop => {
          troop.totalUnitSize = troop.count * troop.size;
          troop.totalUnitHP = troop.count * troop.hp;
        });
      }
    }
  }
}


function incrementTroops(groupedByCategoryAndTier, apexTroop, apexTroopCount) {
  // Update apex troop details
  apexTroop.count = apexTroopCount;
  apexTroop.totalUnitSize = apexTroop.count * apexTroop.size;
  apexTroop.totalUnitHP = apexTroop.count * apexTroop.hp;

  // Update subApex and other troop counts
  Object.values(groupedByCategoryAndTier).forEach(group => {
    let subApexUnit = group.find(troop => troop.hp === Math.max(...group.map(t => t.hp)));
    if (subApexUnit) {
      subApexUnit.count = Math.ceil(apexTroopCount * subApexUnit.subApexRatio);
      subApexUnit.totalUnitSize = subApexUnit.count * subApexUnit.size;
      subApexUnit.totalUnitHP = subApexUnit.count * subApexUnit.hp;
    }
    group.forEach(troop => {
      if (troop !== subApexUnit) {
        troop.count = Math.ceil(subApexUnit.count * troop.ratio);
        troop.totalUnitSize = troop.count * troop.size;
        troop.totalUnitHP = troop.count * troop.hp;
      }
    });
  });
}

function findApexUnit(troopData) {
  return troopData.filter(troop => troop.category === 'Guardsmen')
                  .reduce((acc, troop) => troop.hp > acc.hp ? troop : acc, {hp: 0});
}

function groupTroopsByCategoryAndTier(troopData) {
  return troopData.reduce((acc, troop) => {
    const key = `${troop.category}-${troop.tier}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(troop);
    return acc;
  }, {});
}

function initializeAndCalculateRatios(groupedByCategoryAndTier, apexTroop, enemy) {
  const paddingOffset = 0.01; // Set the padding offset

  Object.values(groupedByCategoryAndTier).forEach(group => {
    let subApexUnit = group.reduce((acc, troop) => troop.hp > acc.hp ? troop : acc, {hp: 0});
    group.forEach(troop => {
      if (isNaN(troop.hp) || troop.hp <= 0) {
        console.error('Invalid HP:', troop);
        return;
      }
      if (troop === subApexUnit) {
        troop.subApexRatio = apexTroop.hp / troop.hp;
        // Adjust ratio based on enemy type
        if (enemy === 'pve' && troop.category === 'Specialist') {
          troop.subApexRatio += paddingOffset;
        } else if (enemy === 'pvp' && troop.category === 'Guardsmen') {
          troop.subApexRatio += paddingOffset;
        } else if (enemy === 'even') {
          troop.sub
        }
      } else {
        troop.ratio = subApexUnit.hp / troop.hp;
      }
      troop.count = 0;
      troop.totalUnitSize = 0;
      troop.totalUnitHP = 0;
    });
  });
}

function processMercsAndMonsters(troopData, apexTroop) {
  troopData.filter(troop => ['Merc', 'Monster'].includes(troop.category)).forEach(troop => {
    troop.count = Math.floor(apexTroop.totalUnitHP / troop.hp);
    troop.totalUnitSize = troop.count * troop.size;
    troop.totalUnitHP = troop.count * troop.hp;
  });
}

function updateStatistics(leadership,totalarmyhp,apexunithp) {
  document.getElementById("totalArmyHP").innerHTML = totalarmyhp;
  document.getElementById("leadershipUsed").innerHTML = leadership;
  document.getElementById("apexUnitHP").innerHTML = apexunithp
}

function updateTables(troopsData,sortMode) {
  const categoryContainers = {
    'Guardsmen': document.getElementById('guardsmenList'),
    'Specialist': document.getElementById('specialistsList'),
    'Monster': document.getElementById('monstersList'),
    'Merc': document.getElementById('mercsList')
  };

  // Clear existing entries
  Object.keys(categoryContainers).forEach(key => {
    categoryContainers[key].innerHTML = ''; // Clear list
  });

  if(sortMode === "normal") {
    // "Normal Mode" - Sort troops data by tier in descending order, and by count in ascending order
    troopsData.sort((a, b) => b.tier - a.tier || a.count - b.count);
  } else if (sortMode == "azora") {
    // "Azora Mode" -- Sort by Strength
    troopsData.sort((a,b) => b.strength - a.strength || a.count - b.count);
  }
   
  // Populate new entries
  troopsData.forEach(troop => {
    const item = document.createElement('div');
    item.className = 'list-group-item d-flex justify-content-between align-items-center';
    if(troop.category === 'Guardsmen') {
      item.innerHTML = `<span data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="HP: ${troop.hp.toLocaleString()}">${troop.category[0]}${troop.tier} ${troop.type.charAt(0).toUpperCase() + troop.type.slice(1)}</span>
                      <span class="badge bg-primary fs-7" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Pool: ${troop.totalUnitHP.toLocaleString()}">${parseInt(troop.count).toLocaleString()}</span>`;
    } else if(troop.category === 'Specialist') {
      item.innerHTML = `<span data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="HP: ${troop.hp.toLocaleString()}">${troop.category[0]}${troop.tier} ${troop.type.charAt(0).toUpperCase() + troop.type.slice(1)}</span>
                      <span class="badge bg-danger fs-7" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Pool: ${troop.totalUnitHP.toLocaleString()}">${parseInt(troop.count).toLocaleString()}</span>`;
    }
      else if (troop.category === 'Monster') {
      item.innerHTML = `<span data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="HP: ${troop.hp.toLocaleString()}">${troop.category[0]}${troop.tier} ${troop.name}</span>
                      <span class="badge bg-success fs-7" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Pool: ${troop.totalUnitHP.toLocaleString()}">${parseInt(troop.count).toLocaleString()}</span>`;
    } else {
      item.innerHTML = `<span data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="HP: ${troop.hp.toLocaleString()}">${troop.name}</span>
                      <span class="badge bg-secondary fs-7" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Pool: ${troop.totalUnitHP.toLocaleString()}">${parseInt(troop.count).toLocaleString()}</span>`;
    }
    categoryContainers[troop.category].appendChild(item);
  });
  var ttList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  var tooltipList = [...ttList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

function troopDataHandler() {
  return {
      troops: [],
      init() {
          // Fetch or receive data, then update UI
          fetchTroopData().then(data => {
              this.troops = data;
              updateTables(this.troops); // This assumes you still trigger updates externally
          });
      }
  };
}