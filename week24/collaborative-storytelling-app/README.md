# Collaborative Storytelling App

A full-stack collaborative storytelling platform built with TypeScript, React, Node.js, Express, and PostgreSQL. Users can create, edit, and collaborate on stories with real-time features and version control.

## 🏗️ Project Structure

```
collaborative-storytelling-app/
├── README.md
├── package.json                 # Monorepo scripts
├── .gitignore
├── docs/                       # Documentation
├── types/                      # Shared TypeScript types
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts           # Export all types
│       ├── user.ts            # User-related types
│       ├── story.ts           # Story-related types
│       ├── contributor.ts     # Contributor types
│       ├── auth.ts            # Authentication types
│       └── api.ts             # API response types
├── backend/                   # Node.js/Express API
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── src/
│       ├── index.ts           # Server entry point
│       ├── config/
│       │   └── database.ts    # Database configuration
│       ├── controllers/       # Request handlers
│       │   ├── authController.ts
│       │   ├── storyController.ts
│       │   └── contributorController.ts
│       ├── models/            # Database models
│       │   ├── User.ts
│       │   ├── Story.ts
│       │   └── Contributor.ts
│       ├── routes/            # API routes
│       │   ├── auth.ts
│       │   ├── stories.ts
│       │   └── contributors.ts
│       ├── middleware/        # Express middleware
│       │   ├── auth.ts
│       │   ├── authorize.ts
│       │   ├── validation.ts
│       │   ├── errorHandler.ts
│       │   └── security.ts
│       ├── helpers/           # Utility functions
│       └── scripts/           # Database setup scripts
│           ├── setup-db.ts
│           ├── migrate.ts
│           └── seed.ts
└── frontend/                  # React application
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── src/
        ├── main.tsx           # React entry point
        ├── App.tsx
        ├── app/               # App components
        │   ├── components/    # Reusable components
        │   ├── hooks/         # Custom hooks
        │   ├── pages/         # Page components
        │   └── utils/         # Utilities
        └── features/          # Redux slices
            ├── auth/
            ├── stories/
            └── ui/
```

## 🚀 Features

### Core Features
- ✅ **User Authentication**: JWT-based authentication with refresh tokens
- ✅ **Story Management**: Create, read, update, delete stories
- ✅ **Collaboration**: Add contributors to stories
- ✅ **Authorization**: Role-based permissions (author vs contributor)
- ✅ **Search & Filter**: Find stories and users
- ✅ **Responsive Design**: Mobile-first responsive UI
- ✅ **Dark Theme**: Toggle between light and dark themes

### Security Features
- ✅ **Password Hashing**: bcrypt with configurable rounds
- ✅ **JWT Tokens**: Secure access and refresh token system
- ✅ **HTTP-only Cookies**: Secure refresh token storage
- ✅ **Rate Limiting**: Protect against abuse
- ✅ **Input Validation**: Comprehensive validation
- ✅ **SQL Injection Protection**: Parameterized queries
- ✅ **XSS Protection**: Input sanitization
- ✅ **Security Headers**: Helmet.js security headers

### Advanced Features
- ✅ **Real-time Updates**: Live collaboration features
- ✅ **Version Control**: Track story changes
- ✅ **Profile Management**: User profile customization
- ✅ **Performance**: Optimized queries and caching
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Logging**: Request and error logging

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **cors** - Cross-origin requests

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **daisyUI** - Component library
- **React Router** - Routing
- **Axios** - HTTP client

### Database Schema
```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stories table
CREATE TABLE stories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contributors table
CREATE TABLE contributors (
  id SERIAL PRIMARY KEY,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(story_id, user_id)
);
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

