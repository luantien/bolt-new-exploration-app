import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Home, BookOpen, LogOut, User } from 'lucide-react'

const Navbar = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const { error } = await signOut()
      if (error) {
        console.error('Error signing out:', error)
      } else {
        navigate('/')
      }
    } catch (err) {
      console.error('Unexpected error during logout:', err)
    }
  }

  if (!user) {
    return null
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <a 
            href="/" 
            className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </a>
          <a 
            href="/learning" 
            className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
          >
            <BookOpen className="h-5 w-5" />
            <span>Learning</span>
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar