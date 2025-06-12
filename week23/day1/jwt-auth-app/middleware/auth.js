// middleware/auth.js - JWT Authentication middleware
const { verifyToken } = require('../utils/jwt');
const UserModel = require('../models/User');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    // Get token from Authorization header or cookies
    let token = null;
    
    // First, try to get token from Authorization header
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); // Remove 'Bearer ' prefix
    }
    
    // If not in header, try to get from cookies
    if (!token && req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }
    
    // If no token found
    if (!token) {
        return res.status(401).json({
            error: 'Access denied',
            message: 'No token provided. Please login to continue.'
        });
    }
    
    try {
        // Verify the token
        const decoded = verifyToken(token);
        
        // Check if it's an access token
        if (decoded.type !== 'access') {
            return res.status(401).json({
                error: 'Invalid token type',
                message: 'Please use an access token for authentication.'
            });
        }
        
        // Find the user
        const user = UserModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                error: 'Invalid token',
                message: 'User not found. Please login again.'
            });
        }
        
        // Add user info to request object
        req.user = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email
        };
        
        next(); // Continue to next middleware/route handler
        
    } catch (error) {
        console.error('Token verification error:', error.message);
        
        // Handle different JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token expired',
                message: 'Your session has expired. Please login again.'
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                error: 'Invalid token',
                message: 'Token is malformed or invalid. Please login again.'
            });
        }
        
        return res.status(401).json({
            error: 'Authentication failed',
            message: 'Token verification failed. Please login again.'
        });
    }
};

// Middleware to verify refresh token
const authenticateRefreshToken = (req, res, next) => {
    // Get refresh token from cookies or body
    let refreshToken = null;
    
    if (req.cookies && req.cookies.refreshToken) {
        refreshToken = req.cookies.refreshToken;
    } else if (req.body.refreshToken) {
        refreshToken = req.body.refreshToken;
    }
    
    if (!refreshToken) {
        return res.status(401).json({
            error: 'Refresh token required',
            message: 'No refresh token provided.'
        });
    }
    
    // Check if token is revoked
    if (UserModel.isTokenRevoked(refreshToken)) {
        return res.status(401).json({
            error: 'Token revoked',
            message: 'Refresh token has been revoked. Please login again.'
        });
    }
    
    try {
        // Verify the refresh token
        const decoded = verifyToken(refreshToken);
        
        // Check if it's a refresh token
        if (decoded.type !== 'refresh') {
            return res.status(401).json({
                error: 'Invalid token type',
                message: 'Please use a refresh token.'
            });
        }
        
        // Find the user
        const user = UserModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                error: 'Invalid token',
                message: 'User not found. Please login again.'
            });
        }
        
        // Add user and refresh token to request object
        req.user = user;
        req.refreshToken = refreshToken;
        
        next();
        
    } catch (error) {
        console.error('Refresh token verification error:', error.message);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Refresh token expired',
                message: 'Your refresh token has expired. Please login again.'
            });
        }
        
        return res.status(401).json({
            error: 'Invalid refresh token',
            message: 'Refresh token verification failed. Please login again.'
        });
    }
};

module.exports = {
    authenticateToken,
    authenticateRefreshToken
};