// Main Application Controller
class AppController {
    constructor() {
        this.currentPage = 'dashboard';
        this.pages = {
            'dashboard': 'Dashboard',
            'tutorials': 'Premium Tutorials',
            'equipment': 'Equipment Guides',
            'analytics': 'Analytics & Stats',
            'members': 'Clan Members',
            'cheatsheets': 'Cheat Sheets',
            'settings': 'Account Settings'
        };
        
        this.init();
    }

    async init() {
        // Check authentication
        const isAuthenticated = await authManager.checkAuth();
        if (!isAuthenticated) return;
        
        // Initialize UI
        this.initUI();
        this.initEventListeners();
        
        // Load initial page
        this.loadPage(this.currentPage);
        
        // Hide loading screen
        document.getElementById('loadingScreen').style.display = 'none';
    }

    initUI() {
        const user = authManager.getCurrentUser();
        if (user) {
            // Update user info in sidebar
            document.getElementById('sidebarUserName').textContent = user.name;
            document.getElementById('sidebarUserEmail').textContent = user.email;
            
            // Set avatar initials
            const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
            document.getElementById('userAvatar').textContent = initials || 'U';
        }
    }

    initEventListeners() {
        // Navigation links
        document.querySelectorAll('#navLinks li').forEach(item => {
            item.addEventListener('click', () => {
                const page = item.getAttribute('data-page');
                this.navigateTo(page);
            });
        });

        // Menu toggle for mobile
        document.getElementById('menuToggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('active');
        });

        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.openLogoutModal();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch(e.target.value);
                e.target.value = '';
            }
        });

        // Notification bell
        document.getElementById('notificationBtn').addEventListener('click', () => {
            this.clearNotifications();
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const menuToggle = document.getElementById('menuToggle');
            
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target) &&
                sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }

    navigateTo(page) {
        if (!this.pages[page]) return;
        
        // Update active nav item
        document.querySelectorAll('#navLinks li').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === page) {
                item.classList.add('active');
            }
        });
        
        // Update page title
        document.getElementById('pageTitle').textContent = this.pages[page];
        
        // Hide all pages
        document.querySelectorAll('.page-content').forEach(pageElement => {
            pageElement.classList.remove('active');
        });
        
        // Show selected page
        const pageElement = document.getElementById(page + 'Page');
        if (pageElement) {
            pageElement.classList.add('active');
            
            // Load page content if not already loaded
            if (pageElement.innerHTML.trim() === '') {
                this.loadPageContent(page);
            }
        }
        
        // Update current page
        this.currentPage = page;
        
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.remove('active');
        }
    }

    async loadPageContent(page) {
        const pageElement = document.getElementById(page + 'Page');
        
        // Show loading state
        pageElement.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div class="loader-spinner" style="margin: 0 auto;"></div>
                <p style="margin-top: 15px; color: #605e5c;">Loading ${this.pages[page]}...</p>
            </div>
        `;
        
        // Load page specific content
        try {
            switch(page) {
                case 'dashboard':
                    await loadDashboardContent(pageElement);
                    break;
                case 'settings':
                    await loadSettingsContent(pageElement);
                    break;
                case 'tutorials':
                    await loadTutorialsContent(pageElement);
                    break;
                case 'equipment':
                    await loadEquipmentContent(pageElement);
                    break;
                case 'analytics':
                    await loadAnalyticsContent(pageElement);
                    break;
                case 'members':
                    await loadMembersContent(pageElement);
                    break;
                case 'cheatsheets':
                    await loadCheatsheetsContent(pageElement);
                    break;
                default:
                    pageElement.innerHTML = `<h2>${this.pages[page]}</h2><p>Content coming soon...</p>`;
            }
        } catch (error) {
            console.error(`Error loading ${page}:`, error);
            pageElement.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Error Loading Content</h3>
                    <p>Failed to load ${this.pages[page]}. Please try again.</p>
                </div>
            `;
        }
    }

    loadPage(page) {
        this.navigateTo(page);
    }

    handleSearch(query) {
        if (!query.trim()) return;
        
        alert(`Searching for: "${query}"\n\nSearch functionality will be implemented in the next update.`);
    }

    clearNotifications() {
        const badge = document.querySelector('.badge');
        badge.textContent = '0';
        badge.style.backgroundColor = '#107c10';
        
        // Show notification
        this.showNotification('Notifications cleared!', 'success');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 25px;
            background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
            color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    openLogoutModal() {
        document.getElementById('logoutConfirm').style.display = 'flex';
    }

    closeLogoutModal() {
        document.getElementById('logoutConfirm').style.display = 'none';
    }

    async performLogout() {
        await authManager.logout();
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .error-message {
        text-align: center;
        padding: 40px;
        background: #f8d7da;
        color: #721c24;
        border-radius: 8px;
        margin: 20px;
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new AppController();
});

// Make functions available globally for HTML onclick
function closeLogoutModal() {
    app?.closeLogoutModal();
}

function performLogout() {
    app?.performLogout();
}
