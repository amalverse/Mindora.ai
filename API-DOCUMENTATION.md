# 📚 Mindora.ai API Documentation

**Version:** 1.0.0  
**Base URL:** `https://api.mindora.ai` (Production) or `http://localhost:5000/api` (Development)

---

## 🔐 **Authentication**

All protected routes require a Bearer token in the Authorization header:

```http
Authorization: Bearer <jwt_token>
```

### JWT Token Structure
Tokens are valid for 30 days and should be stored securely in localStorage or sessionStorage.

---

## 🌐 **Response Format**

### Success Response
```json
{
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "error": "Error message",
  "statusCode": 400
}
```

---

## 👤 **Authentication Endpoints**

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400` - User already exists
- `400` - Invalid email format
- `400` - Password too weak

---

### POST /auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400` - Invalid email or password
- `404` - User not found

---

### GET /auth/verify-email/:token
Verify user email address using token from verification email.

**URL Parameters:**
- `token` - Verification token from email link

**Success Response (200):**
```json
{
  "message": "✅ Email verified successfully! You can now login.",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "isEmailVerified": true
  }
}
```

**Error Responses:**
- `400` - Invalid or expired verification token

---

### POST /auth/forgot-password
Request password reset email.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "✅ Password reset email sent! Check your inbox."
}
```

**Error Responses:**
- `400` - Email not provided
- `404` - User not found

---

### PUT /auth/reset-password/:token
Reset password using token from reset email.

**URL Parameters:**
- `token` - Reset token from email link

**Request Body:**
```json
{
  "password": "NewSecurePassword123!",
  "confirmPassword": "NewSecurePassword123!"
}
```

**Success Response (200):**
```json
{
  "message": "✅ Password reset successful! You can now login with your new password.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400` - Invalid or expired reset token
- `400` - Passwords don't match

---

### GET /auth/google
Initiate Google OAuth login flow.

**Usage:**
Redirect user to this endpoint. Google will handle authentication, then redirect to callback.

```
GET /auth/google
→ (User logs in with Google)
→ /auth/google/callback
→ Redirects to frontend with JWT token
```

**Success Response:**
User redirected to: `http://localhost:5173/auth-success?token=<JWT_TOKEN>&user=<USER_DATA>`

---

### GET /auth/google/callback
Google OAuth callback endpoint (handled automatically).

**Note:** This is automatically called by Google after user authentication.

---

### GET /auth/user
Fetch current authenticated user profile.

**Headers:**
```http
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-03-29T10:00:00Z",
  "updatedAt": "2024-03-29T10:00:00Z"
}
```

**Error Responses:**
- `401` - Unauthorized (token missing/invalid)
- `404` - User not found

---

## 😊 **Mood Tracking Endpoints**

### POST /moods
Create a new mood entry.

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "moodType": "Happy",
  "intensity": 8,
  "note": "Had a productive day at work",
  "factors": ["Work", "Exercise", "Sleep"]
}
```

**Mood Types:** happy, sad, anxious, calm, angry, stressed, peaceful, excited

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "moodType": "Happy",
  "intensity": 8,
  "note": "Had a productive day at work",
  "factors": ["Work", "Exercise", "Sleep"],
  "date": "2024-03-29T10:00:00Z",
  "createdAt": "2024-03-29T10:00:00Z"
}
```

**Error Responses:**
- `400` - Missing required fields
- `401` - Unauthorized
- `500` - Database error

---

### GET /moods
Retrieve all mood entries for the authenticated user.

**Headers:**
```http
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| limit | int | Number of entries (default: 100) |
| skip | int | Number of entries to skip (default: 0) |
| sort | string | Sort order: "asc" or "desc" (default: "desc") |

**Example:**
```http
GET /moods?limit=10&skip=0&sort=desc
```

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "moodType": "Happy",
    "intensity": 8,
    "note": "Great day!",
    "date": "2024-03-29T10:00:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "moodType": "Calm",
    "intensity": 7,
    "note": "Relaxing evening",
    "date": "2024-03-28T20:00:00Z"
  }
]
```

---

### GET /moods/:id
Retrieve a specific mood entry.

**Headers:**
```http
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "moodType": "Happy",
  "intensity": 8,
  "note": "Great day!",
  "factors": ["Work"],
  "date": "2024-03-29T10:00:00Z"
}
```

**Error Responses:**
- `404` - Mood entry not found
- `401` - Unauthorized

---

