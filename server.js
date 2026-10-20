const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Groq API key environment variable se milegi.
const API_KEY = process.env.GROQ_API_KEY;

app.post('/api/chat', async (req, res) => {
try {
if (!API_KEY) {
return res.status(500).json({
reply: "Groq API key configure nahi hai. GROQ_API_KEY set karein."
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
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are Super AI, an intelligent, helpful, and advanced assistant."
                },
                {
                    role: "user",
                    content: message
                }
            ]
        },
        {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        }
    );

    res.json({
        reply: response.data.choices[0].message.content
    });

} catch (error) {
    console.error(
        error.response?.data || error.message
    );

    res.status(500).json({
        reply: "API Error: Groq API key aur server configuration check karein."
    });
}

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("Super AI server running on port ${PORT}");
});
