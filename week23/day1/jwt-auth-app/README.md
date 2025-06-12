# JWT Authentication with Node.js and Express

A comprehensive JWT authentication system built with Node.js and Express following security best practices.

## 📚 What is JWT?

JSON Web Token (JWT) is a secure way to transmit information between parties. A JWT consists of three parts:

1. **Header**: Contains the token type and signing algorithm
2. **Payload**: Contains the claims (user data)
3. **Signature**: Ensures the token hasn't been tampered with

Example JWT structure:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## 🚀 Features

- ✅ User Registration with validation
- ✅ User Login with password hashing
- ✅ JWT Access & Refresh Tokens
- ✅ HTTP-only Cookies for security
- ✅ Token Refresh mechanism
- ✅ Secure Logout with token revocation
- ✅ Protected routes middleware
- ✅ Input validation
- ✅ Error handling
- ✅ Password hashing with bcrypt

## 📁 Project Structure

```
jwt-auth-app/
├── app.js              # Main application file
├── package.json        # Dependencies and scripts
├── .env               # Environment variables
├── .gitignore         # Git ignore file
├── README.md          # This file
├── models/
│   └── User.js        # User model (in-memory storage)
├── routes/
│   ├── auth.js        # Authentication routes
│   └── protected.js   # Protected routes
├── middleware/
│   └── auth.js        # JWT authentication middleware
└── utils/
    ├── jwt.js         # JWT utility functions
    └── validation.js  # Input validation functions
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Steps

1. **Clone or create the project directory**
```bash
mkdir jwt-auth-app
cd jwt-auth-app
```

2. **Install dependencies**
```bash
npm install express jsonwebtoken bcrypt body-parser cookie-parser dotenv nodemon
```

3. **Create environment file (.env)**
```env
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_12345
JWT_ACCESS_EXPIRATION=1h
JWT_REFRESH_EXPIRATION=7d
PORT=3000
NODE_ENV=development
```

4. **Start the server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

5. **Server will start on http://localhost:3000**

## 📡 API Endpoints

### Authentication Routes (`/auth`)

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Refresh Token
```http
POST /auth/refresh
```

#### Logout User
```http
POST /auth/logout
```

#### Verify Authentication
```http
GET /auth/verify
```

### Protected Routes (`/api`)

All routes under `/api` require authentication.

#### Get User Profile
```http
GET /api/profile
Authorization: Bearer <access_token>
```

#### Update User Profile
```http
PUT /api/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

#### Get Dashboard Data
```http
GET /api/dashboard
Authorization: Bearer <access_token>
```

#### Get All Users
```http
GET /api/users
Authorization: Bearer <access_token>
```

#### Get Secure Data
```http
GET /api/secure-data
Authorization: Bearer <access_token>
```

## 🔒 Security Features

### Password Security
- **bcrypt hashing**: Passwords are hashed with salt rounds of 12
- **Password validation**: Minimum 6 characters, must contain letters and numbers

### JWT Security
- **Access tokens**: Short-lived (1 hour) for API access
- **Refresh tokens**: Long-lived (7 days) for token renewal
- **HTTP-only cookies**: Prevents XSS attacks
- **Secure cookies**: HTTPS only in production
- **SameSite**: CSRF protection

### Token Management
- **Token revocation**: Refresh tokens can be revoked
- **Token verification**: All tokens are verified before access
- **Automatic cleanup**: Expired tokens are handled gracefully

## 🧪 Testing the API

### Using curl

#### 1. Register a new user
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "email": "test@example.com", "password": "test123"}'
```

#### 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "test123"}' \
  -c cookies.txt
```

#### 3. Access protected route
```bash
curl -X GET http://localhost:3000/api/profile \
  -b cookies.txt
```

#### 4. Logout
```bash
curl -X POST http://localhost:3000/auth/logout \
  -b cookies.txt
```

### Using Postman

1. **Set base URL**: `http://localhost:3000`
2. **Register**: POST `/auth/register` with JSON body
3. **Login**: POST `/auth/login` with JSON body
4. **Copy access token** from response
5. **Add Authorization header**: `Bearer <your_access_token>`
6. **Test protected routes**: GET `/api/profile`, `/api/dashboard`, etc.

## 📝 Code Examples

### Creating a new protected route

```javascript
// In routes/protected.js
router.get('/my-new-route', (req, res) => {
    // req.user contains authenticated user info
    res.json({
        message: 'This is a protected route',
        user: req.user
    });
});
```

### Adding custom validation

```javascript
// In utils/validation.js
const validateCustomData = (data) => {
    const errors = [];
    
    if (!data.field) {
        errors.push('Field is required');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
};
```

## 🚨 Common Issues & Solutions

### 1. Token expires too quickly
- Increase `JWT_ACCESS_EXPIRATION` in `.env`
- Use refresh token endpoint to get new tokens

### 2. CORS issues
- Add CORS middleware if accessing from different domain
```javascript
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
```

### 3. Cookies not working
- Check if `httpOnly` and `secure` settings match your environment
- Ensure cookies are enabled in your client

## 🔄 Token Flow

```
1. User registers/logs in
   ↓
2. Server generates access + refresh tokens
   ↓
3. Tokens stored as HTTP-only cookies
   ↓
4. Client makes requests to protected routes
   ↓
5. Middleware verifies access token
   ↓
6. If token expired, use refresh token
   ↓
7. Get new access token and continue
```

## 🛡️ Best Practices Implemented

1. **Never store sensitive data in JWT payload**
2. **Use HTTP-only cookies for token storage**
3. **Implement token refresh mechanism**
4. **Hash passwords with bcrypt**
5. **Validate all input data**
6. **Use environment variables for secrets**
7. **Implement proper error handling**
8. **Use secure cookie settings**

## 📚 Learning Objectives

After working with this code, you should understand:

- ✅ How JWT authentication works
- ✅ How to implement user registration and login
- ✅ How to generate and verify JWT tokens
- ✅ How to protect routes with middleware
- ✅ How to use HTTP-only cookies securely
- ✅ How to implement token refresh
- ✅ How to handle authentication errors
- ✅ Security best practices for web authentication

## 🚀 Next Steps

To improve this authentication system:

1. **Add database integration** (MongoDB, PostgreSQL)
2. **Implement email verification**
3. **Add password reset functionality**
4. **Implement rate limiting**
5. **Add role-based authorization**
6. **Set up proper logging**
7. **Add unit tests**
8. **Implement account lockout**

## 📖 Dependencies

- **express**: Web framework for Node.js
- **jsonwebtoken**: JWT implementation
- **bcrypt**: Password hashing
- **body-parser**: Parse request bodies
- **cookie-parser**: Parse cookies
- **dotenv**: Environment variable management
- **nodemon**: Development server with auto-reload

---

**Built for Week 23 Day 1 - JWT Authentication Learning**

This is a complete, production-ready JWT authentication system that follows security best practices and is perfect for learning how JWT authentication works in Node.js applications.