// fun5.js - Updated for Cloudflare Worker Integration
let currentStep = 1;
let selectedCitadelLevel = null;
let selectedArmyLevels = {
    guard: null,
    special: null,
    engineer: null,
    dragon: null
};

let armyBonuses = {
    army: { strength: [], health: [] },
    research: { strength: [], health: [] },
    monsters: { strength: [], health: [] },
    guard: { strength: [], health: [] },
    specialist: { strength: [], health: [] },
    engineer: { strength: [], health: [] }
};

let citadelTotals = { strength: 0, health: 0, power: 0 };
let extraDamageTypes = [];
let recommendedArmy = [];

// Your Cloudflare Worker URL
const WORKER_URL = 'https://citadel.t3li.workers.dev/';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadBonusConfig();
    initializeSavedBonusRows();
    document.getElementById('next-step-1').disabled = true;
    document.getElementById('next-step-2').disabled = true;
});

function setupEventListeners() {
    // Citadel level selection
    document.querySelectorAll('#step1 .selection-btn[data-level]').forEach(btn => {
        btn.addEventListener('click', function() {
            selectCitadelLevel(this);
        });
    });
    
    // Army level selection
    document.querySelectorAll('.army-level').forEach(btn => {
        btn.addEventListener('click', function() {
            selectArmyLevel(this);
        });
    });
    
    // Navigation buttons
    document.getElementById('next-step-1').addEventListener('click', goToStep2);
    document.getElementById('prev-step-2').addEventListener('click', goToStep1);
    document.getElementById('next-step-2').addEventListener('click', goToStep3);
    
    // Event delegation for dynamically shown elements
    document.addEventListener('click', function(event) {
        if (event.target.id === 'prev-step-4' || event.target.closest('#prev-step-4')) {
            goToStep2();
        }
        
        if (event.target.id === 'restart-calculation' || event.target.closest('#restart-calculation')) {
            restartCalculation();
        }
    });
}

async function selectCitadelLevel(button) {
    // Remove active class from all citadel buttons
    document.querySelectorAll('.selection-btn[data-level]').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected button
    button.classList.add('active');
    
    // Set selected citadel level
    selectedCitadelLevel = parseInt(button.getAttribute('data-level'), 10);
    
    try {
        // Call the worker to get citadel details
        const response = await fetch(WORKER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'getCitadelDetails',
                citadelLevel: selectedCitadelLevel
            })
        });
        
        if (!response.ok) {
            throw new Error(`Worker error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Update local variables with data from worker
        citadelTotals = data.totals;
        extraDamageTypes = data.extraDamageTypes;
        
        // Display citadel details
        displayCitadelDetails(data.defenders);
        
        // Enable next button
        document.getElementById('next-step-1').disabled = false;
    } catch (error) {
        alert(`Error loading citadel data: ${error.message}`);
        button.classList.remove('active');
        selectedCitadelLevel = null;
        document.getElementById('next-step-1').disabled = true;
        document.getElementById('citadel-details').classList.add('hidden');
    }
}

function displayCitadelDetails(defenders) {
    const tbody = document.getElementById('citadel-defenders');
    const extraDamageDiv = document.getElementById('extra-damage-info');
    
    // Clear previous content
    tbody.innerHTML = '';
    extraDamageDiv.innerHTML = '';
    
    // Display each defender
    defenders.forEach(defender => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${defender.type}</td>
            <td>${defender.quantity.toLocaleString()}</td>
        `;
        tbody.appendChild(row);
    });
    
    // Display extra damage info
    if (extraDamageTypes.length > 0) {
        extraDamageDiv.innerHTML = `
            <div class="col-12">
                <p class="mt-2 text-muted alert alert-info mt-3">
                    <small>We'll avoid using those troop types that citadel deal extra damage in attack.</small>
                </p>
            </div>
        `;
    } else {
        extraDamageDiv.innerHTML = `
            <div class="col-12">
                <p class="text-muted"><small>We'll avoid using those troop types that citadel deal extra damage in attack.</small></p>
            </div>
        `;
    }
    
    // Show the citadel details section
    document.getElementById('citadel-details').classList.remove('hidden');
}

