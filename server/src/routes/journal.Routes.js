const express = require('express');
const { createJournal, getJournals, updateJournal, deleteJournal } = require('../controllers/journalController');
const { protect } = require('../middleware/authMiddleware');
const { check } = require('express-validator');

const router = express.Router();

/**
 * @swagger
 * /journals:
 *   post:
 *     summary: Create a new journal entry
 *     tags:
 *       - Journals
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: My Day at Work
 *               content:
 *                 type: string
 *                 example: Today was productive. I completed three tasks and had a great meeting.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [work, productivity, positive]
 *     responses:
 *       '201':
 *         description: Journal entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Journal'
 *       '400':
 *         description: Missing required fields
 *       '401':
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all journal entries for the user
 *     tags:
 *       - Journals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of entries to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title or content
 *     responses:
 *       '200':
 *         description: List of journal entries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Journal'
 *       '401':
 *         description: Unauthorized
 */
router.route('/')
    .post(protect, [
        check('title', 'Title is required').not().isEmpty(),
        check('content', 'Content is required').not().isEmpty()
    ], createJournal)
    .get(protect, getJournals);

/**
 * @swagger
 * /journals/{id}:
 *   put:
 *     summary: Update a journal entry
 *     tags:
 *       - Journals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Journal entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Journal entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Journal'
 *       '400':
 *         description: Missing required fields
 *       '404':
 *         description: Journal entry not found
 *       '401':
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete a journal entry
 *     tags:
 *       - Journals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Journal entry ID
 *     responses:
 *       '200':
 *         description: Journal entry deleted successfully
 *       '404':
 *         description: Journal entry not found
 *       '401':
 *         description: Unauthorized
 */
router.route('/:id')
    .put(protect, [
        check('title', 'Title is required').not().isEmpty(),
        check('content', 'Content is required').not().isEmpty()
    ], updateJournal)
    .delete(protect, deleteJournal);

module.exports = router;
