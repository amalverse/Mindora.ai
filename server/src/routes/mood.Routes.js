const express = require('express');
const { addMood, getMoods, deleteMood } = require('../controllers/moodController');
const { protect } = require('../middleware/authMiddleware');
const { check } = require('express-validator');

const router = express.Router();

/**
 * @swagger
 * /moods:
 *   post:
 *     summary: Record a new mood entry
 *     tags:
 *       - Moods
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - moodType
 *             properties:
 *               moodType:
 *                 type: string
 *                 enum: ['happy', 'sad', 'anxious', 'calm', 'stressed', 'neutral']
 *                 example: happy
 *               intensity:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 10
 *                 example: 8
 *               notes:
 *                 type: string
 *                 example: Great day at work
 *     responses:
 *       '201':
 *         description: Mood recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mood'
 *       '400':
 *         description: Invalid mood type or missing required fields
 *       '401':
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all mood entries for the user
 *     tags:
 *       - Moods
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of moods to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *     responses:
 *       '200':
 *         description: List of moods retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mood'
 *       '401':
 *         description: Unauthorized
 */
router.route('/')
    .post(protect, [
        check('moodType', 'Mood type is required').not().isEmpty(),
    ], addMood)
    .get(protect, getMoods);

/**
 * @swagger
 * /moods/{id}:
 *   delete:
 *     summary: Delete a mood entry
 *     tags:
 *       - Moods
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mood entry ID
 *     responses:
 *       '200':
 *         description: Mood deleted successfully
 *       '404':
 *         description: Mood entry not found
 *       '401':
 *         description: Unauthorized
 */
router.route('/:id').delete(protect, deleteMood);

module.exports = router;
