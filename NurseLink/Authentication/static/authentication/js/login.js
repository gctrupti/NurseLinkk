// Enhanced NurseLink Login JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initFormValidation();
    initPasswordToggle();
    initFormAnimations();
    initSocialLogin();
    initFormSubmission();
    initAccessibility();
    initFloatingLabels();
});

// Form validation
function initFormValidation() {
    const form = document.querySelector('.login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Real-time validation
    usernameInput.addEventListener('input', function() {
        validateUsername(this);
    });

    usernameInput.addEventListener('blur', function() {
        validateUsername(this);
    });

    passwordInput.addEventListener('input', function() {
        validatePassword(this);
    });

    passwordInput.addEventListener('blur', function() {
        validatePassword(this);
    });

    // Form submission validation
    form.addEventListener('submit', function(e) {
        const isUsernameValid = validateUsername(usernameInput);
        const isPasswordValid = validatePassword(passwordInput);

        if (!isUsernameValid || !isPasswordValid) {
            e.preventDefault();
            showFormError('Please correct the errors above');
        }
    });
}

// Username validation
function validateUsername(input) {
    const container = input.closest('.input-container');
    const value = input.value.trim();
    
    // Remove existing error message
    removeErrorMessage(container);
    
    if (value === '') {
        setInputState(container, 'error');
        showErrorMessage(container, 'Username is required');
        return false;
    } else if (value.length < 3) {
        setInputState(container, 'error');
        showErrorMessage(container, 'Username must be at least 3 characters');
        return false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        setInputState(container, 'error');
        showErrorMessage(container, 'Username can only contain letters, numbers, and underscores');
        return false;
    } else {
        setInputState(container, 'success');
        return true;
    }
}

// Password validation
function validatePassword(input) {
    const container = input.closest('.input-container');
    const value = input.value;
    
    // Remove existing error message
    removeErrorMessage(container);
    
    if (value === '') {
        setInputState(container, 'error');
        showErrorMessage(container, 'Password is required');
        return false;
    } else if (value.length < 6) {
        setInputState(container, 'error');
        showErrorMessage(container, 'Password must be at least 6 characters');
        return false;
    } else {
        setInputState(container, 'success');
        return true;
    }
}

// Set input state (success/error)
function setInputState(container, state) {
    container.classList.remove('success', 'error');
    container.classList.add(state);
}

// Show error message
function showErrorMessage(container, message) {
    let errorDiv = container.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        container.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

// Remove error message
function removeErrorMessage(container) {
    const errorDiv = container.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.classList.remove('show');
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 300);
    }
}

// Show form error
function showFormError(message) {
    // Create or update form error message
    let errorDiv = document.querySelector('.form-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'form-error error-message';
        errorDiv.style.textAlign = 'center';
        errorDiv.style.marginBottom = '1rem';
        
        const form = document.querySelector('.login-form');
        form.insertBefore(errorDiv, form.firstChild);
    }
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorDiv.classList.remove('show');
    }, 5000);
}

// Password toggle functionality
function initPasswordToggle() {
    const toggleButton = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (toggleButton && passwordInput) {
        toggleButton.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            if (type === 'text') {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
                this.setAttribute('aria-label', 'Hide password');
            } else {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
                this.setAttribute('aria-label', 'Show password');
            }
        });
    }
}

// Form animations
function initFormAnimations() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        // Focus animations
        input.addEventListener('focus', function() {
            const container = this.closest('.input-container');
            container.style.transform = 'scale(1.02)';
            
            // Add ripple effect
            addRippleEffect(container);
        });
        
        input.addEventListener('blur', function() {
            const container = this.closest('.input-container');
            container.style.transform = 'scale(1)';
        });
        
        // Typing animation
        input.addEventListener('input', function() {
            const container = this.closest('.input-container');
            const icon = container.querySelector('.input-icon');
            
            if (icon) {
                icon.style.transform = 'translateY(-50%) scale(1.1)';
                setTimeout(() => {
                    icon.style.transform = 'translateY(-50%) scale(1)';
                }, 150);
            }
        });
    });
}

// Add ripple effect
function addRippleEffect(container) {
    const ripple = document.createElement('div');
    ripple.className = 'input-ripple';
    ripple.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(38, 198, 218, 0.1) 0%, transparent 70%);
        border-radius: 12px;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
    `;
    
    container.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Floating labels
function initFloatingLabels() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        // Check if input has value on load
        if (input.value.trim() !== '') {
            const label = input.nextElementSibling;
            if (label && label.classList.contains('floating-label')) {
                label.style.transform = 'translateY(-2.5rem) scale(0.85)';
                label.style.color = 'var(--color-primary)';
            }
        }
        
        // Handle input changes
        input.addEventListener('input', function() {
            const label = this.nextElementSibling;
            if (label && label.classList.contains('floating-label')) {
                if (this.value.trim() !== '') {
                    label.style.transform = 'translateY(-2.5rem) scale(0.85)';
                    label.style.color = 'var(--color-primary)';
                } else {
                    label.style.transform = 'translateY(-50%) scale(1)';
                    label.style.color = 'var(--color-gray)';
                }
            }
        });
    });
}

// Social login functionality
function initSocialLogin() {
    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleSocialLogin('google');
        });
    }
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleSocialLogin('facebook');
        });
    }
}

// Handle social login
function handleSocialLogin(provider) {
    const btn = document.querySelector(`.${provider}-btn`);
    const originalText = btn.innerHTML;
    
    // Show loading state
    btn.innerHTML = `
        <div class="spinner"></div>
        Connecting to ${provider.charAt(0).toUpperCase() + provider.slice(1)}...
    `;
    btn.disabled = true;
    btn.style.pointerEvents = 'none';
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.pointerEvents = 'auto';
        
        // Show message (in real app, this would handle actual OAuth)
        showNotification(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login would be handled here`, 'info');
    }, 2000);
}

