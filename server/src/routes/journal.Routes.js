const express = require('express');
const { createJournal, getJournals, updateJournal, deleteJournal } = require('../controllers/journalController');
const { protect } = require('../middleware/authMiddleware');
const { check } = require('express-validator');

const router = express.Router();

router.route('/')
    .post(protect, [
        check('title', 'Title is required').not().isEmpty(),
        check('content', 'Content is required').not().isEmpty()
    ], createJournal)
    .get(protect, getJournals);

router.route('/:id')
    .put(protect, [
        check('title', 'Title is required').not().isEmpty(),
        check('content', 'Content is required').not().isEmpty()
    ], updateJournal)
    .delete(protect, deleteJournal);

module.exports = router;
