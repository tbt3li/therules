"use strict";

const WORKER_URL = 'https://calc2.t3li.workers.dev';
const VERSION = "0.1-Beta";

// Existing constants and data structures (keep all your existing data)
const M = {
  Guardsmen: "Guardsmen",
  Specialists: "Specialists",
  Engineers: "Engineers",
  Monsters: "Monsters",
  Mercenaries: "Mercenaries"
};

// ... (keep all your troop data arrays: z, Y, _, Q, etc.)

// Modified updateTroops function to use worker
window.updateTroops = async function(element) {
  const config = gatherConfiguration();
  const selectedTroops = gatherSelectedTroops();
  
  if (selectedTroops.length === 0) {
    clearDisplays();
    return;
  }
  
  try {
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedTroops: selectedTroops,
        config: config
      })
    });
    
    if (!response.ok) {
      throw new Error('Worker request failed');
    }
    
    const result = await response.json();
    
    if (result.error) {
      console.error('Worker error:', result.error);
      return;
    }
    
    displayResults(result, config);
    
  } catch (error) {
    console.error('Error calculating troops:', error);
    showError('Failed to calculate troops. Please try again.');
  }
};

function gatherConfiguration() {
  return {
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
    revivalCostReduction: parseFloat($("#revival-cost-reduction").val()) || 1,
    roundToTens: true
  };
}

function gatherSelectedTroops() {
  let selected = [];
  const checkedBoxes = $("input:checked.troop-checkbox");
  
  checkedBoxes.each(function() {
    const id = $(this).prop('id');
    // Find the troop data associated with this checkbox
    const troop = findTroopById(id);
    if (troop) {
      selected.push(troop);
    }
  });
  
  return selected;
}

function findTroopById(id) {
  // Search through your troop data structures
  for (const category in window.troopData) {
    for (const type in window.troopData[category]) {
      const troop = window.troopData[category][type].find(t => t.props?.baseId === id);
      if (troop) return troop;
    }
  }
  return null;
}

function displayResults(result, config) {
  const { statistics, troops, mercenaries, monsters } = result;
  
  // Update LAD displays
  $("#leadership-amount").text(`${formatNumber(troops.requiredLeadership)} of`);
  $("#authority-amount").text(`${formatNumber(mercenaries.requiredAuthority)} of`);
  $("#dominance-amount").text(`${formatNumber(monsters.requiredDominance)} of`);
  
  // Update input warnings
  $(".leadership-display").toggleClass("alerted-input", statistics.leadershipExceeded);
  $(".authority-display").toggleClass("alerted-input", statistics.authorityExceeded);
  $(".dominance-display").toggleClass("alerted-input", statistics.dominanceExceeded);
  
  // Update requirement displays
  $("#required-leadership").val(`${formatNumber(troops.requiredLeadership)}${config.availableLeadership > 0 ? ' / ' + formatNumber(config.availableLeadership) : ''}`);
  $("#required-authority").val(`${formatNumber(mercenaries.requiredAuthority)}${config.availableAuthority > 0 ? ' / ' + formatNumber(config.availableAuthority) : ''}`);
  $("#required-dominance").val(`${formatNumber(monsters.requiredDominance)}${config.availableDominance > 0 ? ' / ' + formatNumber(config.availableDominance) : ''}`);
  
  // Update troop counts in UI
  updateTroopCounts(result);
  
  // Generate report
  generateReportHTML(result);
  
  // Enable generate button
  $("#generate-report").prop("disabled", false);
}

function updateTroopCounts(result) {
  // Clear all existing counts
  $(".troop-count").hide().text("");
  
  // Update counts for troops
  [...result.troops.squads, ...result.mercenaries.squads, ...result.monsters.squads].forEach(squad => {
    const element = $(`#${squad.name.replace(/\s+/g, '-').toLowerCase()}-count`);
    if (element.length) {
      element.text(formatNumber(squad.count)).show();
      element.attr("title", `Total health: ${formatNumber(squad.totalHealth)}`);
    }
  });
}

function generateReportHTML(result) {
  let html = '<div class="flex-container flex-row-container">';
  
  // Statistics displays
  html += createStatDisplay("Power score", formatShortNumber(result.statistics.overallRating));
  html += createStatDisplay("Strength", formatShortNumber(result.statistics.armyStrength));
  html += createStatDisplay("Leadership", formatShortNumber(result.troops.requiredLeadership));
  
  if (result.mercenaries.requiredAuthority > 0) {
    html += createStatDisplay("Authority", formatShortNumber(result.mercenaries.requiredAuthority));
  }
  
  if (result.monsters.requiredDominance > 0) {
    html += createStatDisplay("Dominance", formatShortNumber(result.monsters.requiredDominance));
  }
  
  html += createStatDisplay("Revival cost", formatShortNumber(result.statistics.actualRevivalCost));
  
  html += '</div>';
  
  // Add squad breakdowns
  html += '<h4 class="separator">Your Army</h4>';
  
  if (result.mercenaries.squads.length > 0) {
    html += generateSquadHTML("Mercenaries", result.mercenaries.squads, "authority");
  }
  
  if (result.monsters.squads.length > 0) {
    html += generateSquadHTML("Monsters", result.monsters.squads, "dominance");
  }
  
  if (result.troops.squads.length > 0) {
    html += generateSquadHTML("Normal Troops", result.troops.squads, "leadership");
  }
  
  $("#report-body").html(html);
}

