// Client-side code for calculator v2
// This replaces bundle.js and communicates with the worker

const WORKER_URL = 'https://calc2.t3li.workers.dev';

// Store the original functions we need
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

// Global functions that were originally in bundle.js
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
  updateTroops();
  saveSettings();
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
  localStorage.removeItem("uiSettings");
  localStorage.removeItem("profileNames");
  window.location.reload();
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
    window.currentProfile = profileName.toLowerCase();
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
};

window.removeCurrentProfile = function() {
  if (!window.currentProfile) return;
  
  if (confirm(`Are you sure you want to delete profile '${window.currentProfile}'?`)) {
    deleteProfile(window.currentProfile);
    refreshProfileList();
    window.currentProfile = null;
    $("#save-profile-button, #delete-profile-button").prop("disabled", true);
  }
};

window.saveCurrentProfile = function() {
  if (window.currentProfile) {
    saveProfile(window.currentProfile, localStorage.uiSettings);
  } else {
    addNewProfile();
  }
};

// Profile management functions
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
      
      updateTroops();
    }
  } catch (e) {
    console.error("Error loading settings:", e);
  }
}

// Main update function using worker
window.updateTroops = async function() {
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

  const result = await calculateWithWorker(currentConfig.referenceCount);
  
  if (result) {
    displayResults(result);
    updateUIFromResult(result);
  }
  
  // Save settings after update
  saveSettings();
};

// Helper function to calculate with worker
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
  $("#find-count").prop("disabled", true);
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
  
  // Enable buttons
  $("#generate-report").prop("disabled", false);
  $("#find-count").prop("disabled", currentConfig.availableLeadership <= 0);
}

// Update UI from result
function updateUIFromResult(result) {
  const { statistics, troops, mercenaries, monsters } = result;
  
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

// Update individual troop counts
function updateTroopCounts(squads) {
  squads.forEach(squad => {
    const element = $(`#${squad.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}-count`);
    if (element.length) {
      element.text(formatNumber(squad.count)).show();
      element.attr("title", `Total health: ${formatNumber(squad.totalHealth)}`);
    }
  });
}

// Generate report HTML
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

// Create rating display div
function createRatingDisplay(title, value) {
  return `
    <div class="rating-display flex-container flex-column-container" style="min-width: 120px; margin: 5px;">
      <div class="rating-title">${title}</div>
      <div class="rating-value">${value}</div>
    </div>
  `;
}

// Generate squad HTML
function generateSquadHTML(squads, resourceType) {
  let html = '';
  let lastTier = null;
  let lastCategory = null;
  
  squads.forEach(squad => {
    if (lastTier && lastTier !== squad.tier && lastCategory !== squad.category) {
      html += '<div style="margin-bottom: 21px;"></div>';
    }
    
    const bonusTag = squad.totalHealthBonus > 5 // Only show if significant
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
  
  return `<span class="tag visual-tier-${tier}">${prefix}${tierMap[tier] || tier}</span>`;
}

// Helper functions
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

// Initialize when document is ready
$(document).ready(function() {
  console.log("Calculator v2 client initialized");
  
  // Load any saved settings
  loadSettings();
  
  // Initialize tooltips if Bootstrap is available
  if (typeof bootstrap !== 'undefined') {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(t => new bootstrap.Tooltip(t));
  }
  
  // Update UI based on current selections
  updateTroops();
  
  // Refresh profile list
  refreshProfileList();
});
