import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Home = () => {
  const { user } = useAuth()

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
        {user ? `Welcome, ${user.email}!` : 'Welcome to the Learning Platform!'}
      </h1>
    </div>
  )
}

export default Home