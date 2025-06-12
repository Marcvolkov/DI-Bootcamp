// routes/protected.js - Protected routes that require authentication
const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middleware/auth');
const UserModel = require('../models/User');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET /api/profile - Get user profile
router.get('/profile', (req, res) => {
    try {
        // Get full user data
        const user = UserModel.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                message: 'User profile could not be found'
            });
        }
        
        // Return user profile (without password)
        res.status(200).json({
            message: 'Profile retrieved successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
        
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Something went wrong while fetching profile'
        });
    }
});

// PUT /api/profile - Update user profile
router.put('/profile', async (req, res) => {
    try {
        const { username, email } = req.body;
        const userId = req.user.id;
        
        // Validate input
        if (!username && !email) {
            return res.status(400).json({
                error: 'Validation failed',
                message: 'At least one field (username or email) is required for update'
            });
        }
        
        // Check if username is taken by another user
        if (username) {
            const existingUser = UserModel.findByUsername(username);
            if (existingUser && existingUser.id !== userId) {
                return res.status(409).json({
                    error: 'Username taken',
                    message: 'This username is already taken by another user'
                });
            }
        }
        
        // Check if email is taken by another user
        if (email) {
            const existingUser = UserModel.findByEmail(email);
            if (existingUser && existingUser.id !== userId) {
                return res.status(409).json({
                    error: 'Email taken',
                    message: 'This email is already taken by another user'
                });
            }
        }
        
        // Update user
        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        
        const updatedUser = UserModel.update(userId, updateData);
        
        if (!updatedUser) {
            return res.status(404).json({
                error: 'User not found',
                message: 'User could not be found for update'
            });
        }
        
        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt
            }
        });
        
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Something went wrong while updating profile'
        });
    }
});

// GET /api/dashboard - Protected dashboard route
router.get('/dashboard', (req, res) => {
    try {
        const user = req.user;
        
        // Simulate dashboard data
        const dashboardData = {
            welcomeMessage: `Welcome back, ${user.username}!`,
            stats: {
                loginCount: Math.floor(Math.random() * 50) + 1,
                lastLogin: new Date().toISOString(),
                accountAge: Math.floor((new Date() - new Date('2024-01-01')) / (1000 * 60 * 60 * 24))
            },
            recentActivity: [
                { action: 'Login', timestamp: new Date().toISOString() },
                { action: 'Profile viewed', timestamp: new Date(Date.now() - 3600000).toISOString() },
                { action: 'Dashboard accessed', timestamp: new Date(Date.now() - 7200000).toISOString() }
            ],
            notifications: [
                { id: 1, message: 'Welcome to your dashboard!', type: 'info' },
                { id: 2, message: 'Your account is secure', type: 'success' }
            ]
        };
        
        res.status(200).json({
            message: 'Dashboard data retrieved successfully',
            data: dashboardData
        });
        
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Something went wrong while loading dashboard'
        });
    }
});

// GET /api/users - Get all users (admin-like feature)
router.get('/users', (req, res) => {
    try {
        const users = UserModel.findAll();
        
        res.status(200).json({
            message: 'Users retrieved successfully',
            count: users.length,
            users: users
        });
        
    } catch (error) {
        console.error('Users fetch error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Something went wrong while fetching users'
        });
    }
});

// GET /api/secure-data - Another protected route example
router.get('/secure-data', (req, res) => {
    try {
        const secureData = {
            message: 'This is sensitive data that requires authentication',
            user: req.user,
            timestamp: new Date().toISOString(),
            secretCode: 'JWT-AUTH-2024',
            data: {
                level: 'confidential',
                items: ['item1', 'item2', 'item3'],
                accessCount: Math.floor(Math.random() * 100)
            }
        };
        
        res.status(200).json({
            message: 'Secure data retrieved successfully',
            data: secureData
        });
        
    } catch (error) {
        console.error('Secure data error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Something went wrong while fetching secure data'
        });
    }
});

module.exports = router;