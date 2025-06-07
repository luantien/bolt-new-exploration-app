# Learning Platform - Full-Stack Application

A comprehensive learning platform with AI-powered feedback, built with React frontend and Express backend.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Configure environment variables:**
   ```bash
   # Copy the example environment file
   cp frontend/.env.example frontend/.env
   
   # Edit the .env file with your configuration
   nano frontend/.env
   ```

3. **Start the development servers:**
   ```bash
   npm run dev
   ```

This will start both frontend (http://localhost:5173) and backend (http://localhost:3001) servers concurrently.

## 🔧 Configuration

### Backend Domain Configuration

The frontend can be configured to work with different backend environments through environment variables.

#### Environment Variables

Create a `.env` file in the `frontend/` directory with the following variables:

```bash
# Backend API Configuration
VITE_BACKEND_URL=http://localhost:3001
VITE_BACKEND_API_VERSION=v1

# Supabase Configuration (if using authentication)
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Environment
VITE_NODE_ENV=development
```

#### Environment-Specific Configuration

The application supports multiple environment configurations:

**Development (.env.development):**
```bash
VITE_BACKEND_URL=http://localhost:3001
VITE_BACKEND_API_VERSION=v1
VITE_NODE_ENV=development
```

**Staging (.env.staging):**
```bash
VITE_BACKEND_URL=https://api-staging.learningplatform.com
VITE_BACKEND_API_VERSION=v1
VITE_NODE_ENV=staging
```

**Production (.env.production):**
```bash
VITE_BACKEND_URL=https://api.learningplatform.com
VITE_BACKEND_API_VERSION=v1
VITE_NODE_ENV=production
```

#### Domain Format Requirements

- **Protocol**: Must include `http://` or `https://`
- **No trailing slash**: URLs should not end with `/`
- **No API path**: Don't include `/api` in the base URL (it's added automatically)

**Valid examples:**
- `http://localhost:3001`
- `https://api.example.com`
- `https://my-backend.herokuapp.com`

**Invalid examples:**
- `localhost:3001` (missing protocol)
- `http://localhost:3001/` (trailing slash)
- `http://localhost:3001/api` (includes API path)

#### Configuration Validation

The application automatically validates the backend URL configuration:

1. **URL Format**: Ensures proper HTTP/HTTPS protocol
2. **Environment Check**: Validates required variables are present
3. **Fallback Handling**: Falls back to localhost in development if configuration fails
4. **Error Handling**: Throws errors in production for invalid configurations

#### Using Different Environments

**Development:**
```bash
npm run dev
# Uses .env.development or .env
```

**Staging:**
```bash
NODE_ENV=staging npm run build
# Uses .env.staging
```

**Production:**
```bash
NODE_ENV=production npm run build
# Uses .env.production
```

### API Service Architecture

The application uses a modular API service architecture:

- **`frontend/src/config/api.js`**: Central API configuration and validation
- **`frontend/src/services/feedbackService.js`**: Feedback-specific API calls
- **Automatic health checks**: Built-in backend connectivity verification
- **Error handling**: Comprehensive error handling with user-friendly messages

### Troubleshooting Configuration

**Common Issues:**

1. **"Backend not connected" error:**
   - Check if backend server is running
   - Verify `VITE_BACKEND_URL` is correct
   - Ensure no firewall blocking the connection

2. **"Invalid VITE_BACKEND_URL format" error:**
   - Ensure URL includes `http://` or `https://`
   - Remove any trailing slashes
   - Don't include `/api` in the base URL

3. **CORS errors:**
   - Verify backend CORS configuration includes your frontend URL
   - Check if ports match your configuration

**Debug Mode:**

In development, the application logs the current API configuration to the browser console. Check the developer tools console for configuration details.

## 🏗️ Project Structure

```
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── config/          # Configuration files
│   │   │   └── api.js       # API configuration and validation
│   │   ├── services/        # API service modules
│   │   │   └── feedbackService.js
│   │   ├── contexts/        # React contexts
│   │   └── pages/           # Page components
│   ├── .env.example         # Environment variables template
│   ├── .env.development     # Development environment config
│   ├── .env.staging         # Staging environment config
│   └── .env.production      # Production environment config
├── backend/                 # Express backend API
│   ├── server.js           # Main server file
│   ├── openapi.yaml        # API documentation
│   └── package.json        # Backend dependencies
└── package.json            # Root package.json with scripts
```

## 🔌 API Endpoints

### Health Check
- **GET** `/` - Basic health check
- **GET** `/api/status` - Detailed API status

### Learning & Feedback
- **POST** `/api/llm-feedback` - Get AI-powered learning feedback

### Documentation
- **GET** `/api-docs` - Swagger UI documentation (development only)
- **GET** `/api/openapi.json` - OpenAPI specification

## 🚀 Deployment

### Frontend Deployment

1. **Build for production:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Configure production environment:**
   ```bash
   # Set production backend URL
   echo "VITE_BACKEND_URL=https://your-api-domain.com" > .env.production
   ```

3. **Deploy to your hosting platform** (Netlify, Vercel, etc.)

### Backend Deployment

1. **Deploy to your hosting platform** (Heroku, Railway, etc.)
2. **Update frontend configuration** with the deployed backend URL
3. **Verify CORS settings** include your frontend domain

## 🧪 Testing

```bash
# Run frontend tests
cd frontend && npm test

# Run backend tests
cd backend && npm test
```

## 📚 Features

- **🤖 AI-Powered Feedback**: Get personalized learning feedback
- **🔐 Authentication**: Secure user authentication with Supabase
- **📱 Responsive Design**: Works on all device sizes
- **🌍 Multi-Environment**: Configurable for different deployment environments
- **🔧 Health Monitoring**: Built-in health checks and status monitoring
- **📖 API Documentation**: Comprehensive OpenAPI documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.