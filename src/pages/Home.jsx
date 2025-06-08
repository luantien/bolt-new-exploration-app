import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { BookOpen, User, Trophy, Clock } from 'lucide-react'

function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Learning Platform
          </h1>
          <p className="text-xl text-gray-600">
            Master AI and Machine Learning with interactive modules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">Learning Modules</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Comprehensive AI and ML courses designed for all skill levels
            </p>
            <a 
              href="/learning" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Start Learning →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center space-x-3 mb-4">
              <Trophy className="h-8 w-8 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">Track Progress</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Monitor your learning journey and celebrate achievements
            </p>
            <span className="text-green-600 font-medium">Coming Soon</span>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="h-8 w-8 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Flexible Learning</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Learn at your own pace with self-paced interactive content
            </p>
            <span className="text-blue-600 font-medium">Available Now</span>
          </div>
        </div>

        {user && (
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Account</h2>
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{user.email}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Home