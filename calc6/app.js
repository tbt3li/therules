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
  
  // Specialists - Ranged (available tier 5+)
  { id: "S9", name: "Specialist 9", tier: 9, branch: "Specialists", role: "ranged", strength: 5510, health: 16530, leadership: 1 },
  { id: "S8", name: "Specialist 8", tier: 8, branch: "Specialists", role: "ranged", strength: 3060, health: 9180, leadership: 1 },
  { id: "S7", name: "Specialist 7", tier: 7, branch: "Specialists", role: "ranged", strength: 1700, health: 5100, leadership: 1 },
  { id: "S6", name: "Specialist 6", tier: 6, branch: "Specialists", role: "ranged", strength: 940, health: 2820, leadership: 1 },
  { id: "S5", name: "Specialist 5", tier: 5, branch: "Specialists", role: "ranged", strength: 520, health: 1560, leadership: 1 },
  
  // Specialists - Flying (available tier 5+, leadership 1, same health as ranged since leadership is 1)
  { id: "S9-F", name: "Specialist 9 Flying", tier: 9, branch: "Specialists", role: "flying", strength: 5510, health: 16530, leadership: 1 },
  { id: "S8-F", name: "Specialist 8 Flying", tier: 8, branch: "Specialists", role: "flying", strength: 3060, health: 9180, leadership: 1 },
  { id: "S7-F", name: "Specialist 7 Flying", tier: 7, branch: "Specialists", role: "flying", strength: 1700, health: 5100, leadership: 1 },
  { id: "S6-F", name: "Specialist 6 Flying", tier: 6, branch: "Specialists", role: "flying", strength: 940, health: 2820, leadership: 1 },
  { id: "S5-F", name: "Specialist 5 Flying", tier: 5, branch: "Specialists", role: "flying", strength: 520, health: 1560, leadership: 1 },
  
  // Specialists - Mounted (leadership 2, health x2, available tier 5+)
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
  
  // Guards - Flying (available tier 5+, leadership 20, health x20)
  { id: "G9-F", name: "Guard 9 Flying", tier: 9, branch: "Guards", role: "flying", strength: 5510, health: 330600, leadership: 20 },
  { id: "G8-F", name: "Guard 8 Flying", tier: 8, branch: "Guards", role: "flying", strength: 3060, health: 183600, leadership: 20 },
  { id: "G7-F", name: "Guard 7 Flying", tier: 7, branch: "Guards", role: "flying", strength: 1700, health: 102000, leadership: 20 },
  { id: "G6-F", name: "Guard 6 Flying", tier: 6, branch: "Guards", role: "flying", strength: 940, health: 56400, leadership: 20 },
  { id: "G5-F", name: "Guard 5 Flying", tier: 5, branch: "Guards", role: "flying", strength: 520, health: 31200, leadership: 20 },
  
  // Guards - Mounted (leadership 2, health x2)
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

const MONSTERS = [
  // Tier 7 - Game order: Elementals, Dragons, Giants, Beasts
  { id: "M7-Elemental", name: "Wind Lord", tier: 7, branch: "Monsters", type: "Elementals", strength: 0, health: 930000, dominance: 45, order: 1 },
  { id: "M7-Dragon", name: "Black Dragon", tier: 7, branch: "Monsters", type: "Dragons", strength: 0, health: 900000, dominance: 44, order: 2 },
  { id: "M7-Giant", name: "Destructive Colossus", tier: 7, branch: "Monsters", type: "Giants", strength: 0, health: 870000, dominance: 43, order: 3 },
  { id: "M7-Beast", name: "Ancient Terror", tier: 7, branch: "Monsters", type: "Beasts", strength: 0, health: 840000, dominance: 41, order: 4 },
  
  // Tier 6 - Game order: Elementals, Beasts, Dragons, Giants
  { id: "M6-Elemental", name: "Ruby Golem", tier: 6, branch: "Monsters", type: "Elementals", strength: 0, health: 390000, dominance: 35, order: 1 },
  { id: "M6-Beast", name: "Jungle Destroyer", tier: 6, branch: "Monsters", type: "Beasts", strength: 0, health: 390000, dominance: 34, order: 2 },
  { id: "M6-Dragon", name: "Crystal Dragon", tier: 6, branch: "Monsters", type: "Dragons", strength: 0, health: 360000, dominance: 33, order: 3 },
  { id: "M6-Giant", name: "Troll Rider", tier: 6, branch: "Monsters", type: "Giants", strength: 0, health: 330000, dominance: 30, order: 4 },
];

const BRANCH_REGISTRY = {};

TROOPS.forEach((unit) => {
  const key = unit.branch;
  if (!BRANCH_REGISTRY[key]) {
    // Extract base prefix (G or S) before any numbers or suffixes
    const basePrefix = unit.id.match(/^[A-Z]+/)[0];
    BRANCH_REGISTRY[key] = {
      key,
      label: unit.branch,
      prefix: basePrefix,
      tiers: new Set(),
    };
  }
  BRANCH_REGISTRY[key].tiers.add(unit.tier);
});

const BRANCH_CONFIG = Object.values(BRANCH_REGISTRY)
  .map((info) => {
    const tiers = Array.from(info.tiers).sort((a, b) => b - a);
    return {
      key: info.key,
      label: info.label,
      prefix: info.prefix,
      tiers,
      defaultTier: tiers[0],
    };
  })
  .sort((a, b) => a.label.localeCompare(b.label));

const numberFormatter = new Intl.NumberFormat("en-US");
const percentFormatter = new Intl.NumberFormat("en-US", { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 });

const leadershipInput = document.getElementById("leadership-input");
const cushionInput = document.getElementById("cushion-input");
const branchCushionInput = document.getElementById("branch-cushion-input");
const meleeCushionInput = document.getElementById("melee-cushion-input");
const mountedCushionInput = document.getElementById("mounted-cushion-input");
const rangedCushionInput = document.getElementById("ranged-cushion-input");
const flyingCushionInput = document.getElementById("flying-cushion-input");
const targetHealthInput = document.getElementById("target-health-input");
const branchControlsContainer = document.getElementById("branch-controls");
const resultTableBody = document.querySelector("#result-table tbody");
const summaryEl = document.getElementById("summary");
const warningEl = document.getElementById("warning");
const branchElements = {};

// Monster system element references (declared early to avoid initialization errors)
const dominanceInput = document.getElementById("dominance-input");
const monsterModeSelect = document.getElementById("monster-mode");
const monsterCushionInput = document.getElementById("monster-cushion-input");
const monsterControlsContainer = document.getElementById("monster-controls");
const monsterSummaryEl = document.getElementById("monster-summary");
const monsterWarningEl = document.getElementById("monster-warning");
const monsterResultTableBody = document.getElementById("monster-result-table-body");
const monsterProgressFill = document.getElementById("monster-progress-fill");
const monsterProgressText = document.getElementById("monster-progress-text");

// LocalStorage keys
const STORAGE_KEY = "stacking-calc-settings";
const CHECKED_UNITS_KEY = "stacking-calc-checked-units";
const EXCLUDED_UNITS_KEY = "stacking-calc-excluded-units";
const DEATH_ORDER_MODE_KEY = "stacking-calc-death-order-mode";
const GAME_UI_ORDER_KEY = "stacking-calc-game-ui-order";
const STAT_BONUSES_KEY = "stacking-calc-stat-bonuses";

// Load settings from localStorage
function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.warn("Failed to load settings from localStorage:", e);
    return null;
  }
}

