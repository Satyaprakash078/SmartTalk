const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
    const { messages } = req.body;
    try {

        // Ensure the messages have 'role' and 'content'
    const formattedMessages = messages.map(message => ({
        role: message.isBot ? "assistant" : "user", // Map isBot to 'assistant' and others to 'user'
        content: message.text,  // Include message content
      }));
  
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages:formattedMessages,
            max_tokens: 2000,
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        
        // Send the response from OpenAI back to the front-end
        res.json({ text: response.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error communicating with OpenAI" });
    }
});

module.exports = router;
