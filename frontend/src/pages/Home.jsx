import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { BookOpen, Brain, Trophy, Clock, ArrowRight, Sparkles } from 'lucide-react'

function Home() {
  const { user } = useAuth()

  const modules = [
    {
      id: 1,
      title: 'Introduction to AI',
      description: 'Learn the fundamentals of artificial intelligence and machine learning',
      duration: '15 min',
      difficulty: 'Beginner',
      status: 'available',
      icon: Brain,
      color: 'indigo'
    },
    {
      id: 2,
      title: 'Machine Learning Basics',
      description: 'Explore supervised and unsupervised learning algorithms',
      duration: '25 min',
      difficulty: 'Intermediate',
      status: 'locked',
      icon: BookOpen,
      color: 'purple'
    },
    {
      id: 3,
      title: 'Neural Networks',
      description: 'Deep dive into neural network architectures and training',
      duration: '30 min',
      difficulty: 'Advanced',
      status: 'locked',
      icon: Sparkles,
      color: 'pink'
    }
  ]

  const stats = [
    { label: 'Modules Completed', value: '0', icon: Trophy, color: 'green' },
    { label: 'Learning Hours', value: '0', icon: Clock, color: 'blue' },
    { label: 'Current Streak', value: '0 days', icon: Brain, color: 'purple' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Your Learning Journey
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {user ? `Hello ${user.email.split('@')[0]}! ` : ''}
              Explore AI and machine learning concepts through interactive modules and personalized feedback.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="bg-white rounded-2xl shadow-sm border p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 bg-${stat.color}-100 rounded-xl`}>
                      <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Learning Modules */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Learning Modules</h2>
            <div className="text-sm text-gray-500">
              {modules.filter(m => m.status === 'available').length} of {modules.length} available
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const Icon = module.icon
              const isLocked = module.status === 'locked'
              
              return (
                <div
                  key={module.id}
                  className={`bg-white rounded-2xl shadow-sm border p-6 transition-all duration-200 ${
                    isLocked 
                      ? 'opacity-60 cursor-not-allowed' 
                      : 'hover:shadow-lg hover:-translate-y-1 cursor-pointer'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-${module.color}-100 rounded-xl`}>
                      <Icon className={`h-6 w-6 text-${module.color}-600`} />
                    </div>
                    {isLocked && (
                      <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        Locked
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {module.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {module.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{module.duration}</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      module.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      module.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {module.difficulty}
                    </span>
                  </div>
                  
                  {!isLocked && (
                    <a
                      href="/learning"
                      className={`inline-flex items-center space-x-2 text-${module.color}-600 hover:text-${module.color}-700 font-medium text-sm transition-colors`}
                    >
                      <span>Start Learning</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Our Learning Platform?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Interactive Learning
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Engage with content through hands-on exercises and real-world examples that make complex concepts easy to understand.
              </p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-green-100 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Progress Tracking
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Monitor your learning journey with detailed progress tracking and achievement milestones to keep you motivated.
              </p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-purple-100 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Personalized Feedback
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Receive tailored feedback and recommendations based on your learning style and progress to optimize your experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home