function selectArmyLevel(button) {
    const type = button.getAttribute('data-type');
    const level = parseInt(button.getAttribute('data-level'));
    
    // Remove active class from all buttons of this type
    document.querySelectorAll(`.army-level[data-type="${type}"]`).forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected button
    button.classList.add('active');
    
    // Update selected army level
    selectedArmyLevels[type] = level;
    
    // Update display
    document.getElementById(`selected-${type}`).textContent = `Level ${level}`;
    document.getElementById(`selected-${type}`).className = `badge bg-success`;
    
    // Update summary
    updateArmySummary();
    
    // Check if all army types are selected
    const allSelected = Object.values(selectedArmyLevels).every(level => level !== null);
    document.getElementById('next-step-2').disabled = !allSelected;
}

function updateArmySummary() {
    const guardLevel = selectedArmyLevels.guard;
    const specialLevel = selectedArmyLevels.special;
    const engineerLevel = selectedArmyLevels.engineer;
    const dragonLevel = selectedArmyLevels.dragon;
    
    document.querySelector('#selected-army-summary h5').innerHTML = 
        `Your Selected Army Levels for <i class="fa-brands fa-fort-awesome"></i> 
        <span style="font-style:italic;">Citadel Level-${selectedCitadelLevel}</span>`;
    
    if (guardLevel) {
        document.getElementById('summary-guard-level').textContent = guardLevel;
        document.getElementById('summary-guard-used').textContent = 
            guardLevel > 1 ? `${guardLevel}, ${guardLevel-1}` : `${guardLevel}`;
    }
    
    if (specialLevel) {
        document.getElementById('summary-special-level').textContent = specialLevel;
        document.getElementById('summary-special-used').textContent = 
            specialLevel > 1 ? `${specialLevel}, ${specialLevel-1}` : `${specialLevel}`;
    }
    
    if (engineerLevel) {
        document.getElementById('summary-engineer-level').textContent = engineerLevel;
        document.getElementById('summary-engineer-used').textContent = `${engineerLevel}`;
    }
    
    if (dragonLevel) {
        document.getElementById('summary-dragon-level').textContent = dragonLevel;
        const secondLevel = dragonLevel > 3 ? dragonLevel-1 : null;
        document.getElementById('summary-dragon-used').textContent = 
            secondLevel ? `${dragonLevel}, ${secondLevel}` : `${dragonLevel}`;
    }
    
    // Show summary if at least one army type is selected
    const anySelected = Object.values(selectedArmyLevels).some(level => level !== null);
    if (anySelected) {
        document.getElementById('selected-army-summary').classList.remove('hidden');
    }
}

function goToStep1() {
    changeStep(1);
}

function goToStep2() {
    changeStep(2);
    restoreArmySelections();
}

function goToStep3() {
    // Validate all army levels are selected
    const missing = [];
    Object.keys(selectedArmyLevels).forEach(type => {
        if (selectedArmyLevels[type] === null) {
            missing.push(type);
        }
    });
    
    if (missing.length > 0) {
        alert(`Please select levels for: ${missing.join(', ')}`);
        return;
    }
    
    changeStep(3);
    
    // Start calculation with a slight delay to show loading animation
    setTimeout(calculateOptimalArmy, 500);
}

function goToStep4() {
    changeStep(4);
    displayResults();
}

