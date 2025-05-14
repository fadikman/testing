const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/generate-idea', async (req, res) => {
  const { topic, type } = req.body;

  const prompt = `Buatkan 5 ide ${type} untuk topik: "${topic}"`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ ideas: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil ide dari OpenAI' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
