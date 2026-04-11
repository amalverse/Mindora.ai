const express = require('express');
const passport = require('passport');
const { 
  registerUser, 
  loginUser, 
  verifyEmail,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateUserProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { check } = require('express-validator');

const router = express.Router();

router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], registerUser);

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], loginUser);

router.get('/verify-email/:token', verifyEmail);

router.post('/forgot-password', [
    check('email', 'Please include a valid email').isEmail(),
], forgotPassword);

router.put('/reset-password/:token', [
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('confirmPassword', 'Passwords must match').custom((value, { req }) => {
        return value === req.body.password;
    })
], resetPassword);

// Protected Routes
router.get('/user', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