function restoreArmySelections() {
    // Restore Guard selection
    if (selectedArmyLevels.guard) {
        const guardBtn = document.querySelector(`.army-level[data-type="guard"][data-level="${selectedArmyLevels.guard}"]`);
        if (guardBtn) {
            guardBtn.classList.add('active');
            document.getElementById('selected-guard').textContent = `Level ${selectedArmyLevels.guard}`;
        }
    }
    
    // Restore Special selection
    if (selectedArmyLevels.special) {
        const specialBtn = document.querySelector(`.army-level[data-type="special"][data-level="${selectedArmyLevels.special}"]`);
        if (specialBtn) {
            specialBtn.classList.add('active');
            document.getElementById('selected-special').textContent = `Level ${selectedArmyLevels.special}`;
        }
    }
    
    // Restore Engineer selection
    if (selectedArmyLevels.engineer) {
        const engineerBtn = document.querySelector(`.army-level[data-type="engineer"][data-level="${selectedArmyLevels.engineer}"]`);
        if (engineerBtn) {
            engineerBtn.classList.add('active');
            document.getElementById('selected-engineer').textContent = `Level ${selectedArmyLevels.engineer}`;
        }
    }
    
    // Restore Dragon selection
    if (selectedArmyLevels.dragon) {
        const dragonBtn = document.querySelector(`.army-level[data-type="dragon"][data-level="${selectedArmyLevels.dragon}"]`);
        if (dragonBtn) {
            dragonBtn.classList.add('active');
            document.getElementById('selected-dragon').textContent = `Level ${selectedArmyLevels.dragon}`;
        }
    }
    
    // Update the summary
    updateArmySummary();
    
    // Enable the calculate button since all selections are already made
    document.getElementById('next-step-2').disabled = false;
}

function changeStep(step) {
    // Hide all steps
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.add('hidden');
    document.getElementById('step4').classList.add('hidden');
    
    // Update step indicators
    document.querySelectorAll('.step').forEach(stepEl => {
        stepEl.classList.remove('active');
    });
    
    // Show selected step
    document.getElementById(`step${step}`).classList.remove('hidden');
    document.getElementById(`step${step}-indicator`).classList.add('active');
    
    currentStep = step;
}

function calculateOptimalArmy() {
    const progressBar = document.getElementById('calculation-progress');
    
    // Simulate calculation progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // Perform the actual calculation
            performCalculation();
        }
    }, 100);
}

async function performCalculation() {
    try {
        // Call the worker to calculate army
        const response = await fetch(WORKER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'calculateArmy',
                citadelLevel: selectedCitadelLevel,
                armyLevels: selectedArmyLevels,
                armyBonuses: armyBonuses
            })
        });
        
        if (!response.ok) {
            throw new Error(`Worker error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Update local variables with data from worker
        citadelTotals = data.citadelTotals;
        recommendedArmy = data.recommendedArmy;
        
        // Automatically go to step 4 after a brief delay
        setTimeout(() => {
            goToStep4();
        }, 500);
    } catch (error) {
        alert(`Calculation error: ${error.message}`);
        goToStep2();
    }
}

function displayResults() {
    if (!document.getElementById('step4')) {
        console.error('Step 4 element not found');
        return;
    }
    
    // Update citadel level in results
    document.getElementById('result-citadel-level').textContent = selectedCitadelLevel || 'Unknown';
    
    let armyTotalStrength = 0;
    let armyTotalHealth = 0;
    let armyTotalPower = 0;
    
    const recommendedArmyTable = document.getElementById('recommended-army');
    recommendedArmyTable.innerHTML = '';
    
    // Display each recommended troop
    recommendedArmy.forEach(troop => {
        armyTotalStrength += troop.totalStrength || 0;
        armyTotalHealth += troop.totalHealth || 0;
        armyTotalPower += troop.totalPower || 0;
        
        // Format the display name
        let displayName = troop.name || `${troop.type} L${troop.level}`;
        if (troop.type === 'Dragon' && troop.category) {
            displayName = `${troop.type} L${troop.level} (${troop.category})`;
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${displayName}</td>
            <td>${troop.level || '?'}</td>
            <td>${troop.category || 'Various'}</td>
            <td>${(troop.quantity || 0).toLocaleString()}</td>
        `;
        recommendedArmyTable.appendChild(row);
    });
    
    // Calculate power comparison
    const powerComparison = ((armyTotalPower - citadelTotals.power) / citadelTotals.power * 100).toFixed(1);
    
    // Update power display
    document.getElementById('army-power-display').textContent = armyTotalPower.toLocaleString();
    document.getElementById('citadel-power-display').textContent = citadelTotals.power.toLocaleString();
    document.getElementById('power-advantage').textContent = `${powerComparison}%`;
    document.getElementById('power-advantage').className = powerComparison >= 20 ? 'comparison-positive' : 'comparison-negative';
    
    // Update power indicator
    const powerPercentage = Math.min(100, (armyTotalPower / citadelTotals.power) * 100);
    document.getElementById('power-indicator').style.width = `${powerPercentage}%`;
    
    // Update other result details
    document.getElementById('result-defender-count').textContent = recommendedArmy.length;
    document.getElementById('result-army-types').textContent = new Set(recommendedArmy.map(t => t.type)).size;
    
    const engineers = recommendedArmy.find(t => t.type === 'Engineer');
    document.getElementById('result-engineers').textContent = engineers ? engineers.quantity.toLocaleString() : '0';
    
    // Update outcome prediction
    const outcomeElement = document.getElementById('outcome-prediction');
    if (parseFloat(powerComparison) >= 50) {
        outcomeElement.innerHTML = `<span class="comparison-positive">High chance of victory with minimal losses.</span> Your army has a significant power advantage over the citadel defenses.`;
        document.getElementById('strategy-success').className = 'badge bg-success';
        document.getElementById('strategy-success').textContent = 'Excellent';
    } else if (parseFloat(powerComparison) >= 20) {
        outcomeElement.innerHTML = `<span class="comparison-positive">Good chance of victory with moderate losses.</span> Your army should overcome the citadel defenses.`;
        document.getElementById('strategy-success').className = 'badge bg-success';
        document.getElementById('strategy-success').textContent = 'Good';
    } else if (parseFloat(powerComparison) >= 0) {
        outcomeElement.innerHTML = `<span class="comparison-positive">Possible victory but expect significant losses.</span> Consider increasing your army size or using higher level troops.`;
        document.getElementById('strategy-success').className = 'badge bg-warning text-dark';
        document.getElementById('strategy-success').textContent = 'Risky';
    } else {
        outcomeElement.innerHTML = `<span class="comparison-negative">Low chance of victory. Your army is underpowered for this citadel.</span> Consider attacking a lower level citadel or significantly increasing your army.`;
        document.getElementById('strategy-success').className = 'badge bg-danger';
        document.getElementById('strategy-success').textContent = 'Poor';
    }
}

