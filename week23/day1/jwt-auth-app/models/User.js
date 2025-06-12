// models/User.js - Simple in-memory user storage (like a database)
class User {
    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password; // This will be hashed
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

// In-memory storage (in real app, use a database)
let users = [];
let nextId = 1;

// Revoked refresh tokens storage
let revokedTokens = new Set();

const UserModel = {
    // Create a new user
    create: (userData) => {
        const user = new User(
            nextId++,
            userData.username,
            userData.email,
            userData.password
        );
        users.push(user);
        return user;
    },

    // Find user by email
    findByEmail: (email) => {
        return users.find(user => user.email === email);
    },

    // Find user by username
    findByUsername: (username) => {
        return users.find(user => user.username === username);
    },

    // Find user by ID
    findById: (id) => {
        return users.find(user => user.id === id);
    },

    // Update user
    update: (id, updateData) => {
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updateData, updatedAt: new Date() };
            return users[userIndex];
        }
        return null;
    },

    // Get all users (for admin purposes)
    findAll: () => {
        return users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));
    },

    // Check if refresh token is revoked
    isTokenRevoked: (token) => {
        return revokedTokens.has(token);
    },

    // Revoke refresh token
    revokeToken: (token) => {
        revokedTokens.add(token);
    },

    // Clear revoked tokens (cleanup function)
    clearRevokedTokens: () => {
        revokedTokens.clear();
    }
};

module.exports = UserModel;