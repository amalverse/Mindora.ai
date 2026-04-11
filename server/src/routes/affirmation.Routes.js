const express = require('express');
const { getAffirmation } = require('../controllers/affirmationController');

const router = express.Router();

router.get('/', getAffirmation);

module.exports = router;
