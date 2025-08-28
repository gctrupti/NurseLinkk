// NurseLink Signup JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializePasswordToggle();
    initializePasswordStrength();
    initializePasswordMatch();
    initializeFormValidation();
    initializeProgressSteps();
    initializeFloatingLabels();
    initializeSocialAuth();
    initializeFormSubmission();
});

// Password Toggle Functionality
function initializePasswordToggle() {
    const toggleButtons = document.querySelectorAll('.password-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Password Strength Indicator
function initializePasswordStrength() {
    const password1Input = document.getElementById('id_password1');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (password1Input && strengthFill && strengthText) {
        password1Input.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            updatePasswordStrength(strength, strengthFill, strengthText);
        });
    }
}

function calculatePasswordStrength(password) {
    let score = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 8) score += 1;
    else feedback.push('Use at least 8 characters');
    
    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Include lowercase letters');
    
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Include uppercase letters');
    
    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('Include numbers');
    
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push('Include special characters');
    
    // Bonus for length
    if (password.length >= 12) score += 1;
    
    return {
        score: Math.min(score, 4),
        feedback: feedback
    };
}

function updatePasswordStrength(strength, strengthFill, strengthText) {
    const strengthLevels = ['', 'weak', 'fair', 'good', 'strong'];
    const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    
    // Remove all strength classes
    strengthFill.className = 'strength-fill';
    
    if (strength.score > 0) {
        strengthFill.classList.add(strengthLevels[strength.score]);
        strengthText.textContent = `Password strength: ${strengthLabels[strength.score]}`;
    } else {
        strengthText.textContent = 'Password strength';
    }
}

// Password Match Functionality
function initializePasswordMatch() {
    const password1Input = document.getElementById('id_password1');
    const password2Input = document.getElementById('id_password2');
    const passwordMatch = document.querySelector('.password-match');
    const matchText = document.querySelector('.match-text');
    const matchIcon = document.querySelector('.match-icon');
    
    if (password1Input && password2Input && passwordMatch) {
        password2Input.addEventListener('input', function() {
            checkPasswordMatch(password1Input, password2Input, passwordMatch, matchText, matchIcon);
        });
        
        password1Input.addEventListener('input', function() {
            if (password2Input.value) {
                checkPasswordMatch(password1Input, password2Input, passwordMatch, matchText, matchIcon);
            }
        });
    }
}

function checkPasswordMatch(pass1, pass2, matchElement, textElement, iconElement) {
    const password1 = pass1.value;
    const password2 = pass2.value;
    
    if (password2.length === 0) {
        matchElement.classList.remove('show', 'match', 'no-match');
        return;
    }
    
    matchElement.classList.add('show');
    
    if (password1 === password2 && password2.length > 0) {
        matchElement.classList.add('match');
        matchElement.classList.remove('no-match');
        textElement.textContent = 'Passwords match';
        iconElement.classList.remove('fa-times-circle');
        iconElement.classList.add('fa-check-circle');
    } else {
        matchElement.classList.add('no-match');
        matchElement.classList.remove('match');
        textElement.textContent = 'Passwords do not match';
        iconElement.classList.remove('fa-check-circle');
        iconElement.classList.add('fa-times-circle');
    }
}

// Form Validation
function initializeFormValidation() {
    const form = document.querySelector('.signup-form');
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
}

function validateInput(input) {
    const inputContainer = input.closest('.input-container');
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous states
    inputContainer.classList.remove('success', 'error');
    
    // Required field validation
    if (value === '') {
        isValid = false;
        errorMessage = 'This field is required';
    } else {
        // Specific validations
        switch(input.type) {
            case 'email':
                if (!isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'password':
                if (input.id === 'id_password1' && value.length < 8) {
                    isValid = false;
                    errorMessage = 'Password must be at least 8 characters long';
                }
                break;
            case 'text':
                if (input.id === 'id_username' && value.length < 3) {
                    isValid = false;
                    errorMessage = 'Username must be at least 3 characters long';
                }
                break;
        }
    }
    
    // Apply validation state
    if (isValid) {
        inputContainer.classList.add('success');
        showError(inputContainer, '');
    } else {
        inputContainer.classList.add('error');
        showError(inputContainer, errorMessage);
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function clearError(input) {
    const inputContainer = input.closest('.input-container');
    inputContainer.classList.remove('error');
    showError(inputContainer, '');
}

function showError(container, message) {
    let errorElement = container.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        container.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    
    if (message) {
        errorElement.classList.add('show');
    } else {
        errorElement.classList.remove('show');
    }
}

// Progress Steps
function initializeProgressSteps() {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        step.addEventListener('click', function() {
            // Remove active class from all steps
            steps.forEach(s => s.classList.remove('active'));
            
            // Add active class to current step
            this.classList.add('active');
            
            // Add animation effect
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Floating Labels
function initializeFloatingLabels() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    
    inputs.forEach(input => {
        // Check if input has value on page load
        if (input.value) {
            const label = input.nextElementSibling;
            if (label && label.classList.contains('floating-label')) {
                label.classList.add('active');
            }
        }
        
        input.addEventListener('focus', function() {
            const label = this.nextElementSibling;
            if (label && label.classList.contains('floating-label')) {
                label.classList.add('active');
            }
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                const label = this.nextElementSibling;
                if (label && label.classList.contains('floating-label')) {
                    label.classList.remove('active');
                }
            }
        });
    });
}

// Social Authentication
function initializeSocialAuth() {
    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            handleSocialAuth('google');
        });
    }
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            handleSocialAuth('facebook');
        });
    }
}