function restartCalculation() {
    // Reset all selections
    selectedCitadelLevel = null;
    selectedArmyLevels = {
        guard: null,
        special: null,
        engineer: null,
        dragon: null
    };
    
    // Reset UI - clear active classes from ALL selection buttons
    document.querySelectorAll('.selection-btn.active').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Clear army level displays
    document.getElementById('selected-guard').textContent = 'Not selected';
    document.getElementById('selected-guard').className = 'badge bg-secondary';
    
    document.getElementById('selected-special').textContent = 'Not selected';
    document.getElementById('selected-special').className = 'badge bg-secondary';
    
    document.getElementById('selected-engineer').textContent = 'Not selected';
    document.getElementById('selected-engineer').className = 'badge bg-secondary';
    
    document.getElementById('selected-dragon').textContent = 'Not selected';
    document.getElementById('selected-dragon').className = 'badge bg-secondary';
    
    // Reset calculation UI
    document.getElementById('citadel-details').classList.add('hidden');
    document.getElementById('selected-army-summary').classList.add('hidden');
    document.getElementById('next-step-2').disabled = true;
    
    // Go back to step 1
    changeStep(1);
}

// Bonus management functions (remain the same as before)
function addBonusRow(category) {
    const strengthInputs = document.querySelectorAll(`.${category}-strength`);
    const nextIndex = strengthInputs.length + 1;
    
    if (nextIndex > 6) {
        const modal = new bootstrap.Modal(document.getElementById('infoModal'));
        document.getElementById('infoModalBody').innerHTML = `
            <div class="alert alert-info">
                <i class="fas fa-info-circle me-2"></i>
                You can add up to 6 bonus entries per category. To add more, please remove some existing entries first.
            </div>
        `;
        modal.show();
        return;
    }
    
    addBonusRowSilently(category);
    updateBonusSummary();
}

