// ================ CONFIGURATION ================
const CONFIG = {
    API_URL: 'https://login.t3li.workers.dev/api',
    PAGES_DIR: 'pages/',
    COMPONENTS_DIR: 'components/'
};

// ================ STATE MANAGEMENT ================
const AppState = {
    currentUser: null,
    authToken: localStorage.getItem('family_token') || localStorage.getItem('family_token_session'),
    currentPage: 'dashboard',
    pages: {
        'dashboard': 'Dashboard',
        'tutorials': 'Premium Tutorials',
        'equipment': 'Equipment Guides',
        'analytics': 'Analytics & Stats',
        'members': 'Clan Members',
        'cheatsheets': 'Cheat Sheets',
        'settings': 'Account Settings'
    }
};

// ================ UTILITY FUNCTIONS ================
async function loadHTML(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        return await response.text();
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
        return `<div style="padding: 20px; color: #721c24; background: #f8d7da; border-radius: 8px;">
                   <i class="fas fa-exclamation-triangle"></i> Error loading content
                </div>`;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ================ AUTHENTICATION ================
async function checkAuth() {
    if (!AppState.authToken) {
        window.location.href = 'login.html';
        return false;
    }
    
    try {
        const response = await fetch(`${CONFIG.API_URL}/check`, {
            headers: { 
                'Authorization': `Bearer ${AppState.authToken}` 
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            AppState.currentUser = data.user;
            return true;
        } else {
            clearAuth();
            window.location.href = 'login.html';
            return false;
        }
    } catch (error) {
        console.error('Auth check error:', error);
        clearAuth();
        window.location.href = 'login.html';
        return false;
    }
}

function clearAuth() {
    localStorage.removeItem('family_token');
    localStorage.removeItem('family_token_session');
    AppState.authToken = null;
    AppState.currentUser = null;
}

async function logout() {
    try {
        await fetch(`${CONFIG.API_URL}/logout`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${AppState.authToken}` 
            }
        });
    } catch (error) {
        console.error('Logout error:', error);
    }
    
    clearAuth();
    window.location.href = 'login.html';
}

// ================ DASHBOARD ROUTER ================
class DashboardRouter {
    constructor() {
        this.init();
    }

    async init() {
        // Check authentication first
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) return;
        
        // Load main dashboard structure
        await this.loadDashboard();
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Load initial page
        await this.loadPage(AppState.currentPage);
        
        // Hide loading screen
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('app').style.display = 'flex';
    }

    async loadDashboard() {
        const app = document.getElementById('app');
        
        // Load sidebar
        const sidebarHTML = await loadHTML(`${CONFIG.COMPONENTS_DIR}sidebar.html`);
        
        // Load header
        const headerHTML = await loadHTML(`${CONFIG.COMPONENTS_DIR}header.html`);
        
        // Assemble dashboard
        app.innerHTML = `
            <div class="dashboard-container">
                ${sidebarHTML}
                <div class="dashboard-main">
                    ${headerHTML}
                    <div class="dashboard-content" id="pageContent"></div>
                </div>
            </div>
        `;
        
        // Update user info in sidebar
        this.updateUserInfo();
    }

    updateUserInfo() {
        if (AppState.currentUser) {
            const userNameElement = document.getElementById('sidebarUserName');
            const userEmailElement = document.getElementById('sidebarUserEmail');
            const userAvatarElement = document.getElementById('userAvatar');
            
            if (userNameElement) userNameElement.textContent = AppState.currentUser.name;
            if (userEmailElement) userEmailElement.textContent = AppState.currentUser.email;
            
            // Set avatar initials
            if (userAvatarElement) {
                const initials = AppState.currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
                userAvatarElement.textContent = initials || 'U';
            }
        }
    }

    async loadPage(pageName) {
        if (!AppState.pages[pageName]) return;
        
        // Update active nav item
        document.querySelectorAll('.nav-link').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === pageName) {
                item.classList.add('active');
            }
        });
        
        // Update page title
        const pageTitleElement = document.getElementById('pageTitle');
        if (pageTitleElement) {
            pageTitleElement.textContent = AppState.pages[pageName];
        }
        
        // Update current page
        AppState.currentPage = pageName;
        
        // Load page content
        await this.loadPageContent(pageName);
    }

    async loadPageContent(pageName) {
        const contentArea = document.getElementById('pageContent');
        
        // Show loading state
        contentArea.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div class="loader-spinner" style="margin: 0 auto;"></div>
                <p style="margin-top: 15px; color: #605e5c;">Loading ${AppState.pages[pageName]}...</p>
            </div>
        `;
        
        try {
            // Load page content from separate file
            const pageHTML = await loadHTML(`${CONFIG.PAGES_DIR}${pageName}.html`);
            contentArea.innerHTML = pageHTML;
            
            // Initialize page-specific functionality
            this.initPageFunctionality(pageName);
        } catch (error) {
            contentArea.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 50px; color: #dc3545; margin-bottom: 20px;"></i>
                    <h2 style="color: #323130; margin-bottom: 15px;">Page Not Found</h2>
                    <p style="color: #605e5c;">The requested page could not be loaded.</p>
                    <button onclick="router.loadPage('dashboard')" class="btn btn-primary" style="margin-top: 20px;">
                        <i class="fas fa-home"></i> Back to Dashboard
                    </button>
                </div>
            `;
        }
    }

    initPageFunctionality(pageName) {
        switch(pageName) {
            case 'dashboard':
                this.initDashboardPage();
                break;
            case 'settings':
                this.initSettingsPage();
                break;
            default:
                // Generic page initialization
                this.initGenericPage(pageName);
        }
    }

    initDashboardPage() {
        // Dashboard-specific JavaScript
        console.log('Dashboard page loaded');
    }

    initSettingsPage() {
        // Settings page functionality
        const changePasswordForm = document.getElementById('changePasswordForm');
        if (changePasswordForm) {
            changePasswordForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const newPassword = document.getElementById('newPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                
                if (newPassword !== confirmPassword) {
                    showNotification('Passwords do not match!', 'error');
                    return;
                }
                
                if (newPassword.length < 6) {
                    showNotification('Password must be at least 6 characters!', 'error');
                    return;
                }
                
                try {
                    // Call your Worker API to update password
                    const response = await fetch(`${CONFIG.API_URL}/update-password`, {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${AppState.authToken}`
                        },
                        body: JSON.stringify({ newPassword })
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                        showNotification('Password updated successfully!', 'success');
                        changePasswordForm.reset();
                    } else {
                        showNotification(data.error || 'Failed to update password', 'error');
                    }
                } catch (error) {
                    showNotification('Network error. Please try again.', 'error');
                }
            });
        }
    }

    initGenericPage(pageName) {
        // Generic page initialization
        console.log(`${pageName} page loaded`);
    }

    initEventListeners() {
        // Navigation links
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('.nav-link');
            if (navLink) {
                e.preventDefault();
                const page = navLink.getAttribute('data-page');
                this.loadPage(page);
                
                // Close sidebar on mobile
                if (window.innerWidth <= 768) {
                    document.querySelector('.dashboard-sidebar').classList.remove('active');
                }
            }
        });

        // Menu toggle for mobile
        document.addEventListener('click', (e) => {
            if (e.target.closest('#menuToggle')) {
                document.querySelector('.dashboard-sidebar').classList.toggle('active');
            }
        });

        // Logout button
        document.addEventListener('click', (e) => {
            if (e.target.closest('#logoutBtn')) {
                this.openLogoutModal();
            }
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(e.target.value);
                    e.target.value = '';
                }
            });
        }

        // Notification bell
        document.addEventListener('click', (e) => {
            if (e.target.closest('#notificationBtn')) {
                this.clearNotifications();
            }
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            const sidebar = document.querySelector('.dashboard-sidebar');
            const menuToggle = document.getElementById('menuToggle');
            
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target) &&
                sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }

    handleSearch(query) {
        if (!query.trim()) return;
        showNotification(`Searching for: "${query}"`, 'info');
    }

    clearNotifications() {
        const badge = document.querySelector('.badge');
        if (badge) {
            badge.textContent = '0';
            badge.style.backgroundColor = '#107c10';
        }
        showNotification('Notifications cleared!', 'success');
    }

    openLogoutModal() {
        // Load and show logout modal
        const modalHTML = `
            <div class="logout-confirm" id="logoutConfirm" style="display: flex;">
                <div class="logout-modal">
                    <h3>Confirm Logout</h3>
                    <p>Are you sure you want to logout?</p>
                    <div class="logout-buttons">
                        <button class="logout-cancel" onclick="document.getElementById('logoutConfirm').style.display='none'">
                            Cancel
                        </button>
                        <button class="logout-confirm-btn" onclick="logout()">
                            Yes, Logout
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('logoutModalContainer').innerHTML = modalHTML;
    }
}

// ================ INITIALIZE APPLICATION ================
const router = new DashboardRouter();

// Make router available globally for onclick handlers
window.router = router;
window.logout = logout;
