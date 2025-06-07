import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running.');
});

// LLM Feedback endpoint
app.post('/api/llm-feedback', (req, res) => {
  const { topic, userProgress } = req.body;

  // Validate required fields
  if (!topic || !userProgress) {
    return res.status(400).json({
      error: 'Both topic and userProgress are required'
    });
  }

  // Generate mock feedback based on topic
  const feedbackResponses = {
    'ai': {
      feedback: 'Excellent understanding of AI fundamentals! Your grasp of machine learning concepts shows solid progress.',
      question: 'How do you think neural networks differ from traditional algorithms?'
    },
    'machine learning': {
      feedback: 'Great work on machine learning concepts! You\'re building a strong foundation.',
      question: 'What real-world problem would you solve with machine learning?'
    },
    'programming': {
      feedback: 'Your programming skills are developing well! Keep practicing with hands-on projects.',
      question: 'Which programming paradigm interests you most and why?'
    },
    'default': {
      feedback: 'Good progress on your learning journey! Your engagement with the material is commendable.',
      question: 'What aspect of this topic would you like to explore further?'
    }
  };

  // Select response based on topic (case-insensitive)
  const topicKey = topic.toLowerCase();
  const response = feedbackResponses[topicKey] || feedbackResponses['default'];

  res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});