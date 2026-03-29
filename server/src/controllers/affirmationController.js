const axios = require('axios');

const getAffirmation = async (req, res, next) => {
    try {
        const response = await axios.get('https://zenquotes.io/api/random');
        const [quote] = response.data;
        res.json({ affirmation: quote.q });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAffirmation,
};
