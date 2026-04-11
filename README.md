# 🧠 Mindora.ai - AI-Powered Mental Wellness Platform

> A comprehensive full-stack digital wellness web application that helps users track moods, write journals, and interact with an AI-powered mental wellness companion. Built with modern technologies for performance, security, and user experience.

![React](https://img.shields.io/badge/Frontend-React%2019-blue)
![Express](https://img.shields.io/badge/Backend-Express%205-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-green)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS%204-blue)
![Groq](https://img.shields.io/badge/AI-Groq%20Llama%203.3-orange)
![Status](https://img.shields.io/badge/Status-Active-success)

---

## 📋 **Table of Contents**
- [About](#about)
- [Features](#features)
- [How It Works](#how-it-works)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Components Overview](#components-overview)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Security](#security)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 **About**

**Mindora.ai** is an intelligent, user-friendly mental wellness platform designed to help individuals:
- **Track emotional health** through daily mood logging
- **Reflect deeply** with a private journaling feature
- **Seek support** via an AI-powered conversational chatbot
- **Find motivation** through personalized affirmations
- **Analyze patterns** using interactive analytics dashboards

The platform combines a modern, responsive web interface with a robust backend API, leveraging Groq's Llama 3.3 AI to provide personalized mental wellness support.

---

## ✨ **Features**

### 🎯 Core Features

1. **👤 User Authentication & Authorization**
   - Secure JWT-based login & registration
   - bcrypt password hashing (salt rounds: 12)
   - OAuth 2.0 integration with Google
   - Session management with httpOnly cookies
   - Email verification support via Nodemailer (Gmail)
   - Refresh token mechanism for extended sessions
   - Role-based access control for protected routes

2. **😊 Mood Tracking**
   - Log daily moods with intensity levels (1-10 scale)
   - Capture emotional triggers and influencing factors
   - Add contextual notes and observations
   - Timestamp tracking with timezone support
   - Mood history and trend analysis
   - Weekly/monthly mood summaries
   - Visual mood indicators with color coding

3. **📖 Journaling**
   - Private, distraction-free journaling interface
   - Rich text support with markdown formatting
   - Custom tags and categories for organization
   - Sentiment analysis on journal entries
   - Search and filter past entries
   - Auto-save functionality to prevent data loss
   - Word count and reading time estimates
   - Privacy controls for entry sharing

4. **🤖 AI Chatbot (Mental Wellness Companion)**
   - Real-time conversations with Groq Llama 3.3 AI
   - Context-aware responses based on user mood and journal entries
   - Conversation history with persistent storage
   - Typing indicators for better UX
   - Streaming responses for natural feel
   - Safety features: harmful content filtering, rate limiting
   - Quick suggestion prompts for easier interaction

5. **📊 Dashboard & Analytics**
   - Visual mood trend charts (weekly, monthly views)
   - Streak tracking for consistency motivation
   - Mood distribution analysis (pie charts)
   - Journal entry statistics
   - Emotional insights and patterns
   - Mental wellness score calculation
   - Personalized recommendations based on data

6. **💡 Affirmations & Motivation**
   - Daily rotating affirmations
   - Curated motivational quotes
   - Personalized suggestions based on mood
   - Bookmark favorite affirmations
   - Share affirmations with friends (coming soon)

### 🎨 Design Features
- **Responsive Design**: Optimized for mobile, tablet, and desktop (320px - 4K)
- **Dark/Light Mode**: Seamless theme switching with persistence
- **Smooth Animations**: Framer Motion for enhanced UX
- **Accessibility**: WCAG 2.1 AA compliant
- **Calming Color Palette**: Designed for wellness and focus
- **Loading States**: Skeleton screens and spinners for better perceived performance
- **Error Handling**: User-friendly error messages and recovery options

---

## 🔄 **How It Works**

### User Journey Flow

1. **Onboarding**
   - User signs up or logs in (with optional OAuth)
   - Email verification (if enabled)
   - Profile completion with wellness preferences

2. **Daily Usage**
   - Land on dashboard showing today's mood and recent entries
   - Log daily mood in "Mood" section
   - Write journal entry in "Journal" section
   - Chat with AI companion for support/guidance
   - View personalized affirmations
   - Check analytics and progress

3. **Data Processing**
   - Frontend sends requests to REST API
   - Backend validates and authenticates
   - Data stored in MongoDB with user isolation
   - AI processing via Groq Llama 3.3 for chat and wellness guidance
   - Analytics computed from historical data

---

## 🏗️ **Architecture**

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT TIER                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         React 19 Frontend (Vite SPA)                │  │
│  │  ├─ Pages (Chat, Journal, Mood, Dashboard, Auth)   │  │
│  │  ├─ Components (UI, Layout, Feature-specific)      │  │
│  │  ├─ Zustand Store (Global state management)        │  │
│  │  └─ Services (API clients, AI interactions)        │  │
│  └──────────────────────────────────────────────────────┘  │
│                              │                              │
│                    HTTPS (Axios)                            │
└──────────────────────────────┼──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    API GATEWAY TIER                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │      Express.js Server (Middleware Stack)            │  │
│  │  ├─ CORS & Helmet (Security headers)               │  │
│  │  ├─ JWT Authentication Middleware                  │  │
│  │  ├─ Rate Limiting (express-rate-limit)             │  │
│  │  ├─ Request validation (express-validator)         │  │
│  │  └─ Error handling (Global error handler)          │  │
│  └──────────────────────────────────────────────────────┘  │
│                              │                              │
└──────────────────────────────┼──────────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
┌───────▼──────────┐  ┌────────▼────────┐  ┌────────▼─────────┐
│  BUSINESS LOGIC  │  │  EXTERNAL APIS  │  │  DATA TIER       │
├──────────────────┤  ├─────────────────┤  ├──────────────────┤
│ Controllers      │  │ Groq Llama 3.3  │  │ MongoDB Atlas    │
├──────────────────┤  │ (AI responses)  │  ├──────────────────┤
│ Routes           │  │                 │  │ Collections:     │
│ ├─ auth.Routes   │  │ Nodemailer      │  │ ├─ users         │
│ ├─ mood.Routes   │  │ (Email service) │  │ ├─ moods         │
│ ├─ journal.Routes│  │                 │  │ ├─ journals      │
│ ├─ chat.Routes   │  │ Google OAuth    │  │ ├─ chats         │
│ └─ affirmation.. │  │ (Authentication)│  │ └─ affirmations  │
├──────────────────┤  └─────────────────┘  └──────────────────┘
│ Middleware       │             │                   │
├──────────────────┤             │                   │
│ Models           │             │                   │
│ ├─ User          │             │                   │
│ ├─ Mood          │             │                   │
│ └─ Journal       │             │                   │
└──────────────────┘             │                   │
                                 └───────────────────┘
```

### Data Flow Architecture

```
Frontend Request → Validation → Authentication → Processing → Database/API Call → Response → Frontend
      ↓              ↓                ↓              ↓             ↓               ↓
   Axios      express-validator  JWT Verify    Controller     Mongoose      JSON Response
              & browser validation              Logic         Operations    + Status Code
```

---

## 🛠️ **Tech Stack**

### Frontend Technology Stack
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.4 | UI rendering with hooks & concurrent features |
| **Vite** | 8.0.1 | Lightning-fast build tool & dev server |
| **Tailwind CSS** | 4.2.2 | Utility-first CSS framework for styling |
| **React Router** | 7.13.2 | Client-side routing and navigation |
| **Zustand** | 5.0.12 | Lightweight state management without Redux boilerplate |
| **Framer Motion** | 12.38.0 | Smooth animations and transitions |
| **Recharts** | 3.8.0 | Composable React charting library for analytics |
| **Axios** | 1.14.0 | Promise-based HTTP client |
| **React Hot Toast** | 2.6.0 | Toast notifications |
| **Lucide React** | 1.0.1 | Beautiful icon library |

### Backend Technology Stack
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **Express** | 5.2.1 | Minimalist web framework |
| **MongoDB** | cloud | NoSQL document database |
| **Mongoose** | 9.3.3 | MongoDB ODM (Object Document Mapper) |
| **JWT (jsonwebtoken)** | 9.0.3 | Secure token-based authentication |
| **bcryptjs** | 3.0.3 | Password hashing and verification |
| **Groq SDK** | latest | Llama 3.3 AI integration for chatbot |
| **Passport.js** | 0.7.0 | Authentication middleware (OAuth 2.0) |
| **Helmet** | 8.1.0 | Secure HTTP headers |
| **express-rate-limit** | 8.3.1 | Request rate limiting |
| **cors** | 2.8.6 | Cross-origin resource sharing |
| **Nodemailer** | 8.0.4 | Email delivery service |
| **Swagger** | 6.2.8 | API documentation |
| **Morgan** | 1.10.1 | HTTP request logging |

### Deployment Stack
| Platform | Purpose |
|----------|---------|
| **Vercel** | Frontend hosting (serverless functions) |
| **Vercel/Render** | Backend hosting |
| **MongoDB Atlas** | Cloud database hosting |
| **Gmail (Nodemailer)** | Email service provider |

---

## 📁 **Project Structure**

### Complete Project Tree

```
Mindora.ai/
│
├── 📄 README.md                         # Project documentation
├── 📄 API-DOCUMENTATION.md              # Detailed API reference
├── 📄 .gitignore
│
├── 📁 client/                           # React Vite Frontend Application
│   ├── 📄 package.json                  # Dependencies & scripts
│   ├── 📄 vite.config.js                # Vite configuration
│   ├── 📄 tailwind.config.js            # Tailwind CSS config
│   ├── 📄 eslint.config.js              # ESLint configuration
│   ├── 📄 vercel.json                   # Vercel deployment config
│   ├── 📄 index.html                    # Entry HTML file
│   │
│   └── 📁 src/
│       ├── 📄 main.jsx                  # React entry point
│       ├── 📄 App.jsx                   # Root component
│       ├── 📄 routes.jsx                # Route definitions
│       ├── 📄 index.css                 # Global styles
│       │
│       ├── 📁 pages/                    # Page Components
│       │   ├── Home.jsx                 # Landing/home page
│       │   ├── Login.jsx                # Login page
│       │   ├── Register.jsx             # Registration page
│       │   ├── Dashboard.jsx            # Mood analytics dashboard
│       │   ├── Chat.jsx                 # AI chatbot page
│       │   ├── Journal.jsx              # Journaling interface
│       │   └── Mood.jsx                 # Mood tracking page
│       │
│       ├── 📁 components/               # Reusable UI Components
│       │   ├── ProtectedRoute.jsx       # Route guard wrapper
│       │   ├── 📁 layout/
│       │   │   ├── Navbar.jsx           # Header navigation
│       │   │   └── Footer.jsx           # Footer
│       │   └── 📁 ui/
│       │       ├── Button.jsx           # Reusable button
│       │       ├── Card.jsx             # Card container
│       │       ├── Input.jsx            # Form input
│       │       ├── Modal.jsx            # Modal dialog
│       │       ├── QuoteBox.jsx         # Affirmation display
│       │       └── Spinner.jsx          # Loading spinner
│       │
│       ├── 📁 features/                 # Feature-Specific Modules
│       │   ├── 📁 auth/
│       │   │   ├── auth.service.js      # Auth API calls
│       │   │   └── auth.store.js        # Auth state (Zustand)
│       │   ├── 📁 chat/
│       │   │   ├── chat.service.js      # Chat API calls
│       │   │   ├── ChatBox.jsx          # Chat UI component
│       │   │   └── MessageBubble.jsx    # Message display
│       │   ├── 📁 journal/
│       │   │   └── journal.service.js   # Journal API calls
│       │   └── 📁 mood/
│       │       ├── mood.service.js      # Mood API calls
│       │       └── MoodSelector.jsx     # Mood selection UI
│       │
│       ├── 📁 hooks/                    # Custom React Hooks
│       │   ├── useAuth.js               # Auth hook (user state)
│       │   └── useChat.js               # Chat hook (messages state)
│       │
│       ├── 📁 services/                 # API & External Services
│       │   ├── apiClient.js             # Axios HTTP client
│       │   └── aiClient.js              # AI/Groq integration
│       │
│       ├── 📁 store/                    # State Management (Zustand)
│       │   └── useAppStore.js           # Global app state
│       │
│       ├── 📁 utils/                    # Utility Functions
│       │   ├── formatters.js            # Data formatting (dates, etc)
│       │   ├── helpers.js               # General helper functions
│       │   └── validators.js            # Form & input validation
│       │
│       └── 📁 assets/                   # Static assets
│           └── images/                  # Images & icons
│
├── 📁 server/                           # Express.js Backend Application
│   ├── 📄 package.json                  # Dependencies & scripts
│   ├── 📄 index.js                      # Server entry point
│   ├── 📄 render.yaml                   # Render deployment config
│   ├── 📄 vercel.json                   # Vercel deployment config
│   ├── 📄 .env.example                  # Environment variables template
│   │
│   └── 📁 src/
│       ├── 📁 routes/                   # API Route Handlers
│       │   ├── auth.Routes.js           # Authentication routes (register, login, OAuth)
│       │   ├── mood.Routes.js           # Mood CRUD routes
│       │   ├── journal.Routes.js        # Journal CRUD routes
│       │   ├── chat.Routes.js           # Chat routes (messages)
│       │   └── affirmation.Routes.js    # Affirmation routes
│       │
│       ├── 📁 controllers/              # Route Handler Logic
│       │   ├── authController.js        # Auth business logic
│       │   ├── moodController.js        # Mood operations
│       │   ├── journalController.js     # Journal operations
│       │   ├── chatController.js        # Chat/AI operations
│       │   └── affirmationController.js # Affirmation operations
│       │
│       ├── 📁 models/                   # MongoDB Schemas (Mongoose)
│       │   ├── User.js                  # User collection schema
│       │   ├── Mood.js                  # Mood logs schema
│       │   └── Journal.js               # Journal entries schema
│       │
│       ├── 📁 middleware/               # Express Middleware
│       │   ├── authMiddleware.js        # JWT verification
│       │   ├── errorMiddleware.js       # Global error handling
│       │   └── rateLimitMiddleware.js   # Request rate limiting
│       │
│       └── 📁 config/                   # Configuration Files
│           ├── db.js                    # MongoDB connection
│           ├── passport.js              # Passport OAuth config
│           ├── swagger.js               # Swagger/OpenAPI setup
│           └── email.js                 # Nodemailer config
```

---

## 🔌 **API Integration**

### External APIs & Services Used

#### 1. **Groq AI (Llama 3.3)**
- **Purpose**: AI-powered chatbot responses
- **Package**: `groq-sdk`
- **Model**: `llama-3.3-70b-versatile`
- **Integration Point**: Chat route in backend
- **Features**:
  - Context-aware responses based on user's mood and journal history
  - High-speed inference with Groq's LPU technology
  - Safety filters for harmful content
  - General mental wellness guidance alongside personalized support

#### 2. **Google OAuth 2.0**
- **Purpose**: Social login authentication
- **Package**: `passport-google-oauth20`
- **Flow**:
  1. User clicks "Login with Google"
  2. Redirected to Google consent screen
  3. Google returns authorization code
  4. Backend exchanges code for tokens
  5. User profile fetched and stored
  6. JWT token generated for session
- **Scope**: email, profile

#### 3. **Nodemailer (Gmail)**
- **Purpose**: Email verification and notifications
- **Service**: Gmail SMTP
- **Features**:
  - Welcome emails on signup
  - Email verification tokens
  - Password reset emails
  - Mood summary emails (future)
- **Authentication**: Gmail App Password

### API Endpoints Overview

**Base URL**: `/api`

#### Authentication Endpoints
```
POST   /auth/register          - Create new user account
POST   /auth/login             - Authenticate user
POST   /auth/logout            - End user session
POST   /auth/verify-email      - Verify email address
POST   /auth/forgot-password   - Request password reset
POST   /auth/reset-password    - Reset password with token
GET    /auth/google            - Google OAuth initiation
GET    /auth/google/callback   - OAuth callback handler
POST   /auth/refresh           - Refresh JWT token
GET    /auth/profile           - Get current user profile
PUT    /auth/profile           - Update user profile
```

#### Mood Endpoints
```
POST   /moods                  - Create new mood entry
GET    /moods                  - Get user's mood history
GET    /moods/:id              - Get specific mood entry
PUT    /moods/:id              - Update mood entry
DELETE /moods/:id              - Delete mood entry
GET    /moods/analytics        - Get mood statistics
```

#### Journal Endpoints
```
POST   /journals               - Create new journal entry
GET    /journals               - Get user's journal entries
GET    /journals/:id           - Get specific entry
PUT    /journals/:id           - Update journal entry
DELETE /journals/:id           - Delete journal entry
GET    /journals/search        - Search journal entries
```

#### Chat Endpoints
```
POST   /chat/message           - Send message to AI chatbot
GET    /chat/history           - Get conversation history
DELETE /chat/history           - Clear chat history
POST   /chat/feedback          - Submit feedback on response
```

#### Affirmation Endpoints
```
GET    /affirmations           - Get daily affirmation
GET    /affirmations/list      - Get all affirmations
GET    /affirmations/suggested - Get suggestions by mood
```

---

## 🔐 **Authentication**

### Authentication Architecture

```
Client Request
      ↓
[Check localStorage for JWT Token]
      ↓
║ Token exists? ║
  ├─ YES → Attach to Authorization header
  └─ NO → Redirect to login
      ↓
[Send to API with Bearer Token]
      ↓
[Backend: authMiddleware verifies token]
      ↓
║ Valid? ║
  ├─ YES → Decode & attach user to req.user
  └─ NO → Return 401 Unauthorized
      ↓
[Request reaches protected route handler]
      ↓
[Process & return response]
```

### Authentication Methods

#### 1. **JWT (JSON Web Tokens)**
- **Token Type**: Bearer token
- **Creation**: Upon login (post bcrypt verification)
- **Storage**: localStorage (client)
- **Expiration**: 30 days (configurable)
- **Refresh**: New token on role change or manual refresh
- **Structure**:
  ```json
  {
    "userId": "user_id",
    "email": "user@example.com",
    "iat": 1234567890,
    "exp": 1567890234
  }
  ```

#### 2. **Google OAuth 2.0**
- **Provider**: Google (accounts.google.com)
- **Flow Type**: Authorization Code Flow
- **Scopes**: `email`, `profile`
- **Session Storage**: Express sessions (httpOnly cookies)
- **User Linking**: New Google users auto-register
- **Steps**:
  1. Frontend redirects to `/api/auth/google`
  2. User authorizes on Google consent screen
  3. Google redirects to `/api/auth/google/callback?code=...`
  4. Backend exchanges code for tokens
  5. User created/found in DB
  6. JWT generated and sent to client

#### 3. **Password Security**
- **Hashing Algorithm**: bcrypt
- **Salt Rounds**: 12
- **Process**:
  1. User password → Hashed with salt
  2. Hash stored in DB (original discarded)
  3. Login: Provided password → Hashed → Compared with stored
  4. Match = Success; No match = Failure

### Protected Routes

Routes requiring authentication use `authMiddleware`:

```javascript
// Example:
router.get('/profile', authMiddleware, userController.getProfile);
```

**Middleware checks**:
1. Authorization header exists
2. Token format is valid
3. Token hasn't expired
4. Token signature is valid
5. User still exists in database

---

## 🧩 **Components Overview**

### Frontend Component Architecture

#### Page Components (Pages/)
- **Home.jsx** - Landing page with onboarding info
- **Login.jsx** - Login form with OAuth integration
- **Register.jsx** - Registration form with validation
- **Dashboard.jsx** - Analytics & mood trends visualization
- **Chat.jsx** - AI chatbot interface
- **Journal.jsx** - Journal writing & browsing
- **Mood.jsx** - Mood tracking interface

#### Layout Components (Components/layout/)
- **Navbar.jsx**
  - Navigation links
  - User dropdown (profile, logout)
  - Dark mode toggle
  - Mobile menu toggle

- **Footer.jsx**
  - Links & social
  - Copyright info

#### UI Components (Components/ui/)
- **Button.jsx** - Styled button with variants (primary, secondary, danger)
- **Card.jsx** - Container component for content cards
- **Input.jsx** - Form input with validation feedback
- **Modal.jsx** - Dialog modal for confirmations
- **QuoteBox.jsx** - Affirmation display card
- **Spinner.jsx** - Loading indicator

#### Feature Components
- **ChatBox.jsx** - Chat interface with message input
- **MessageBubble.jsx** - Individual message display
- **MoodSelector.jsx** - Mood selection with intensity slider

### Backend Controller Structure

#### Controllers (Controllers/)
Each controller handles business logic for its domain:

- **authController.js**
  - register() - Create new user account
  - login() - Authenticate user
  - googleAuth() - Handle OAuth callback
  - refreshToken() - Generate new JWT
  - getProfile() - Fetch user details
  - updateProfile() - Update user info
  - logout() - Clear session

- **moodController.js**
  - createMood() - Log new mood entry
  - getMoods() - Fetch user's mood history
  - getMoodById() - Fetch specific mood
  - updateMood() - Modify mood entry
  - deleteMood() - Remove mood entry
  - getMoodAnalytics() - Compute statistics

- **journalController.js**
  - createEntry() - Create journal entry
  - getEntries() - Fetch all entries
  - getEntryById() - Fetch specific entry
  - updateEntry() - Modify entry
  - deleteEntry() - Remove entry
  - searchEntries() - Full-text search

- **chatController.js**
  - sendMessage() - Process user message & get AI response
  - getHistory() - Fetch conversation history
  - clearHistory() - Delete chat messages
  - submitFeedback() - Store feedback

- **affirmationController.js**
  - getDailyAffirmation() - Get random affirmation
  - getAllAffirmations() - List all affirmations
  - getSuggested() - Get recommendations by mood

---

## 💾 **Installation & Setup**

### Prerequisites
- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- **MongoDB Atlas** account (free tier available)
- **Google OAuth** credentials
- **Gmail account** (for Nodemailer)
- **Git** for version control

### Step 1: Clone Repository

```bash
git clone https://github.com/amalverse/Mindora.ai.git
cd Mindora.ai
```

### Step 2: Setup Backend

```bash
cd server
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

### Step 3: Setup Frontend

```bash
cd ../client
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 📝 **Environment Variables**

### Server (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mindora

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRY=30d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Groq AI (Llama 3.3)
GROQ_API_KEY=your-groq-api-key

# Email Service (Gmail)
EMAIL_ADDRESS=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# Session
SESSION_SECRET=your-session-secret-key
```

### Client (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Mindora.ai
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

---

## 🚀 **Running the Application**

### Development Mode

**Terminal 1 - Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Client:**
```bash
cd client
npm run dev
```

Visit:
- Client: http://localhost:5173
- Server API: http://localhost:5000/api
- API Docs: http://localhost:5000/api-docs

### Production Build

**Client:**
```bash
cd client
npm run build
npm run preview
```

**Server:**
```bash
cd server
npm start
```

---

## 📚 **Database Schema**

### User Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  avatar: String (URL),
  googleId: String (optional),
  emailVerified: Boolean,
  preferences: {
    darkMode: Boolean,
    notifications: Boolean,
    language: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Mood Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  mood: String (happy, sad, anxious, etc),
  intensity: Number (1-10),
  triggers: [String], // Array of factors
  notes: String,
  timestamp: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Journal Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  title: String,
  content: String,
  tags: [String],
  sentiment: String (positive, negative, neutral),
  wordCount: Number,
  isPublic: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Chat Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  role: String (user or assistant),
  content: String,
  timestamp: Date
}
```

---

## 🛡️ **Security**

### Security Measures Implemented

1. **Authentication & Authorization**
   - JWT token-based authentication
   - bcrypt password hashing (salt: 12)
   - Protected routes with middleware
   - Google OAuth 2.0 integration

2. **Data Protection**
   - HTTPS in production
   - httpOnly cookies (OAuth sessions)
   - Mongoose schema validation
   - User data isolation (users can only access own data)

3. **HTTP Security**
   - **Helmet.js**: Security headers
   - **CORS**: Restricted origin access
   - **Rate Limiting**: Prevent brute force attacks
   - **Input Validation**: express-validator

4. **API Security**
   - Request body size limits (10MB)
   - XSS protection via helmet
   - CSRF tokens (can be added)
   - SQL injection prevention (MongoDB)

5. **Environment Security**
   - Sensitive data in .env (never in code)
   - .env excluded from git
   - No secrets in error messages
   - API key separation by environment

6. **Content Safety**
   - Groq Llama AI safety filters
   - Rate limiting on sensitive endpoints
   - Error messages don't expose system details

---

## 🌐 **Deployment**

### Client Deployment (Vercel)

```bash
# Login to Vercel
vercel login

# Deploy
cd client
vercel

# Set environment variables in Vercel dashboard
# VITE_API_URL=https://your-api.com/api
```

### Server Deployment

#### Option 1: Vercel (Serverless)
```bash
cd server
vercel

# Configure environment variables in Vercel dashboard
```

#### Option 2: Render.com
1. Push code to GitHub
2. Connect Render to GitHub repo
3. Create new Web Service
4. Configure environment variables
5. Deploy

#### Database (MongoDB Atlas)
1. Create account at mongodb.com/atlas
2. Create cluster
3. Get connection string
4. Add to backend .env

#### Email Service (Gmail)
1. Enable 2-factor authentication
2. Generate app-specific password
3. Use password in EMAIL_PASSWORD

---

## 🤝 **Contributing**

Contributions welcome! Please follow these steps:

1. **Fork** the repository
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Guidelines
- Follow existing code style
- Add comments for complex logic
- Test before submitting PR
- Update README if needed
- Keep commits atomic

---

## 📄 **License**

This project is licensed under the MIT License - see LICENSE file for details.

---

## 📞 **Support & Contact**

- **Issues & Bugs**: Open an issue on GitHub
- **Feature Requests**: Discussions tab on GitHub
- **Email**: support@mindora.ai

---

## 🎉 **Acknowledgments**

- Google for OAuth services
- Groq for Llama AI & conversational intelligence
- MongoDB for database hosting
- Vercel for deployment platform
- React & Vite communities for amazing tooling

---

## 📊 **Roadmap**

### Coming Soon 🚀
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Social features (share moods/affirmations)
- [ ] Therapist integration
- [ ] Meditation/breathing exercises
- [ ] Community support groups
- [ ] Export data (PDF reports)
- [ ] API for third-party integrations

---

**Last Updated**: March 29, 2026  
**Version**: 1.0.0

---

Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "moodContext": "Calm"
}

Response (200):
{ "message": "Journal updated successfully", "journal": { ... } }
```

#### Delete Journal Entry
```http
DELETE /journals/:id
Authorization: Bearer <token>

Response (200):
{ "message": "Journal deleted successfully" }
```

### Chat Routes

#### Send Message to AI
```http
POST /api/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "I'm feeling stressed today"
}

Response (200):
{
  "response": "It's okay to feel stressed. Let's take a calming breath together..."
}
```

**Rate Limit:** 20 requests per 15 minutes per user

---

## 🌐 **Deployment**

### Client Deployment (Vercel)

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Select `frontend` folder as root

2. **Set Environment Variables**
   ```
   VITE_API_BASE_URL = https://your-backend-url/api
   ```

3. **Deploy**
   - Vercel automatically builds and deploys on every push to main

### Backend Deployment (Vercel)

1. **Connect GitHub Repository**
   - Import your repo, select `backend` folder as root

2. **Set Environment Variables**
   ```
   MONGODB_URI = your_mongodb_atlas_uri
   JWT_SECRET = your_secret_key
   GROQ_API_KEY = your_groq_api_key
   CLIENT_URL = https://your-frontend-url
   NODE_ENV = production
   ```

3. **Deploy**
   - Vercel automatically builds and deploys

### Database (MongoDB Atlas)

1. Create a cluster in MongoDB Atlas
2. Connect via Mongoose connection string
3. Enable IP whitelist for Vercel servers

---

## 🧪 **Testing API Endpoints**

Use Postman or Curl to test:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Get User (replace TOKEN with actual JWT)
curl -X GET http://localhost:5000/api/auth/user \
  -H "Authorization: Bearer TOKEN"

# Create Mood
curl -X POST http://localhost:5000/api/moods \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"moodType":"Happy","intensity":8,"note":"Great day!"}'
```

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 **Support**

- **Issues:** GitHub Issues
- **Email:** support@mindora.ai
- Powered by Groq Llama 3.3 AI
- Designed for mental wellness and mindfulness
- Inspired by apps like Calm and Headspace

---

**Made with ❤️ for mental wellness**
