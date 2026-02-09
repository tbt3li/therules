async function loadTemplateContent(container, pageName, icon) {
    container.innerHTML = `
        <div class="page-header">
            <h1><i class="fas ${icon}"></i> ${pageName}</h1>
            <p>${pageName} content will be displayed here</p>
        </div>
        
        <div class="page-content-placeholder">
            <p>This section is under development. Check back soon!</p>
        </div>
        
        <style>
            .page-content-placeholder {
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

// For analytics.js:
async function loadAnalyticsContent(container) {
    await loadTemplateContent(container, 'Analytics & Stats', 'fa-chart-bar');
}

// For members.js:
async function loadMembersContent(container) {
    await loadTemplateContent(container, 'Clan Members', 'fa-users');
}

// For cheatsheets.js:
async function loadCheatsheetsContent(container) {
    await loadTemplateContent(container, 'Cheat Sheets', 'fa-file-alt');
}
