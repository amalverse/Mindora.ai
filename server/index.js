const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./src/config/swagger');
const connectDB = require('./src/config/db');
require('./src/config/passport'); // Initialize passport
const authRoutes = require('./src/routes/auth.Routes');
const moodRoutes = require('./src/routes/mood.Routes');
const journalRoutes = require('./src/routes/journal.Routes');
const chatRoutes = require('./src/routes/chat.Routes');
const affirmationRoutes = require('./src/routes/affirmation.Routes');

const { notFound, errorHandler } = require('./src/middleware/errorMiddleware');

dotenv.config();

connectDB();

const app = express();

// Trust proxy for secure cookies and OAuth redirects
app.set('trust proxy', 1);

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Helmet configuration for Swagger and general security
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      connectSrc: ["'self'", "https:", "http:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Session Middleware for OAuth
app.use(session({
  secret: process.env.JWT_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Needed for cross-site cookies in production
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Swagger Documentation - Automatically runs on /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customCss: '.topbar { display: none }',
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// OAuth Routes (at root level - not under /api)
app.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
app.get('/auth/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login` 
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    const safeUser = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profileImage: req.user.profileImage
    };
    const userStr = encodeURIComponent(JSON.stringify(safeUser));
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/auth-success?token=${token}&user=${userStr}`);
  }
);

app.get('/auth/github', 
  passport.authenticate('github', { scope: ['user:email'] })
);
app.get('/auth/github/callback',
  passport.authenticate('github', { 
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login` 
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    const safeUser = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profileImage: req.user.profileImage
    };
    const userStr = encodeURIComponent(JSON.stringify(safeUser));
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/auth-success?token=${token}&user=${userStr}`);
  }
);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/affirmations', affirmationRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT} [${NODE_ENV}]`);
  console.log(`📡 Client URL configured: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
  console.log(`📧 Email configured: nodemailer (Gmail)`);
  console.log(`🔐 OAuth configured: Google`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
