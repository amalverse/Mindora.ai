const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: process.env.OAUTH_CALLBACK_URL || '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Update OAuth info
          user.googleId = profile.id;
          await user.save();
          return done(null, user);
        }

        // Create new user from Google profile
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          password: Math.random().toString(36).substring(2, 15), // Random password for OAuth users
          isEmailVerified: true, // Google verifies email
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL || '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Get email from GitHub profile (primary email)
        let email = profile.emails && profile.emails[0]?.value;

        if (!email) {
          // If the user's email is private, generate a fallback email based on their GitHub username
          email = `${profile.username || profile.id}@users.noreply.github.com`;
        }

        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
          // Update OAuth info
          if (!user.githubId) {
            user.githubId = profile.id;
            await user.save();
          }
          return done(null, user);
        }

        // Create new user from GitHub profile
        user = await User.create({
          name: profile.displayName || profile.username,
          email,
          githubId: profile.id,
          password: Math.random().toString(36).substring(2, 15), // Random password for OAuth users
          isEmailVerified: true, // GitHub verifies email
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
