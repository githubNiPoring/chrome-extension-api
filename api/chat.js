const express = require('express');
const { GPTx } = require('@ruingl/gptx');

const app = express();
const gptx = new GPTx({ provider: 'Nextway', model: 'gemini-pro' });

// Middleware to parse JSON requests
app.use(express.json());

// Define the /chat endpoint
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const messages = [{ role: 'user', content: message }];
  
  try {
    const response = await gptx.ChatCompletion(messages);
    console.log(`Received GPTx Response: ${JSON.stringify(response)}`);
    
    // Send back the response
    res.json({ reply: response });
  } catch (error) {
    console.error('Error with GPTx ChatCompletion:', error);
    res.status(500).json({ error: 'Error with GPTx ChatCompletion' });
  }
});

// Export the app for Vercel
module.exports = app;
