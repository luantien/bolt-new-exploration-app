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
    <nav style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', backgroundColor: 'white' }}>
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center', gap: '2rem' }}>
        <li>
          <a 
            href="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              textDecoration: 'none', 
              color: '#374151',
              fontWeight: '500'
            }}
          >
            <Home size={18} />
            Home
          </a>
        </li>
        <li>
          <a 
            href="/learning" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              textDecoration: 'none', 
              color: '#374151',
              fontWeight: '500'
            }}
          >
            <BookOpen size={18} />
            Learning Module
          </a>
        </li>
        <li style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '0.375rem',
            color: '#166534',
            fontSize: '0.875rem'
          }}>
            <User size={16} />
            <span>Welcome, {user.email}</span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              color: '#374151',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar