const express = require('express');
const { chatWithAI } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');
const { chatLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Send a message to AI chatbot
 *     tags:
 *       - Chat
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 example: How can I manage stress?
 *               context:
 *                 type: string
 *                 description: Additional context for the conversation
 *                 example: I'm feeling overwhelmed with work
 *     responses:
 *       '200':
 *         description: AI response received successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: AI generated response
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       '400':
 *         description: Missing message field
 *       '401':
 *         description: Unauthorized
 *       '429':
 *         description: Too many requests - rate limit exceeded
 */
router.post('/', protect, chatLimiter, chatWithAI);

module.exports = router;