function addBonusRowSilently(category) {
    const strengthInputs = document.querySelectorAll(`.${category}-strength`);
    const nextIndex = strengthInputs.length + 1;
    
    if (nextIndex > 6) {
        throw new Error('Maximum reached');
    }
    
    const strengthHtml = `
        <div class="bonus-row" data-category="${category}" data-type="strength" data-index="${nextIndex}">
            <div class="d-flex justify-content-between align-items-center">
                <label class="form-label">${formatCategoryName(category)} Strength Bonus ${nextIndex} (%)</label>
                <button type="button" class="btn btn-sm btn-outline-danger remove-bonus-btn" 
                        onclick="removeBonusRow(this, '${category}', 'strength')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="input-group mb-2">
                <input type="number" class="form-control ${category}-strength" 
                       data-index="${nextIndex}" min="0" max="500" step="0.1" value="0">
                <span class="input-group-text">%</span>
            </div>
        </div>
    `;
    
    const healthHtml = `
        <div class="bonus-row" data-category="${category}" data-type="health" data-index="${nextIndex}">
            <div class="d-flex justify-content-between align-items-center">
                <label class="form-label">${formatCategoryName(category)} Health Bonus ${nextIndex} (%)</label>
                <button type="button" class="btn btn-sm btn-outline-danger remove-bonus-btn" 
                        onclick="removeBonusRow(this, '${category}', 'health')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="input-group mb-2">
                <input type="number" class="form-control ${category}-health" 
                       data-index="${nextIndex}" min="0" max="500" step="0.1" value="0">
                <span class="input-group-text">%</span>
            </div>
        </div>
    `;
    
    if (category === 'army') {
        document.getElementById('army-additional-bonuses').insertAdjacentHTML('beforeend', strengthHtml + healthHtml);
    } else {
        document.getElementById(`${category}-strength-bonuses`).insertAdjacentHTML('beforeend', strengthHtml);
        document.getElementById(`${category}-health-bonuses`).insertAdjacentHTML('beforeend', healthHtml);
    }
    
    return true;
}

function removeBonusRow(button, category, type) {
    const row = button.closest('.bonus-row');
    if (row && confirm('Remove this bonus entry?')) {
        row.remove();
        updateRowIndices(category, type);
        updateBonusSummary();
    }
}

function updateRowIndices(category, type) {
    const rows = document.querySelectorAll(`.bonus-row[data-category="${category}"][data-type="${type}"]`);
    
    rows.forEach((row, index) => {
        const newIndex = index + 1;
        row.setAttribute('data-index', newIndex);
        
        const label = row.querySelector('label');
        if (label) {
            label.textContent = `${formatCategoryName(category)} ${type === 'strength' ? 'Strength' : 'Health'} Bonus ${newIndex} (%)`;
        }
        
        const input = row.querySelector('input');
        if (input) {
            input.setAttribute('data-index', newIndex);
        }
    });
}

