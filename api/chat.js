const express = require('express');
const { GPTx } = require('@ruingl/gptx');
const cors = require('cors');

const app = express();
const gptx = new GPTx({ provider: 'Voids', model: 'gpt-4o-2024-08-06' });

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors()); // Add this line to enable CORS

// Define the /chat endpoint
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const messages = [{ role: 'user', content: message }];

  try {
    const response = await gptx.ChatCompletion(messages);
    
    // Log the response to debug
    console.log(`Received GPTx Response: ${JSON.stringify(response)}`);

    // Assuming the API response has the structure you need
    const aiResponse = response.content || 'No response from AI';
    
    // Return the response in the desired format
    res.json({
      reply: {
        content: aiResponse
      }
    });
  } catch (error) {
    console.error('Error with GPTx ChatCompletion:', error);
    res.status(500).json({ error: 'Error with GPTx ChatCompletion' });
  }
});

// Export the app for Vercel
module.exports = app;
