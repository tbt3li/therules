// Dashboard Page Content
async function loadDashboardContent(container) {
    const html = `
        <div class="dashboard-content">
            <!-- Welcome Section -->
            <div class="welcome-section">
                <h1>Welcome Back, <span id="welcomeUserName">${authManager.getCurrentUser()?.name || 'Member'}</span>!</h1>
                <p>Access premium tutorials, equipment guides, hacks, and cheat sheets exclusively for clan members.</p>
            </div>
            
            <!-- Stats Cards -->
            <div class="stats-cards" id="statsCards">
                <!-- Stats will be loaded here -->
            </div>
            
            <!-- Content Grid -->
            <div class="content-grid" id="contentGrid">
                <!-- Content cards will be loaded here -->
            </div>
        </div>
        
        <style>
            .dashboard-content {
                max-width: 1400px;
                margin: 0 auto;
            }
            
            .welcome-section {
                margin-bottom: 30px;
            }
            
            .welcome-section h1 {
                font-size: 32px;
                color: #323130;
                margin-bottom: 10px;
            }
            
            .welcome-section p {
                color: #605e5c;
                font-size: 16px;
                max-width: 800px;
            }
            
            .stats-cards {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .stat-card {
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                transition: all 0.3s ease;
                border-left: 4px solid #0078d4;
            }
            
            .stat-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
            }
            
            .stat-card i {
                font-size: 28px;
                color: #0078d4;
                margin-bottom: 15px;
            }
            
            .stat-card h3 {
                font-size: 28px;
                margin-bottom: 5px;
                color: #323130;
            }
            
            .stat-card p {
                color: #605e5c;
                font-size: 14px;
            }
            
            .content-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                gap: 25px;
            }
            
            .content-card {
                background-color: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                transition: all 0.3s ease;
            }
            
            .content-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
            }
            
            .card-header {
                padding: 20px;
                background-color: #0078d4;
                color: white;
            }
            
            .card-header h3 {
                font-size: 18px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .card-content {
                padding: 20px;
            }
            
            .resource-item {
                display: flex;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid #edebe9;
            }
            
            .resource-item:last-child {
                border-bottom: none;
            }
            
            .resource-icon {
                width: 40px;
                height: 40px;
                background-color: #edebe9;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 15px;
                color: #0078d4;
                font-size: 18px;
            }
            
            .resource-details h4 {
                font-size: 15px;
                margin-bottom: 4px;
                color: #323130;
            }
            
            .resource-details p {
                font-size: 13px;
                color: #605e5c;
            }
            
            .premium-tag {
                background-color: #ffb900;
                color: #323130;
                padding: 3px 8px;
                border-radius: 10px;
                font-size: 11px;
                font-weight: 600;
                margin-left: 8px;
            }
            
            .btn {
                display: inline-block;
                background-color: #0078d4;
                color: white;
                padding: 10px 20px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                border: none;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
                font-size: 14px;
            }
            
            .btn:hover {
                background-color: #005a9e;
            }
            
            .btn-wide {
                display: block;
                width: 100%;
                margin-top: 15px;
                padding: 12px;
            }
            
            @media (max-width: 768px) {
                .stats-cards,
                .content-grid {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    `;
    
    container.innerHTML = html;
    
    // Load stats
    loadStats();
    
    // Load content cards
    loadContentCards();
}

function loadStats() {
    const statsCards = document.getElementById('statsCards');
    if (!statsCards) return;
    
    const stats = [
        { icon: 'fa-graduation-cap', value: '24', label: 'Premium Tutorials' },
        { icon: 'fa-tools', value: '18', label: 'Equipment Guides' },
        { icon: 'fa-bolt', value: '42', label: 'Pro Hacks' },
        { icon: 'fa-users', value: '56', label: 'Active Members' }
    ];
    
    statsCards.innerHTML = stats.map(stat => `
        <div class="stat-card">
            <i class="fas ${stat.icon}"></i>
            <h3>${stat.value}</h3>
            <p>${stat.label}</p>
        </div>
    `).join('');
}

function loadContentCards() {
    const contentGrid = document.getElementById('contentGrid');
    if (!contentGrid) return;
    
    const cards = [
        {
            title: 'Premium Tutorials',
            icon: 'fa-graduation-cap',
            items: [
                { icon: 'fa-crosshairs', title: 'Advanced Aiming Techniques', tag: 'NEW', desc: 'Master precision attacking' },
                { icon: 'fa-shield-alt', title: 'Defensive Positioning', desc: 'Optimal defensive setups' },
                { icon: 'fa-users', title: 'Squad Coordination', desc: 'Advanced team play strategies' }
            ],
            buttonText: 'View All Tutorials'
        },
        {
            title: 'Premium Equipment',
            icon: 'fa-tools',
            items: [
                { icon: 'fa-gun', title: 'Weapon Loadout Optimizer', tag: 'UPDATED', desc: 'Best attachments for Captains' },
                { icon: 'fa-vest', title: 'Armor & Gear Guide', desc: 'Maximize protection' },
                { icon: 'fa-toolbox', title: 'Gadget Mastery', desc: 'Pro tips for all equipment' }
            ],
            buttonText: 'Explore Equipment'
        },
        {
            title: 'Pro Hacks & Cheat Sheets',
            icon: 'fa-bolt',
            items: [
                { icon: 'fa-map-marked-alt', title: 'Map Knowledge Cheat Sheet', desc: 'All spawn points & locations' },
                { icon: 'fa-building-columns', title: 'Mercenary Finding', tag: 'NEW', desc: 'Perfectly find closest mercenary' },
                { icon: 'fa-person-military-rifle', title: 'Army Optimization', desc: 'Pro player configurations' }
            ],
            buttonText: 'Access All Cheat Sheets'
        }
    ];
    
    contentGrid.innerHTML = cards.map(card => `
        <div class="content-card">
            <div class="card-header">
                <h3><i class="fas ${card.icon}"></i> ${card.title}</h3>
            </div>
            <div class="card-content">
                ${card.items.map(item => `
                    <div class="resource-item">
                        <div class="resource-icon">
                            <i class="fas ${item.icon}"></i>
                        </div>
                        <div class="resource-details">
                            <h4>${item.title} ${item.tag ? `<span class="premium-tag">${item.tag}</span>` : ''}</h4>
                            <p>${item.desc}</p>
                        </div>
                    </div>
                `).join('')}
                <button class="btn btn-wide">${card.buttonText}</button>
            </div>
        </div>
    `).join('');
    
    // Add click handlers to buttons
    document.querySelectorAll('.content-card .btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const pages = ['tutorials', 'equipment', 'cheatsheets'];
            app.navigateTo(pages[index]);
        });
    });
}