// Save settings to localStorage
function saveSettings() {
  try {
    const settings = {
      leadership: leadershipInput.value,
      cushion: cushionInput.value,
      branchCushion: branchCushionInput.value,
      meleeCushion: meleeCushionInput.value,
      mountedCushion: mountedCushionInput.value,
      rangedCushion: rangedCushionInput.value,
      flyingCushion: flyingCushionInput.value,
      unitPadding: document.getElementById('unit-padding-input')?.value || "0.1",
      targetHealth: targetHealthInput.value,
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
    console.warn("Failed to save settings to localStorage:", e);
  }
}

// Load checked units from localStorage
function loadCheckedUnits() {
  try {
    const saved = localStorage.getItem(CHECKED_UNITS_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch (e) {
    console.warn("Failed to load checked units from localStorage:", e);
    return new Set();
  }
}

// Save checked units to localStorage
function saveCheckedUnits(checkedUnits) {
  try {
    localStorage.setItem(CHECKED_UNITS_KEY, JSON.stringify(Array.from(checkedUnits)));
  } catch (e) {
    console.warn("Failed to save checked units to localStorage:", e);
  }
}

// Load excluded units from localStorage
function loadExcludedUnits() {
  try {
    const saved = localStorage.getItem(EXCLUDED_UNITS_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch (e) {
    console.warn("Failed to load excluded units from localStorage:", e);
    return new Set();
  }
}

// Save excluded units to localStorage
function saveExcludedUnits(excludedUnits) {
  try {
    localStorage.setItem(EXCLUDED_UNITS_KEY, JSON.stringify(Array.from(excludedUnits)));
  } catch (e) {
    console.warn("Failed to save excluded units to localStorage:", e);
  }
}

// Load death order mode from localStorage
function loadDeathOrderMode() {
  try {
    const saved = localStorage.getItem(DEATH_ORDER_MODE_KEY);
    return saved === "true"; // defaults to false if not set
  } catch (e) {
    console.warn("Failed to load death order mode from localStorage:", e);
    return false;
  }
}

// Save death order mode to localStorage
function saveDeathOrderMode(enabled) {
  try {
    localStorage.setItem(DEATH_ORDER_MODE_KEY, enabled.toString());
  } catch (e) {
    console.warn("Failed to save death order mode to localStorage:", e);
  }
}

// Load display order mode from localStorage
function loadDisplayOrderMode() {
  try {
    const saved = localStorage.getItem(GAME_UI_ORDER_KEY);
    return saved || "default"; // 'death', 'default', or 'game'
  } catch (e) {
    console.warn("Failed to load display order from localStorage:", e);
    return "default";
  }
}

// Save display order mode to localStorage
function saveDisplayOrderMode(mode) {
  try {
    localStorage.setItem(GAME_UI_ORDER_KEY, mode);
  } catch (e) {
    console.warn("Failed to save display order to localStorage:", e);
  }
}

// Load stat bonuses from localStorage
function loadStatBonuses() {
  try {
    const saved = localStorage.getItem(STAT_BONUSES_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Failed to load stat bonuses from localStorage:", e);
  }
  // Default bonuses (your actual values)
  return {
    "Specialists-melee": 10.18,
    "Specialists-mounted": 10.18,
    "Specialists-ranged": 10.18,
    "Specialists-flying": 9.51,
    "Guards-melee": 10.2,
    "Guards-mounted": 10.21,
    "Guards-ranged": 10.2,
    "Guards-flying": 9.74
  };
}

// Save stat bonuses to localStorage
function saveStatBonuses(bonuses) {
  try {
    localStorage.setItem(STAT_BONUSES_KEY, JSON.stringify(bonuses));
  } catch (e) {
    console.warn("Failed to save stat bonuses to localStorage:", e);
  }
}

// Get stat bonus for a specific unit
function getStatBonus(branch, role, bonuses) {
  const key = `${branch}-${role}`;
  return bonuses[key] || 1.0;
}

// Track which units have been added to army
let checkedUnits = loadCheckedUnits();

// Track which units are excluded from calculation
let excludedUnits = loadExcludedUnits();

// Track death order mode
let useDeathOrderMode = loadDeathOrderMode();

// Track display order mode (death, default/tier, game UI)
let displayOrderMode = loadDisplayOrderMode(); // 'death', 'default', or 'game'

// Track current results for army progress calculation
let currentResults = [];

// Toggle visibility of normal mode controls (irrelevant in Death Order Mode)
function toggleNormalModeControls(show) {
  const normalModeElements = [
    document.querySelector('label[for="cushion-input"]')?.parentElement,
    document.querySelector('label[for="branch-cushion-input"]')?.parentElement,
    document.querySelector('.role-padding-section'),
    document.querySelector('label[for="target-health-input"]')?.parentElement,
  ];
  
  normalModeElements.forEach(el => {
    if (el) {
      el.style.opacity = show ? '1' : '0.4';
      el.style.pointerEvents = show ? 'auto' : 'none';
      el.title = show ? '' : 'Not used in Death Order Mode';
    }
  });
}

function getBranchUnlockedTiers(entry) {
  const maxTier = Number(entry.select.value);
  return entry.config.tiers.filter((tier) => tier <= maxTier).sort((a, b) => b - a);
}

function getBranchActiveTiers(entry) {
  return getBranchUnlockedTiers(entry).filter((tier) => entry.enabledTiers.has(tier));
}

function updateTierControls(branchKey) {
  const entry = branchElements[branchKey];
  if (!entry) {
    return;
  }

  const unlocked = getBranchUnlockedTiers(entry);
  const isEnabled = entry.checkbox.checked;

  // Remove enabled tiers that are no longer unlocked
  for (const tier of [...entry.enabledTiers]) {
    if (!unlocked.includes(tier)) {
      entry.enabledTiers.delete(tier);
    }
  }

  entry.tierGrid.innerHTML = "";

  if (!unlocked.length) {
    const noTiersMsg = document.createElement("div");
    noTiersMsg.className = "tier-toggle-header";
    noTiersMsg.textContent = "No tiers unlocked.";
    entry.toggleLabel.replaceWith(noTiersMsg);
    entry.toggleLabel = noTiersMsg;
    return;
  }

  const headerRow = document.createElement("div");
  headerRow.className = "tier-toggle-header";
  
  const headerLabel = document.createElement("span");
  headerLabel.textContent = "Select tiers to use";
  headerLabel.className = "tier-toggle-label-text";
  
  const clearButton = document.createElement("button");
  clearButton.className = "tier-clear-btn";
  clearButton.textContent = "Clear all";
  clearButton.disabled = !isEnabled;
  clearButton.addEventListener("click", () => {
    entry.enabledTiers.clear();
    updateTierControls(branchKey);
    updateBranchSummary(branchKey);
    updateResults();
    saveSettings();
  });
  
  const selectAllButton = document.createElement("button");
  selectAllButton.className = "tier-clear-btn";
  selectAllButton.textContent = "Select all";
  selectAllButton.disabled = !isEnabled;
  selectAllButton.addEventListener("click", () => {
    unlocked.forEach(tier => entry.enabledTiers.add(tier));
    updateTierControls(branchKey);
    updateBranchSummary(branchKey);
    updateResults();
    saveSettings();
  });
  
  headerRow.append(headerLabel, selectAllButton, clearButton);
  entry.toggleLabel.replaceWith(headerRow);
  entry.toggleLabel = headerRow;

  unlocked.forEach((tier) => {
    const label = document.createElement("label");
    label.className = "tier-checkbox";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = tier;
    checkbox.checked = entry.enabledTiers.has(tier);
    checkbox.disabled = !isEnabled;
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        entry.enabledTiers.add(tier);
      } else {
        entry.enabledTiers.delete(tier);
      }
      updateBranchSummary(branchKey);
      updateResults();
      saveSettings();
    });

    label.append(checkbox, document.createTextNode(`${entry.config.prefix}${tier}`));
    entry.tierGrid.append(label);
  });
}

function updateBranchSummary(branchKey) {
  const entry = branchElements[branchKey];
  if (!entry) {
    return;
  }

  const { checkbox, summary } = entry;

  if (!checkbox.checked) {
    summary.textContent = "Not included in this hero stack.";
    return;
  }

  const unlocked = getBranchUnlockedTiers(entry);
  if (!unlocked.length) {
    summary.textContent = "No tiers unlocked for this branch.";
    return;
  }

  const active = getBranchActiveTiers(entry);
  if (!active.length) {
    summary.textContent = "No tiers selected for this branch.";
    return;
  }

  const prefix = entry.config.prefix;
  const highest = active[0];
  const lowest = active[active.length - 1];
  let message = highest === lowest
    ? `Using only ${prefix}${highest}.`
    : `Using ${prefix}${highest} down to ${prefix}${lowest}.`;

  const excluded = unlocked.filter((tier) => !entry.enabledTiers.has(tier));
  if (excluded.length) {
    message += ` Excluded: ${excluded.map((tier) => `${prefix}${tier}`).join(", ")}.`;
  }

  summary.textContent = message;
}

function renderBranchControls() {
  const savedSettings = loadSettings();
  
  branchControlsContainer.innerHTML = "";
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
    branchControlsContainer.append(card);

    // Load saved settings or use defaults
    const branchSettings = savedSettings?.branches?.[branch.key];
    const initialEnabled = branchSettings?.enabled ?? true;
    const initialMaxTier = branchSettings?.maxTier ?? branch.defaultTier;
    const initialEnabledTiers = branchSettings?.enabledTiers 
      ? new Set(branchSettings.enabledTiers)
      : new Set(branch.tiers); // Default: all tiers enabled

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
      updateResults();
      saveSettings();
    });

    select.addEventListener("change", () => {
      updateTierControls(branch.key);
      updateBranchSummary(branch.key);
      updateResults();
      saveSettings();
    });

    select.disabled = !checkbox.checked;
    updateTierControls(branch.key);
    updateBranchSummary(branch.key);
  });
  
  // Load saved input values
  if (savedSettings) {
    if (savedSettings.leadership) leadershipInput.value = savedSettings.leadership;
    if (savedSettings.cushion) cushionInput.value = savedSettings.cushion;
    if (savedSettings.branchCushion !== undefined) branchCushionInput.value = savedSettings.branchCushion;
    if (savedSettings.meleeCushion !== undefined) meleeCushionInput.value = savedSettings.meleeCushion;
    if (savedSettings.mountedCushion !== undefined) mountedCushionInput.value = savedSettings.mountedCushion;
    if (savedSettings.rangedCushion !== undefined) rangedCushionInput.value = savedSettings.rangedCushion;
    if (savedSettings.flyingCushion !== undefined) flyingCushionInput.value = savedSettings.flyingCushion;
    if (savedSettings.unitPadding !== undefined) {
      const unitPaddingInput = document.getElementById('unit-padding-input');
      if (unitPaddingInput) unitPaddingInput.value = savedSettings.unitPadding;
    }
    if (savedSettings.targetHealth) targetHealthInput.value = savedSettings.targetHealth;
  }
  
  updateResults();
}

function getSelectedUnits() {
  const activeTierCache = new Map();
  const units = TROOPS.filter((unit) => {
    const entry = branchElements[unit.branch];
    if (!entry || !entry.checkbox.checked) {
      return false;
    }

    if (!activeTierCache.has(entry)) {
      const activeTiers = getBranchActiveTiers(entry);
      activeTierCache.set(entry, activeTiers.length ? new Set(activeTiers) : null);
    }

    const activeTierSet = activeTierCache.get(entry);
    return activeTierSet ? activeTierSet.has(unit.tier) : false;
  });

  // Define role priority based on stacking mode
  // Default mode: flying > mounted > melee > ranged (flying most protected)
  // Death Order Mode: melee > mounted > ranged > flying (melee tanks, gets attacked first)
  const rolePriority = useDeathOrderMode ? {
    melee: 1,
    mounted: 2,
    ranged: 3,
    flying: 4
  } : {
    flying: 1,
    mounted: 2,
    melee: 3,
    ranged: 4
  };

  return units.sort((a, b) => {
    // First: sort by tier (descending - highest tier first)
    if (b.tier !== a.tier) {
      return b.tier - a.tier;
    }
    
    // Second: sort by branch (Guards before Specialists)
    if (a.branch !== b.branch) {
      return a.branch.localeCompare(b.branch);
    }
    
    // Third: sort by role priority
    const aPriority = rolePriority[a.role] || 999;
    const bPriority = rolePriority[b.role] || 999;
    return aPriority - bPriority;
  });
}

