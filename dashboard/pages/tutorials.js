async function loadTutorialsContent(container) {
    container.innerHTML = `
        <div class="page-header">
            <h1><i class="fas fa-graduation-cap"></i> Premium Tutorials</h1>
            <p>Master the game with our exclusive tutorial collection</p>
        </div>
        
        <div class="tutorials-grid">
            <div class="tutorial-card">
                <div class="tutorial-header">
                    <i class="fas fa-crosshairs"></i>
                    <span class="badge">NEW</span>
                </div>
                <div class="tutorial-content">
                    <h3>Advanced Aiming Techniques</h3>
                    <p>Master precision attacking with pro-level techniques for all weapons</p>
                    <button class="btn-view">View Tutorial</button>
                </div>
            </div>
            
            <div class="tutorial-card">
                <div class="tutorial-header">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <div class="tutorial-content">
                    <h3>Defensive Positioning</h3>
                    <p>Learn optimal defensive setups and choke point control</p>
                    <button class="btn-view">View Tutorial</button>
                </div>
            </div>
            
            <div class="tutorial-card">
                <div class="tutorial-header">
                    <i class="fas fa-users"></i>
                </div>
                <div class="tutorial-content">
                    <h3>Squad Coordination</h3>
                    <p>Advanced team play and communication strategies</p>
                    <button class="btn-view">View Tutorial</button>
                </div>
            </div>
        </div>
        
        <style>
            .tutorials-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 25px;
                margin-top: 30px;
            }
            
            .tutorial-card {
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                transition: transform 0.3s ease;
            }
            
            .tutorial-card:hover {
                transform: translateY(-5px);
            }
            
            .tutorial-header {
                background: linear-gradient(135deg, #0078d4, #005a9e);
                color: white;
                padding: 25px;
                text-align: center;
                position: relative;
            }
            
            .tutorial-header i {
                font-size: 40px;
            }
            
            .badge {
                position: absolute;
                top: 15px;
                right: 15px;
                background: #ffb900;
                color: #323130;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 12px;
                font-weight: bold;
            }
            
            .tutorial-content {
                padding: 20px;
            }
            
            .tutorial-content h3 {
                margin-bottom: 10px;
                color: #323130;
            }
            
            .tutorial-content p {
                color: #605e5c;
                margin-bottom: 20px;
                line-height: 1.5;
            }
            
            .btn-view {
                background: #0078d4;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 600;
                width: 100%;
                transition: background 0.3s ease;
            }
            
            .btn-view:hover {
                background: #005a9e;
            }
        </style>
    `;
}
