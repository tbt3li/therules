// Authentication Manager
class AuthManager {
    constructor() {
        this.API_URL = 'https://login.t3li.workers.dev/api';
        this.authToken = localStorage.getItem('family_token') || localStorage.getItem('family_token_session');
        this.currentUser = null;
    }

    async checkAuth() {
        if (!this.authToken) {
            window.location.href = 'login.html';
            return false;
        }
        
        try {
            const response = await fetch(`${this.API_URL}/check`, {
                headers: { 
                    'Authorization': `Bearer ${this.authToken}` 
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.currentUser = data.user;
                return true;
            } else {
                this.clearAuth();
                window.location.href = 'login.html';
                return false;
            }
        } catch (error) {
            console.error('Auth check error:', error);
            this.clearAuth();
            window.location.href = 'login.html';
            return false;
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getToken() {
        return this.authToken;
    }

    clearAuth() {
        localStorage.removeItem('family_token');
        localStorage.removeItem('family_token_session');
        this.authToken = null;
        this.currentUser = null;
    }

    async logout() {
        try {
            await fetch(`${this.API_URL}/logout`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${this.authToken}` 
                }
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
        
        this.clearAuth();
        window.location.href = 'login.html';
    }
}

// Create global instance
const authManager = new AuthManager();
