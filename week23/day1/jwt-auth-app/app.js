// app.js - Main Express application file
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);

// Basic homepage
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to JWT Authentication API',
        endpoints: {
            register: 'POST /auth/register',
            login: 'POST /auth/login',
            logout: 'POST /auth/logout',
            refresh: 'POST /auth/refresh',
            profile: 'GET /api/profile',
            dashboard: 'GET /api/dashboard'
        }
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('JWT Authentication API is ready!');
});