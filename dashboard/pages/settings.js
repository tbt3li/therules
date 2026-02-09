// Settings Page Content
async function loadSettingsContent(container) {
    const user = authManager.getCurrentUser();
    
    const html = `
        <div class="settings-content">
            <!-- Messages -->
            <div class="message success" id="successMessage" style="display: none;">
                <i class="fas fa-check-circle"></i> <span>Password updated successfully!</span>
            </div>
            
            <div class="message error" id="errorMessage" style="display: none;">
                <i class="fas fa-exclamation-circle"></i> <span id="errorText">An error occurred.</span>
            </div>
            
            <!-- User Information Card -->
            <div class="settings-card">
                <div class="card-header">
                    <h3><i class="fas fa-user-circle"></i> Account Information</h3>
                </div>
                <div class="card-content">
                    <div class="user-info-grid" id="userInfoGrid">
                        <!-- User info will be loaded here -->
                    </div>
                </div>
            </div>
            
            <!-- Change Password Card -->
            <div class="settings-card">
                <div class="card-header">
                    <h3><i class="fas fa-key"></i> Change Password</h3>
                </div>
                <div class="card-content">
                    <form id="changePasswordForm">
                        <div class="form-group">
                            <label for="newPassword">New Password</label>
                            <div class="input-with-icon">
                                <i class="fas fa-lock"></i>
                                <input type="password" id="newPassword" class="form-control" 
                                       placeholder="Enter new password" minlength="6" required>
                            </div>
                            <div class="password-strength">
                                <div class="strength-bar" id="passwordStrength"></div>
                            </div>
                            <div class="password-requirements">
                                Password must be at least 6 characters long
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="confirmPassword">Confirm New Password</label>
                            <div class="input-with-icon">
                                <i class="fas fa-lock"></i>
                                <input type="password" id="confirmPassword" class="form-control" 
                                       placeholder="Confirm new password" minlength="6" required>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-save" id="savePasswordBtn">
                            <i class="fas fa-save"></i> Save New Password
                        </button>
                    </form>
                </div>
            </div>
            
            <!-- Security Tips Card -->
            <div class="settings-card">
                <div class="card-header">
                    <h3><i class="fas fa-shield-alt"></i> Security Tips</h3>
                </div>
                <div class="card-content">
                    <ul class="security-tips">
                        <li>Use a strong password with at least 6 characters</li>
                        <li>Don't use the same password on multiple sites</li>
                        <li>Consider using a password manager</li>
                        <li>Log out when using shared devices</li>
                        <li>Contact admin if you suspect unauthorized access</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <style>
            .settings-content {
                max-width: 800px;
                margin: 0 auto;
            }
            
            .settings-card {
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                margin-bottom: 25px;
                overflow: hidden;
            }
            
            .card-header {
                padding: 20px;
                background-color: #0078d4;
                color: white;
                border-bottom: 1px solid #edebe9;
            }
            
            .card-header h3 {
                font-size: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .card-content {
                padding: 25px;
            }
            
            .user-info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .info-item {
                padding: 15px;
                background-color: #faf9f8;
                border-radius: 8px;
                border: 1px solid #edebe9;
            }
            
            .info-label {
                font-size: 12px;
                color: #605e5c;
                text-transform: uppercase;
                font-weight: 600;
                margin-bottom: 5px;
            }
            
            .info-value {
                font-size: 16px;
                color: #323130;
                font-weight: 500;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: #323130;
                font-size: 14px;
            }
            
            .input-with-icon {
                position: relative;
            }
            
            .input-with-icon i {
                position: absolute;
                left: 15px;
                top: 50%;
                transform: translateY(-50%);
                color: #605e5c;
                font-size: 16px;
            }
            
            .form-control {
                width: 100%;
                padding: 12px 15px 12px 45px;
                border: 1px solid #edebe9;
                border-radius: 8px;
                font-size: 16px;
                background-color: #faf9f8;
                transition: all 0.3s ease;
            }
            
            .form-control:focus {
                outline: none;
                border-color: #0078d4;
                box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.2);
                background-color: white;
            }
            
            .password-strength {
                height: 4px;
                background-color: #edebe9;
                border-radius: 2px;
                margin-top: 8px;
                overflow: hidden;
            }
            
            .strength-bar {
                height: 100%;
                width: 0%;
                transition: width 0.3s ease;
            }
            
            .strength-weak {
                background-color: #dc3545;
            }
            
            .strength-medium {
                background-color: #ffc107;
            }
            
            .strength-strong {
                background-color: #28a745;
            }
            
            .password-requirements {
                font-size: 12px;
                color: #605e5c;
                margin-top: 5px;
            }
            
            .btn-save {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                background-color: #28a745;
                color: white;
                padding: 12px 25px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                border: none;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 16px;
                width: 100%;
                padding: 14px;
            }
            
            .btn-save:hover {
                background-color: #218838;
            }
            
            .btn-save:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
            
            .security-tips {
                color: #605e5c;
                line-height: 1.8;
                padding-left: 20px;
            }
            
            .security-tips li {
                margin-bottom: 10px;
            }
            
            .message {
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 20px;
                animation: fadeIn 0.3s ease;
            }
            
            .message.success {
                background-color: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            
            .message.error {
                background-color: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            
            .message i {
                margin-right: 10px;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @media (max-width: 768px) {
                .user-info-grid {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    `;
    
    container.innerHTML = html;
    
    // Load user info
    loadUserInfo(user);
    
    // Setup password change functionality
    setupPasswordChange();
}