/**
 * Death Order Mode: Calculate unit composition to achieve exact death sequence
 * GOAL: S5 Melee (highest health, dies first) → ... → G7 Flying (lowest health, dies last)
 * Simple approach: Calculate exact target health pools, convert to units, scale if needed
 */
function computeDeathOrderRecommendation() {
  const leadershipCap = Number(leadershipInput.value) || 0;
  const unitPaddingPercent = Math.max(0.1, Number(document.getElementById('unit-padding-input')?.value || 0.5));
  
  // Load stat bonuses
  const statBonuses = loadStatBonuses();
  
  const allUnits = getSelectedUnits();
  
  // Filter out excluded units before calculation
  const units = allUnits.filter(unit => !excludedUnits.has(unit.id));
  
  if (!leadershipCap || leadershipCap <= 0) {
    return { error: "Set a leadership cap above zero.", rows: [], totals: null };
  }
  
  if (units.length === 0) {
    return { 
      error: "Enable at least one troop branch and tier to build a hero stack.", 
      rows: [], 
      totals: null 
    };
  }
  
  // Step 1: Define death sequence
  // S5 Melee dies FIRST (position 0) → G7 Flying dies LAST (position N-1)
  const deathSequence = units.slice().sort((a, b) => {
    // Lower tier = dies first (S5 before S6 before S7)
    if (a.tier !== b.tier) return a.tier - b.tier;
    
    // Within same tier: Specialists before Guards
    if (a.branch !== b.branch) {
      const branchOrder = { "Specialists": 0, "Guards": 1 };
      return (branchOrder[a.branch] || 2) - (branchOrder[b.branch] || 2);
    }
    
    // Within same tier/branch: melee → mounted → ranged → flying
    const rolePriority = { "melee": 0, "mounted": 1, "ranged": 2, "flying": 3 };
    return (rolePriority[a.role] || 999) - (rolePriority[b.role] || 999);
  });
  
  // Step 2: Calculate health ratios that will give us the desired death order
  // The FIRST unit (S5 Melee) should have the MOST health
  // Work FORWARD, calculating what multiplier each position needs
  const numUnits = deathSequence.length;
  const healthRatios = new Map();
  
  // Position 0 (dies first) gets the HIGHEST ratio
  // Each subsequent position gets ratio reduced by padding%
  for (let i = 0; i < numUnits; i++) {
    const unit = deathSequence[i];
    const unitKey = `${unit.branch}-${unit.tier}-${unit.role}`;
    
    // Dies first (position 0) = highest ratio
    // Dies last (position N-1) = ratio of 1.0
    const stepsFromEnd = numUnits - 1 - i;
    const ratio = Math.pow(1 + unitPaddingPercent / 100, stepsFromEnd);
    
    healthRatios.set(unitKey, ratio);
  }
  
  // Step 3: Calculate "target health per leadership point" for each unit
  // This accounts for different base health AND desired death order
  const enrichedUnits = deathSequence.map(unit => {
    const unitKey = `${unit.branch}-${unit.tier}-${unit.role}`;
    const statBonus = getStatBonus(unit.branch, unit.role, statBonuses);
    const actualUnitHealth = unit.health * statBonus;
    const ratio = healthRatios.get(unitKey);
    
    // Target health per leadership point = (unit health × ratio) / leadership cost
    const targetHealthPerLeadership = (actualUnitHealth * ratio) / unit.leadership;
    
    return {
      unit,
      unitKey,
      actualUnitHealth,
      ratio,
      targetHealthPerLeadership,
      leadershipCost: unit.leadership,
    };
  });
  
  // Step 4: Calculate total "target health weight" 
  const totalWeight = enrichedUnits.reduce((sum, eu) => sum + eu.targetHealthPerLeadership, 0);
  
  // Step 5: Distribute leadership proportionally based on target health weights
  // This ensures units dying earlier get MORE leadership (and thus more health)
  const rows = enrichedUnits.map(eu => {
    // Leadership share proportional to target health weight
    const leadershipShare = (eu.targetHealthPerLeadership / totalWeight) * leadershipCap;
    
    // Convert leadership to units
    const unitsFromLeadership = leadershipShare / eu.leadershipCost;
    const assignedUnits = Math.max(1, Math.round(unitsFromLeadership));
    
    const leadershipUsed = assignedUnits * eu.leadershipCost;
    const healthPool = assignedUnits * eu.actualUnitHealth;
    
    return {
      id: `${eu.unit.branch}-${eu.unit.tier}-${eu.unit.role}`,
      branch: eu.unit.branch,
      tier: eu.unit.tier,
      role: eu.unit.role,
      leadership: eu.unit.leadership,
      assignedUnits,
      leadershipUsed,
      healthShare: 0, // Calculated after totals
      healthPool,
      notes: "",
    };
  });
  
  // Calculate totals
  const totalLeadership = rows.reduce((sum, r) => sum + r.leadershipUsed, 0);
  const totalHealth = rows.reduce((sum, r) => sum + r.healthPool, 0);
  
  // Update health shares
  rows.forEach((row) => {
    row.healthShare = totalHealth > 0 ? (row.healthPool / totalHealth) * 100 : 0;
  });
  
  // Build totals object to match computeRecommendation() structure
  const totals = {
    leadershipCap,
    usedLeadership: totalLeadership,
    leftover: leadershipCap - totalLeadership,
    totalHealth,
    topTier: rows.length > 0 ? rows[0].id : '',
    healthPerLeadership: totalLeadership > 0 ? totalHealth / totalLeadership : 0,
    cushionPercent: unitPaddingPercent, // Show the unit padding in death order mode
  };
  
  return {
    rows,
    totals,
    error: null,
    warning: totalLeadership > leadershipCap ? "⚠️ Exceeds leadership cap! Reduce padding or disable some units." : null,
  };
}

