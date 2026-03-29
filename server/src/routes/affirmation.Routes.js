const express = require('express');
const { getAffirmation } = require('../controllers/affirmationController');

const router = express.Router();

/**
 * @swagger
 * /affirmations:
 *   get:
 *     summary: Get a random affirmation
 *     tags:
 *       - Affirmations
 *     responses:
 *       '200':
 *         description: Random affirmation retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 affirmation:
 *                   type: string
 *                   example: You are capable of achieving your goals.
 *                 category:
 *                   type: string
 *                   example: positivity
 */
router.get('/', getAffirmation);

module.exports = router;
