// routes/auth.js - Authentication routes (register, login, logout, refresh)
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const UserModel = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const { validateRegistrationData, validateLoginData } = require('../utils/validation');
const { authenticateRefreshToken } = require('../middleware/auth');

// Helper function to set cookie options
const getCookieOptions = (maxAge) => ({
    httpOnly: true, // Cannot be accessed by JavaScript (XSS protection)
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict', // CSRF protection
    maxAge: maxAge
});

// POST /auth/register - User registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validate input data
        const validation = validateRegistrationData({ username, email, password });
        if (!validation.isValid) {
            return res.status(400).json({
                error: 'Validation failed',
                messages: validation.errors
            });
        }
        
        // Check if user already exists
        const existingUserByEmail = UserModel.findByEmail(email);
        if (existingUserByEmail) {
            return res.status(409).json({
                error: 'User already exists',
                message: 'A user with this email already exists'
            });
        }
        
        const existingUserByUsername = UserModel.findByUsername(username);
        if (existingUserByUsername) {
            return res.status(409).json({
                error: 'Username taken',
                message: 'This username is already taken'
            });
        }
        
        // Hash the password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Create new user
        const newUser = UserModel.create({
            username,
            email,
            password: hashedPassword
        });
        
        // Generate tokens
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);
        
        // Set tokens as HTTP-only cookies
        res.cookie('accessToken', accessToken, getCookieOptions(60 * 60 * 1000)); // 1 hour
        res.cookie('refreshToken', refreshToken, getCookieOptions(7 * 24 * 60 * 60 * 1000)); // 7 days
        
        // Return success response
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                createdAt: newUser.createdAt
            },
            tokens: {
                accessToken,
                refreshToken
            }
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Something went wrong during registration'
        });
    }
});

// POST /auth/login - User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate input data
        const validation = validateLoginData({ email, password });
        if (!validation.isValid) {
            return res.status(400).json({
                error: 'Validation failed',
                messages: validation.errors
            });
        }
        
        // Find user by email
        const user = UserModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'Invalid email or password'
            });
        }
        
        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'Invalid email or password'
            });
        }
        
        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        
        // Set tokens as HTTP-only cookies
        res.cookie('accessToken', accessToken, getCookieOptions(60 * 60 * 1000)); // 1 hour
        res.cookie('refreshToken', refreshToken, getCookieOptions(7 * 24 * 60 * 60 * 1000)); // 7 days
        
        // Return success response
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            tokens: {
                accessToken,
                refreshToken
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Something went wrong during login'
        });
    }
});

// POST /auth/refresh - Refresh access token
router.post('/refresh', authenticateRefreshToken, (req, res) => {
    try {
        const user = req.user;
        const oldRefreshToken = req.refreshToken;
        
        // Generate new tokens
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        
        // Revoke the old refresh token
        UserModel.revokeToken(oldRefreshToken);
        
        // Set new tokens as cookies
        res.cookie('accessToken', newAccessToken, getCookieOptions(60 * 60 * 1000)); // 1 hour
        res.cookie('refreshToken', newRefreshToken, getCookieOptions(7 * 24 * 60 * 60 * 1000)); // 7 days
        
        res.status(200).json({
            message: 'Tokens refreshed successfully',
            tokens: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            }
        });
        
    } catch (error) {
        console.error('Token refresh error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Something went wrong during token refresh'
        });
    }
});

// POST /auth/logout - User logout
router.post('/logout', (req, res) => {
    try {
        // Get refresh token from cookies
        const refreshToken = req.cookies.refreshToken;
        
        // Revoke refresh token if it exists
        if (refreshToken) {
            UserModel.revokeToken(refreshToken);
        }
        
        // Clear cookies
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        
        res.status(200).json({
            message: 'Logout successful'
        });
        
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Something went wrong during logout'
        });
    }
});

// GET /auth/verify - Verify if user is authenticated
router.get('/verify', (req, res) => {
    // Get token from Authorization header or cookies
    let token = null;
    
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
    } else if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }
    
    if (!token) {
        return res.status(401).json({
            authenticated: false,
            message: 'No token provided'
        });
    }
    
    try {
        const { verifyToken } = require('../utils/jwt');
        const decoded = verifyToken(token);
        
        const user = UserModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                authenticated: false,
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            authenticated: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
        
    } catch (error) {
        res.status(401).json({
            authenticated: false,
            message: 'Invalid or expired token'
        });
    }
});

module.exports = router;