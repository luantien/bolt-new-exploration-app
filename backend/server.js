import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS configuration
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? ['https://yourapp.com', 'https://api.learningplatform.com']
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Load OpenAPI specification
let swaggerDocument;
try {
  swaggerDocument = YAML.load(join(__dirname, 'openapi.yaml'));
  
  // Update server URLs based on environment
  if (NODE_ENV === 'production') {
    swaggerDocument.servers = [
      {
        url: 'https://api.learningplatform.com',
        description: 'Production server'
      }
    ];
  } else {
    swaggerDocument.servers = [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server'
      }
    ];
  }
} catch (error) {
  console.error('Error loading OpenAPI specification:', error);
  swaggerDocument = {
    openapi: '3.0.3',
    info: {
      title: 'Learning Platform API',
      version: '1.0.0',
      description: 'API documentation temporarily unavailable'
    },
    paths: {}
  };
}

// Swagger UI options
const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    docExpansion: 'list',
    filter: true,
    showRequestDuration: true,
    tryItOutEnabled: true,
    requestInterceptor: (req) => {
      // Add custom headers or modify requests if needed
      req.headers['X-API-Version'] = '1.0.0';
      return req;
    }
  },
  customCss: `
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info { margin: 20px 0; }
    .swagger-ui .info .title { color: #3b82f6; }
    .swagger-ui .scheme-container { 
      background: #f8fafc; 
      border: 1px solid #e2e8f0; 
      border-radius: 8px; 
      padding: 15px; 
      margin: 20px 0; 
    }
  `,
  customSiteTitle: 'Learning Platform API Documentation',
  customfavIcon: '/favicon.ico'
};

// Security middleware for documentation access
const documentationAuth = (req, res, next) => {
  // Only allow access in non-production environments
  if (NODE_ENV === 'production') {
    // In production, you might want to add authentication
    const apiKey = req.headers['x-api-key'];
    const authToken = req.headers.authorization;
    
    if (!apiKey && !authToken) {
      return res.status(401).json({
        error: 'API documentation access requires authentication in production'
      });
    }
    
    // Add your authentication logic here
    // For example, validate API key or JWT token
  }
  
  next();
};

// API Documentation routes (only in non-production or with auth)
if (NODE_ENV !== 'production') {
  // Development: Open access to documentation
  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(swaggerDocument, swaggerOptions));
  
  // Alternative route
  app.use('/swagger', swaggerUi.serve);
  app.get('/swagger', swaggerUi.setup(swaggerDocument, swaggerOptions));
  
  console.log(`📚 API Documentation available at:`);
  console.log(`   http://localhost:${PORT}/api-docs`);
  console.log(`   http://localhost:${PORT}/swagger`);
} else {
  // Production: Require authentication
  app.use('/api-docs', documentationAuth, swaggerUi.serve);
  app.get('/api-docs', documentationAuth, swaggerUi.setup(swaggerDocument, swaggerOptions));
}

// Raw OpenAPI spec endpoint
app.get('/api/openapi.json', documentationAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(swaggerDocument);
});

app.get('/api/openapi.yaml', documentationAuth, (req, res) => {
  res.setHeader('Content-Type', 'text/yaml');
  res.send(YAML.stringify(swaggerDocument, 4));
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Backend is running.');
});

// API status endpoint with documentation links
app.get('/api/status', (req, res) => {
  const response = {
    status: 'healthy',
    version: '1.0.0',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    documentation: {
      swagger_ui: NODE_ENV !== 'production' ? `http://localhost:${PORT}/api-docs` : 'Authentication required',
      openapi_json: `${req.protocol}://${req.get('host')}/api/openapi.json`,
      openapi_yaml: `${req.protocol}://${req.get('host')}/api/openapi.yaml`
    }
  };
  
  res.json(response);
});

// LLM Feedback endpoint
app.post('/api/llm-feedback', (req, res) => {
  const { topic, userProgress } = req.body;

  // Validate required fields
  if (!topic || !userProgress) {
    return res.status(400).json({
      error: 'Both topic and userProgress are required',
      code: 'MISSING_REQUIRED_FIELDS'
    });
  }

  // Validate field lengths
  if (topic.length > 100) {
    return res.status(400).json({
      error: 'Topic must be 100 characters or less',
      code: 'TOPIC_TOO_LONG'
    });
  }

  if (userProgress.length < 10 || userProgress.length > 1000) {
    return res.status(400).json({
      error: 'User progress must be between 10 and 1000 characters',
      code: 'INVALID_PROGRESS_LENGTH'
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
    'data structures': {
      feedback: 'Solid progress on data structures! Understanding these fundamentals will serve you well.',
      question: 'How would you choose between different data structures for a specific use case?'
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error occurred',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    code: 'NOT_FOUND',
    availableEndpoints: {
      health: '/',
      status: '/api/status',
      feedback: '/api/llm-feedback',
      documentation: NODE_ENV !== 'production' ? '/api-docs' : 'Authentication required'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${NODE_ENV}`);
  console.log(`🔗 API Status: http://localhost:${PORT}/api/status`);
  
  if (NODE_ENV !== 'production') {
    console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  }
});