function computeRecommendation() {
  const leadershipCap = Number(leadershipInput.value) || 0;
  const cushionPercent = Math.max(0, Number(cushionInput.value) || 0);
  const branchCushionPercent = Math.max(0, Number(branchCushionInput.value) || 0);
  
  // Individual role cushion percentages
  const roleCushionPercents = {
    melee: Math.max(0, Number(meleeCushionInput.value) || 0),
    mounted: Math.max(0, Number(mountedCushionInput.value) || 0),
    ranged: Math.max(0, Number(rangedCushionInput.value) || 0),
    flying: Math.max(0, Number(flyingCushionInput.value) || 0)
  };
  
  // Load stat bonuses
  const statBonuses = loadStatBonuses();
  
  const targetHealth = Math.max(1000, Number(targetHealthInput.value) || 1000000);
  const allUnits = getSelectedUnits();
  
  // Filter out excluded units
  const units = allUnits.filter(unit => !excludedUnits.has(unit.id));

  if (!leadershipCap || leadershipCap <= 0) {
    return { error: "Set a leadership cap above zero.", rows: [], totals: null };
  }

  if (!units.length) {
    return { error: "Enable at least one troop branch and tier to build a hero stack.", rows: [], totals: null };
  }

  // Find min and max tiers to calculate tier-based health properly
  const minTier = Math.min(...units.map(u => u.tier));
  const maxTier = Math.max(...units.map(u => u.tier));
  
  // Define branch indices for padding calculation (death order priority)
  // Specialists die first, Guards die last
  const branchIndices = {
    "Specialists": 0,
    "Guards": 1
  };
  
  // Define role indices for padding calculation (death order priority)
  const roleIndices = {
    melee: 0,
    mounted: 1,
    ranged: 2,
    flying: 3
  };
  
  // Each unit type should get roughly equal health
  // Apply ADDITIVE (non-cumulative) padding for tiers, branches, and roles
  // IMPORTANT: HIGHER health = attacked FIRST = dies FIRST
  const enrichedUnits = units.map((unit) => {
    // Tier boost: LOWER tier numbers get MORE health (die first)
    // Tier 5: tierIndex = 7-5 = 2 → gets MORE health (dies first)
    // Tier 6: tierIndex = 7-6 = 1 → gets MORE health
    // Tier 7 (maxTier): tierIndex = 7-7 = 0 → baseline (LOWEST health, most protected)
    const tierIndex = maxTier - unit.tier;
    const tierBoost = 1 + (cushionPercent / 100) * tierIndex;
    
    // Branch boost: Specialists get MORE health than Guards (die first within tier)
    // Specialists: branchIndex = 0 → gets MORE health (dies first)
    // Guards: branchIndex = 1 → baseline (LOWER health, more protected)
    const branchIndex = branchIndices[unit.branch] || 0;
    const branchBoost = 1 + (branchCushionPercent / 100) * (1 - branchIndex);
    
    // Role boost: Use individual role padding values directly
    // Higher % = MORE health = dies FIRST
    // Lower % = LESS health = more protected
    const roleCushionPercent = roleCushionPercents[unit.role] || 0;
    const roleBoost = 1 + (roleCushionPercent / 100);
    
    // Combined boost: tier × branch × role padding
    const combinedBoost = tierBoost * branchBoost * roleBoost;
    
    // Apply stat bonus to base unit health to get ACTUAL in-game health
    const statBonus = getStatBonus(unit.branch, unit.role, statBonuses);
    const actualUnitHealth = unit.health * statBonus;
    
    // Each unit type gets target health multiplied by combined boost
    const unitTargetHealth = targetHealth * combinedBoost;
    
    // Convert target health to number of units (using ACTUAL health)
    const unitsNeeded = unitTargetHealth / actualUnitHealth;
    
    // Weight by leadership for allocation
    const leadershipWeight = unitsNeeded * unit.leadership;
    
    return {
      unit,
      tierIndex,
      branchIndex,
      tierBoost,
      branchBoost,
      roleBoost,
      combinedBoost,
      relativeUnits: unitsNeeded,
      leadershipWeight,
      expectedUnits: 0,
      assignedUnits: 0,
      fraction: 0,
    };
  });

  const totalRelativeLeadership = enrichedUnits.reduce((sum, entry) => sum + entry.leadershipWeight, 0);

  if (totalRelativeLeadership === 0) {
    return { error: "Unable to compute ratios for the selected units.", rows: [], totals: null };
  }

  // Scale the relative units to fit within leadership cap
  const scale = leadershipCap / totalRelativeLeadership;
  
  enrichedUnits.forEach((entry) => {
    const expectedUnits = entry.relativeUnits * scale;
    entry.expectedUnits = expectedUnits;
    entry.assignedUnits = Math.floor(expectedUnits);
    entry.fraction = expectedUnits - entry.assignedUnits;
  });

  let usedLeadership = enrichedUnits.reduce((sum, entry) => sum + entry.assignedUnits * entry.unit.leadership, 0);

  // Distribute remaining leadership starting with the largest fractional components.
  let leftover = leadershipCap - usedLeadership;
  if (leftover >= Math.min(...enrichedUnits.map((entry) => entry.unit.leadership))) {
    const fractionalOrder = [...enrichedUnits].sort((a, b) => b.fraction - a.fraction);
    fractionalOrder.forEach((entry) => {
      if (leftover >= entry.unit.leadership && entry.fraction > 0) {
        entry.assignedUnits += 1;
        leftover -= entry.unit.leadership;
      }
    });
  }

  usedLeadership = enrichedUnits.reduce((sum, entry) => sum + entry.assignedUnits * entry.unit.leadership, 0);
  leftover = leadershipCap - usedLeadership;

  // Ensure the highest tier is represented when there is enough leadership to field at least one.
  if (enrichedUnits[0].assignedUnits === 0 && leadershipCap >= enrichedUnits[0].unit.leadership) {
    let required = enrichedUnits[0].unit.leadership - Math.max(0, leftover);
    const donors = enrichedUnits
      .slice(1)
      .filter((entry) => entry.assignedUnits > 0)
      .sort((a, b) => a.unit.health - b.unit.health); // peel from the weakest units first

    for (const donor of donors) {
      while (donor.assignedUnits > 0 && required > 0) {
        donor.assignedUnits -= 1;
        usedLeadership -= donor.unit.leadership;
        required -= donor.unit.leadership;
      }
      if (required <= 0) {
        break;
      }
    }

    if (required <= 0) {
      enrichedUnits[0].assignedUnits = 1;
      usedLeadership += enrichedUnits[0].unit.leadership;
      leftover = leadershipCap - usedLeadership;
    }
  }

  // Calculate total health using actual health (with bonuses)
  const totalHealth = enrichedUnits.reduce((sum, entry) => {
    const statBonus = getStatBonus(entry.unit.branch, entry.unit.role, statBonuses);
    const actualUnitHealth = entry.unit.health * statBonus;
    return sum + entry.assignedUnits * actualUnitHealth;
  }, 0);
  
  const highestUnit = enrichedUnits[0];
  const highestStatBonus = getStatBonus(highestUnit.unit.branch, highestUnit.unit.role, statBonuses);
  const highestActualHealth = highestUnit.unit.health * highestStatBonus;
  const highestHealthPool = highestUnit.assignedUnits * highestActualHealth || 1;

  const rows = enrichedUnits.map((entry) => {
    const leadershipUsed = entry.assignedUnits * entry.unit.leadership;
    // Use actual health (with stat bonus applied)
    const statBonus = getStatBonus(entry.unit.branch, entry.unit.role, statBonuses);
    const actualUnitHealth = entry.unit.health * statBonus;
    const healthPool = entry.assignedUnits * actualUnitHealth;
    const healthShare = totalHealth > 0 ? healthPool / totalHealth : 0;
    const relativeToTop = healthPool && highestHealthPool ? healthPool / highestHealthPool : 0;
    const notes = entry.tierIndex === 0
      ? "Top tier"
      : `${((relativeToTop - 1) * 100).toFixed(1)}% vs top tier`;
    return {
      id: entry.unit.id,
      name: entry.unit.name,
      role: entry.unit.role,
      tier: entry.unit.tier,
      branch: entry.unit.branch,
      leadershipUsed,
      assignedUnits: entry.assignedUnits,
      healthPool,
      healthShare,
      notes,
    };
  });

  return {
    rows,
    totals: {
      leadershipCap,
      usedLeadership,
      leftover,
      totalHealth,
      topTier: enrichedUnits[0].unit.id,
      healthPerLeadership: usedLeadership ? totalHealth / usedLeadership : 0,
      cushionPercent,
    },
    warning: enrichedUnits[0].assignedUnits === 0 ? "Leadership cap is too low for the hero to include the top tier." : "",
  };
}

function formatNumber(value) {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return "-";
  }
  return numberFormatter.format(value);
}

function formatLeadership(leadership) {
  return `${formatNumber(leadership)} pts`;
}

function formatPercent(value) {
  return percentFormatter.format(value);
}

