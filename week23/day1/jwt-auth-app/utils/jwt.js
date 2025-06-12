// utils/jwt.js - JWT utility functions
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION || '1h';
const REFRESH_TOKEN_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || '7d';

// Generate access token (short-lived)
const generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        type: 'access'
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
        issuer: 'jwt-auth-app',
        audience: 'jwt-auth-users'
    });
};

// Generate refresh token (long-lived)
const generateRefreshToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        type: 'refresh'
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRATION,
        issuer: 'jwt-auth-app',
        audience: 'jwt-auth-users'
    });
};

// Verify token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET, {
            issuer: 'jwt-auth-app',
            audience: 'jwt-auth-users'
        });
    } catch (error) {
        throw new Error('Invalid token');
    }
};

// Decode token without verification (for debugging)
const decodeToken = (token) => {
    return jwt.decode(token);
};

// Check if token is expired
const isTokenExpired = (token) => {
    try {
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) {
            return true;
        }
        
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch (error) {
        return true;
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    decodeToken,
    isTokenExpired,
    JWT_SECRET,
    ACCESS_TOKEN_EXPIRATION,
    REFRESH_TOKEN_EXPIRATION
};