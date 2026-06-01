// Minimal standalone script for death-order.html
// Contains only TROOPS data, utility functions, and branch selector
// Does NOT include main calculator initialization to avoid conflicts

// Copy TROOPS data from app.js (lines 1-73)
const TROOPS = [
  // Specialists - Melee
  { id: "S9-ML", name: "Specialist 9 Melee", tier: 9, branch: "Specialists", role: "melee", strength: 5510, health: 16530, leadership: 1 },
  { id: "S8-ML", name: "Specialist 8 Melee", tier: 8, branch: "Specialists", role: "melee", strength: 3060, health: 9180, leadership: 1 },
  { id: "S7-ML", name: "Specialist 7 Melee", tier: 7, branch: "Specialists", role: "melee", strength: 1700, health: 5100, leadership: 1 },
  { id: "S6-ML", name: "Specialist 6 Melee", tier: 6, branch: "Specialists", role: "melee", strength: 940, health: 2820, leadership: 1 },
  { id: "S5-ML", name: "Specialist 5 Melee", tier: 5, branch: "Specialists", role: "melee", strength: 520, health: 1560, leadership: 1 },
  { id: "S4-ML", name: "Specialist 4 Melee", tier: 4, branch: "Specialists", role: "melee", strength: 290, health: 870, leadership: 1 },
  { id: "S3-ML", name: "Specialist 3 Melee", tier: 3, branch: "Specialists", role: "melee", strength: 160, health: 480, leadership: 1 },
  { id: "S2-ML", name: "Specialist 2 Melee", tier: 2, branch: "Specialists", role: "melee", strength: 90, health: 270, leadership: 1 },
  { id: "S1-ML", name: "Specialist 1 Melee", tier: 1, branch: "Specialists", role: "melee", strength: 50, health: 150, leadership: 1 },
  
  // Specialists - Ranged
  { id: "S9", name: "Specialist 9", tier: 9, branch: "Specialists", role: "ranged", strength: 5510, health: 16530, leadership: 1 },
  { id: "S8", name: "Specialist 8", tier: 8, branch: "Specialists", role: "ranged", strength: 3060, health: 9180, leadership: 1 },
  { id: "S7", name: "Specialist 7", tier: 7, branch: "Specialists", role: "ranged", strength: 1700, health: 5100, leadership: 1 },
  { id: "S6", name: "Specialist 6", tier: 6, branch: "Specialists", role: "ranged", strength: 940, health: 2820, leadership: 1 },
  { id: "S5", name: "Specialist 5", tier: 5, branch: "Specialists", role: "ranged", strength: 520, health: 1560, leadership: 1 },
  
  // Specialists - Flying
  { id: "S9-F", name: "Specialist 9 Flying", tier: 9, branch: "Specialists", role: "flying", strength: 5510, health: 16530, leadership: 1 },
  { id: "S8-F", name: "Specialist 8 Flying", tier: 8, branch: "Specialists", role: "flying", strength: 3060, health: 9180, leadership: 1 },
  { id: "S7-F", name: "Specialist 7 Flying", tier: 7, branch: "Specialists", role: "flying", strength: 1700, health: 5100, leadership: 1 },
  { id: "S6-F", name: "Specialist 6 Flying", tier: 6, branch: "Specialists", role: "flying", strength: 940, health: 2820, leadership: 1 },
  { id: "S5-F", name: "Specialist 5 Flying", tier: 5, branch: "Specialists", role: "flying", strength: 520, health: 1560, leadership: 1 },
  
  // Specialists - Mounted
  { id: "S9-M", name: "Specialist 9 Mounted", tier: 9, branch: "Specialists", role: "mounted", strength: 5510, health: 33060, leadership: 2 },
  { id: "S8-M", name: "Specialist 8 Mounted", tier: 8, branch: "Specialists", role: "mounted", strength: 3060, health: 18360, leadership: 2 },
  { id: "S7-M", name: "Specialist 7 Mounted", tier: 7, branch: "Specialists", role: "mounted", strength: 1700, health: 10200, leadership: 2 },
  { id: "S6-M", name: "Specialist 6 Mounted", tier: 6, branch: "Specialists", role: "mounted", strength: 940, health: 5640, leadership: 2 },
  { id: "S5-M", name: "Specialist 5 Mounted", tier: 5, branch: "Specialists", role: "mounted", strength: 520, health: 3120, leadership: 2 },
  
  // Guards - Melee
  { id: "G9", name: "Guard 9", tier: 9, branch: "Guards", role: "melee", strength: 5510, health: 16530, leadership: 1 },
  { id: "G8", name: "Guard 8", tier: 8, branch: "Guards", role: "melee", strength: 3060, health: 9180, leadership: 1 },
  { id: "G7", name: "Guard 7", tier: 7, branch: "Guards", role: "melee", strength: 1700, health: 5100, leadership: 1 },
  { id: "G6", name: "Guard 6", tier: 6, branch: "Guards", role: "melee", strength: 940, health: 2820, leadership: 1 },
  { id: "G5", name: "Guard 5", tier: 5, branch: "Guards", role: "melee", strength: 520, health: 1560, leadership: 1 },
  { id: "G4", name: "Guard 4", tier: 4, branch: "Guards", role: "melee", strength: 290, health: 870, leadership: 1 },
  { id: "G3", name: "Guard 3", tier: 3, branch: "Guards", role: "melee", strength: 160, health: 480, leadership: 1 },
  { id: "G2", name: "Guard 2", tier: 2, branch: "Guards", role: "melee", strength: 90, health: 270, leadership: 1 },
  { id: "G1", name: "Guard 1", tier: 1, branch: "Guards", role: "melee", strength: 50, health: 150, leadership: 1 },
  
  // Guards - Ranged
  { id: "G9-R", name: "Guard 9 Ranged", tier: 9, branch: "Guards", role: "ranged", strength: 5510, health: 16530, leadership: 1 },
  { id: "G8-R", name: "Guard 8 Ranged", tier: 8, branch: "Guards", role: "ranged", strength: 3060, health: 9180, leadership: 1 },
  { id: "G7-R", name: "Guard 7 Ranged", tier: 7, branch: "Guards", role: "ranged", strength: 1700, health: 5100, leadership: 1 },
  { id: "G6-R", name: "Guard 6 Ranged", tier: 6, branch: "Guards", role: "ranged", strength: 940, health: 2820, leadership: 1 },
  { id: "G5-R", name: "Guard 5 Ranged", tier: 5, branch: "Guards", role: "ranged", strength: 520, health: 1560, leadership: 1 },
  { id: "G4-R", name: "Guard 4 Ranged", tier: 4, branch: "Guards", role: "ranged", strength: 290, health: 870, leadership: 1 },
  { id: "G3-R", name: "Guard 3 Ranged", tier: 3, branch: "Guards", role: "ranged", strength: 160, health: 480, leadership: 1 },
  { id: "G2-R", name: "Guard 2 Ranged", tier: 2, branch: "Guards", role: "ranged", strength: 90, health: 270, leadership: 1 },
  { id: "G1-R", name: "Guard 1 Ranged", tier: 1, branch: "Guards", role: "ranged", strength: 50, health: 150, leadership: 1 },
  
  // Guards - Flying
  { id: "G9-F", name: "Guard 9 Flying", tier: 9, branch: "Guards", role: "flying", strength: 5510, health: 330600, leadership: 20 },
  { id: "G8-F", name: "Guard 8 Flying", tier: 8, branch: "Guards", role: "flying", strength: 3060, health: 183600, leadership: 20 },
  { id: "G7-F", name: "Guard 7 Flying", tier: 7, branch: "Guards", role: "flying", strength: 1700, health: 102000, leadership: 20 },
  { id: "G6-F", name: "Guard 6 Flying", tier: 6, branch: "Guards", role: "flying", strength: 940, health: 56400, leadership: 20 },
  { id: "G5-F", name: "Guard 5 Flying", tier: 5, branch: "Guards", role: "flying", strength: 520, health: 31200, leadership: 20 },
  
  // Guards - Mounted
  { id: "G9-M", name: "Guard 9 Mounted", tier: 9, branch: "Guards", role: "mounted", strength: 5510, health: 33060, leadership: 2 },
  { id: "G8-M", name: "Guard 8 Mounted", tier: 8, branch: "Guards", role: "mounted", strength: 3060, health: 18360, leadership: 2 },
  { id: "G7-M", name: "Guard 7 Mounted", tier: 7, branch: "Guards", role: "mounted", strength: 1700, health: 10200, leadership: 2 },
  { id: "G6-M", name: "Guard 6 Mounted", tier: 6, branch: "Guards", role: "mounted", strength: 940, health: 5640, leadership: 2 },
  { id: "G5-M", name: "Guard 5 Mounted", tier: 5, branch: "Guards", role: "mounted", strength: 520, health: 3120, leadership: 2 },
  { id: "G4-M", name: "Guard 4 Mounted", tier: 4, branch: "Guards", role: "mounted", strength: 290, health: 1740, leadership: 2 },
  { id: "G3-M", name: "Guard 3 Mounted", tier: 3, branch: "Guards", role: "mounted", strength: 160, health: 960, leadership: 2 },
  { id: "G2-M", name: "Guard 2 Mounted", tier: 2, branch: "Guards", role: "mounted", strength: 90, health: 540, leadership: 2 },
  { id: "G1-M", name: "Guard 1 Mounted", tier: 1, branch: "Guards", role: "mounted", strength: 50, health: 300, leadership: 2 },
];