function updateArmyProgress() {
  const progressFill = document.getElementById("army-progress-fill");
  const progressText = document.getElementById("army-progress-text");
  
  if (!currentResults.length) {
    progressFill.style.width = "0%";
    progressText.textContent = "0 / 0";
    return;
  }
  
  // Calculate total leadership from checked units
  let checkedLeadership = 0;
  let totalLeadership = 0;
  
  currentResults.forEach(row => {
    const unitKey = `${row.id}-${row.assignedUnits}`;
    totalLeadership += row.leadershipUsed;
    if (checkedUnits.has(unitKey)) {
      checkedLeadership += row.leadershipUsed;
    }
  });
  
  const percentage = totalLeadership > 0 ? (checkedLeadership / totalLeadership) * 100 : 0;
  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${formatNumber(checkedLeadership)} / ${formatNumber(totalLeadership)}`;
  
  // Change color based on progress
  if (percentage >= 100) {
    progressFill.style.background = "linear-gradient(90deg, #10b981, #059669)";
  } else if (percentage >= 75) {
    progressFill.style.background = "linear-gradient(90deg, #3b82f6, #2563eb)";
  } else if (percentage >= 50) {
    progressFill.style.background = "linear-gradient(90deg, #eab308, #ca8a04)";
  } else {
    progressFill.style.background = "linear-gradient(90deg, #94a3b8, #64748b)";
  }
}

function updateResults() {
  // Choose calculation method based on mode
  const { rows, totals, error, warning } = useDeathOrderMode 
    ? computeDeathOrderRecommendation()
    : computeRecommendation();
  resultTableBody.innerHTML = "";
  
  // Store current results for army progress calculation
  currentResults = rows;

  if (error) {
    summaryEl.innerHTML = "";
    warningEl.textContent = error;
    warningEl.classList.remove("hidden");
    currentResults = [];
    updateArmyProgress();
    return;
  }

  // Get all selected units (including excluded ones) to display them greyed out
  const allUnits = getSelectedUnits();
  const excludedUnitRows = allUnits
    .filter(unit => excludedUnits.has(unit.id))
    .map(unit => ({
      id: unit.id,
      name: unit.name,
      tier: unit.tier,
      role: unit.role,
      branch: unit.branch,
      assignedUnits: 0,
      leadershipUsed: 0,
      healthPool: 0,
      healthShare: 0,
      notes: "Excluded"
    }));

  // Combine calculated rows with excluded unit rows
  const allRows = [...rows, ...excludedUnitRows];
  
  // Sort based on display mode
  if (displayOrderMode === 'death') {
    // Death Order: Sort by actual health pool (DESCENDING - highest health dies first)
    allRows.sort((a, b) => {
      // Primary sort: health pool (DESCENDING - higher health = attacked first)
      if (a.healthPool !== b.healthPool) return b.healthPool - a.healthPool;
      
      // Secondary: if same health (rare), sort by tier then branch then role
      if (a.tier !== b.tier) return a.tier - b.tier;
      const branchOrder = { "Specialists": 1, "Guards": 2 };
      const branchDiff = (branchOrder[a.branch] || 3) - (branchOrder[b.branch] || 3);
      if (branchDiff !== 0) return branchDiff;
      const rolePriority = { "melee": 1, "mounted": 2, "ranged": 3, "flying": 4 };
      return (rolePriority[a.role] || 999) - (rolePriority[b.role] || 999);
    });
  } else if (displayOrderMode === 'game') {
    // Game UI Order: Sort by leadership (desc), tier (desc), branch (Specialists first), role
    const gameUIRolePriority = {
      "melee": 1, "mounted": 2, "ranged": 3, "flying": 4
    };
    
    allRows.sort((a, b) => {
      // Find leadership for each unit
      const aUnit = TROOPS.find(u => u.id === a.id);
      const bUnit = TROOPS.find(u => u.id === b.id);
      const aLeadership = aUnit ? aUnit.leadership : 0;
      const bLeadership = bUnit ? bUnit.leadership : 0;
      
      // 1. Sort by leadership (descending - highest first)
      if (bLeadership !== aLeadership) return bLeadership - aLeadership;
      
      // 2. Sort by tier (descending - highest tier first)
      if (b.tier !== a.tier) return b.tier - a.tier;
      
      // 3. Sort by branch (Specialists before Guards)
      const branchOrder = { "Specialists": 1, "Guards": 2 };
      const branchDiff = (branchOrder[a.branch] || 3) - (branchOrder[b.branch] || 3);
      if (branchDiff !== 0) return branchDiff;
      
      // 4. Sort by role
      return (gameUIRolePriority[a.role] || 999) - (gameUIRolePriority[b.role] || 999);
    });
  } else {
    // Default/Tier Order: Sort by tier (desc), then by branch priority, then by role
    // Use the same role priority as getSelectedUnits (matches Death Order Mode if enabled)
    const displayRolePriority = useDeathOrderMode ? {
      "melee": 1, "mounted": 2, "ranged": 3, "flying": 4
    } : {
      "flying": 1, "mounted": 2, "melee": 3, "ranged": 4
    };
    
    allRows.sort((a, b) => {
      if (a.tier !== b.tier) return b.tier - a.tier;
      const branchOrder = { "Guards": 1, "Specialists": 2 };
      const branchDiff = (branchOrder[a.branch] || 3) - (branchOrder[b.branch] || 3);
      if (branchDiff !== 0) return branchDiff;
      return (displayRolePriority[a.role] || 999) - (displayRolePriority[b.role] || 999);
    });
  }

  if (!allRows.length) {
    summaryEl.innerHTML = "";
    warningEl.classList.add("hidden");
    currentResults = [];
    updateArmyProgress();
    return;
  }

  warningEl.textContent = warning || "";
  warningEl.classList.toggle("hidden", !warning);

  // Group rows by tier/leadership for visual organization
  let currentTier = null;
  let currentLeadership = null;
  
  allRows.forEach((row, index) => {
    const unitTier = row.tier;
    
    if (displayOrderMode === 'death') {
      // Death Order: No grouping headers, just show sequential death order
      // Headers are omitted to show pure death sequence
    } else if (displayOrderMode === 'game') {
      // In Game UI Order: Add leadership headers instead of tier headers
      const unit = TROOPS.find(u => u.id === row.id);
      const leadership = unit ? unit.leadership : 0;
      
      if (currentLeadership !== leadership) {
        const leadershipHeaderRow = document.createElement("tr");
        leadershipHeaderRow.className = `tier-header`;
        const leadershipLabel = leadership === 20 ? "Flying (20 Leadership)" 
                              : leadership === 2 ? "Mounted (2 Leadership)"
                              : leadership === 1 ? "Infantry (1 Leadership)"
                              : `${leadership} Leadership`;
        leadershipHeaderRow.innerHTML = `
          <td colspan="9" class="tier-header-cell">
            <span class="tier-badge">${leadershipLabel}</span>
          </td>
        `;
        resultTableBody.append(leadershipHeaderRow);
        currentLeadership = leadership;
      }
    } else {
      // Default/Tier Order: Add tier headers when tier changes
      if (currentTier !== unitTier) {
        const tierHeaderRow = document.createElement("tr");
        tierHeaderRow.className = `tier-header tier-${unitTier}`;
        tierHeaderRow.innerHTML = `
          <td colspan="9" class="tier-header-cell">
            <span class="tier-badge">Tier ${unitTier}</span>
          </td>
        `;
        resultTableBody.append(tierHeaderRow);
        currentTier = unitTier;
      }
    }
    
    // Extract base unit ID (remove role suffix like -F, -M, -R, -ML)
    const baseId = row.id.replace(/-(F|M|R|ML)$/, '');
    
    const tr = document.createElement("tr");
    tr.className = `tier-${unitTier}-row`;
    const unitKey = `${row.id}-${row.assignedUnits}`;
    const isChecked = checkedUnits.has(unitKey);
    const isExcluded = excludedUnits.has(row.id);
    
    if (isExcluded) {
      tr.classList.add('excluded-row');
    } else if (isChecked) {
      tr.classList.add('checked-row');
    }
    
    // In death order mode, add sequence indicator and death rank
    let notesContent = row.notes;
    if (displayOrderMode === 'death' && !isExcluded) {
      const deathRank = index + 1 - (index > 0 ? allRows.slice(0, index).filter(r => excludedUnits.has(r.id)).length : 0);
      const prevRow = index > 0 ? allRows[index - 1] : null;
      
      // Validate sequence: check if unit follows expected pattern (descending health)
      let sequenceStatus = 'ok';
      if (prevRow && !excludedUnits.has(prevRow.id)) {
        // Should die after previous (have LESS health since sorting descending)
        if (row.healthPool > prevRow.healthPool) {
          sequenceStatus = 'error'; // Out of order!
        }
        // Calculate % difference from previous (negative means less health)
        const diff = ((row.healthPool - prevRow.healthPool) / prevRow.healthPool * 100).toFixed(2);
        notesContent = `<span class="sequence-indicator sequence-${sequenceStatus}">${deathRank}</span>${diff}% vs prev`;
      } else {
        notesContent = `<span class="sequence-indicator sequence-ok">${deathRank}</span>Dies first`;
      }
    }
    
    tr.innerHTML = `
      <td class="include-cell">
        <input type="checkbox" class="include-checkbox" data-unit-id="${row.id}" ${!isExcluded ? 'checked' : ''}>
      </td>
      <td class="check-cell">
        <input type="checkbox" class="unit-checkbox" data-unit-key="${unitKey}" ${isChecked ? 'checked' : ''}>
      </td>
      <td class="unit-id-cell"><span class="unit-id tier-${row.tier}-id">${baseId}</span></td>
      <td><span class="role-badge role-${row.role}">${row.role}</span></td>
      <td class="units-cell">
        <span class="units-value">${formatNumber(row.assignedUnits)}</span>
        <button class="copy-btn" data-value="${row.assignedUnits}" title="Copy to clipboard">📋</button>
      </td>
      <td>${formatLeadership(row.leadershipUsed)}</td>
      <td>${formatNumber(row.healthPool)}</td>
      <td>${formatPercent(row.healthShare)}</td>
      <td>${notesContent}</td>
    `;
    
    // Add click handler for include checkbox
    const includeCheckbox = tr.querySelector('.include-checkbox');
    includeCheckbox.addEventListener('change', (e) => {
      e.stopPropagation();
      const unitId = includeCheckbox.dataset.unitId;
      if (includeCheckbox.checked) {
        excludedUnits.delete(unitId);
      } else {
        excludedUnits.add(unitId);
      }
      saveExcludedUnits(excludedUnits);
      updateResults(); // Recalculate without the excluded unit
      updateArmyProgress();
    });
    
    // Add click handler for "added" checkbox
    const checkbox = tr.querySelector('.unit-checkbox');
    checkbox.addEventListener('change', (e) => {
      e.stopPropagation();
      const key = checkbox.dataset.unitKey;
      if (checkbox.checked) {
        checkedUnits.add(key);
        tr.classList.add('checked-row');
      } else {
        checkedUnits.delete(key);
        tr.classList.remove('checked-row');
      }
      saveCheckedUnits(checkedUnits);
      updateArmyProgress();
    });
    
    // Add copy button handler
    const copyBtn = tr.querySelector('.copy-btn');
    copyBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const value = copyBtn.dataset.value;
      try {
        await navigator.clipboard.writeText(value);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.classList.remove('copied');
        }, 1500);
      } catch (err) {
        console.error('Failed to copy:', err);
        copyBtn.textContent = '✗';
        setTimeout(() => {
          copyBtn.textContent = '📋';
        }, 1500);
      }
    });
    
    // Allow clicking anywhere on row to toggle checkbox (except copy button)
    tr.addEventListener('click', (e) => {
      if (e.target.type !== 'checkbox' && !e.target.classList.contains('copy-btn')) {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
      }
    });
    
    resultTableBody.append(tr);
  });

  const leftoverLabel = totals.leftover > 0
    ? `${formatLeadership(totals.leftover)} spare`
    : totals.leftover < 0
      ? `${formatLeadership(Math.abs(totals.leftover))} over cap`
      : "uses full leadership";

  const branchCushionPercent = Math.max(0, Number(branchCushionInput.value) || 0);
  
  // Check if any role padding is active
  const roleValues = {
    melee: Math.max(0, Number(meleeCushionInput.value) || 0),
    mounted: Math.max(0, Number(mountedCushionInput.value) || 0),
    ranged: Math.max(0, Number(rangedCushionInput.value) || 0),
    flying: Math.max(0, Number(flyingCushionInput.value) || 0)
  };
  const hasRolePadding = Object.values(roleValues).some(v => v > 0);
  
  // In Death Order Mode, show different padding label
  let paddingInfo;
  if (useDeathOrderMode) {
    paddingInfo = ` Unit padding: <strong>${totals.cushionPercent}%</strong>.`;
  } else {
    const branchInfo = branchCushionPercent > 0 
      ? ` Branch padding: <strong>${branchCushionPercent}%</strong>.`
      : '';
    const roleInfo = hasRolePadding
      ? ` Role padding: M<strong>${roleValues.melee}%</strong>/Mt<strong>${roleValues.mounted}%</strong>/R<strong>${roleValues.ranged}%</strong>/F<strong>${roleValues.flying}%</strong>.`
      : '';
    paddingInfo = ` Tier padding: <strong>${totals.cushionPercent}%</strong>.${branchInfo}${roleInfo}`;
  }
  
  summaryEl.innerHTML = `
    Hero deploys <strong>${formatLeadership(totals.usedLeadership)}</strong> of
    <strong>${formatLeadership(totals.leadershipCap)}</strong> —
    ${leftoverLabel}. Total stack health:
    <strong>${formatNumber(totals.totalHealth)}</strong>.${paddingInfo}
  `;
  
  // Update army progress bar
  updateArmyProgress();
  
  // If monster calculator is in match mode, update it as troop results changed
  if (monsterModeSelect && monsterModeSelect.value === "match") {
    updateMonsterResults();
  }
}

function initEvents() {
  if (leadershipInput) {
    leadershipInput.addEventListener("input", () => {
      updateResults();
      saveSettings();
    });
  }
  if (cushionInput) {
    cushionInput.addEventListener("input", () => {
      updateResults();
      saveSettings();
    });
  }
  if (branchCushionInput) {
    branchCushionInput.addEventListener("input", () => {
      updateResults();
      saveSettings();
    });
  }
  
  // Role cushion inputs
  if (meleeCushionInput) {
    meleeCushionInput.addEventListener("input", () => {
      updateResults();
      saveSettings();
    });
  }
  if (mountedCushionInput) {
    mountedCushionInput.addEventListener("input", () => {
      updateResults();
      saveSettings();
    });
  }
  if (rangedCushionInput) {
    rangedCushionInput.addEventListener("input", () => {
      updateResults();
      saveSettings();
    });
  }
  if (flyingCushionInput) {
    flyingCushionInput.addEventListener("input", () => {
      updateResults();
      saveSettings();
    });
  }
  
  if (targetHealthInput) {
    targetHealthInput.addEventListener("input", () => {
      updateResults();
      saveSettings();
    });
  }
  
  // Role padding control buttons
  const resetRolePaddingBtn = document.getElementById("reset-role-padding-btn");
  if (resetRolePaddingBtn) {
    resetRolePaddingBtn.addEventListener("click", () => {
      meleeCushionInput.value = "3";
      mountedCushionInput.value = "2";
      rangedCushionInput.value = "1";
      flyingCushionInput.value = "0";
      updateResults();
      saveSettings();
    });
  }
  
  const clearRolePaddingBtn = document.getElementById("clear-role-padding-btn");
  if (clearRolePaddingBtn) {
    clearRolePaddingBtn.addEventListener("click", () => {
      meleeCushionInput.value = "0";
      mountedCushionInput.value = "0";
      rangedCushionInput.value = "0";
      flyingCushionInput.value = "0";
      updateResults();
      saveSettings();
    });
  }
  
  // Death Order Mode checkbox
  const deathOrderModeCheckbox = document.getElementById("death-order-mode");
  const deathOrderModeSettings = document.getElementById("inverse-mode-settings");
  const unitPaddingInput = document.getElementById("unit-padding-input");
  
  if (deathOrderModeCheckbox) {
    deathOrderModeCheckbox.checked = useDeathOrderMode;
    
    // Show/hide death order mode settings
    if (deathOrderModeSettings) {
      deathOrderModeSettings.style.display = useDeathOrderMode ? "block" : "none";
    }
    
    // Set initial state of normal mode controls
    toggleNormalModeControls(!useDeathOrderMode);
    
    deathOrderModeCheckbox.addEventListener("change", () => {
      useDeathOrderMode = deathOrderModeCheckbox.checked;
      saveDeathOrderMode(useDeathOrderMode);
      
      // Toggle settings visibility
      if (deathOrderModeSettings) {
        deathOrderModeSettings.style.display = useDeathOrderMode ? "block" : "none";
      }
      
      // Hide/disable irrelevant controls in Death Order Mode
      toggleNormalModeControls(!useDeathOrderMode);
      
      updateResults();
    });
  }
  
  // Unit padding input (for death order mode)
  if (unitPaddingInput) {
    unitPaddingInput.addEventListener("input", () => {
      if (useDeathOrderMode) {
        saveSettings();
        updateResults();
      }
    });
  }
  
  // Display order radio buttons
  const deathOrderRadio = document.getElementById("death-order");
  const defaultOrderRadio = document.getElementById("default-order");
  const gameUIOrderRadio = document.getElementById("game-ui-order");
  
  // Set initial state
  if (deathOrderRadio && defaultOrderRadio && gameUIOrderRadio) {
    if (displayOrderMode === 'death') {
      deathOrderRadio.checked = true;
    } else if (displayOrderMode === 'game') {
      gameUIOrderRadio.checked = true;
    } else {
      defaultOrderRadio.checked = true;
    }
    
    // Add change listeners
    [deathOrderRadio, defaultOrderRadio, gameUIOrderRadio].forEach(radio => {
      if (radio) {
        radio.addEventListener("change", () => {
          if (radio.checked) {
            displayOrderMode = radio.value;
            saveDisplayOrderMode(displayOrderMode);
            updateResults();
          }
        });
      }
    });
  }
  
  // Clear checked units button
  const clearCheckedBtn = document.getElementById("clear-checked-btn");
  clearCheckedBtn.addEventListener("click", () => {
    checkedUnits.clear();
    saveCheckedUnits(checkedUnits);
    updateResults();
    updateArmyProgress();
  });
  
  // Stat bonuses section collapse/expand
  const statBonusesHeader = document.getElementById("stat-bonuses-header");
  const statBonusesContent = document.getElementById("stat-bonuses-content");
  if (statBonusesHeader && statBonusesContent) {
    statBonusesHeader.addEventListener("click", () => {
      statBonusesHeader.classList.toggle("collapsed");
      statBonusesContent.classList.toggle("collapsed");
    });
  }
  
  // Load saved bonuses into inputs
  const savedBonuses = loadStatBonuses();
  const bonusInputs = {
    "s-melee-bonus": savedBonuses["Specialists-melee"],
    "s-mounted-bonus": savedBonuses["Specialists-mounted"],
    "s-ranged-bonus": savedBonuses["Specialists-ranged"],
    "s-flying-bonus": savedBonuses["Specialists-flying"],
    "g-melee-bonus": savedBonuses["Guards-melee"],
    "g-mounted-bonus": savedBonuses["Guards-mounted"],
    "g-ranged-bonus": savedBonuses["Guards-ranged"],
    "g-flying-bonus": savedBonuses["Guards-flying"]
  };
  
  Object.entries(bonusInputs).forEach(([id, value]) => {
    const input = document.getElementById(id);
    if (input && value !== undefined) {
      input.value = value;
    }
  });
  
  // Bonus input change handlers
  Object.keys(bonusInputs).forEach((id) => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener("input", () => {
        // Auto-save on change
        const bonuses = {
          "Specialists-melee": Number(document.getElementById("s-melee-bonus").value) || 1,
          "Specialists-mounted": Number(document.getElementById("s-mounted-bonus").value) || 1,
          "Specialists-ranged": Number(document.getElementById("s-ranged-bonus").value) || 1,
          "Specialists-flying": Number(document.getElementById("s-flying-bonus").value) || 1,
          "Guards-melee": Number(document.getElementById("g-melee-bonus").value) || 1,
          "Guards-mounted": Number(document.getElementById("g-mounted-bonus").value) || 1,
          "Guards-ranged": Number(document.getElementById("g-ranged-bonus").value) || 1,
          "Guards-flying": Number(document.getElementById("g-flying-bonus").value) || 1
        };
        saveStatBonuses(bonuses);
        updateBonusStatusBadge(bonuses);
      });
    }
  });
  
  // Reset bonuses button
  const resetBonusesBtn = document.getElementById("reset-bonuses-btn");
  if (resetBonusesBtn) {
    resetBonusesBtn.addEventListener("click", () => {
      Object.keys(bonusInputs).forEach((id) => {
        const input = document.getElementById(id);
        if (input) input.value = "1.0";
      });
      const bonuses = {
        "Specialists-melee": 1.0,
        "Specialists-mounted": 1.0,
        "Specialists-ranged": 1.0,
        "Specialists-flying": 1.0,
        "Guards-melee": 1.0,
        "Guards-mounted": 1.0,
        "Guards-ranged": 1.0,
        "Guards-flying": 1.0
      };
      saveStatBonuses(bonuses);
      updateBonusStatusBadge(bonuses);
      updateResults();
    });
  }
  
  // Apply bonuses button
  const applyBonusesBtn = document.getElementById("apply-bonuses-btn");
  if (applyBonusesBtn) {
    applyBonusesBtn.addEventListener("click", () => {
      updateResults();
    });
  }
  
  // Initial status badge update
  updateBonusStatusBadge(savedBonuses);
}

// Update the bonus status badge
function updateBonusStatusBadge(bonuses) {
  const badge = document.getElementById("bonus-status-badge");
  if (!badge) return;
  
  // Check if all bonuses are non-default (not 1.0)
  const allDefault = Object.values(bonuses).every(v => Math.abs(v - 1.0) < 0.01);
  
  if (allDefault) {
    badge.textContent = "⚠️ Configure";
    badge.classList.remove("configured");
  } else {
    badge.textContent = "✓ Configured";
    badge.classList.add("configured");
  }
}

initEvents();
renderBranchControls();

// ============================================================================
// MONSTER SYSTEM
// ============================================================================

// Build monster registry - all types unlock together by tier
const MONSTER_TIERS = Array.from(new Set(MONSTERS.map(m => m.tier))).sort((a, b) => b - a);

const checkedMonsters = loadCheckedMonsters();

function loadCheckedMonsters() {
  try {
    const stored = localStorage.getItem("checkedMonsters");
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function saveCheckedMonsters(set) {
  try {
    localStorage.setItem("checkedMonsters", JSON.stringify(Array.from(set)));
  } catch {}
}

const excludedMonsters = loadExcludedMonsters();

function loadExcludedMonsters() {
  try {
    const stored = localStorage.getItem("excludedMonsters");
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function saveExcludedMonsters(set) {
  try {
    localStorage.setItem("excludedMonsters", JSON.stringify(Array.from(set)));
  } catch {}
}

function loadMonsterSettings() {
  try {
    const stored = localStorage.getItem("monsterSettings");
    if (stored) {
      const settings = JSON.parse(stored);
      if (settings.dominanceCap !== undefined) dominanceInput.value = settings.dominanceCap;
      if (settings.cushion !== undefined) monsterCushionInput.value = settings.cushion;
      if (settings.mode !== undefined) monsterModeSelect.value = settings.mode;
      return settings.monsters || { enabled: true, highestTier: MONSTER_TIERS[0], useTiers: [] };
    }
  } catch {}
  return { enabled: true, highestTier: MONSTER_TIERS[0], useTiers: [] };
}

function saveMonsterSettings() {
  try {
    const enabledCheckbox = document.getElementById("monsters-enabled");
    const highestTierSelect = document.getElementById("monsters-highest-tier");
    const useTiersContainer = document.getElementById("monsters-use-tiers");
    
    const monsters = { enabled: false, highestTier: MONSTER_TIERS[0], useTiers: [] };
    
    if (enabledCheckbox && highestTierSelect && useTiersContainer) {
      const useTiers = Array.from(useTiersContainer.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => Number(cb.value));
      monsters.enabled = enabledCheckbox.checked;
      monsters.highestTier = Number(highestTierSelect.value);
      monsters.useTiers = useTiers;
    }
    
    localStorage.setItem("monsterSettings", JSON.stringify({
      dominanceCap: Number(dominanceInput.value),
      cushion: Number(monsterCushionInput.value),
      mode: monsterModeSelect.value,
      monsters,
    }));
  } catch {}
}

function renderMonsterControls() {
  const saved = loadMonsterSettings();
  
  if (!monsterControlsContainer) {
    console.error("Monster controls container not found!");
    return;
  }
  
  if (!MONSTER_TIERS || MONSTER_TIERS.length === 0) {
    console.error("No monster tiers available!");
    return;
  }
  
  monsterControlsContainer.innerHTML = "";

  const card = document.createElement("div");
  card.className = "branch-card";

  const header = document.createElement("div");
  header.className = "branch-card-header";

  const enableCheckbox = document.createElement("input");
  enableCheckbox.type = "checkbox";
  enableCheckbox.id = "monsters-enabled";
  enableCheckbox.checked = saved.enabled;

  const nameLabel = document.createElement("label");
  nameLabel.htmlFor = "monsters-enabled";
  nameLabel.textContent = "Monsters";

  header.append(enableCheckbox, nameLabel);

  const body = document.createElement("div");
  body.className = "branch-card-body";

  const tierLabel = document.createElement("label");
  tierLabel.textContent = "Highest Tier:";
  tierLabel.htmlFor = "monsters-highest-tier";

  const tierSelect = document.createElement("select");
  tierSelect.id = "monsters-highest-tier";
  tierSelect.disabled = !saved.enabled;
  MONSTER_TIERS.forEach((tier) => {
    const option = document.createElement("option");
    option.value = tier;
    option.textContent = `M${tier}`;
    if (tier === saved.highestTier) option.selected = true;
    tierSelect.append(option);
  });

  const useTiersContainer = document.createElement("div");
  useTiersContainer.id = "monsters-use-tiers";
  useTiersContainer.className = "tier-checkboxes";

  const tierButtonBar = document.createElement("div");
  tierButtonBar.className = "tier-button-bar";

  const selectAllBtn = document.createElement("button");
  selectAllBtn.textContent = "Select all";
  selectAllBtn.className = "tier-btn tier-btn-enable";
  selectAllBtn.type = "button";

  const clearAllBtn = document.createElement("button");
  clearAllBtn.textContent = "Clear all";
  clearAllBtn.className = "tier-btn tier-btn-clear";
  clearAllBtn.type = "button";

  tierButtonBar.append(selectAllBtn, clearAllBtn);

  body.append(tierLabel, tierSelect, tierButtonBar, useTiersContainer);
  card.append(header, body);
  monsterControlsContainer.append(card);

  const updateMonsterTierControls = () => {
    const highestTier = Number(tierSelect.value);
    const availableTiers = MONSTER_TIERS.filter(t => t <= highestTier);
    useTiersContainer.innerHTML = "";

    if (availableTiers.length > 0) {
      availableTiers.forEach((tier) => {
        const label = document.createElement("label");
        label.className = "tier-checkbox-label";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = tier;
        checkbox.checked = saved.useTiers.includes(tier);
        checkbox.addEventListener("change", () => {
          updateMonsterResults();
          saveMonsterSettings();
        });
        label.append(checkbox, ` M${tier}`);
        useTiersContainer.append(label);
      });
    }
  };

  enableCheckbox.addEventListener("change", () => {
    tierSelect.disabled = !enableCheckbox.checked;
    const checkboxes = useTiersContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.disabled = !enableCheckbox.checked);
    updateMonsterResults();
    saveMonsterSettings();
  });

  tierSelect.addEventListener("change", () => {
    updateMonsterTierControls();
    updateMonsterResults();
    saveMonsterSettings();
  });

  selectAllBtn.addEventListener("click", () => {
    const checkboxes = useTiersContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => { cb.checked = true; cb.dispatchEvent(new Event('change')); });
  });

  clearAllBtn.addEventListener("click", () => {
    const checkboxes = useTiersContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => { cb.checked = false; cb.dispatchEvent(new Event('change')); });
  });

  updateMonsterTierControls();
}

function getSelectedMonsters() {
  const selected = [];
  const enabledCheckbox = document.getElementById("monsters-enabled");
  const useTiersContainer = document.getElementById("monsters-use-tiers");
  
  if (enabledCheckbox && enabledCheckbox.checked && useTiersContainer) {
    const useTiers = Array.from(useTiersContainer.querySelectorAll('input[type="checkbox"]:checked'))
      .map(cb => Number(cb.value));
    
    // When a tier is selected, all 4 monster types at that tier are available
    MONSTERS.forEach((monster) => {
      if (useTiers.includes(monster.tier)) {
        selected.push(monster);
      }
    });
  }
  
  return selected;
}

function computeMonsterRecommendation() {
  const dominanceCap = Number(dominanceInput.value) || 0;
  const cushionPercent = Math.max(0, Number(monsterCushionInput.value) || 0);
  const cushionMultiplier = 1 + cushionPercent / 100;
  const allMonsters = getSelectedMonsters();
  
  // Filter out excluded monsters
  const monsters = allMonsters.filter(monster => !excludedMonsters.has(monster.id));
  
  const mode = monsterModeSelect.value;

  if (!dominanceCap || dominanceCap <= 0) {
    return { error: "Set a dominance cap above zero.", rows: [], totals: null };
  }

  if (!monsters.length) {
    return { error: "Enable at least one monster type and tier.", rows: [], totals: null };
  }
  
  // In "match" mode, get target health from troop calculator
  let targetHealthPerMonster = null;
  if (mode === "match") {
    const troopResult = computeRecommendation();
    if (troopResult.rows && troopResult.rows.length > 0) {
      // Find the minimum health pool from troop results
      const minTroopHealth = Math.min(...troopResult.rows.map(r => r.healthPool));
      targetHealthPerMonster = minTroopHealth;
    } else {
      return { 
        error: "Match mode requires troop calculator results. Enable troops and configure your stack first.", 
        rows: [], 
        totals: null 
      };
    }
  }

  // Group monsters by tier
  const tierGroups = new Map();
  monsters.forEach(monster => {
    if (!tierGroups.has(monster.tier)) {
      tierGroups.set(monster.tier, []);
    }
    tierGroups.get(monster.tier).push(monster);
  });
  
  const tiers = Array.from(tierGroups.keys()).sort((a, b) => b - a);
  
  // Calculate average HP per dominance for each tier
  const tierHpPerDominance = new Map();
  tiers.forEach(tier => {
    const tierMonsters = tierGroups.get(tier);
    const avgHpPerDom = tierMonsters.reduce((sum, m) => sum + (m.health / m.dominance), 0) / tierMonsters.length;
    tierHpPerDominance.set(tier, avgHpPerDom);
  });
  
  // Calculate dominance allocation for each tier (inverse weighting with cushion)
  const tierDominanceAllocation = new Map();
  const totalTierWeight = tiers.reduce((sum, tier, index) => {
    const hpPerDominance = tierHpPerDominance.get(tier);
    const cushionBoost = Math.pow(cushionMultiplier, index);
    return sum + (1 / hpPerDominance) * cushionBoost;
  }, 0);
  
  tiers.forEach((tier, index) => {
    const hpPerDominance = tierHpPerDominance.get(tier);
    const cushionBoost = Math.pow(cushionMultiplier, index);
    const weight = (1 / hpPerDominance) * cushionBoost;
    const allocation = (weight / totalTierWeight) * dominanceCap;
    tierDominanceAllocation.set(tier, allocation);
  });
  
  // Within each tier, calculate target health pool and distribute to achieve equal health
  const monsterAllocations = [];
  
  tiers.forEach((tier, tierIndex) => {
    const tierMonsters = tierGroups.get(tier);
    const tierDominance = tierDominanceAllocation.get(tier);
    const numMonsters = tierMonsters.length;
    
    let tierTargetHealth;
    
    if (mode === "match" && targetHealthPerMonster !== null) {
      // In match mode, use the target health from troop calculator as baseline
      // Apply cushion multiplier to lower tiers (higher health for protection)
      const cushionBoost = Math.pow(cushionMultiplier, tierIndex);
      tierTargetHealth = targetHealthPerMonster * cushionBoost;
    } else {
      // In max mode, calculate what total health we can get with the allocated dominance
      // We want to distribute health equally among monsters
      // Each monster should have: targetHealthPerMonster = totalTierHealth / numMonsters
      
      // Calculate average HP/dominance for the tier
      const avgHpPerDom = tierMonsters.reduce((sum, m) => sum + (m.health / m.dominance), 0) / numMonsters;
      
      // Estimate total health from tier dominance allocation
      const estimatedTierHealth = tierDominance * avgHpPerDom;
      tierTargetHealth = estimatedTierHealth / numMonsters;
    }
    
    // For each monster, calculate units needed to reach target health
    tierMonsters.forEach(monster => {
      const expectedUnits = tierTargetHealth / monster.health;
      
      monsterAllocations.push({
        monster,
        tier,
        tierIndex: tierIndex,
        expectedUnits,
        assignedUnits: Math.floor(expectedUnits),
        fraction: expectedUnits - Math.floor(expectedUnits),
      });
    });
  });

  let usedDominance = monsterAllocations.reduce((sum, entry) => sum + entry.assignedUnits * entry.monster.dominance, 0);

  // Distribute remaining dominance by largest fractional components
  let leftover = dominanceCap - usedDominance;
  if (leftover >= Math.min(...monsterAllocations.map((entry) => entry.monster.dominance))) {
    const fractionalOrder = [...monsterAllocations].sort((a, b) => b.fraction - a.fraction);
    fractionalOrder.forEach((entry) => {
      if (leftover >= entry.monster.dominance && entry.fraction > 0) {
        entry.assignedUnits += 1;
        leftover -= entry.monster.dominance;
      }
    });
  }

  usedDominance = monsterAllocations.reduce((sum, entry) => sum + entry.assignedUnits * entry.monster.dominance, 0);
  leftover = dominanceCap - usedDominance;

  const totalHealth = monsterAllocations.reduce((sum, entry) => sum + entry.assignedUnits * entry.monster.health, 0);
  
  // Calculate average health pool for top tier
  const topTierMonsters = monsterAllocations.filter(e => e.tierIndex === 0);
  const avgTopTierHealth = topTierMonsters.reduce((sum, e) => sum + (e.assignedUnits * e.monster.health), 0) / topTierMonsters.length;

  const rows = monsterAllocations.map((entry) => {
    const dominanceUsed = entry.assignedUnits * entry.monster.dominance;
    const healthPool = entry.assignedUnits * entry.monster.health;
    const healthShare = totalHealth > 0 ? healthPool / totalHealth : 0;
    const relativeToTop = healthPool && avgTopTierHealth ? healthPool / avgTopTierHealth : 0;
    const notes = entry.tierIndex === 0
      ? "Top tier"
      : `${((relativeToTop - 1) * 100).toFixed(1)}% vs top tier`;
    return {
      id: entry.monster.id,
      name: entry.monster.name,
      type: entry.monster.type,
      tier: entry.monster.tier,
      order: entry.monster.order,
      dominanceUsed,
      assignedUnits: entry.assignedUnits,
      healthPool,
      healthShare,
      notes,
    };
  });

  return {
    rows,
    totals: {
      dominanceCap,
      usedDominance,
      leftover,
      totalHealth,
      topTier: topTierMonsters[0]?.monster.id || "",
      healthPerDominance: usedDominance ? totalHealth / usedDominance : 0,
      cushionPercent,
    },
    warning: topTierMonsters.every(e => e.assignedUnits === 0) ? "Dominance cap is too low to include the top tier monster." : "",
  };
}

function updateMonsterProgress() {
  const result = computeMonsterRecommendation();
  if (result.error || !result.totals) {
    monsterProgressFill.style.width = "0%";
    monsterProgressText.textContent = "0 / 0";
    return;
  }

  const used = result.rows.reduce((sum, row) => {
    const key = row.id;
    if (checkedMonsters.has(key)) {
      return sum + row.dominanceUsed;
    }
    return sum;
  }, 0);

  const cap = result.totals.dominanceCap;
  const percentage = cap > 0 ? (used / cap) * 100 : 0;
  
  monsterProgressFill.style.width = `${Math.min(percentage, 100)}%`;
  monsterProgressText.textContent = `${formatNumber(used)} / ${formatNumber(cap)}`;
  
  // Color coding
  if (percentage >= 95) {
    monsterProgressFill.style.background = "linear-gradient(90deg, #10b981, #059669)";
  } else if (percentage >= 50) {
    monsterProgressFill.style.background = "linear-gradient(90deg, #3b82f6, #2563eb)";
  } else {
    monsterProgressFill.style.background = "linear-gradient(90deg, #94a3b8, #64748b)";
  }
}

function updateMonsterResults() {
  const result = computeMonsterRecommendation();

  monsterResultTableBody.innerHTML = "";
  monsterWarningEl.textContent = "";
  monsterWarningEl.classList.add("hidden");
  monsterSummaryEl.innerHTML = "";

  if (result.error) {
    monsterWarningEl.textContent = result.error;
    monsterWarningEl.classList.remove("hidden");
    updateMonsterProgress();
    return;
  }

  if (result.warning) {
    monsterWarningEl.textContent = result.warning;
    monsterWarningEl.classList.remove("hidden");
  }

  const { rows, totals } = result;

  // Get all selected monsters (including excluded ones) to display them greyed out
  const allMonsters = getSelectedMonsters();
  const excludedMonsterRows = allMonsters
    .filter(monster => excludedMonsters.has(monster.id))
    .map(monster => ({
      id: monster.id,
      name: monster.name,
      tier: monster.tier,
      type: monster.type,
      order: monster.order,
      assignedUnits: 0,
      dominanceUsed: 0,
      healthPool: 0,
      healthShare: 0,
      notes: "Excluded"
    }));

  // Combine calculated rows with excluded monster rows
  const allRows = [...rows, ...excludedMonsterRows];

  // Sort by tier (desc), then by game order
  allRows.sort((a, b) => {
    if (a.tier !== b.tier) return b.tier - a.tier;
    return a.order - b.order;
  });

  // Group by tier
  const tierMap = new Map();
  allRows.forEach((row) => {
    if (!tierMap.has(row.tier)) tierMap.set(row.tier, []);
    tierMap.get(row.tier).push(row);
  });

  tierMap.forEach((tierRows, tier) => {
    // Tier header
    const headerRow = document.createElement("tr");
    headerRow.className = "tier-header";
    headerRow.innerHTML = `<td colspan="9" class="tier-header-cell"><span class="tier-badge tier-${tier}">Tier ${tier}</span></td>`;
    monsterResultTableBody.append(headerRow);

    // Monster rows
    tierRows.forEach((row) => {
      const tr = document.createElement("tr");
      const monsterKey = row.id;
      const isChecked = checkedMonsters.has(monsterKey);
      const isExcluded = excludedMonsters.has(row.id);
      
      if (isExcluded) {
        tr.classList.add('excluded-row');
      } else if (isChecked) {
        tr.classList.add('checked-row');
      }
      
      tr.innerHTML = `
        <td class="include-cell">
          <input type="checkbox" class="include-checkbox" data-monster-id="${row.id}" ${!isExcluded ? 'checked' : ''}>
        </td>
        <td class="check-cell">
          <input type="checkbox" class="monster-checkbox" data-monster-key="${monsterKey}" ${isChecked ? 'checked' : ''}>
        </td>
        <td><strong>${row.name}</strong></td>
        <td><span class="role-badge role-${row.type.toLowerCase()}">${row.type}</span></td>
        <td class="units-cell">
          <span class="units-value">${formatNumber(row.assignedUnits)}</span>
          <button class="copy-btn" data-value="${row.assignedUnits}" title="Copy to clipboard">📋</button>
        </td>
        <td>${formatNumber(row.dominanceUsed)}</td>
        <td>${formatNumber(row.healthPool)}</td>
        <td>${formatPercent(row.healthShare)}</td>
        <td>${row.notes}</td>
      `;
      
      // Include checkbox handler
      const includeCheckbox = tr.querySelector('.include-checkbox');
      includeCheckbox.addEventListener('change', (e) => {
        e.stopPropagation();
        const monsterId = includeCheckbox.dataset.monsterId;
        if (includeCheckbox.checked) {
          excludedMonsters.delete(monsterId);
        } else {
          excludedMonsters.add(monsterId);
        }
        saveExcludedMonsters(excludedMonsters);
        updateMonsterResults(); // Recalculate without the excluded monster
        updateMonsterProgress();
      });
      
      // "Added" checkbox handler
      const checkbox = tr.querySelector('.monster-checkbox');
      checkbox.addEventListener('change', (e) => {
        e.stopPropagation();
        const key = checkbox.dataset.monsterKey;
        if (checkbox.checked) {
          checkedMonsters.add(key);
          tr.classList.add('checked-row');
        } else {
          checkedMonsters.delete(key);
          tr.classList.remove('checked-row');
        }
        saveCheckedMonsters(checkedMonsters);
        updateMonsterProgress();
      });
      
      // Copy button handler
      const copyBtn = tr.querySelector('.copy-btn');
      copyBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const value = copyBtn.dataset.value;
        try {
          await navigator.clipboard.writeText(value);
          const originalText = copyBtn.textContent;
          copyBtn.textContent = '✓';
          copyBtn.classList.add('copied');
          setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.classList.remove('copied');
          }, 1500);
        } catch (err) {
          console.error('Failed to copy:', err);
          copyBtn.textContent = '✗';
          setTimeout(() => {
            copyBtn.textContent = '📋';
          }, 1500);
        }
      });
      
      // Row click handler
      tr.addEventListener('click', (e) => {
        if (e.target.type !== 'checkbox' && !e.target.classList.contains('copy-btn')) {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change'));
        }
      });
      
      monsterResultTableBody.append(tr);
    });
  });

  const leftoverLabel = totals.leftover > 0
    ? `${formatNumber(totals.leftover)} spare`
    : totals.leftover < 0
      ? `${formatNumber(Math.abs(totals.leftover))} over cap`
      : "uses full dominance";
  
  const mode = monsterModeSelect.value;
  const modeLabel = mode === "match" 
    ? " <span style='color: #10b981;'>⚖ Matched to troop health</span>"
    : "";

  monsterSummaryEl.innerHTML = `
    Hero commands <strong>${formatNumber(totals.usedDominance)}</strong> of
    <strong>${formatNumber(totals.dominanceCap)}</strong> dominance —
    ${leftoverLabel}. Total stack health:
    <strong>${formatNumber(totals.totalHealth)}</strong>. Lower-tier padding:
    <strong>${totals.cushionPercent}%</strong>.${modeLabel}
  `;
  
  updateMonsterProgress();
}

function initMonsterEvents() {
  dominanceInput.addEventListener("input", () => {
    updateMonsterResults();
    saveMonsterSettings();
  });
  monsterModeSelect.addEventListener("change", () => {
    updateMonsterResults();
    saveMonsterSettings();
  });
  monsterCushionInput.addEventListener("input", () => {
    updateMonsterResults();
    saveMonsterSettings();
  });
  
  const clearMonstersBtn = document.getElementById("clear-monsters-btn");
  clearMonstersBtn.addEventListener("click", () => {
    checkedMonsters.clear();
    saveCheckedMonsters(checkedMonsters);
    updateMonsterResults();
    updateMonsterProgress();
  });
}

// Ensure monster controls render after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initMonsterEvents();
    renderMonsterControls();
  });
} else {
  initMonsterEvents();
  renderMonsterControls();
}