function formatCategoryName(category) {
    const names = {
        'army': 'Army',
        'research': 'Research',
        'monsters': 'Monsters',
        'guard': 'Guard',
        'specialist': 'Specialist',
        'engineer': 'Engineer'
    };
    return names[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

function updateBonusSummary() {
    const summaryTable = document.getElementById('bonus-summary-table');
    let html = '';
    
    for (const category in armyBonuses) {
        const strengthTotal = armyBonuses[category].strength.reduce((a, b) => a + b, 0);
        const healthTotal = armyBonuses[category].health.reduce((a, b) => a + b, 0);
        const entryCount = armyBonuses[category].strength.length;
        
        html += `
            <tr>
                <td><strong>${formatCategoryName(category)}</strong></td>
                <td><span class="badge bg-warning">+${strengthTotal.toFixed(1)}%</span></td>
                <td><span class="badge bg-danger">+${healthTotal.toFixed(1)}%</span></td>
                <td>${entryCount} entries</td>
            </tr>
        `;
    }
    
    summaryTable.innerHTML = html;
}

function saveBonusConfig() {
    for (const category in armyBonuses) {
        armyBonuses[category].strength = [];
        armyBonuses[category].health = [];
    }
    
    const categories = ['army', 'research', 'monsters', 'guard', 'specialist', 'engineer'];
    
    categories.forEach(category => {
        document.querySelectorAll(`.${category}-strength`).forEach(input => {
            const value = parseFloat(input.value) || 0;
            if (value > 0) {
                armyBonuses[category].strength.push(value);
            }
        });
        
        document.querySelectorAll(`.${category}-health`).forEach(input => {
            const value = parseFloat(input.value) || 0;
            if (value > 0) {
                armyBonuses[category].health.push(value);
            }
        });
    });
    
    updateBonusSummary();
    updateBonusSummaryDisplay();
    
    // Save to localStorage
    localStorage.setItem('armyBonuses', JSON.stringify(armyBonuses));
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('extraPowerModal'));
    if (modal) modal.hide();
}

function loadBonusConfig() {
    const saved = localStorage.getItem('armyBonuses');
    if (saved) {
        armyBonuses = JSON.parse(saved);
        updateBonusSummary();
        updateBonusSummaryDisplay();
    }
}

function clearAllBonuses() {
    if (confirm('Are you sure you want to clear all bonuses? This action cannot be undone.')) {
        armyBonuses = {
            army: { strength: [], health: [] },
            research: { strength: [], health: [] },
            monsters: { strength: [], health: [] },
            guard: { strength: [], health: [] },
            specialist: { strength: [], health: [] },
            engineer: { strength: [], health: [] }
        };
        
        localStorage.removeItem('armyBonuses');
        document.querySelectorAll('.form-control').forEach(input => {
            if (input.type === 'number') input.value = '0';
        });
        
        updateBonusSummary();
        updateBonusSummaryDisplay();
        alert('All bonuses have been cleared.');
    }
}

function updateBonusSummaryDisplay() {
    const categories = {
        'army': { name: 'Army', icon: 'users' },
        'research': { name: 'Research', icon: 'flask' },
        'monsters': { name: 'Monsters', icon: 'dragon' },
        'guard': { name: 'Guard', icon: 'shield-alt' },
        'specialist': { name: 'Specialist', icon: 'star' },
        'engineer': { name: 'Engineer', icon: 'cogs' }
    };
    
    let totalStrength = 0;
    let totalHealth = 0;
    
    for (const [category, info] of Object.entries(categories)) {
        const strengthTotal = armyBonuses[category].strength.reduce((a, b) => a + b, 0);
        const healthTotal = armyBonuses[category].health.reduce((a, b) => a + b, 0);
        const categoryTotal = strengthTotal + healthTotal;
        
        document.getElementById(`${category}-strength-display`).textContent = `${strengthTotal.toFixed(1)}%`;
        document.getElementById(`${category}-health-display`).textContent = `${healthTotal.toFixed(1)}%`;
        document.getElementById(`${category}-total-display`).textContent = `${categoryTotal.toFixed(1)}%`;
        
        totalStrength += strengthTotal;
        totalHealth += healthTotal;
    }
    
    document.getElementById('total-strength-display').textContent = `${totalStrength.toFixed(1)}%`;
    document.getElementById('total-health-display').textContent = `${totalHealth.toFixed(1)}%`;
    document.getElementById('grand-total-display').textContent = `${(totalStrength + totalHealth).toFixed(1)}%`;
}

function initializeSavedBonusRows() {
    const categories = ['army', 'research', 'monsters', 'guard', 'specialist', 'engineer'];
    
    categories.forEach(category => {
        const savedStrengthEntries = armyBonuses[category]?.strength?.length || 0;
        const savedHealthEntries = armyBonuses[category]?.health?.length || 0;
        const savedEntries = Math.max(savedStrengthEntries, savedHealthEntries);
        
        if (savedEntries > 1) {
            const rowsToAdd = savedEntries - 1;
            for (let i = 0; i < rowsToAdd; i++) {
                try {
                    addBonusRowSilently(category);
                } catch (e) {}
            }
        }
        
        loadSavedBonusValuesForCategory(category);
    });
    
    updateBonusSummary();
}

function loadSavedBonusValuesForCategory(category) {
    const strengthValues = armyBonuses[category]?.strength || [];
    const healthValues = armyBonuses[category]?.health || [];
    
    document.querySelectorAll(`.${category}-strength`).forEach((input, index) => {
        if (strengthValues[index] !== undefined) {
            input.value = strengthValues[index];
        }
    });
    
    document.querySelectorAll(`.${category}-health`).forEach((input, index) => {
        if (healthValues[index] !== undefined) {
            input.value = healthValues[index];
        }
    });
}
