// utils/validation.js - Input validation functions

// Email validation
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Username validation
const isValidUsername = (username) => {
    // Username must be 3-20 characters, alphanumeric with underscore
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
};

// Password validation
const isValidPassword = (password) => {
    // Password must be at least 6 characters long
    // Should contain at least one letter and one number
    if (password.length < 6) {
        return { valid: false, message: 'Password must be at least 6 characters long' };
    }
    
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (!hasLetter) {
        return { valid: false, message: 'Password must contain at least one letter' };
    }
    
    if (!hasNumber) {
        return { valid: false, message: 'Password must contain at least one number' };
    }
    
    return { valid: true, message: 'Password is valid' };
};

// Validate registration data
const validateRegistrationData = (data) => {
    const errors = [];
    
    // Check if all required fields are present
    if (!data.username) {
        errors.push('Username is required');
    } else if (!isValidUsername(data.username)) {
        errors.push('Username must be 3-20 characters, alphanumeric with underscore only');
    }
    
    if (!data.email) {
        errors.push('Email is required');
    } else if (!isValidEmail(data.email)) {
        errors.push('Please provide a valid email address');
    }
    
    if (!data.password) {
        errors.push('Password is required');
    } else {
        const passwordValidation = isValidPassword(data.password);
        if (!passwordValidation.valid) {
            errors.push(passwordValidation.message);
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
};

// Validate login data
const validateLoginData = (data) => {
    const errors = [];
    
    if (!data.email) {
        errors.push('Email is required');
    } else if (!isValidEmail(data.email)) {
        errors.push('Please provide a valid email address');
    }
    
    if (!data.password) {
        errors.push('Password is required');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
};

module.exports = {
    isValidEmail,
    isValidUsername,
    isValidPassword,
    validateRegistrationData,
    validateLoginData
};