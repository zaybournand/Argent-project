const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let verificationCodes = {}; // Store verification codes temporarily

// Endpoint for signing up
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }

    // Generate a random verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    verificationCodes[email] = verificationCode;

    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Account Verification',
        text: `Your verification code is: ${verificationCode}`,
    };

    // Send the verification email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Verification email sent!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error sending email.");
    }
});

// Endpoint to verify the code
app.post('/api/verify', (req, res) => {
    const { email, code } = req.body;
    if (verificationCodes[email] === code) {
        delete verificationCodes[email]; // Remove the code after verification
        res.status(200).send("Account verified!");
    } else {
        res.status(400).send("Invalid verification code.");
    }
});

// Endpoint to handle chatbot requests
app.post('/chat', async (req, res) => {
    const userInput = req.body.message;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
            messages: [{ role: 'user', content: userInput }],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Your API key here
                'Content-Type': 'application/json',
            }
        });

        const botReply = response.data.choices[0].message.content;
        res.json({ reply: botReply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
