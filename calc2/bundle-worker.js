// Client-side code for calculator v2
// This replaces bundle.js and communicates with the worker

const WORKER_URL = 'https://calc2.t3li.workers.dev';

// Store the original functions we need to override
let originalTroops = [];
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

// Override the updateTroops function to use the worker
async function updateTroopsWithWorker(source) {
  // Get current UI state
  const selectedTroops = getSelectedTroopsWithFlags();
  
  if (selectedTroops.length === 0) {
    clearDisplay();
    return;
  }

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

  // Mark reference troop
  const referenceTroop = findReferenceTroop(selectedTroops);
  const troopsWithRef = selectedTroops.map(t => ({
    ...t,
    isReference: t === referenceTroop
  }));

  // Prepare request for worker
  const requestData = {
    troops: troopsWithRef,
    config: currentConfig
  };

  try {
    // Show loading state
    $("#report-body").html('<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>');
    
    // Send to worker
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

    const result = await response.json();
    
    // Update UI with results
    displayResults(result);
    updateUIFromResult(result);
    
  } catch (error) {
    console.error('Error calling worker:', error);
    $("#report-body").html(`<div class="alert alert-danger">Error: ${error.message}</div>`);
  }
}

// Helper function to get selected troops with their flags
function getSelectedTroopsWithFlags() {
  const selected = [];
  const checkboxes = $("input:checked.troop-checkbox");
  
  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    const troopData = $(checkbox).data('troop');
    if (troopData) {
      selected.push(troopData);
    }
  }
  
  return selected;
}

// Find reference troop (highest health guardsman/specialist)
function findReferenceTroop(troops) {
  return troops
    .filter(t => t.category === "Guardsmen" || t.category === "Specialists")
    .reduce((max, t) => !max || t.health > max.health ? t : max, null);
}

// Clear display
function clearDisplay() {
  $("#report-body").html("");
  $(".lad-amount").text("0 of");
  $(".troop-count").text("0").hide();
  $("#generate-report").prop("disabled", true);
}

// Display results in UI
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
  
  // Enable generate button
  $("#generate-report").prop("disabled", false);
}

// Update UI from result
function updateUIFromResult(result) {
  const { statistics } = result;
  
  // Check limits and apply warning classes
  const leadership = parseInt($("#available-leadership").val()) || 0;
  const authority = parseInt($("#available-authority").val()) || 0;
  const dominance = parseInt($("#available-dominance").val()) || 0;
  
  $(".leadership-display").toggleClass("alerted-input", 
    leadership > 0 && result.troops.requiredLeadership > leadership);
  $(".authority-display").toggleClass("alerted-input", 
    authority > 0 && result.mercenaries.requiredAuthority > authority);
  $(".dominance-display").toggleClass("alerted-input", 
    dominance > 0 && result.monsters.requiredDominance > dominance);
}

// Update individual troop counts
function updateTroopCounts(squads) {
  squads.forEach(squad => {
    const element = $(`#${squad.name.replace(/\s+/g, '-').toLowerCase()}-count`);
    if (element.length) {
      element.text(formatNumber(squad.count)).show();
      element.attr("title", `Total health: ${formatNumber(squad.totalHealth)}`);
    }
  });
}

// Generate report HTML
function generateReportHTML(result) {
  const { statistics, troops, mercenaries, monsters } = result;
  let html = '<div class="flex-container flex-row-container">';
  
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

// Create rating display div
function createRatingDisplay(title, value) {
  return `
    <div class="rating-display flex-container flex-column-container">
      <div class="rating-title">${title}</div>
      <div class="rating-value">${value}</div>
    </div>
  `;
}

// Generate squad HTML
function generateSquadHTML(squads, resourceType) {
  let html = '';
  let lastTier = null;
  
  squads.forEach(squad => {
    if (lastTier && lastTier !== squad.tier) {
      html += '<div style="margin-bottom: 21px;"></div>';
    }
    
    const bonusTag = squad.totalHealthBonus > 0 
      ? `<span class="bonus-tag">+${formatNumber(squad.totalHealthBonus)}</span>`
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
          <div>${capitalizeFirst(resourceType)}: ${formatNumber(squad[`total${capitalizeFirst(resourceType)}`])}</div>
        </div>
      </div>
    `;
    
    lastTier = squad.tier;
  });
  
  return html;
}

// Get tier tag HTML
function getTierTag(category, tier) {
  const tierMap = {1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"I",9:"II"};
  let prefix = "";
  
  switch(category) {
    case "Guardsmen": prefix = "G"; break;
    case "Specialists": prefix = "S"; break;
    case "Monsters": prefix = "M"; break;
    default: prefix = "";
  }
  
  return `<span class="tag visual-tier-${tier}">${prefix}${tierMap[tier]}</span>`;
}

// Helper functions
function formatNumber(num) {
  return Intl.NumberFormat().format(Math.trunc(num));
}

function formatCompact(num) {
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

// Store troop data on checkboxes when page loads
$(document).ready(function() {
  // Store troop data on checkboxes
  $(".troop-checkbox").each(function() {
    const checkbox = $(this);
    const parent = checkbox.closest('.troop-item');
    const name = parent.find('.troop-type-label').text();
    
    // Extract troop data from the DOM or from your original data structure
    // This depends on how your original bundle.js stores the data
    // You might need to adapt this based on your actual data structure
    
    // For now, we'll store basic info
    $(this).data('troop', {
      name: name,
      // Add other properties as needed
    });
  });
  
  // Override the original updateTroops function
  window.updateTroops = updateTroopsWithWorker;
});
