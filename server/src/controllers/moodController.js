const Mood = require('../models/Mood');
const { validationResult } = require('express-validator');

// @desc    Add new mood
// @route   POST /api/moods
// @access  Private
const addMood = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { moodType, note } = req.body;

    try {
        const mood = await Mood.create({
            userId: req.user.id,
            moodType,
            note
        });
        res.status(201).json(mood);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all moods for a user
// @route   GET /api/moods
// @access  Private
const getMoods = async (req, res, next) => {
    try {
        const moods = await Mood.find({ userId: req.user.id });
        res.json(moods);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a mood
// @route   DELETE /api/moods/:id
// @access  Private
const deleteMood = async (req, res, next) => {
    try {
        const mood = await Mood.findById(req.params.id);

        if (!mood) {
            return res.status(404).json({ msg: 'Mood not found' });
        }

        // Make sure user owns the mood
        if (mood.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Mood.deleteOne({ _id: req.params.id });

        res.json({ msg: 'Mood removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addMood,
    getMoods,
    deleteMood
};
