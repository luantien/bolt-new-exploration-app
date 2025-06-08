# Learning Platform

A beautiful, interactive learning platform built with React, featuring AI and machine learning educational content with comprehensive progress tracking.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- A Supabase account and project

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd learning-platform
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy the sample environment file
   npm run env:setup
   
   # Edit .env with your Supabase configuration
   nano .env
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:5173

## 🔧 Environment Configuration

### Required Environment Variables

The application requires the following environment variables to function properly:

```bash
# Supabase Configuration (Required)
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Application Environment
VITE_NODE_ENV=development
```

### Environment Setup Steps

1. **Copy the sample file:**
   ```bash
   cp .env.sample .env
   ```

2. **Get your Supabase credentials:**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Select your project or create a new one
   - Go to Settings > API
   - Copy the Project URL and anon/public key

3. **Update your .env file:**
   ```bash
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Environment Configuration Options

The `.env.sample` file contains all possible configuration options:

- **Required Variables**: Supabase URL and anon key
- **Environment Settings**: NODE_ENV, dev tools, logging level
- **Development Options**: Debug tools and verbose logging
- **Production Settings**: Optimized for production deployment

Simply copy `.env.sample` to `.env` and configure the values for your specific environment.

## 🏗️ Project Structure

```
learning-platform/
├── src/                          # Source code
│   ├── components/              # React components
│   │   ├── LearningModule.jsx   # Main learning interface
│   │   ├── Login.jsx           # Authentication login
│   │   ├── Signup.jsx          # User registration
│   │   └── Navbar.jsx          # Navigation component
│   ├── contexts/               # React contexts
│   │   └── AuthContext.jsx     # Authentication state management
│   ├── services/               # API and service modules
│   │   └── progressService.js  # Progress tracking service
│   ├── pages/                  # Page components
│   │   └── Home.jsx           # Dashboard and home page
│   ├── config/                 # Configuration files
│   │   └── supabase.js        # Supabase client setup
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles and Tailwind imports
├── public/                     # Static assets
├── supabase/                   # Database migrations and schema
│   └── migrations/            # SQL migration files
├── .env.sample                # Environment variables template
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── README.md                  # This file
```

## 📦 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run preview      # Preview production build locally
```

### Building
```bash
npm run build        # Build for production
npm run build:analyze # Build with bundle analysis
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run type-check   # Run TypeScript type checking
```

### Maintenance
```bash
npm run clean        # Clean build artifacts and node_modules
npm run install:clean # Clean install dependencies
npm run env:setup    # Set up environment file from template
npm run env:validate # Validate environment configuration
```

## 📚 Features

### 🎓 Learning Modules
- **Interactive Content**: Comprehensive AI and machine learning educational material
- **Progressive Learning**: Structured modules from beginner to advanced
- **Real-time Feedback**: Instant feedback on learning progress

### 📊 Progress Tracking
- **Completion Status**: Track which modules you've completed
- **Learning Analytics**: Monitor your learning journey and milestones
- **Persistent Storage**: Progress saved securely to Supabase database

### 🔐 Authentication & Security
- **Secure Authentication**: Email/password authentication via Supabase
- **Row-Level Security**: User data protected with database-level security
- **Session Management**: Automatic session handling and renewal

### 🎨 User Experience
- **Responsive Design**: Beautiful, mobile-first design with Tailwind CSS
- **Modern UI**: Clean, professional interface with smooth animations
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Dark Mode Ready**: Prepared for dark mode implementation

### 🚀 Performance
- **Fast Loading**: Optimized with Vite for lightning-fast development and builds
- **Code Splitting**: Automatic code splitting for optimal loading
- **Modern Standards**: Built with latest React and TypeScript best practices

## 🗄️ Database Schema

The application uses Supabase with the following main table:

### user_progress
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to auth.users)
- `module_name` (varchar, required)
- `is_completed` (boolean, default false)
- `last_accessed` (timestamptz, default now())
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. **Connect repository to Netlify**
2. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Add environment variables in Netlify dashboard**
4. **Deploy**

### Deploy to Vercel

1. **Connect repository to Vercel**
2. **Configure build settings:**
   - Build command: `npm run build`
   - Output directory: `dist`
3. **Add environment variables in Vercel dashboard**
4. **Deploy**

### Environment Variables for Production

Make sure to set these in your hosting platform:

```bash
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key
VITE_NODE_ENV=production
VITE_DEV_TOOLS=false
VITE_LOG_LEVEL=error
```

## 🧪 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Implement proper error handling
- Write descriptive component and function names

### Component Structure
- Keep components focused and single-purpose
- Use proper prop types and interfaces
- Implement proper loading and error states
- Follow accessibility guidelines

### State Management
- Use React Context for global state
- Keep local state minimal and focused
- Implement proper cleanup in useEffect hooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Development Setup for Contributors

1. Follow the installation steps above
2. Create a `.env` file with your Supabase credentials
3. Run `npm run dev` to start development
4. Make your changes and test
5. Run `npm run lint` and `npm run type-check` before committing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Review the environment setup steps
3. Verify your Supabase configuration
4. Check the browser console for error messages

## 🔗 Links

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)