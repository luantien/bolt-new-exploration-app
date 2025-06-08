# Learning Platform - Frontend Application

A beautiful, interactive learning platform built with React, featuring AI and machine learning educational content with progress tracking.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   cd frontend && npm install
   ```

2. **Configure environment variables:**
   ```bash
   # Copy the example environment file
   cp frontend/.env.example frontend/.env
   
   # Edit the .env file with your Supabase configuration
   nano frontend/.env
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:5173

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `frontend/` directory with your Supabase configuration:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Environment
VITE_NODE_ENV=development
```

## 🏗️ Project Structure

```
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── LearningModule.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Navbar.jsx
│   │   ├── contexts/        # React contexts
│   │   │   └── AuthContext.jsx
│   │   ├── services/        # Service modules
│   │   │   └── progressService.js
│   │   ├── pages/           # Page components
│   │   │   └── Home.jsx
│   │   └── config/          # Configuration files
│   │       └── supabase.js
│   └── .env.example         # Environment variables template
└── package.json            # Root package.json with scripts
```

## 📚 Features

- **🎓 Interactive Learning Modules**: Comprehensive AI and machine learning content
- **📊 Progress Tracking**: Track completion status and learning milestones
- **🔐 User Authentication**: Secure authentication with Supabase
- **📱 Responsive Design**: Beautiful, mobile-first design with Tailwind CSS
- **🎨 Modern UI**: Clean, professional interface with smooth animations
- **💾 Data Persistence**: Progress saved to Supabase database

## 🎯 Learning Modules

### Available Modules:
1. **Introduction to AI** - Fundamentals of artificial intelligence
2. **Machine Learning Basics** - Supervised and unsupervised learning
3. **Neural Networks** - Deep learning and neural network architectures

## 🔒 Authentication

The application uses Supabase for user authentication with:
- Email/password signup and login
- Secure session management
- Row-level security for user data

## 📊 Progress Tracking

User progress is automatically tracked and includes:
- Module completion status
- Last accessed timestamps
- Learning streaks and statistics
- Achievement milestones

## 🎨 Design Features

- **Modern Gradient Backgrounds**: Beautiful color transitions
- **Smooth Animations**: Micro-interactions and hover effects
- **Responsive Layout**: Optimized for all screen sizes
- **Accessible Design**: ARIA labels and keyboard navigation
- **Professional Typography**: Clear hierarchy and readability

## 🚀 Deployment

### Build for Production

```bash
cd frontend
npm run build
```

### Deploy to Netlify/Vercel

1. Connect your repository to your hosting platform
2. Set build command: `cd frontend && npm run build`
3. Set publish directory: `frontend/dist`
4. Add environment variables in your hosting platform's dashboard

## 🧪 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install frontend dependencies
npm run install:frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.