function loadUserInfo(user) {
    const userInfoGrid = document.getElementById('userInfoGrid');
    if (!userInfoGrid || !user) return;
    
    const memberSince = user.createdAt ? 
        new Date(user.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : 'Today';
    
    userInfoGrid.innerHTML = `
        <div class="info-item">
            <div class="info-label">Full Name</div>
            <div class="info-value">${user.name}</div>
        </div>
        <div class="info-item">
            <div class="info-label">Email Address</div>
            <div class="info-value">${user.email}</div>
        </div>
        <div class="info-item">
            <div class="info-label">Member Since</div>
            <div class="info-value">${memberSince}</div>
        </div>
        <div class="info-item">
            <div class="info-label">Account Status</div>
            <div class="info-value">
                <span style="color: #28a745; font-weight: bold;">
                    <i class="fas fa-check-circle"></i> Active
                </span>
            </div>
        </div>
    `;
}

function setupPasswordChange() {
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordStrength = document.getElementById('passwordStrength');
    const form = document.getElementById('changePasswordForm');
    const saveBtn = document.getElementById('savePasswordBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    // Password strength checker
    newPasswordInput?.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        if (password.length >= 6) strength += 25;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        
        passwordStrength.style.width = strength + '%';
        
        if (strength < 50) {
            passwordStrength.className = 'strength-bar strength-weak';
        } else if (strength < 75) {
            passwordStrength.className = 'strength-bar strength-medium';
        } else {
            passwordStrength.className = 'strength-bar strength-strong';
        }
    });
    
    // Form submission
    form?.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Validation
        if (newPassword !== confirmPassword) {
            errorText.textContent = 'Passwords do not match!';
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            return;
        }
        
        if (newPassword.length < 6) {
            errorText.textContent = 'Password must be at least 6 characters!';
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            return;
        }
        
        // Show loading
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
        saveBtn.disabled = true;
        
        try {
            // Call password update API
            const response = await fetch('https://login.t3li.workers.dev/api/update-password', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authManager.getToken()}`
                },
                body: JSON.stringify({ 
                    newPassword: newPassword
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                form.reset();
                passwordStrength.style.width = '0%';
                
                // Show success notification
                if (app) {
                    app.showNotification('Password updated successfully!', 'success');
                }
            } else {
                errorText.textContent = data.error || 'Failed to update password';
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            }
        } catch (error) {
            console.error('Password update error:', error);
            errorText.textContent = 'Network error. Please try again.';
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        } finally {
            // Reset button
            saveBtn.innerHTML = '<i class="fas fa-save"></i> Save New Password';
            saveBtn.disabled = false;
        }
    });
}