// Branch configuration
const BRANCH_CONFIG = [
  {
    key: "specialists",
    label: "Specialists",
    prefix: "S",
    tiers: [9, 8, 7, 6, 5, 4, 3, 2, 1],
    defaultTier: 7
  },
  {
    key: "guards",
    label: "Guards",
    prefix: "G",
    tiers: [9, 8, 7, 6, 5, 4, 3, 2, 1],
    defaultTier: 7
  }
];

// Utility functions
function formatNumber(num) {
  return Math.round(num).toLocaleString();
}

function formatLeadership(num) {
  return formatNumber(num) + " pts";
}

// LocalStorage keys
const STORAGE_KEY = "stacking-calc-settings";
const STAT_BONUSES_KEY = "stacking-calc-stat-bonuses";

// Stat bonuses
function loadStatBonuses() {
  try {
    const saved = localStorage.getItem(STAT_BONUSES_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Failed to load stat bonuses:", e);
  }
  // Return defaults
  return {
    'Specialists-melee': 10.18,
    'Specialists-mounted': 10.18,
    'Specialists-ranged': 10.18,
    'Specialists-flying': 9.51,
    'Guards-melee': 10.2,
    'Guards-mounted': 10.21,
    'Guards-ranged': 10.2,
    'Guards-flying': 9.74,
  };
}

function saveStatBonuses(bonuses) {
  try {
    localStorage.setItem(STAT_BONUSES_KEY, JSON.stringify(bonuses));
  } catch (e) {
    console.warn("Failed to save stat bonuses:", e);
  }
}

function getStatBonus(branch, role, bonuses) {
  const key = `${branch}-${role}`;
  return bonuses[key] || 1.0;
}

// Branch selector state
const branchElements = {};

// Load/save settings
function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
}

