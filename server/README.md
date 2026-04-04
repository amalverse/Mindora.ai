# Mindora.ai Backend Server

Welcome to the backend repository of **Mindora.ai**. This server is a robust RESTful API built to support a mental wellness platform. It handles user authentication, data persistence for moods and journals, and integrates with advanced AI models to provide empathetic chat responses.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **AI Integrations:** Groq SDK (Llama-3.3-70b-versatile)
- **Authentication:** OAuth 2.0 (Google & GitHub via Passport.js) + JWT (JSON Web Tokens)

---

## 📦 Packages Used

Here is a breakdown of the core dependencies used in this project and their purpose:

### Framework & Core
- **`express`**: The primary web application framework used for routing and handling HTTP requests.
- **`mongoose`**: Elegant MongoDB object modeling for Node.js, used to create schemas and interact with the database.
- **`dotenv`**: Loads environment variables from a `.env` file into `process.env`.

### Authentication & Security
- **`passport`**, **`passport-google-oauth20`**, **`passport-github2`**: Middleware for handling social logic/OAuth authentication.
- **`jsonwebtoken`**: Used for securing API endpoints. Generates and verifies tokens after a successful login or OAuth callback.
- **`bcryptjs`**: Library to hash passwords (for local authentication implementations).
- **`helmet`**: Secures the Express app by setting various HTTP headers (like CSP).
- **`cors`**: Middleware to enable Cross-Origin Resource Sharing.

### AI & External Requests
- **`groq-sdk`**: Official SDK to interact with Groq's high-performance AI inference APIs. Powers the "Mindora" conversational AI.
- **`axios`**: Promise-based HTTP client used for fetching background data, such as daily affirmations from external APIs (e.g., ZenQuotes).

### Utilities & Middleware
- **`morgan`**: HTTP request logger middleware for node.js.
- **`express-session`**: Manages user sessions, primarily required for the Passport OAuth flow to initialize state.
- **`swagger-ui-express`** & **`swagger-jsdoc`**: Auto-generates and serves interactive API documentation at `/api-docs`.

---

## 📂 Project Structure & Workflow

The project follows a standard **Model-Route-Controller (MRC)** architecture ensuring separation of concerns:

```text
server/
├── index.js                  # Main application entry point
├── src/
│   ├── config/               # DB connection, Swagger setup, Passport strategies
│   ├── models/               # Mongoose schemas (User, Mood, Journal)
│   ├── routes/               # Express router definitions
│   ├── controllers/          # Business logic for requests
│   └── middleware/           # Custom Express middlewares (error handling, etc.)
```

### 1. Authentication Flow
1. The user hits `/auth/google` or `/auth/github`.
2. `Passport.js` redirects the user to the provider's login screen.
3. Upon success, the provider redirects back to `/auth/{provider}/callback`.
4. The server creates or finds the user in MongoDB, signs a **JWT token**, and redirects the user back to the client application (`CLIENT_URL/auth-success`) appending the token and safe user details to the URL.

### 2. Context-Aware AI Chat Flow (`/api/chat`)
Mindora isn't just a stateless chatbot. It has context:
1. When a user sends a message, `chatController.js` intersects the request.
2. It queries MongoDB for the user's **3 most recent moods** and **3 most recent journals**.
3. It constructs a dynamic `systemPrompt` injecting these moods and journals so the AI knows how the user has been feeling recently.
4. The prompt is sent to **Groq (Llama-3.3-70b-versatile)**.
5. Groq streams back an empathetic, personalized response without acting like a standard robot.

---

## ⚙️ How the Server Works

### Initialization (`index.js`)
When `npm start` or `npm run dev` is executed, the following sequence occurs:
1. **Environment Setup**: `dotenv` is instantiated, loading variables.
2. **Database Connection**: `connectDB()` connects to the MongoDB cluster.
3. **Middleware Pipeline Builder**: 
   - Express is set to trust proxy (for secure OAuth redirects in production).
   - `cors`, `helmet`, and `morgan` are attached.
   - Body parsers and `express-session` are initialized.
4. **Passport Initialization**: Prepares the server to handle OAuth sessions.
5. **Route Mapping**: Non-API routes (like OAuth) are mapped to root, while standard entity routes (`moods`, `journals`, `chat`) are prefixed with `/api`.
6. **Error Handlers**: The pipeline ends with global error handlers (`notFound` and `errorHandler`).

### Background Operations
- **Affirmations**: The `/api/affirmations` route uses `axios` to natively fetch random motivational quotes from `zenquotes.io` on the fly.
- **Swagger Docs**: Available out of the box at `/api-docs`, parsing JSDoc comments to render interactive UI documentation.

---

## 🚀 Getting Started Locally

### 1. Environment Variables
Create a `.env` file in the root of the `server/` directory and include the following:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
GROQ_API_KEY=your_groq_api_key

# OAuth Credentials
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
GITHUB_CLIENT_ID=your_github_id
GITHUB_CLIENT_SECRET=your_github_secret
```

### 2. Installation & Running
```bash
# Install packages
npm install

# Run in development mode (with nodemon)
npm run dev

# Run in production mode
npm start
```

The server should log: 
`✅ Server running on http://localhost:5000 [development]`
