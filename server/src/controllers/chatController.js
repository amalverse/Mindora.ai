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
Your goal is to provide support, encouragement, and helpful wellness guidance. You are NOT a licensed therapist.
If the user asks for medical/psychiatric advice, gently suggest consulting a professional.

To personalize your support, here is the user's recent activity context:
---
RECENT MOODS:
${moodContext}

RECENT JOURNALS:
${journalContext}
---

INSTRUCTIONS:
1. PERSONALIZED RESPONSES:
   - Use the mood and journal history above to provide gentle, personalized guidance.
   - Reference their recent experiences when relevant to show you understand them.

2. GENERAL WELLNESS GUIDANCE:
   - If the user shares a feeling or problem (e.g., "I'm stressed", "I can't sleep", "I'm anxious"), provide:
     * Empathetic acknowledgment of their feelings
     * Simple, actionable wellness suggestions (breathing exercises, grounding techniques, journaling, etc.)
     * Encouragement and positive affirmations
   - Topics you can help with: stress, anxiety, sadness, insomnia, lack of motivation, feeling overwhelmed, relationship concerns, self-esteem, burnout, etc.

3. SUGGESTED TECHNIQUES TO OFFER:
   - 5-minute breathing exercises (box breathing, deep breathing)
   - Grounding techniques (5 senses method)
   - Simple journaling prompts
   - Mindfulness or short meditation suggestions
   - Physical activity ideas
   - Self-compassion exercises
   - Positive affirmations

4. TONE & FORMAT:
   - Keep responses conversational, concise (2-4 sentences ideally), caring, and non-judgmental.
   - Be warm, supportive, and genuine.
   - Do not mention that you are an AI or using specific models. Just be Mindora.
   - End with a supportive question or offer of specific help when appropriate.`;

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