function saveSettings() {
  try {
    const settings = {
      leadership: document.getElementById('leadership-input')?.value,
      padding: document.getElementById('padding-input')?.value,
      branches: {}
    };
    
    Object.entries(branchElements).forEach(([key, entry]) => {
      settings.branches[key] = {
        enabled: entry.checkbox.checked,
        maxTier: entry.select.value,
        enabledTiers: Array.from(entry.enabledTiers)
      };
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn("Failed to save settings:", e);
  }
}

// Get selected units
function getSelectedUnits() {
  const units = TROOPS.filter((unit) => {
    const entry = branchElements[unit.branch.toLowerCase()];
    if (!entry || !entry.checkbox.checked) return false;
    
    const maxTier = Number(entry.select.value);
    if (unit.tier > maxTier) return false;
    
    return entry.enabledTiers.has(unit.tier);
  });
  
  return units;
}

// Render branch controls
function renderBranchControls() {
  const savedSettings = loadSettings();
  const container = document.getElementById("branch-controls");
  container.innerHTML = "";
  
  BRANCH_CONFIG.forEach((branch) => {
    const card = document.createElement("div");
    card.className = "branch-card";
    
    const topRow = document.createElement("div");
    topRow.className = "branch-top";
    
    const toggleLabel = document.createElement("label");
    toggleLabel.className = "branch-toggle";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;
    const toggleText = document.createElement("span");
    toggleText.textContent = branch.label;
    toggleLabel.append(checkbox, toggleText);
    
    const range = document.createElement("span");
    range.className = "branch-range";
    const minTier = branch.tiers[branch.tiers.length - 1];
    range.textContent = `Tiers ${minTier}-${branch.tiers[0]}`;
    
    topRow.append(toggleLabel, range);
    
    const tierLabel = document.createElement("label");
    tierLabel.className = "branch-tier";
    const tierText = document.createElement("span");
    tierText.textContent = "Highest tier available";
    const select = document.createElement("select");
    branch.tiers.forEach((tier) => {
      const option = document.createElement("option");
      option.value = tier;
      option.textContent = `${branch.prefix}${tier} · Tier ${tier}`;
      select.append(option);
    });
    select.value = branch.defaultTier;
    tierLabel.append(tierText, select);
    
    const summary = document.createElement("p");
    summary.className = "branch-summary";
    
    const toggleWrapper = document.createElement("div");
    toggleWrapper.className = "branch-tier-toggle";
    const tierToggleLabel = document.createElement("div");
    tierToggleLabel.className = "tier-toggle-header";
    tierToggleLabel.textContent = "Disable tiers";
    const tierGrid = document.createElement("div");
    tierGrid.className = "tier-checkbox-grid";
    toggleWrapper.append(tierToggleLabel, tierGrid);
    
    card.append(topRow, tierLabel, summary, toggleWrapper);
    container.append(card);
    
    // Load saved settings
    const branchSettings = savedSettings?.branches?.[branch.key];
    const initialEnabled = branchSettings?.enabled ?? true;
    const initialMaxTier = branchSettings?.maxTier ?? branch.defaultTier;
    const initialEnabledTiers = branchSettings?.enabledTiers 
      ? new Set(branchSettings.enabledTiers)
      : new Set(branch.tiers);
    
    checkbox.checked = initialEnabled;
    select.value = initialMaxTier;
    
    branchElements[branch.key] = {
      checkbox,
      select,
      summary,
      config: branch,
      toggleLabel: tierToggleLabel,
      tierGrid,
      enabledTiers: initialEnabledTiers,
    };
    
    checkbox.addEventListener("change", () => {
      select.disabled = !checkbox.checked;
      updateTierControls(branch.key);
      updateBranchSummary(branch.key);
      if (window.updateResults) window.updateResults();
      saveSettings();
    });
    
    select.addEventListener("change", () => {
      updateTierControls(branch.key);
      updateBranchSummary(branch.key);
      if (window.updateResults) window.updateResults();
      saveSettings();
    });
    
    select.disabled = !checkbox.checked;
    updateTierControls(branch.key);
    updateBranchSummary(branch.key);
  });
}

function updateTierControls(branchKey) {
  const entry = branchElements[branchKey];
  const maxTier = Number(entry.select.value);
  const unlocked = entry.config.tiers.filter(t => t <= maxTier);
  
  entry.tierGrid.innerHTML = "";
  unlocked.forEach((tier) => {
    const label = document.createElement("label");
    label.className = "tier-checkbox-label";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = entry.enabledTiers.has(tier);
    cb.addEventListener("change", () => {
      if (cb.checked) {
        entry.enabledTiers.add(tier);
      } else {
        entry.enabledTiers.delete(tier);
      }
      updateBranchSummary(branchKey);
      if (window.updateResults) window.updateResults();
      saveSettings();
    });
    const text = document.createElement("span");
    text.textContent = `${entry.config.prefix}${tier}`;
    label.append(cb, text);
    entry.tierGrid.append(label);
  });
}

function updateBranchSummary(branchKey) {
  const entry = branchElements[branchKey];
  if (!entry.checkbox.checked) {
    entry.summary.textContent = "Disabled";
    return;
  }
  
  const maxTier = Number(entry.select.value);
  const unlocked = entry.config.tiers.filter(t => t <= maxTier);
  const enabled = unlocked.filter(t => entry.enabledTiers.has(t));
  
  if (enabled.length === 0) {
    entry.summary.textContent = "No tiers enabled";
  } else {
    entry.summary.textContent = `Using ${enabled.length} tier(s): ${enabled.map(t => entry.config.prefix + t).join(", ")}`;
  }
}

console.log('✅ Death Order standalone script loaded');

