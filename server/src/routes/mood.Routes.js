const express = require('express');
const { addMood, getMoods, deleteMood } = require('../controllers/moodController');
const { protect } = require('../middleware/authMiddleware');
const { check } = require('express-validator');

const router = express.Router();

router.route('/')
    .post(protect, [
        check('moodType', 'Mood type is required').not().isEmpty(),
    ], addMood)
    .get(protect, getMoods);

router.route('/:id').delete(protect, deleteMood);

module.exports = router;
