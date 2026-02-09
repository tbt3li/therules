async function loadEquipmentContent(container) {
    container.innerHTML = `
        <div class="page-header">
            <h1><i class="fas fa-tools"></i> Equipment Guides</h1>
            <p>Optimize your loadout with our equipment recommendations</p>
        </div>
        
        <div class="equipment-content">
            <p>Equipment guides coming soon...</p>
        </div>
        
        <style>
            .equipment-content {
                text-align: center;
                padding: 50px 20px;
                background: white;
                border-radius: 10px;
                margin-top: 30px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
        </style>
    `;
}