### PUT /moods/:id
Update a mood entry.

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "intensity": 7,
  "note": "Updated note"
}
```

**Success Response (200):**
```json
{
  "message": "Mood updated successfully",
  "mood": { ... }
}
```

---

### DELETE /moods/:id
Delete a mood entry.

**Headers:**
```http
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "Mood deleted successfully"
}
```

---

## 📖 **Journal Endpoints**

### POST /journals
Create a new journal entry.

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "My Day Today",
  "content": "Today was wonderful. I went for a walk, had coffee with friends...",
  "moodContext": "Happy"
}
```

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "userId": "507f1f77bcf86cd799439011",
  "title": "My Day Today",
  "content": "Today was wonderful...",
  "moodContext": "Happy",
  "createdAt": "2024-03-29T15:00:00Z",
  "updatedAt": "2024-03-29T15:00:00Z"
}
```

---

### GET /journals
Retrieve all journal entries for the authenticated user.

**Headers:**
```http
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| limit | int | Number of entries (default: 50) |
| skip | int | Number of entries to skip (default: 0) |
| sort | string | Sort order: "asc" or "desc" (default: "desc") |

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "title": "My Day Today",
    "content": "Today was wonderful...",
    "moodContext": "Happy",
    "createdAt": "2024-03-29T15:00:00Z"
  }
]
```

---

### GET /journals/:id
Retrieve a specific journal entry.

**Headers:**
```http
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "title": "My Day Today",
  "content": "Today was wonderful. I went for a walk...",
  "moodContext": "Happy",
  "createdAt": "2024-03-29T15:00:00Z",
  "updatedAt": "2024-03-29T15:00:00Z"
}
```

---

### PUT /journals/:id
Update a journal entry.

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "moodContext": "Calm"
}
```

**Success Response (200):**
```json
{
  "message": "Journal updated successfully",
  "journal": { ... }
}
```

---

### DELETE /journals/:id
Delete a journal entry.

**Headers:**
```http
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "Journal deleted successfully"
}
```

---

## 🤖 **AI Chat Endpoint**

### POST /chat
Send a message to the AI wellness assistant.

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "I'm feeling stressed today"
}
```

**Success Response (200):**
```json
{
  "response": "I'm sorry you're feeling stressed. That's completely valid. Let's explore ways to help you feel better. Would you like to try some breathing exercises or talk about what's bothering you?"
}
```

**Rate Limiting:**
- 20 requests per 15 minutes per user
- Returns `429` if exceeded

**Error Responses:**
- `400` - Message is required
- `401` - Unauthorized
- `429` - Rate limit exceeded
- `503` - AI service temporarily unavailable

---

## 💡 **Affirmation Endpoints**

### GET /affirmations
Fetch a random affirmation or motivational quote.

**Headers:**
```http
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "affirmation": "Your potential is limitless. What you do today can improve all your tomorrows.",
  "author": "Ralph Marston"
}
```

---

## 🔄 **Pagination**

For endpoints that support pagination:

**Query Parameters:**
```http
GET /journals?limit=10&skip=0
```

**Response Metadata:**
```json
{
  "data": [ ... ],
  "pagination": {
    "total": 50,
    "limit": 10,
    "skip": 0,
    "pages": 5
  }
}
```

---

## ⚠️ **Error Codes**

| Code | Message | Cause |
|------|---------|-------|
| 400 | Bad Request | Invalid input or missing fields |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists (e.g., email) |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |
| 503 | Service Unavailable | Temporary service unavailability |

---

## 🏗️ **Implementation Examples**

### JavaScript (Axios)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Login
const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  const token = response.data.token;
  localStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return response.data;
};

// Get moods
const getMoods = async () => {
  const response = await api.get('/moods');
  return response.data;
};

// Create mood
const createMood = async (moodData) => {
  const response = await api.post('/moods', moodData);
  return response.data;
};
```

### cURL
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Create mood
curl -X POST http://localhost:5000/api/moods \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"moodType":"Happy","intensity":8,"note":"Great day"}'
```

---

## 📝 **Changelog**

### v1.0.0 (March 2024)
- Initial API release
- All core endpoints implemented
- Groq Llama 3.3 AI integration
- Rate limiting enabled

---

## 🤝 **Support**

For API support or issues:
- **Email:** api-support@mindora.ai
- **Issues:** GitHub Issues
- **Documentation:** https://docs.mindora.ai

---

**Last Updated:** March 29, 2024
