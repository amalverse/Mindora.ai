const express = require('express');
const { chatWithAI } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');
const { chatLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

router.post('/', protect, chatLimiter, chatWithAI);

module.exports = router;