function createStatDisplay(title, value) {
  return `
    <div class="rating-display flex-container flex-column-container">
      <div class="rating-title">${title}</div>
      <div class="rating-value">${value}</div>
    </div>
  `;
}

function generateSquadHTML(title, squads, resourceType) {
  let html = `<h5>${title}</h5>`;
  html += '<div class="flex-container flex-column-container report-section">';
  
  let lastTier = null;
  
  squads.forEach(squad => {
    if (lastTier && lastTier !== squad.tier) {
      html += '<div style="margin-bottom: 21px;"></div>';
    }
    
    const bonusHtml = squad.totalHealthBonus > 0 
      ? `<span class="bonus-tag">+${formatNumber(squad.totalHealthBonus)}</span>` 
      : '';
    
    const resourceTotal = resourceType === 'leadership' ? squad.totalLeadership
      : resourceType === 'authority' ? squad.totalAuthority
      : squad.totalDominance;
    
    html += `
      <div class="report-squad">
        <div class="report-squad-basic flex-container flex-row-container">
          <div class="report-squad-name">${squad.name} ${getTierTag(squad.category, squad.tier)}</div>
          <div class="report-squad-count">${formatNumber(squad.count)}</div>
        </div>
        <div class="report-squad-details flex-container flex-row-container">
          <div>Health: ${formatNumber(squad.totalHealth)} ${bonusHtml}</div>
          <div>Strength: ${formatNumber(squad.totalStrength)}</div>
          <div>${resourceType}: ${formatNumber(resourceTotal)}</div>
        </div>
      </div>
    `;
    
    lastTier = squad.tier;
  });
  
  html += '</div>';
  return html;
}

function getTierTag(category, tier) {
  const tierMap = {1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"I",9:"II"};
  const prefix = category === 'Guardsmen' ? 'G' 
    : category === 'Specialists' ? 'S'
    : category === 'Monsters' ? 'M'
    : '';
  return `<span class="tag visual-tier-${tier}">${prefix}${tierMap[tier]}</span>`;
}

function formatNumber(num) {
  return Intl.NumberFormat().format(Math.floor(num));
}

function formatShortNumber(num) {
  const abs = Math.abs(num);
  if (abs >= 1e12) return `${(num/1e12).toFixed(1)}T`;
  if (abs >= 1e9) return `${(num/1e9).toFixed(1)}B`;
  if (abs >= 1e6) return `${(num/1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${(num/1e3).toFixed(1)}k`;
  return formatNumber(num);
}

function clearDisplays() {
  $(".lad-amount").text("0 of");
  $(".troop-count").hide().removeClass("troop-count-warning");
  $("#required-leadership, #required-authority, #required-dominance").val("");
  $("#generate-report").prop("disabled", true);
  $("#report-body").html("");
}

function showError(message) {
  // Implement error display
  console.error(message);
}

// Modified reverseCalculateArmy to use worker
window.reverseCalculateArmy = async function(autoGenerate) {
  const leadership = parseInt($("#available-leadership").val());
  if (leadership <= 0) return;
  
  // First calculate with a base count
  const config = gatherConfiguration();
  config.referenceCount = 100; // Start with 100
  
  const selectedTroops = gatherSelectedTroops();
  
  try {
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedTroops, config })
    });
    
    const result = await response.json();
    
    // Calculate ratio and adjust
    const ratio = leadership / result.troops.requiredLeadership;
    const newCount = Math.floor(100 * ratio);
    
    $("#reference-count").val(newCount);
    
    // Update with new count
    config.referenceCount = newCount;
    
    const finalResponse = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedTroops, config })
    });
    
    const finalResult = await finalResponse.json();
    displayResults(finalResult, config);
    
    if (autoGenerate) {
      $("#generate-report").click();
    }
    
  } catch (error) {
    console.error('Error in reverse calculation:', error);
  }
};

// Keep all your existing initialization code
$(document).ready(function() {
  $("#app-version-number").text(VERSION);
  
  // Load initial settings
  loadSettings();
  
  // Initialize troop categories
  for (const category in M) {
    const element = document.getElementById(`${category}-category`);
    if (element) {
      initializeTroopCategory(element, category);
    }
  }
});

// Helper function to load settings
function loadSettings() {
  const settings = localStorage.getItem('uiSettings');
  if (settings) {
    applySettings(JSON.parse(settings));
  }
}

// Note: You'll need to keep all your troop data arrays (z, Y, _, Q)
// and initialization functions from your original bundle.js
// Only the calculation logic has been moved to the worker
