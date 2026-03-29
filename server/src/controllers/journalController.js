const Journal = require('../models/Journal');
const { validationResult } = require('express-validator');

// @desc    Create a journal entry
// @route   POST /api/journals
// @access  Private
const createJournal = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, moodContext } = req.body;

    try {
        const journal = await Journal.create({
            userId: req.user.id,
            title,
            content,
            moodContext
        });
        res.status(201).json(journal);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all journal entries for a user
// @route   GET /api/journals
// @access  Private
const getJournals = async (req, res, next) => {
    try {
        const journals = await Journal.find({ userId: req.user.id });
        res.json(journals);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a journal entry
// @route   PUT /api/journals/:id
// @access  Private
const updateJournal = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, moodContext } = req.body;

    try {
        let journal = await Journal.findById(req.params.id);

        if (!journal) {
            return res.status(404).json({ msg: 'Journal not found' });
        }

        // Make sure user owns the journal
        if (journal.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        journal = await Journal.findByIdAndUpdate(req.params.id, { title, content, moodContext }, { returnDocument: 'after' });

        res.json(journal);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a journal entry
// @route   DELETE /api/journals/:id
// @access  Private
const deleteJournal = async (req, res, next) => {
    try {
        const journal = await Journal.findById(req.params.id);

        if (!journal) {
            return res.status(404).json({ msg: 'Journal not found' });
        }

        // Make sure user owns the journal
        if (journal.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Journal.deleteOne({ _id: req.params.id });

        res.json({ msg: 'Journal removed' });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createJournal,
    getJournals,
    updateJournal,
    deleteJournal
};
