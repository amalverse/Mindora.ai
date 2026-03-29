const Groq = require('groq-sdk');
const dotenv = require('dotenv');
const Mood = require('../models/Mood');
const Journal = require('../models/Journal');

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const chatWithAI = async (req, res, next) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: 'Message is required' });
    }

    try {
        // Fetch context: last 3 moods and journals
        const moods = await Mood.find({ userId: req.user.id }).sort({ date: -1 }).limit(3);
        const journals = await Journal.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(3);

        const moodContext = moods.length > 0 
            ? moods.map(m => `- ${new Date(m.date || m.createdAt).toDateString()}: ${m.moodType} ${m.note ? '(' + m.note + ')' : ''}`).join('\n') 
            : "No recent mood data.";
            
        const journalContext = journals.length > 0 
            ? journals.map(j => `- ${new Date(j.createdAt).toDateString()}: ${j.title}\n${j.content}`).join('\n') 
            : "No recent journals.";

        const systemPrompt = `You are a friendly and empathetic mental wellness assistant named Mindora.
Your goal is to provide support, encouragement, and helpful wellness tips. You are NOT a licensed therapist.
If the user asks for medical advice, gently suggest consulting a professional.

To personalize your support, here is the user's recent activity context:
---
RECENT MOODS:
${moodContext}

RECENT JOURNALS:
${journalContext}
---

INSTRUCTIONS:
- Offer a listening ear and positive affirmations.
- Use the mood and journal history above to provide gentle, personalized guidance.
- Keep responses conversational, concise (max 3 sentences), caring, and non-judgmental.
- Do not mention that you are an AI or using specific models. Just be Mindora.`;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: systemPrompt,
                },
                {
                    role: 'user',
                    content: message,
                },
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 300,
            top_p: 1,
            stream: false,
        });

        const responseText = completion.choices[0]?.message?.content || "I'm here for you, but I'm having trouble finding the right words at the moment. Could you tell me more?";
        
        res.json({ response: responseText });
    } catch (error) {
        console.error("Groq Chat Error:", error);
        next(error);
    }
};

module.exports = {
    chatWithAI,
};