function handleSocialAuth(provider) {
    // Add loading state
    const button = document.querySelector(`.${provider}-btn`);
    const originalText = button.innerHTML;
    
    button.innerHTML = `<div class="spinner"></div> Connecting...`;
    button.disabled = true;
    
    // Simulate API call (replace with actual implementation)
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        
        // Show error or success message
        showNotification(`${provider} authentication is not yet implemented`, 'info');
    }, 2000);
}

// Form Submission
function initializeFormSubmission() {
    const form = document.querySelector('.signup-form');
    const submitBtn = document.querySelector('.btn-signup');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit();
    });
}

function handleFormSubmit() {
    const form = document.querySelector('.signup-form');
    const submitBtn = document.querySelector('.btn-signup');
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    const termsCheckbox = form.querySelector('input[name="terms"]');
    
    // Validate all inputs
    let isFormValid = true;
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isFormValid = false;
        }
    });
    
    // Check terms agreement
    if (!termsCheckbox.checked) {
        showNotification('Please agree to the Terms of Service and Privacy Policy', 'error');
        isFormValid = false;
    }
    
    // Check password match
    const password1 = document.getElementById('id_password1').value;
    const password2 = document.getElementById('id_password2').value;
    
    if (password1 !== password2) {
        showNotification('Passwords do not match', 'error');
        isFormValid = false;
    }
    
    if (isFormValid) {
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form submission)
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show success modal
            showSuccessModal();
        }, 3000);
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.input-container.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Success Modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('show');
    
    // Add backdrop click to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
    
    // Redirect or perform next action
    setTimeout(() => {
        // window.location.href = '/dashboard/'; // Uncomment for actual redirect
        showNotification('Welcome to NurseLink! This is a demo.', 'success');
    }, 300);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        font-size: 1rem;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3'
    };
    return colors[type] || colors.info;
}

// Add notification animations to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Real-time validation feedback
function initializeRealTimeValidation() {
    const usernameInput = document.getElementById('id_username');
    const emailInput = document.getElementById('id_email');
    
    if (usernameInput) {
        let usernameTimeout;
        usernameInput.addEventListener('input', function() {
            clearTimeout(usernameTimeout);
            usernameTimeout = setTimeout(() => {
                checkUsernameAvailability(this.value);
            }, 500);
        });
    }
    
    if (emailInput) {
        let emailTimeout;
        emailInput.addEventListener('input', function() {
            clearTimeout(emailTimeout);
            emailTimeout = setTimeout(() => {
                checkEmailAvailability(this.value);
            }, 500);
        });
    }
}

function checkUsernameAvailability(username) {
    if (username.length < 3) return;
    
    const inputContainer = document.getElementById('id_username').closest('.input-container');
    const helperText = inputContainer.querySelector('.helper-text');
    
    // Simulate API call
    setTimeout(() => {
        // Random availability check for demo
        const isAvailable = Math.random() > 0.3;
        
        if (isAvailable) {
            helperText.textContent = 'Username is available';
            helperText.style.color = '#4caf50';
        } else {
            helperText.textContent = 'Username is taken';
            helperText.style.color = '#f44336';
        }
    }, 500);
}

function checkEmailAvailability(email) {
    if (!isValidEmail(email)) return;
    
    const inputContainer = document.getElementById('id_email').closest('.input-container');
    const helperText = inputContainer.querySelector('.helper-text');
    
    // Simulate API call
    setTimeout(() => {
        // Random availability check for demo
        const isAvailable = Math.random() > 0.2;
        
        if (isAvailable) {
            helperText.textContent = 'Email is available';
            helperText.style.color = '#4caf50';
        } else {
            helperText.textContent = 'Email is already registered';
            helperText.style.color = '#f44336';
        }
    }, 500);
}

// Initialize real-time validation
document.addEventListener('DOMContentLoaded', function() {
    initializeRealTimeValidation();
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('successModal');
        if (modal.classList.contains('show')) {
            closeModal();
        }
    }
    
    // Submit form with Ctrl+Enter
    if (e.ctrlKey && e.key === 'Enter') {
        const form = document.querySelector('.signup-form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
});

// Auto-save form data (without using localStorage)
let formData = {};

function initializeAutoSave() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
    
    inputs.forEach(input => {
        // Load saved data
        if (formData[input.name]) {
            input.value = formData[input.name];
        }
        
        // Save data on input
        input.addEventListener('input', function() {
            formData[this.name] = this.value;
        });
    });
}

// Initialize auto-save
document.addEventListener('DOMContentLoaded', function() {
    initializeAutoSave();
});

// Add smooth scrolling for better UX
function smoothScrollToError() {
    const firstError = document.querySelector('.input-container.error');
    if (firstError) {
        firstError.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Focus on the error input
        const errorInput = firstError.querySelector('input');
        if (errorInput) {
            setTimeout(() => errorInput.focus(), 500);
        }
    }
}

// Enhanced accessibility features
function initializeAccessibility() {
    // Add ARIA labels and descriptions
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        const label = input.nextElementSibling;
        if (label && label.classList.contains('floating-label')) {
            input.setAttribute('aria-label', label.textContent);
        }
    });
    
    // Announce form validation results to screen readers
    const form = document.querySelector('.signup-form');
    const announcements = document.createElement('div');
    announcements.setAttribute('aria-live', 'polite');
    announcements.setAttribute('aria-atomic', 'true');
    announcements.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    form.appendChild(announcements);
    
    // Function to announce messages
    window.announceToScreenReader = function(message) {
        announcements.textContent = message;
        setTimeout(() => announcements.textContent = '', 1000);
    };
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', function() {
    initializeAccessibility();
});