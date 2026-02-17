// Updated main.js - Now uses Cloudflare Worker for calculations

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

const configForm = document.querySelector('#configForm');

// Add an event listener for the "submit" event
configForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
});

// Worker endpoint
const WORKER_URL = 'https://calc1.t3li.workers.dev';

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
      
      // Handle input changes
      handleInput: function(param, value, isCheckbox = false) {
        this.updateUrlParameter(param, value, isCheckbox);
        this.fetchDataAndUpdate();
      },
      
      updateUrlParameter,
      
      validateAndUpdate(value, targetProp, isMin) {
        const intValue = parseInt(value);
        if (isMin && intValue > parseInt(this[targetProp])) {
          this[targetProp] = intValue;
        } else if (!isMin && intValue < parseInt(this[targetProp])) {
          this[targetProp] = intValue;
        }
        this.handleInput(targetProp, this[targetProp]);
      },
      
      // Process data from worker
      processData: function(data) {
        if (data.error) {
          console.error('Worker error:', data.error);
          return;
        }
        
        // Update statistics
        document.getElementById("totalArmyHP").innerHTML = data.statistics.totalArmyHP;
        document.getElementById("leadershipUsed").innerHTML = data.statistics.leadershipUsed;
        document.getElementById("apexUnitHP").innerHTML = data.statistics.apexUnitHP;
        
        // Update tables
        this.updateTables(data.troops);
      },
      
      // Update tables with received data
      updateTables: function(troopsData) {
        const categoryContainers = {
          'Guardsmen': document.getElementById('guardsmenList'),
          'Specialist': document.getElementById('specialistsList'),
          'Monster': document.getElementById('monstersList'),
          'Merc': document.getElementById('mercsList')
        };

        // Clear existing entries
        Object.keys(categoryContainers).forEach(key => {
          categoryContainers[key].innerHTML = '';
        });

        // Populate new entries
        troopsData.forEach(troop => {
          const item = document.createElement('div');
          item.className = 'list-group-item d-flex justify-content-between align-items-center';
          
          let badgeClass = 'bg-primary';
          if (troop.category === 'Specialist') badgeClass = 'bg-danger';
          else if (troop.category === 'Monster') badgeClass = 'bg-success';
          else if (troop.category === 'Merc') badgeClass = 'bg-secondary';
          
          let displayName = '';
          if (troop.category === 'Guardsmen' || troop.category === 'Specialist') {
            displayName = `${troop.category[0]}${troop.tier} ${troop.type.charAt(0).toUpperCase() + troop.type.slice(1)}`;
          } else if (troop.category === 'Monster') {
            displayName = `M${troop.tier} ${troop.name}`;
          } else {
            displayName = troop.name;
          }
          
          item.innerHTML = `
            <span data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="HP: ${parseInt(troop.hp).toLocaleString()}">${displayName}</span>
            <span class="badge ${badgeClass} fs-7" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Pool: ${parseInt(troop.totalUnitHP || 0).toLocaleString()}">${parseInt(troop.count || 0).toLocaleString()}</span>
          `;
          
          if (categoryContainers[troop.category]) {
            categoryContainers[troop.category].appendChild(item);
          }
        });
        
        // Reinitialize tooltips
        setTimeout(() => {
          var ttList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
          var tooltipList = [...ttList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
        }, 100);
      },
      
      // Fetch data from local JSON and send to worker
      fetchDataAndUpdate: function() {
        // First fetch the troops data locally
        fetch('./calc1/troops.json')
          .then(response => response.json())
          .then(troopsData => {
            // Filter the troops data based on current settings
            const filteredTroops = this.filterTroops(troopsData);
            
            // Prepare request for worker
            const requestData = {
              troops: filteredTroops,
              config: {
                leadership: parseInt(this.leadership),
                sortMode: this.sortMode,
                enemy: this.enemy
              }
            };
            
            // Send to worker
            return fetch(WORKER_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestData)
            });
          })
          .then(response => response.json())
          .then(result => {
            this.processData(result);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      },
      
      // Filter troops based on current settings (moved from original processData)
      filterTroops: function(data) {
        // Calculate dynamic bounds for filtering
        let maxG = parseInt(this.maxG);
        let maxMerc;

        if (maxG === 5) {
          maxMerc = 7;
        } else {
          maxMerc = Math.min(9, maxG + 3);
        }

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

        // Max Level filters
        filteredTroops = filteredTroops.filter(item => {
          if (item.category === "Guardsmen" && item.tier >= this.minG && item.tier <= this.maxG) return true;
          if (item.category === "Specialist" && item.tier >= this.minS && item.tier <= this.maxS) return true;
          if (item.category === "Monster" && item.tier >= this.minM && item.tier <= this.maxM) return true;
          if (item.category === "Merc" && item.tier == maxMerc) return true;
          return false;
        });

        // Max UnitType filters
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
        });

        return filteredTroops;
      },
      
      init() {
        this.fetchDataAndUpdate();
        this.$watch('minG', newValue => this.validateAndUpdate(newValue, 'maxG', true));
        this.$watch('maxG', newValue => this.validateAndUpdate(newValue, 'minG', false));
        this.$watch('minS', newValue => this.validateAndUpdate(newValue, 'maxS', true));
        this.$watch('maxS', newValue => this.validateAndUpdate(newValue, 'minS', false));
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
    if (paramValue === null) {
      return defaultValue === '1';
    }
    return paramValue === '1';
  }
  return paramValue || defaultValue;
}
