		
        // Application State
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
        let extraDamageTypes = new Set();
        let recommendedArmy = [];

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            setupEventListeners();
        });



		// Listen for the 'hide' event (triggered right as the modal begins to close)
		document.addEventListener('hide.bs.modal', function () {
			if (document.activeElement) {
				document.activeElement.blur();
			}
		});


        function setupEventListeners() {
			// Citadel level selection - ONLY for Step 1 buttons (no army-level class)
			document.querySelectorAll('#step1 .selection-btn[data-level]').forEach(btn => {
				btn.addEventListener('click', function() {
					selectCitadelLevel(this);
				});
			});
			
			// Army level selection - for all army-level buttons
			document.querySelectorAll('.army-level').forEach(btn => {
				btn.addEventListener('click', function() {
					selectArmyLevel(this);
				});
			});
			
			// Navigation buttons (these exist when page loads)
			document.getElementById('next-step-1').addEventListener('click', goToStep2);
			document.getElementById('prev-step-2').addEventListener('click', goToStep1);
			document.getElementById('next-step-2').addEventListener('click', goToStep3);
			
			// Event delegation for dynamically shown elements
			document.addEventListener('click', function(event) {
				// Check if click is on view-results button
				//if (event.target.id === 'view-results' || event.target.closest('#view-results')) {
				//	goToStep4();
				//}
				
				// Check if click is on prev-step-4 button
				if (event.target.id === 'prev-step-4' || event.target.closest('#prev-step-4')) {
					goToStep2(); // Changed from goToStep3
				}
				
				// Check if click is on restart-calculation button
				if (event.target.id === 'restart-calculation' || event.target.closest('#restart-calculation')) {
					restartCalculation();
				}
			});
			
			
			loadBonusConfig();
    
			initializeSavedBonusRows();
			
			
			// Disable next button initially
			document.getElementById('next-step-1').disabled = true;
			document.getElementById('next-step-2').disabled = true;
		}
		
		function initializeSavedBonusRows() {
			// For each category, check if we have saved data and add rows accordingly
			const categories = ['army', 'research', 'monsters', 'guard', 'specialist', 'engineer'];
			
			categories.forEach(category => {
				const savedStrengthEntries = armyBonuses[category]?.strength?.length || 0;
				const savedHealthEntries = armyBonuses[category]?.health?.length || 0;
				const savedEntries = Math.max(savedStrengthEntries, savedHealthEntries);
				
				// We already have 1 row by default, so add more only if needed
				if (savedEntries > 1) {
					const rowsToAdd = savedEntries - 1;
					for (let i = 0; i < rowsToAdd; i++) {
						try {
							addBonusRowSilently(category);
						} catch (e) {
							// Ignore errors during initialization
						}
					}
				}
				
				// Load saved values into existing inputs
				loadSavedBonusValuesForCategory(category);
			});
			
			updateBonusSummary();
		}


		function initializeBonusRows() {
			// Load saved bonuses first
			loadBonusConfig();
			
			// Only add additional rows if we have saved data that needs them
			// Don't auto-add rows on page load
			// Instead, check if we have saved values and ensure enough rows exist
			
			// For each category, check how many saved entries we have
			const categories = ['army', 'research', 'monsters', 'guard', 'specialist', 'engineer'];
			
			categories.forEach(category => {
				const savedStrengthEntries = armyBonuses[category]?.strength?.length || 0;
				const savedHealthEntries = armyBonuses[category]?.health?.length || 0;
				const savedEntries = Math.max(savedStrengthEntries, savedHealthEntries);
				
				// We already have 1 row by default, so add more only if needed
				if (savedEntries > 1) {
					const rowsToAdd = savedEntries - 1;
					for (let i = 0; i < rowsToAdd; i++) {
						// Use a try-catch to avoid the alert on page load
						try {
							addBonusRowSilently(category);
						} catch (e) {
							console.log(`Could not add row for ${category}: ${e.message}`);
						}
					}
				}
				
				// Load saved values into existing inputs
				loadSavedBonusValuesForCategory(category);
			});
			
			updateBonusSummary();
		}
		
		
		// Add this function to load saved values
		function loadSavedBonusValuesForCategory(category) {
			const strengthValues = armyBonuses[category]?.strength || [];
			const healthValues = armyBonuses[category]?.health || [];
			
			// Load strength values
			const strengthInputs = document.querySelectorAll(`.${category}-strength`);
			strengthInputs.forEach((input, index) => {
				if (strengthValues[index] !== undefined) {
					input.value = strengthValues[index];
				}
			});
			
			// Load health values
			const healthInputs = document.querySelectorAll(`.${category}-health`);
			healthInputs.forEach((input, index) => {
				if (healthValues[index] !== undefined) {
					input.value = healthValues[index];
				}
			});
		}
		
		
		function addBonusRowSilently(category) {
			// Find the current number of inputs for this category
			const strengthInputs = document.querySelectorAll(`.${category}-strength`);
			const healthInputs = document.querySelectorAll(`.${category}-health`);
			
			const nextIndex = strengthInputs.length + 1;
			
			// Still check for maximum, but don't show alert
			if (nextIndex > 6) {
				throw new Error('Maximum reached');
			}
			
			// Create new strength input with remove button
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
			
			// Create new health input with remove button
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
			
			// Append to appropriate containers
			if (category === 'army') {
				document.getElementById('army-additional-bonuses').insertAdjacentHTML('beforeend', strengthHtml + healthHtml);
			} else {
				document.getElementById(`${category}-strength-bonuses`).insertAdjacentHTML('beforeend', strengthHtml);
				document.getElementById(`${category}-health-bonuses`).insertAdjacentHTML('beforeend', healthHtml);
			}
			
			return true;
		}

		// Add remove function
		function removeBonusRow(button, category, type) {
			const row = button.closest('.bonus-row');
			if (row) {
				if (confirm('Remove this bonus entry?')) {
					row.remove();
					
					// Update indices of remaining rows
					updateRowIndices(category, type);
					
					// Update summary
					updateBonusSummary();
				}
			}
		}

		// Helper function to update row indices after removal
		function updateRowIndices(category, type) {
			const rows = document.querySelectorAll(`.bonus-row[data-category="${category}"][data-type="${type}"]`);
			
			rows.forEach((row, index) => {
				const newIndex = index + 1;
				row.setAttribute('data-index', newIndex);
				
				// Update label
				const label = row.querySelector('label');
				if (label) {
					label.textContent = `${formatCategoryName(category)} ${type === 'strength' ? 'Strength' : 'Health'} Bonus ${newIndex} (%)`;
				}
				
				// Update input data-index
				const input = row.querySelector('input');
				if (input) {
					input.setAttribute('data-index', newIndex);
				}
			});
		}
		
		function loadSavedBonusValues() {
			// This function would load saved values from armyBonuses into the input fields
			// Implementation depends on how you want to persist the data
		}
		

		// Helper function to apply bonuses to troop stats
		function applyBonuses(baseStats) {
			return {
				strength: baseStats.strength * (1 + armyBonuses.strength / 100),
				health: baseStats.health * (1 + armyBonuses.health / 100)
			};
		}


        function selectCitadelLevel(button) {
			// Remove active class from all citadel buttons
			document.querySelectorAll('.selection-btn[data-level]').forEach(btn => {
				btn.classList.remove('active');
			});
			
			// Add active class to selected button
			button.classList.add('active');
			
			// Set selected citadel level - ensure it's parsed as integer
			selectedCitadelLevel = parseInt(button.getAttribute('data-level'), 10);
			
			// Debug log to check the level value
			console.log(`Selected citadel level: ${selectedCitadelLevel}`);
			console.log(`Available data for this level:`, citadelData[selectedCitadelLevel]);
			
			// Check if data exists for this level
			if (!citadelData[selectedCitadelLevel]) {
				alert(`Sorry, data for citadel level ${selectedCitadelLevel} is not available.`);
				button.classList.remove('active');
				selectedCitadelLevel = null;
				document.getElementById('next-step-1').disabled = true;
				document.getElementById('citadel-details').classList.add('hidden');
				return;
			}
			
			// Display citadel details
			displayCitadelDetails(selectedCitadelLevel);
			
			// Enable next button
			document.getElementById('next-step-1').disabled = false;
		}

		// Also, let me add a helper function to initialize the citadelData if needed
		function initializeCitadelData() {
			// Make sure all citadel levels are properly initialized
			const validLevels = [30, 25, 20, 15, 10];
			
			validLevels.forEach(level => {
				if (!citadelData[level]) {
					console.warn(`Warning: No data for citadel level ${level}`);
				}
			});
		}

		// Call this initialization when the page loads
		document.addEventListener('DOMContentLoaded', function() {
			initializeCitadelData();
			setupEventListeners();
		});
		
        function displayCitadelDetails(level) {
			const defenders = citadelData[level];
			
			// Add validation check
			if (!defenders || !Array.isArray(defenders)) {
				console.error(`No data found for citadel level ${level}`);
				alert(`No data available for citadel level ${level}`);
				return;
			}
			
			const tbody = document.getElementById('citadel-defenders');
			const extraDamageDiv = document.getElementById('extra-damage-info');
			
			// Clear previous content
			tbody.innerHTML = '';
			extraDamageDiv.innerHTML = '';
			
			let totalStrength = 0;
			let totalHealth = 0;
			extraDamageTypes.clear();
			
			// Display each defender
			defenders.forEach(defender => {
				const totalStr = defender.quantity * defender.strength;
				const totalHlth = defender.quantity * defender.health;
				totalStrength += totalStr;
				totalHealth += totalHlth;
				
				const row = document.createElement('tr');
				row.innerHTML = `
					<td>${defender.type}</td>
					<td>${defender.quantity.toLocaleString()}</td>
				`;
				tbody.appendChild(row);
				
				// Check for extra damage types
				if (defender.extraDamage) {
					Object.keys(defender.extraDamage).forEach(type => {
						if (defender.extraDamage[type] > 0) {
							extraDamageTypes.add(type);
						}
					});
				}
			});
			
			// Update totals
			citadelTotals.strength = totalStrength;
			citadelTotals.health = totalHealth;
			citadelTotals.power = totalStrength + totalHealth;
			
			//document.getElementById('citadel-total-strength').textContent = totalStrength.toLocaleString();
			//document.getElementById('citadel-total-health').textContent = totalHealth.toLocaleString();
			
			// Display extra damage info with categorization note
			if (extraDamageTypes.size > 0) {
				extraDamageDiv.innerHTML = `
					<div class="col-12">
						
						
						<p class="mt-2 text-muted alert alert-info mt-3"><small>We'll avoid using those troop types that citadel deal extra damage in our attack.</small></p>
						
						
					</div>
				`;
			} else {
				extraDamageDiv.innerHTML = `
					<div class="col-12">
						
						<p class="text-muted"><small>We'll avoid using those troop types that citadel deal extra damage in our attack.</small></p>
						
						
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
			const summaryTitle = document.querySelector('#selected-army-summary h5.section-title');
            
			/**
			if (summaryTitle && selectedCitadelLevel) {
				summaryTitle.textContent = `Your Selected Army Levels for Citadel ${selectedCitadelLevel}`;
			}
			**/
			
			document.querySelector('#selected-army-summary h5').innerHTML = `Your Selected Army Levels for <i class="fa-brands fa-fort-awesome"></i> <span style="font-style:italic;">Citadel Level-${selectedCitadelLevel}</span>`;
			
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
			// Don't validate citadel level since we're coming from results
			// Just go directly to step 2
			changeStep(2);
			
			// Restore army level selections visually
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
			//const viewResultsBtn = document.getElementById('view-results');
			
			// Simulate calculation progress
			let progress = 0;
			const interval = setInterval(() => {
				progress += 10;
				progressBar.style.width = `${progress}%`;
				
				if (progress >= 100) {
					clearInterval(interval);
					
					// Perform the actual calculation
					performArmyCalculation();
					
					// Automatically go to step 4 after a brief delay
					setTimeout(() => {
						goToStep4();
					}, 500); // 0.5 second delay to show completion
				}
			}, 100);
		}

        function performArmyCalculation() {
			// Get citadel data
			const defenders = citadelData[selectedCitadelLevel];
			
			// Get walls (Fortifications)
			const walls = defenders.find(d => d.type.includes('Fortifications'));
			
			// Get other defenders (non-walls)
			const otherDefenders = defenders.filter(d => !d.type.includes('Fortifications'));
			
			// Determine which troop types to avoid based on extra damage
			const avoidedCategories = Array.from(extraDamageTypes);
			
			// Get available troop levels (2 best levels for each type except engineers)
			const availableLevels = {
				guard: getBestTwoLevels(selectedArmyLevels.guard, 'guard'),
				special: getBestTwoLevels(selectedArmyLevels.special, 'special'),
				engineer: [selectedArmyLevels.engineer], // Only 1 level for engineers
				dragon: getBestTwoLevels(selectedArmyLevels.dragon, 'dragon')
			};
			
			// Reset recommended army
			recommendedArmy = [];
			
			// 1. Calculate engineers needed for walls
			calculateEngineersForWalls(walls, availableLevels.engineer[0], avoidedCategories);
			
			// 2. Calculate other troops needed for defenders - using mixed levels
			calculateMixedTroopsForDefenders(otherDefenders, availableLevels, avoidedCategories);
			
			// 3. Ensure we have a good mix of troop types
			ensureMixedArmyComposition(availableLevels);
		}
		
		// New function to calculate with mixed troop levels
		function calculateMixedTroopsForDefenders(defenders, availableLevels, avoidedCategories) {
			// Clear any existing troops (except engineers)
			recommendedArmy = recommendedArmy.filter(troop => troop.type === 'Engineer');
			
			// Calculate total defender power
			let totalDefenderPower = 0;
			defenders.forEach(defender => {
				totalDefenderPower += defender.quantity * (defender.strength + defender.health);
			});
			
			// Distribute the total power requirement across different troop types and levels
			distributePowerAcrossTroops(defenders, availableLevels, avoidedCategories, totalDefenderPower);
		}

		function distributePowerAcrossTroops(defenders, availableLevels, avoidedCategories, totalDefenderPower) {
			// Get all available troops from all types and levels
			const allAvailableTroops = getAllAvailableTroops(availableLevels, avoidedCategories);
			
			if (allAvailableTroops.length === 0) {
				console.error("No available troops after filtering avoided categories!");
				return;
			}
			
			// Group troops by type
			const troopsByType = {
				guard: allAvailableTroops.filter(t => t.armyType === 'Guard'),
				special: allAvailableTroops.filter(t => t.armyType === 'Special'),
				dragon: allAvailableTroops.filter(t => t.armyType === 'Dragon')
			};
			
			// Calculate power distribution:
			// - 40% to Dragons (most powerful)
			// - 30% to Special troops
			// - 30% to Guards
			const powerDistribution = {
				Dragon: 0.4,
				Special: 0.3,
				Guard: 0.3
			};
			
			// Target power is 1.5x defender power for easy victory
			const targetTotalPower = totalDefenderPower * 1.5;
			
			// For each troop type, allocate power and select troops
			Object.keys(powerDistribution).forEach(troopType => {
				const typeTroops = troopsByType[troopType.toLowerCase()];
				if (typeTroops.length === 0) return;
				
				const typePowerTarget = targetTotalPower * powerDistribution[troopType];
				
				// Distribute this type's power across its available levels
				distributeTypePower(troopType, typeTroops, typePowerTarget);
			});
			
			// After initial allocation, assign troops to specific defenders
			assignTroopsToSpecificDefenders(defenders, allAvailableTroops);
		}
		
		
		function distributeTypePower(troopType, typeTroops, typePowerTarget) {
			// Sort troops by level (highest first)
			const sortedTroops = [...typeTroops].sort((a, b) => b.level - a.level);
			
			// We want to use both levels if available
			let remainingPower = typePowerTarget;
			const allocatedTroops = [];
			
			// First pass: allocate to highest level
			if (sortedTroops.length > 0) {
				const highestTroop = sortedTroops[0];
				const highestPowerPerUnit = highestTroop.strength + highestTroop.health;
				
				// Use 60% of power for highest level
				const highestPowerTarget = typePowerTarget * 0.6;
				const highestQuantity = Math.ceil(highestPowerTarget / highestPowerPerUnit);
				
				if (highestQuantity > 0) {
					allocatedTroops.push({
						...highestTroop,
						quantity: highestQuantity,
						totalPower: highestQuantity * highestPowerPerUnit
					});
					remainingPower -= highestQuantity * highestPowerPerUnit;
				}
			}
			
			// Second pass: allocate to next level if available
			if (sortedTroops.length > 1 && remainingPower > 0) {
				const nextTroop = sortedTroops[1];
				const nextPowerPerUnit = nextTroop.strength + nextTroop.health;
				const nextQuantity = Math.ceil(remainingPower / nextPowerPerUnit);
				
				if (nextQuantity > 0) {
					allocatedTroops.push({
						...nextTroop,
						quantity: nextQuantity,
						totalPower: nextQuantity * nextPowerPerUnit
					});
				}
			}
			
			// Add allocated troops to recommended army
			allocatedTroops.forEach(troop => {
				addOrMergeTroop(troop);
			});
		}
		
		function addOrMergeTroop(troopData) {
			const existingIndex = recommendedArmy.findIndex(t => 
				t.type === troopData.armyType && 
				t.level === troopData.level
			);
			
			if (existingIndex >= 0) {
				// Merge with existing
				const existing = recommendedArmy[existingIndex];
				existing.quantity += troopData.quantity;
				existing.totalStrength += troopData.quantity * troopData.strength;
				existing.totalHealth += troopData.quantity * troopData.health;
				existing.totalPower += troopData.totalPower;
				
				// Update categories
				if (!existing.categoriesUsed) existing.categoriesUsed = new Set();
				existing.categoriesUsed.add(troopData.category);
				if (troopData.subCategory) existing.categoriesUsed.add(troopData.subCategory);
				existing.category = Array.from(existing.categoriesUsed).join(', ');
			} else {
				// Add new troop
				recommendedArmy.push({
					type: troopData.armyType,
					level: troopData.level,
					name: `${troopData.armyType} L${troopData.level}`,
					category: troopData.category,
					categoriesUsed: new Set([troopData.category, troopData.subCategory].filter(Boolean)),
					quantity: troopData.quantity,
					strength: troopData.strength,
					health: troopData.health,
					totalStrength: troopData.quantity * troopData.strength,
					totalHealth: troopData.quantity * troopData.health,
					totalPower: troopData.totalPower
				});
			}
		}
		
		function assignTroopsToSpecificDefenders(defenders, allAvailableTroops) {
			// Sort defenders by power (highest first)
			const sortedDefenders = [...defenders].sort((a, b) => 
				(b.quantity * (b.strength + b.health)) - (a.quantity * (a.strength + b.health))
			);
			
			// Assign appropriate troops to each defender based on weaknesses
			sortedDefenders.forEach((defender, index) => {
				const defenderWeaknesses = getDefenderWeaknesses(defender);
				
				// Find best troop from our recommended army that matches weaknesses
				const bestTroop = findBestTroopFromRecommended(defenderWeaknesses, allAvailableTroops, defender);
				
				if (bestTroop) {
					// Calculate how many of these troops we need for this defender
					const defenderPower = defender.quantity * (defender.strength + defender.health);
					const safetyMargin = 1.25; // 25% safety margin
					const neededPower = defenderPower * safetyMargin;
					const troopPower = bestTroop.strength + bestTroop.health;
					const neededQuantity = Math.ceil(neededPower / troopPower);
					
					// Update or add these troops
					updateTroopQuantity(bestTroop, neededQuantity);
				}
			});
		}

		function findBestTroopFromRecommended(defenderWeaknesses, allAvailableTroops, defender) {
			// First, try to find a troop type that we're already using and matches weaknesses
			// AND is not in defender's extra damage categories
			for (const troop of recommendedArmy) {
				if (troop.type === 'Engineer') continue;
				
				// Find the troop data from allAvailableTroops
				const troopData = allAvailableTroops.find(t => 
					t.armyType === troop.type && 
					t.level === troop.level
				);
				
				if (troopData) {
					// Check if this troop has advantage (matches weaknesses)
					const hasAdvantage = defenderWeaknesses.includes(troopData.category) || 
									   defenderWeaknesses.includes(troopData.subCategory);
					
					// Check if defender deals extra damage to this troop
					let hasDisadvantage = false;
					if (defender.extraDamage) {
						const extraDamageToCategory = defender.extraDamage[troopData.category] || 0;
						const extraDamageToSubCategory = defender.extraDamage[troopData.subCategory] || 0;
						hasDisadvantage = extraDamageToCategory > 0.3 || extraDamageToSubCategory > 0.3;
					}
					
					if (hasAdvantage && !hasDisadvantage) {
						return troopData;
					}
				}
			}
			
			// If no advantage troops found, return a troop that at least doesn't have disadvantage
			for (const troop of recommendedArmy) {
				if (troop.type === 'Engineer') continue;
				
				const troopData = allAvailableTroops.find(t => 
					t.armyType === troop.type && 
					t.level === troop.level
				);
				
				if (troopData) {
					// Check if defender deals extra damage to this troop
					let hasDisadvantage = false;
					if (defender.extraDamage) {
						const extraDamageToCategory = defender.extraDamage[troopData.category] || 0;
						const extraDamageToSubCategory = defender.extraDamage[troopData.subCategory] || 0;
						hasDisadvantage = extraDamageToCategory > 0.3 || extraDamageToSubCategory > 0.3;
					}
					
					if (!hasDisadvantage) {
						return troopData;
					}
				}
			}
			
			// If all troops have disadvantage, return the strongest one
			const combatTroops = recommendedArmy.filter(t => t.type !== 'Engineer');
			if (combatTroops.length > 0) {
				const strongestTroop = combatTroops.sort((a, b) => 
					(b.strength + b.health) - (a.strength + a.health)
				)[0];
				
				return allAvailableTroops.find(t => 
					t.armyType === strongestTroop.type && 
					t.level === strongestTroop.level
				);
			}
			
			return null;
		}
		
		
		function updateTroopQuantity(troopData, additionalQuantity) {
			const existingIndex = recommendedArmy.findIndex(t => 
				t.type === troopData.armyType && 
				t.level === troopData.level
			);
			
			if (existingIndex >= 0) {
				const existing = recommendedArmy[existingIndex];
				const troopPower = troopData.strength + troopData.health;
				
				// Add additional quantity
				existing.quantity += additionalQuantity;
				existing.totalStrength += additionalQuantity * troopData.strength;
				existing.totalHealth += additionalQuantity * troopData.health;
				existing.totalPower += additionalQuantity * troopPower;
			}
		}
		
		
		function ensureMixedArmyComposition(availableLevels) {
			// Check what troop types we have
			const hasGuard = recommendedArmy.some(t => t.type === 'Guard');
			const hasSpecial = recommendedArmy.some(t => t.type === 'Special');
			const hasDragon = recommendedArmy.some(t => t.type === 'Dragon');
			
			// Ensure we have at least one of each type
			if (!hasGuard && availableLevels.guard.length > 0) {
				addMinimumTroops('Guard', availableLevels.guard);
			}
			
			if (!hasSpecial && availableLevels.special.length > 0) {
				addMinimumTroops('Special', availableLevels.special);
			}
			
			if (!hasDragon && availableLevels.dragon.length > 0) {
				addMinimumTroops('Dragon', availableLevels.dragon);
			}
			
			// Ensure we're using both levels for each type (where possible)
			ensureBothLevelsUsed(availableLevels);
		}
		
		
		function addMinimumTroops(troopType, levels) {
			// Try each level until we find one with data
			for (const level of levels) {
				const troopData = getTroopDataByTypeAndLevel(troopType, level);
				
				if (troopData) {
					// Add a minimum quantity
					const minQuantity = 100;
					const troopPower = troopData.strength + troopData.health;
					
					addOrMergeTroop({
						...troopData,
						quantity: minQuantity,
						totalPower: minQuantity * troopPower
					});
					return; // Exit after adding
				}
			}
			
			console.warn(`Could not add ${troopType} troops - no valid data found for levels ${levels.join(', ')}`);
		}
		
		
		function getTroopDataByTypeAndLevel(troopType, level) {
			const typeLower = troopType.toLowerCase();
			
			if (typeLower === 'dragon') {
				const dragons = dragonData[level];
				if (dragons && dragons.length > 0) {
					// Return a dragon that's not in avoided categories
					const dragon = dragons[0];
					return {
						armyType: 'Dragon',
						level: level,
						name: dragon.name,
						category: dragon.category,
						subCategory: dragon.subCategory,
						strength: dragon.strength,
						health: dragon.health
					};
				}
			} else if (typeLower === 'guard' || typeLower === 'special') {
				const typeData = armyTypeData[typeLower];
				if (typeData && typeData[level]) {
					// Find first available category
					const categories = Object.keys(typeData[level]);
					if (categories.length > 0) {
						const firstCategory = categories[0];
						return {
							armyType: troopType,
							level: level,
							name: `${troopType} L${level}`,
							category: firstCategory,
							subCategory: firstCategory,
							strength: typeData[level][firstCategory].strength,
							health: typeData[level][firstCategory].health
						};
					}
				}
			}
			
			console.warn(`No troop data found for ${troopType} level ${level}`);
			return null;
		}


		function ensureBothLevelsUsed(availableLevels) {
			// For each troop type, ensure we're using both levels if available
			['guard', 'special', 'dragon'].forEach(type => {
				const levels = availableLevels[type];
				if (levels.length > 1) {
					const hasHighest = recommendedArmy.some(t => 
						t.type.toLowerCase() === type && t.level === levels[0]
					);
					const hasSecond = recommendedArmy.some(t => 
						t.type.toLowerCase() === type && t.level === levels[1]
					);
					
					// If we're only using one level, add some of the other level
					if (hasHighest && !hasSecond) {
						addSecondaryLevelTroops(type, levels[1]);
					} else if (!hasHighest && hasSecond) {
						// This shouldn't happen often, but ensure we have highest level
						addSecondaryLevelTroops(type, levels[0]);
					}
				}
			});
		}
		
		
		function addSecondaryLevelTroops(troopType, level) {
			const troopData = getTroopDataByTypeAndLevel(troopType, level);
			if (troopData) {
				// Add a smaller amount of the secondary level (e.g., 25% of primary level)
				const primaryTroop = recommendedArmy.find(t => 
					t.type.toLowerCase() === troopType.toLowerCase()
				);
				
				if (primaryTroop) {
					const secondaryQuantity = Math.max(50, Math.floor(primaryTroop.quantity * 0.25));
					const troopPower = troopData.strength + troopData.health;
					
					addOrMergeTroop({
						...troopData,
						quantity: secondaryQuantity,
						totalPower: secondaryQuantity * troopPower
					});
				}
			}
		}
		
		
		
		
        function getBestTwoLevels(highestLevel, type) {
			if (!highestLevel) return [];
			
			if (type === 'dragon') {
				// Dragons start at level 3
				if (highestLevel <= 3) return [highestLevel];
				if (highestLevel === 4) return [4, 3];
				return [highestLevel, highestLevel - 1];
			} else {
				if (highestLevel <= 1) return [highestLevel];
				return [highestLevel, highestLevel - 1];
			}
		}

        function calculateEngineersForWalls(walls, engineerLevel, avoidedCategories) {
			// Get engineer stats
			const engineerStats = armyTypeData.engineer[engineerLevel]?.Siege;
			
			if (!engineerStats) {
				console.error(`No engineer data found for level ${engineerLevel}`);
				return;
			}
			
			// Apply bonuses
			const bonusStats = applyBonuses(engineerStats, 'engineer', 'Siege');
			
			// Calculate needed engineers to overcome walls
			const wallPower = walls.quantity * (walls.strength + walls.health);
			const engineerPower = bonusStats.strength + bonusStats.health;
			
			// Add safety margin of 50%
			const neededEngineers = Math.ceil((wallPower * 1.5) / engineerPower);
			
			// Create proper engineer data
			const engineerData = {
				type: 'Engineer',
				level: engineerLevel,
				name: `Engineer L${engineerLevel}`,
				category: 'Siege',
				subCategory: 'Siege',
				categoriesUsed: new Set(['Siege']),
				quantity: neededEngineers,
				strength: bonusStats.strength,
				health: bonusStats.health,
				baseStrength: engineerStats.strength, // Keep original for display
				baseHealth: engineerStats.health,     // Keep original for display
				totalStrength: neededEngineers * bonusStats.strength,
				totalHealth: neededEngineers * bonusStats.health,
				totalPower: neededEngineers * engineerPower
			};
			
			// Add to recommended army
			recommendedArmy.push(engineerData);
		}
		
		
		// Helper function to get all available troops
		function getAllAvailableTroops(availableLevels, avoidedCategories) {
			const allTroops = [];
			
			// Helper function to check if a troop should be avoided
			const shouldAvoid = (category, subCategory) => {
				if (!category) return true;
				
				// Normalize category names
				const normalize = (cat) => {
					if (!cat) return '';
					// Handle special cases
					if (cat === 'Elementals') return 'Elemental';
					if (cat === 'Dragons') return 'Dragon';
					if (cat === 'Giants') return 'Giant';
					return cat.endsWith('s') ? cat.slice(0, -1) : cat;
				};
				
				const normCategory = normalize(category);
				const normSubCategory = normalize(subCategory || category);
				
				// Check against avoided categories
				for (const avoided of avoidedCategories) {
					const normAvoided = normalize(avoided);
					if (normCategory === normAvoided || normSubCategory === normAvoided) {
						return true;
					}
				}
				
				return false;
			};
			
			// Add Guard troops
			availableLevels.guard.forEach(level => {
				const categories = armyTypeData.guard[level];
				if (categories) {
					Object.keys(categories).forEach(category => {
						if (!shouldAvoid(category, category)) {
							const baseStats = categories[category];
							const bonusStats = applyBonuses(baseStats, 'guard', category);
							
							allTroops.push({
								armyType: 'Guard',
								level: level,
								name: `Guard L${level}`,
								category: category,
								subCategory: category,
								strength: bonusStats.strength,
								health: bonusStats.health,
								baseStrength: baseStats.strength,
								baseHealth: baseStats.health,
								powerPerUnit: bonusStats.strength + bonusStats.health,
								costEffectiveness: (bonusStats.strength + bonusStats.health) / Math.max(level, 1)
							});
						}
					});
				}
			});
			
			// Add Special troops
			availableLevels.special.forEach(level => {
				const categories = armyTypeData.special[level];
				if (categories) {
					Object.keys(categories).forEach(category => {
						if (!shouldAvoid(category, category)) {
							const baseStats = categories[category];
							const bonusStats = applyBonuses(baseStats, 'special', category);
							
							allTroops.push({
								armyType: 'Special',
								level: level,
								name: `Special L${level}`,
								category: category,
								subCategory: category,
								strength: bonusStats.strength,
								health: bonusStats.health,
								baseStrength: baseStats.strength,
								baseHealth: baseStats.health,
								powerPerUnit: bonusStats.strength + bonusStats.health,
								costEffectiveness: (bonusStats.strength + bonusStats.health) / Math.max(level, 1) * 1.2
							});
						}
					});
				}
			});
			
			// Add Dragon troops
			availableLevels.dragon.forEach(level => {
				if (dragonData[level]) {
					dragonData[level].forEach(dragon => {
						if (!shouldAvoid(dragon.category, dragon.subCategory)) {
							const baseStats = { strength: dragon.strength, health: dragon.health };
							const bonusStats = applyBonuses(baseStats, 'dragon', dragon.category);
							
							allTroops.push({
								armyType: 'Dragon',
								level: level,
								name: dragon.name,
								category: dragon.category,
								subCategory: dragon.subCategory,
								strength: bonusStats.strength,
								health: bonusStats.health,
								baseStrength: dragon.strength,
								baseHealth: dragon.health,
								powerPerUnit: bonusStats.strength + bonusStats.health,
								costEffectiveness: (bonusStats.strength + bonusStats.health) / Math.max(level, 1) * 1.5
							});
						}
					});
				}
			});
			/*
			// Sort troops by cost-effectiveness
			return allTroops.sort((a, b) => {
				// First by level (highest first)
				if (b.level !== a.level) return b.level - a.level;
				// Then by cost-effectiveness
				return b.costEffectiveness - a.costEffectiveness;
			});   */
			return allTroops;
		}
		
		// Helper function to get defender weaknesses
		function getDefenderWeaknesses(defender) {
			const weaknesses = [];
			
			// Define all possible troop categories
			const allCategories = ['Flying', 'Melee', 'Mounted', 'Ranged', 'Elemental', 'Dragon', 'Giant', 'Beast', 'Siege'];
			
			if (defender.extraDamage) {
				// For each category, check if defender has LOW or NO extra damage against it
				allCategories.forEach(category => {
					const extraDamage = defender.extraDamage[category] || 0;
					const normalizedCategory = category.endsWith('s') ? category.slice(0, -1) : category;
					const extraDamageNormalized = defender.extraDamage[normalizedCategory] || extraDamage;
					
					// If defender has less than 0.3 extra damage, consider it a weakness
					if (extraDamageNormalized < 0.3) {
						weaknesses.push(category);
					}
				});
			} else {
				// If no extra damage data, use default weaknesses
				weaknesses.push('Melee', 'Mounted', 'Ranged', 'Flying');
			}
			
			// Ensure we always have some weaknesses
			if (weaknesses.length === 0) {
				weaknesses.push('Melee', 'Mounted', 'Ranged');
			}
			
			return weaknesses;
		}
		
		// Find best troop for a specific defender type
		function findBestTroopForDefenderType(defender, availableTroops, defenderWeaknesses) {
			// Filter troops that are strong against this defender
			const effectiveTroops = availableTroops.filter(troop => {
				// Check if troop category matches defender weaknesses
				const categoryMatch = defenderWeaknesses.includes(troop.category) || 
									defenderWeaknesses.includes(troop.subCategory);
				
				// Also check if defender deals extra damage to this troop type
				let hasDisadvantage = false;
				if (defender.extraDamage) {
					const extraDamageToCategory = defender.extraDamage[troop.category] || 0;
					const extraDamageToSubCategory = defender.extraDamage[troop.subCategory] || 0;
					hasDisadvantage = extraDamageToCategory > 0.5 || extraDamageToSubCategory > 0.5;
				}
				
				return categoryMatch && !hasDisadvantage;
			});
			
			if (effectiveTroops.length > 0) {
				// Return the most cost-effective troop
				return effectiveTroops[0];
			}
			
			// If no perfectly effective troops, use the strongest available that doesn't have disadvantage
			const safeTroops = availableTroops.filter(troop => {
				if (defender.extraDamage) {
					const extraDamageToCategory = defender.extraDamage[troop.category] || 0;
					const extraDamageToSubCategory = defender.extraDamage[troop.subCategory] || 0;
					return extraDamageToCategory < 0.5 && extraDamageToSubCategory < 0.5;
				}
				return true;
			});
			
			return safeTroops.length > 0 ? safeTroops[0] : availableTroops[0];
		}
		
		
		// Distribute troops more evenly
		function distributeTroopsEvenly(allAvailableTroops, totalDefenderPower) {
			// Calculate total army power
			let totalArmyPower = recommendedArmy.reduce((sum, troop) => sum + troop.totalPower, 0);
			
			// Target: Army should be at least 1.5x defender power for easy victory
			const targetPower = totalDefenderPower * 1.5;
			
			if (totalArmyPower < targetPower) {
				// We need more troops - distribute across different types
				const powerNeeded = targetPower - totalArmyPower;
				
				// Get top 3 most effective troop types
				const topTroops = allAvailableTroops.slice(0, 3);
				
				if (topTroops.length > 0) {
					// Calculate how many of each top troop we need
					const powerPerTroop = topTroops[0].strength + topTroops[0].health;
					const troopsNeeded = Math.ceil(powerNeeded / powerPerTroop);
					
					// Distribute across available top troop types
					topTroops.forEach((troop, index) => {
						const troopsToAdd = Math.ceil(troopsNeeded / topTroops.length);
						
						const existingIndex = recommendedArmy.findIndex(t => 
							t.type === troop.armyType && 
							t.level === troop.level &&
							t.category === troop.category
						);
						
						if (existingIndex >= 0) {
							// Add to existing
							const existing = recommendedArmy[existingIndex];
							existing.quantity += troopsToAdd;
							existing.totalStrength += troopsToAdd * troop.strength;
							existing.totalHealth += troopsToAdd * troop.health;
							existing.totalPower += troopsToAdd * (troop.strength + troop.health);
						} else {
							// Add new
							recommendedArmy.push({
								type: troop.armyType,
								level: troop.level,
								name: troop.name,
								category: troop.category,
								subCategory: troop.subCategory,
								quantity: troopsToAdd,
								strength: troop.strength,
								health: troop.health,
								totalStrength: troopsToAdd * troop.strength,
								totalHealth: troopsToAdd * troop.health,
								totalPower: troopsToAdd * (troop.strength + troop.health)
							});
						}
					});
				}
			}
			
			// Ensure we use Special troops (they're often overlooked)
			ensureSpecialTroopsUsed(allAvailableTroops);
		}
		
		// Also update the ensureSpecialTroopsUsed function
		function ensureSpecialTroopsUsed(allAvailableTroops, totalDefenderPower) {
			// Check if we have any Special troops in the army
			const hasSpecialTroops = recommendedArmy.some(troop => troop.type === 'Special');
			
			if (!hasSpecialTroops && allAvailableTroops.length > 0) {
				// Find the best Special troop
				const specialTroops = allAvailableTroops.filter(t => t.armyType === 'Special');
				
				if (specialTroops.length > 0) {
					const bestSpecial = specialTroops[0];
					const powerPerUnit = bestSpecial.strength + bestSpecial.health;
					
					// Add Special troops (about 20% of total power needed)
					const specialPowerNeeded = totalDefenderPower * 0.2;
					const specialCount = Math.ceil(specialPowerNeeded / powerPerUnit);
					
					if (specialCount > 0) {
						recommendedArmy.push({
							type: 'Special',
							level: bestSpecial.level,
							name: `Special L${bestSpecial.level}`,
							category: bestSpecial.category,
							categoriesUsed: new Set([bestSpecial.category]),
							quantity: specialCount,
							strength: bestSpecial.strength,
							health: bestSpecial.health,
							totalStrength: specialCount * bestSpecial.strength,
							totalHealth: specialCount * bestSpecial.health,
							totalPower: specialCount * powerPerUnit
						});
					}
				}
			}
		}

        function calculateTroopsForDefenders(defenders, availableLevels, avoidedCategories, totalDefenderPower = 0) {
			// Clear any existing troops (except engineers)
			recommendedArmy = recommendedArmy.filter(troop => troop.type === 'Engineer');
			
			// First, identify ALL available troops from all types and levels
			const allAvailableTroops = getAllAvailableTroops(availableLevels, avoidedCategories);
			
			if (allAvailableTroops.length === 0) {
				console.error("No available troops after filtering avoided categories!");
				return;
			}
			
			// Sort defenders by total power (highest first) - we want to handle strongest defenders first
			const sortedDefenders = [...defenders].sort((a, b) => 
				(b.quantity * (b.strength + b.health)) - (a.quantity * (a.strength + b.health))
			);
			
			// Calculate total defender power
			totalDefenderPower = 0;
			sortedDefenders.forEach(defender => {
				totalDefenderPower += defender.quantity * (defender.strength + defender.health);
			});
			
			// Group defenders by their type/categories to match with troops
			sortedDefenders.forEach((defender, index) => {
				// Get categories this defender deals extra damage against
				const defenderWeakAgainst = getDefenderWeaknesses(defender);
				
				// Find the BEST troop for this defender
				const bestTroop = findBestTroopForDefenderType(defender, allAvailableTroops, defenderWeakAgainst);
				
				if (!bestTroop) {
					console.warn(`No suitable troop found for defender: ${defender.type}`);
					return;
				}
				
				// Calculate defender power
				const defenderPower = defender.quantity * (defender.strength + defender.health);
				const troopPower = bestTroop.strength + bestTroop.health;
				
				// Calculate needed quantity with appropriate safety margin
				let safetyMargin = 1.3; // Default 30%
				
				// Adjust safety margin based on troop type
				if (bestTroop.armyType === 'Dragon') {
					safetyMargin = 1.15; // Dragons are very powerful
				} else if (bestTroop.armyType === 'Guard') {
					safetyMargin = 1.35;
				} else if (bestTroop.armyType === 'Special') {
					safetyMargin = 1.25; // Special troops are stronger than guards
				}
				
				// Also adjust based on troop-defender matchup
				if (defenderWeakAgainst.includes(bestTroop.category) || 
					defenderWeakAgainst.includes(bestTroop.subCategory)) {
					safetyMargin *= 0.9; // 10% better if we have type advantage
				}
				
				const neededQuantity = Math.ceil((defenderPower * safetyMargin) / troopPower);
				
				// Check if we already have this troop TYPE in our army (combine all categories of same type)
				const existingTroopIndex = recommendedArmy.findIndex(t => 
					t.type === bestTroop.armyType && 
					t.level === bestTroop.level
				);
				
				if (existingTroopIndex >= 0) {
					// Add to existing troop type (COMBINE all categories)
					const existing = recommendedArmy[existingTroopIndex];
					existing.quantity += neededQuantity;
					existing.totalStrength += neededQuantity * bestTroop.strength;
					existing.totalHealth += neededQuantity * bestTroop.health;
					existing.totalPower += neededQuantity * troopPower;
					
					// Track all categories used for this troop type
					if (!existing.categoriesUsed) {
						existing.categoriesUsed = new Set();
					}
					existing.categoriesUsed.add(bestTroop.category);
					if (bestTroop.subCategory && bestTroop.subCategory !== bestTroop.category) {
						existing.categoriesUsed.add(bestTroop.subCategory);
					}
					
					// Update name to show it's combined
					existing.name = `${bestTroop.armyType} L${bestTroop.level}`;
				} else {
					// Add new troop type
					const categoriesUsed = new Set();
					categoriesUsed.add(bestTroop.category);
					if (bestTroop.subCategory && bestTroop.subCategory !== bestTroop.category) {
						categoriesUsed.add(bestTroop.subCategory);
					}
					
					recommendedArmy.push({
						type: bestTroop.armyType,
						level: bestTroop.level,
						name: `${bestTroop.armyType} L${bestTroop.level}`,
						category: Array.from(categoriesUsed).join(', '), // Show all categories used
						categoriesUsed: categoriesUsed,
						quantity: neededQuantity,
						strength: bestTroop.strength,
						health: bestTroop.health,
						totalStrength: neededQuantity * bestTroop.strength,
						totalHealth: neededQuantity * bestTroop.health,
						totalPower: neededQuantity * troopPower
					});
				}
			});
			
			// Ensure we have a balanced army with adequate power
			balanceArmyPower(totalDefenderPower, allAvailableTroops);
		}

        function findBestTroopForDefender(defender, availableLevels, avoidedCategories) {
			return getAllAvailableTroops(availableLevels, avoidedCategories);
		}

        function balanceArmyPower(totalDefenderPower, allAvailableTroops) {
			// Calculate total army power
			let armyTotalPower = recommendedArmy.reduce((sum, troop) => sum + troop.totalPower, 0);
			
			// We want army power to be at least 1.5x defender power for easy victory
			const targetPower = totalDefenderPower * 1.5;
			
			if (armyTotalPower < targetPower) {
				// Calculate power deficit
				const powerDeficit = targetPower - armyTotalPower;
				
				// Find the strongest combat troop type (not engineer)
				const combatTroops = recommendedArmy.filter(troop => troop.type !== 'Engineer');
				
				if (combatTroops.length > 0) {
					// Sort combat troops by power per unit (most effective first)
					combatTroops.sort((a, b) => {
						const aPowerPerUnit = (a.strength + a.health);
						const bPowerPerUnit = (b.strength + b.health);
						return bPowerPerUnit - aPowerPerUnit;
					});
					
					// Use the strongest troop type to fill the deficit
					const strongestTroop = combatTroops[0];
					const troopPowerPerUnit = strongestTroop.strength + strongestTroop.health;
					const additionalTroopsNeeded = Math.ceil(powerDeficit / troopPowerPerUnit);
					
					// Update the strongest troop's quantity
					strongestTroop.quantity += additionalTroopsNeeded;
					strongestTroop.totalStrength += additionalTroopsNeeded * strongestTroop.strength;
					strongestTroop.totalHealth += additionalTroopsNeeded * strongestTroop.health;
					strongestTroop.totalPower += additionalTroopsNeeded * troopPowerPerUnit;
				}
			}
			
			// Ensure we use the most effective troops overall
			optimizeArmyComposition(allAvailableTroops, targetPower);
		}
		
		// Function to optimize army composition - use best troops for overall power
		function optimizeArmyComposition(allAvailableTroops, targetPower) {
			// Calculate current army power
			let currentPower = recommendedArmy.reduce((sum, troop) => sum + troop.totalPower, 0);
			
			// If we're significantly underpowered, add more of the best troops
			if (currentPower < targetPower * 0.8) {
				// Find the most effective troop type overall
				const mostEffectiveTroop = allAvailableTroops[0];
				
				// Check if we already have this troop type
				const existingIndex = recommendedArmy.findIndex(t => 
					t.type === mostEffectiveTroop.armyType && 
					t.level === mostEffectiveTroop.level
				);
				
				const troopPowerPerUnit = mostEffectiveTroop.strength + mostEffectiveTroop.health;
				const additionalPowerNeeded = targetPower - currentPower;
				const additionalTroops = Math.ceil(additionalPowerNeeded / troopPowerPerUnit);
				
				if (existingIndex >= 0) {
					// Add to existing
					const existing = recommendedArmy[existingIndex];
					existing.quantity += additionalTroops;
					existing.totalStrength += additionalTroops * mostEffectiveTroop.strength;
					existing.totalHealth += additionalTroops * mostEffectiveTroop.health;
					existing.totalPower += additionalTroops * troopPowerPerUnit;
				} else {
					// Add new troop type
					recommendedArmy.push({
						type: mostEffectiveTroop.armyType,
						level: mostEffectiveTroop.level,
						name: `${mostEffectiveTroop.armyType} L${mostEffectiveTroop.level}`,
						category: mostEffectiveTroop.category,
						categoriesUsed: new Set([mostEffectiveTroop.category]),
						quantity: additionalTroops,
						strength: mostEffectiveTroop.strength,
						health: mostEffectiveTroop.health,
						totalStrength: additionalTroops * mostEffectiveTroop.strength,
						totalHealth: additionalTroops * mostEffectiveTroop.health,
						totalPower: additionalTroops * troopPowerPerUnit
					});
				}
			}
			
			// Merge similar troops to avoid duplication
			mergeSimilarTroops();
		}
		
		// Function to merge troops of same type and level
		function mergeSimilarTroops() {
			const mergedTroops = [];
			const troopMap = new Map();
			
			recommendedArmy.forEach(troop => {
				// Create a unique key for troop type and level
				const key = `${troop.type}_${troop.level}`;
				
				if (troopMap.has(key)) {
					// Merge with existing troop
					const existing = troopMap.get(key);
					existing.quantity += troop.quantity;
					existing.totalStrength += troop.totalStrength;
					existing.totalHealth += troop.totalHealth;
					existing.totalPower += troop.totalPower;
					
					// Combine categories
					if (troop.categoriesUsed) {
						troop.categoriesUsed.forEach(cat => existing.categoriesUsed.add(cat));
					}
					if (troop.category && !troop.categoriesUsed) {
						existing.categoriesUsed.add(troop.category);
					}
					
					// Update category display
					existing.category = Array.from(existing.categoriesUsed).join(', ');
				} else {
					// Create new entry
					const newTroop = { ...troop };
					if (!newTroop.categoriesUsed) {
						newTroop.categoriesUsed = new Set();
						if (newTroop.category) {
							newTroop.categoriesUsed.add(newTroop.category);
						}
					}
					troopMap.set(key, newTroop);
				}
			});
			
			// Convert map back to array
			recommendedArmy = Array.from(troopMap.values());
		}

              function displayResults() {
					// Ensure step4 exists
					if (!document.getElementById('step4')) {
						console.error('Step 4 element not found');
						return;
					}
					
					// Update citadel level in results
					document.getElementById('result-citadel-level').textContent = selectedCitadelLevel || 'Unknown';
					
					// Calculate totals
					let armyTotalStrength = 0;
					let armyTotalHealth = 0;
					let armyTotalPower = 0;
					
					const recommendedArmyTable = document.getElementById('recommended-army');
					recommendedArmyTable.innerHTML = '';
					
					// Filter out any invalid troops (with undefined values)
					const validTroops = recommendedArmy.filter(troop => 
						troop && troop.type && troop.level && troop.quantity > 0
					);
					
					// Display each recommended troop
					validTroops.forEach(troop => {
						armyTotalStrength += troop.totalStrength || 0;
						armyTotalHealth += troop.totalHealth || 0;
						armyTotalPower += troop.totalPower || 0;
						
						// Format the display name
						let displayName = troop.name || `${troop.type} L${troop.level}`;
						if (troop.type === 'Dragon' && troop.categoriesUsed && troop.categoriesUsed.size > 0) {
							const dragonTypes = Array.from(troop.categoriesUsed);
							displayName = `${troop.type} L${troop.level} (${dragonTypes.join(', ')})`;
						}
						
						// Calculate bonus percentage for display
						const strengthBonus = troop.baseStrength ? 
							((troop.strength / troop.baseStrength - 1) * 100).toFixed(1) : '0.0';
						const healthBonus = troop.baseHealth ? 
							((troop.health / troop.baseHealth - 1) * 100).toFixed(1) : '0.0';
						
						const row = document.createElement('tr');
						row.innerHTML = `
							<td>${displayName}</td>
							<td>${troop.level || '?'}</td>
							<td>${troop.category || 'Various'}</td>
							<td>${(troop.quantity || 0).toLocaleString()}</td>
							
						`;
						recommendedArmyTable.appendChild(row);
					});
					
					// Calculate comparisons
					const strengthComparison = ((armyTotalStrength - citadelTotals.strength) / citadelTotals.strength * 100).toFixed(1);
					const healthComparison = ((armyTotalHealth - citadelTotals.health) / citadelTotals.health * 100).toFixed(1);
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
					document.getElementById('result-defender-count').textContent = citadelData[selectedCitadelLevel].length;
					document.getElementById('result-army-types').textContent = new Set(recommendedArmy.map(t => t.type)).size;
					
					const engineers = recommendedArmy.find(t => t.type === 'Engineer');
					document.getElementById('result-engineers').textContent = engineers ? engineers.quantity.toLocaleString() : '0';
					
					// Add Bonuses Breakdown to Battle Summary Card
					addBonusesToBattleSummary();
					
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

function addBonusesToBattleSummary() {
    const bonusBreakdown = createBonusBreakdownHTML();
    if (!bonusBreakdown) return; // No bonuses to display
    
    // Find the Battle Summary card (the card in the right column)
    const battleSummaryCard = document.querySelector('#step4 .col-md-4 .card:first-child .card-body');
    
    if (!battleSummaryCard) {
        console.error('Battle Summary card not found');
        return;
    }
    
    // Remove any existing bonuses section
    const existingBonusesSection = battleSummaryCard.querySelector('.bonuses-breakdown-section');
    if (existingBonusesSection) {
        existingBonusesSection.remove();
    }
    
    // Also remove any divider before bonuses
    const existingHr = battleSummaryCard.querySelector('hr');
    if (existingHr && existingHr.nextElementSibling === existingBonusesSection) {
        existingHr.remove();
    }
    
    // Find where to insert the bonuses - after the Battle Summary content
    // Look for the Power Comparison heading or the last content element before buttons
    const powerComparisonHeading = battleSummaryCard.querySelector('h5.card-title');
    let insertBeforeElement = null;
    
    // Check if there's a "Start New Calculation" button section
    const startNewCalcDiv = battleSummaryCard.parentNode.nextElementSibling;
    
    if (startNewCalcDiv && startNewCalcDiv.classList.contains('card')) {
        // We'll insert before this card
        insertBeforeElement = startNewCalcDiv;
    } else {
        // Look for the last element in the current card body
        const lastChild = battleSummaryCard.lastElementChild;
        insertBeforeElement = null; // Will append at the end
    }
    
    // Create a divider
    const divider = document.createElement('hr');
    divider.className = 'my-3';
    
    // Create bonuses section
    const bonusesSection = document.createElement('div');
    bonusesSection.className = 'bonuses-breakdown-section';
    bonusesSection.innerHTML = bonusBreakdown;
    
    // Insert at the appropriate position
    if (insertBeforeElement && insertBeforeElement.parentNode === battleSummaryCard.parentNode) {
        // Insert in the column, not in the card body
        battleSummaryCard.parentNode.insertBefore(divider, insertBeforeElement);
        battleSummaryCard.parentNode.insertBefore(bonusesSection, insertBeforeElement);
    } else {
        // Append to the end of the battle summary card body
        battleSummaryCard.appendChild(divider);
        battleSummaryCard.appendChild(bonusesSection);
    }
}


				function createBonusBreakdownHTML() {
			// Check if there are any bonuses to display
			let hasBonuses = false;
			for (const category in armyBonuses) {
				const strengthTotal = armyBonuses[category].strength.reduce((a, b) => a + b, 0);
				const healthTotal = armyBonuses[category].health.reduce((a, b) => a + b, 0);
				
				if (strengthTotal > 0 || healthTotal > 0) {
					hasBonuses = true;
					break;
				}
			}
			
			if (!hasBonuses) {
				return ''; // Return empty string if no bonuses
			}
			
			// Build a compact HTML for the battle summary
			let html = '<h6 class="mt-0 mb-2"><i class="fas fa-chart-pie me-2 text-info"></i>Applied Bonuses</h6>';
			
			for (const category in armyBonuses) {
				const strengthTotal = armyBonuses[category].strength.reduce((a, b) => a + b, 0);
				const healthTotal = armyBonuses[category].health.reduce((a, b) => a + b, 0);
				
				if (strengthTotal > 0 || healthTotal > 0) {
					// Use smaller, more compact display
					html += `
						<div class="mb-2">
							<small><strong>${formatCategoryName(category)}:</strong></small>
							<div class="d-flex justify-content-between">
								<span class="badge bg-warning bg-opacity-75 text-dark">+${strengthTotal.toFixed(1)}% Str</span>
								<span class="badge bg-danger bg-opacity-75 text-dark">+${healthTotal.toFixed(1)}% HP</span>
							</div>
						</div>
					`;
				}
			}
			
			// Add a note if there are bonuses
			html += '<div class="alert alert-info p-2 mt-2 mb-0"><small><i class="fas fa-info-circle me-1"></i>Bonuses are applied to troop stats</small></div>';
			
			return html;
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
			
			/*
			armyBonuses = {
				army: { strength: [], health: [] },
				research: { strength: [], health: [] },
				monsters: { strength: [], health: [] },
				guard: { strength: [], health: [] },
				specialist: { strength: [], health: [] },
				engineer: { strength: [], health: [] }
			};  */
			
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
			//document.getElementById('view-results').classList.add('hidden');
			//document.getElementById('calculation-progress').style.width = '0%';
			
			// Disable calculate button
			document.getElementById('next-step-2').disabled = true;
			
			// Go back to step 1
			changeStep(1);
			
			//localStorage.removeItem('armyBonuses');
			//initializeBonusRows();
			
			//updateBonusSummaryDisplay();
		}






// Add these functions to fun5.js:

function addBonusRow(category) {
    // Find the current number of inputs for this category
    const strengthInputs = document.querySelectorAll(`.${category}-strength`);
    const healthInputs = document.querySelectorAll(`.${category}-health`);
    
    const nextIndex = strengthInputs.length + 1;
    
    if (nextIndex > 6) {
        // Show a more user-friendly message
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
    
    // Use the silent version
    addBonusRowSilently(category);
    
    // Update summary
    updateBonusSummary();
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
    // Clear all existing bonuses
    for (const category in armyBonuses) {
        armyBonuses[category].strength = [];
        armyBonuses[category].health = [];
    }
    
    // Collect all input values
    const categories = ['army', 'research', 'monsters', 'guard', 'specialist', 'engineer'];
    
    categories.forEach(category => {
        // Collect strength bonuses
        document.querySelectorAll(`.${category}-strength`).forEach(input => {
            const value = parseFloat(input.value) || 0;
            if (value > 0) {
                armyBonuses[category].strength.push(value);
            }
        });
        
        // Collect health bonuses
        document.querySelectorAll(`.${category}-health`).forEach(input => {
            const value = parseFloat(input.value) || 0;
            if (value > 0) {
                armyBonuses[category].health.push(value);
            }
        });
    });
    
    // Update summary display
    updateBonusSummary();
    
	// Update the summary display
    updateBonusSummaryDisplay();
	
    // Save to localStorage
    localStorage.setItem('armyBonuses', JSON.stringify(armyBonuses));
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('extraPowerModal'));
    modal.hide();
    
    // Update main bonus display
    updateMainBonusDisplay();
	
}

// Update the loadBonusConfig function
function loadBonusConfig() {
    const saved = localStorage.getItem('armyBonuses');
    if (saved) {
        armyBonuses = JSON.parse(saved);
        updateBonusSummary();
        updateBonusSummaryDisplay(); // Add this line
        updateMainBonusDisplay();
    }
}

// Add function to clear all bonuses
function clearAllBonuses() {
    if (confirm('Are you sure you want to clear all bonuses? This action cannot be undone.')) {
        // Reset all bonuses
        armyBonuses = {
            army: { strength: [], health: [] },
            research: { strength: [], health: [] },
            monsters: { strength: [], health: [] },
            guard: { strength: [], health: [] },
            specialist: { strength: [], health: [] },
            engineer: { strength: [], health: [] }
        };
        
        // Clear localStorage
        localStorage.removeItem('armyBonuses');
        
        // Reset input fields in modal
        document.querySelectorAll('.form-control').forEach(input => {
            if (input.type === 'number') {
                input.value = '0';
            }
        });
        
        // Update displays
        updateBonusSummary();
        updateBonusSummaryDisplay();
        
        // Show success message
        alert('All bonuses have been cleared.');
    }
}


function updateMainBonusDisplay() {
    // Calculate total bonuses for display
    let totalStrengthBonus = 0;
    let totalHealthBonus = 0;
    
    for (const category in armyBonuses) {
        totalStrengthBonus += armyBonuses[category].strength.reduce((a, b) => a + b, 0);
        totalHealthBonus += armyBonuses[category].health.reduce((a, b) => a + b, 0);
    }
    
    
}

// Update the applyBonuses function to handle category-specific bonuses
function applyBonuses(baseStats, troopType = '', troopCategory = '') {
    // Calculate base bonuses (general army bonuses)
    let totalStrengthBonus = armyBonuses.army.strength.reduce((a, b) => a + b, 0);
    let totalHealthBonus = armyBonuses.army.health.reduce((a, b) => a + b, 0);
    
    // Add category-specific bonuses
    const troopTypeLower = troopType.toLowerCase();
    const troopCategoryLower = troopCategory.toLowerCase();
    
    // Check for specific category bonuses
    if (troopTypeLower === 'guard' || troopCategoryLower.includes('guard')) {
        totalStrengthBonus += armyBonuses.guard.strength.reduce((a, b) => a + b, 0);
        totalHealthBonus += armyBonuses.guard.health.reduce((a, b) => a + b, 0);
    }
    else if (troopTypeLower === 'special' || troopCategoryLower.includes('special')) {
        totalStrengthBonus += armyBonuses.specialist.strength.reduce((a, b) => a + b, 0);
        totalHealthBonus += armyBonuses.specialist.health.reduce((a, b) => a + b, 0);
    }
    else if (troopTypeLower === 'engineer' || troopCategoryLower.includes('siege')) {
        totalStrengthBonus += armyBonuses.engineer.strength.reduce((a, b) => a + b, 0);
        totalHealthBonus += armyBonuses.engineer.health.reduce((a, b) => a + b, 0);
    }
    
    // Check for monster/dragon bonuses
    if (troopTypeLower === 'dragon' || 
        troopCategoryLower.includes('dragon') || 
        troopCategoryLower.includes('beast') ||
        troopCategoryLower.includes('giant') ||
        troopCategoryLower.includes('elemental')) {
        totalStrengthBonus += armyBonuses.monsters.strength.reduce((a, b) => a + b, 0);
        totalHealthBonus += armyBonuses.monsters.health.reduce((a, b) => a + b, 0);
    }
    
    // Add research bonuses (apply to all)
    totalStrengthBonus += armyBonuses.research.strength.reduce((a, b) => a + b, 0);
    totalHealthBonus += armyBonuses.research.health.reduce((a, b) => a + b, 0);
    
    // Apply bonuses
    return {
        strength: baseStats.strength * (1 + totalStrengthBonus / 100),
        health: baseStats.health * (1 + totalHealthBonus / 100),
        baseStrength: baseStats.strength,
        baseHealth: baseStats.health,
        strengthBonus: totalStrengthBonus,
        healthBonus: totalHealthBonus
    };
}





// Add this function to update the bonus summary display
function updateBonusSummaryDisplay() {
    // Calculate totals for each category
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
        
        // Update display
        document.getElementById(`${category}-strength-display`).textContent = `${strengthTotal.toFixed(1)}%`;
        document.getElementById(`${category}-health-display`).textContent = `${healthTotal.toFixed(1)}%`;
        document.getElementById(`${category}-total-display`).textContent = `${categoryTotal.toFixed(1)}%`;
        
        // Style based on value
        const strengthEl = document.getElementById(`${category}-strength-display`);
        const healthEl = document.getElementById(`${category}-health-display`);
        const totalEl = document.getElementById(`${category}-total-display`);
        
        if (strengthTotal > 0) {
            strengthEl.className = 'text-warning fw-bold';
        } else {
            strengthEl.className = '';
        }
        
        if (healthTotal > 0) {
            healthEl.className = 'text-danger fw-bold';
        } else {
            healthEl.className = '';
        }
        
        if (categoryTotal > 0) {
            totalEl.className = 'text-success fw-bold';
        } else {
            totalEl.className = '';
        }
        
        // Add to grand totals
        totalStrength += strengthTotal;
        totalHealth += healthTotal;
    }
    
    // Update overall totals
    document.getElementById('total-strength-display').textContent = `${totalStrength.toFixed(1)}%`;
    document.getElementById('total-health-display').textContent = `${totalHealth.toFixed(1)}%`;
    document.getElementById('grand-total-display').textContent = `${(totalStrength + totalHealth).toFixed(1)}%`;
    
    // Style overall totals
    const totalStrengthEl = document.getElementById('total-strength-display');
    const totalHealthEl = document.getElementById('total-health-display');
    const grandTotalEl = document.getElementById('grand-total-display');
    
    if (totalStrength > 0) {
        totalStrengthEl.className = 'text-warning fw-bold';
    } else {
        totalStrengthEl.className = '';
    }
    
    if (totalHealth > 0) {
        totalHealthEl.className = 'text-danger fw-bold';
    } else {
        totalHealthEl.className = '';
    }
    
    if ((totalStrength + totalHealth) > 0) {
        grandTotalEl.className = 'text-success fw-bold';
    } else {
        grandTotalEl.className = '';
    }
}