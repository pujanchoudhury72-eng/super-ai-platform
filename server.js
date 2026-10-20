const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Groq API Key
const API_KEY = "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";

app.post('/api/chat', async (req, res) => {
try {
if (
!API_KEY ||
API_KEY === "YAHAN_APNI_GROQ_API_KEY_DALEIN"
) {
return res.status(500).json({
reply: "Groq API key configure karein."
});
}

    const { message } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({
            reply: "Kripya apna message likhein."
        });
    }

    const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: 'You are Super AI, an intelligent, helpful, and advanced assistant. Reply in the language used by the user.'
                },
                {
                    role: 'user',
                    content: message
                }
            ]
        },
        {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 60000
        }
    );

    res.json({
        reply: response.data.choices[0].message.content
    });

} catch (error) {
    console.error(
        'Groq API Error:',
        error.response?.data || error.message
    );

    res.status(500).json({
        reply: 'AI server mein error aaya. API key, model aur server configuration check karein.'
    });
}

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("Super AI server running on port ${PORT}");
});