// Form submission with loading state
function initFormSubmission() {
    const form = document.querySelector('.login-form');
    const loginBtn = document.querySelector('.btn-login');
    
    form.addEventListener('submit', function(e) {
        // Don't prevent default - let Django handle the form submission
        // Just add loading state
        showLoginLoading(loginBtn);
    });
}

// Show login loading state
function showLoginLoading(btn) {
    btn.classList.add('loading');
    btn.disabled = true;
    
    // Add pulse animation to logo
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.style.animation = 'pulse 1s ease-in-out infinite';
    }
}

// Accessibility improvements
function initAccessibility() {
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
    
    // Screen reader announcements
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('invalid', function() {
            this.setAttribute('aria-describedby', `${this.id}-error`);
        });
        
        input.addEventListener('input', function() {
            if (this.validity.valid) {
                this.removeAttribute('aria-describedby');
            }
        });
    });
    
    // High contrast support
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }
    
    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
}

// Show notifications
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? 'var(--color-error)' : type === 'success' ? 'var(--color-success)' : 'var(--color-primary)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Remember me functionality
function initRememberMe() {
    const rememberCheckbox = document.querySelector('input[name="remember"]');
    const usernameInput = document.getElementById('username');
    
    // Load saved username if remember me was checked
    if (localStorage.getItem('rememberMe') === 'true') {
        const savedUsername = localStorage.getItem('savedUsername');
        if (savedUsername && usernameInput) {
            usernameInput.value = savedUsername;
            if (rememberCheckbox) {
                rememberCheckbox.checked = true;
            }
        }
    }
    
    // Save username when form is submitted
    const form = document.querySelector('.login-form');
    form.addEventListener('submit', function() {
        if (rememberCheckbox && rememberCheckbox.checked) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('savedUsername', usernameInput.value);
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('savedUsername');
        }
    });
}

// Auto-focus first empty input
function autoFocusInput() {
    const inputs = document.querySelectorAll('input');
    for (let input of inputs) {
        if (!input.value.trim()) {
            input.focus();
            break;
        }
    }
}

// Initialize tooltips for form fields
function initTooltips() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    if (usernameInput) {
        usernameInput.setAttribute('title', 'Enter your username (letters, numbers, and underscores only)');
    }
    
    if (passwordInput) {
        passwordInput.setAttribute('title', 'Enter your password (minimum 6 characters)');
    }
}

// Handle form errors from Django
function handleDjangoErrors() {
    // This function can be called to handle server-side validation errors
    const errorMessages = document.querySelectorAll('.django-error');
    errorMessages.forEach(error => {
        const fieldName = error.getAttribute('data-field');
        const input = document.querySelector(`input[name="${fieldName}"]`);
        if (input) {
            const container = input.closest('.input-container');
            setInputState(container, 'error');
            showErrorMessage(container, error.textContent);
        }
    });
}

// Detect if user is on mobile
function isMobile() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Add mobile-specific enhancements
function initMobileEnhancements() {
    if (isMobile()) {
        // Prevent zoom on input focus for iOS
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.fontSize = '16px'; // Prevent iOS zoom
            });
        });
        
        // Add haptic feedback for button clicks (if supported)
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
            });
        });
    }
}

// Initialize all mobile enhancements
initMobileEnhancements();
initRememberMe();
initTooltips();

// Auto-focus on page load
window.addEventListener('load', function() {
    setTimeout(autoFocusInput, 500);
});

// Add custom CSS for additional animations
const additionalCSS = `
@keyframes ripple {
    0% {
        opacity: 1;
        transform: scale(0);
    }
    100% {
        opacity: 0;
        transform: scale(2);
    }
}

.keyboard-nav input:focus,
.keyboard-nav button:focus,
.keyboard-nav .social-btn:focus {
    outline: 2px solid var(--color-primary) !important;
    outline-offset: 2px;
}

.high-contrast {
    --color-border: #000000;
    --color-gray: #000000;
}

.reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
}

.notification {
    font-weight: 500;
}
`;

// Inject additional CSS
const additionalStyle = document.createElement('style');
additionalStyle.textContent = additionalCSS;
document.head.appendChild(additionalStyle);

// Export functions for potential use by Django templates
window.NurseLinkLogin = {
    showNotification,
    handleDjangoErrors,
    setInputState,
    showErrorMessage,
    removeErrorMessage
};