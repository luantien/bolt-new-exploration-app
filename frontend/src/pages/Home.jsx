import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { User } from 'lucide-react'

function Home() {
  const [backendStatus, setBackendStatus] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    fetch('http://localhost:3001')
      .then(res => res.text())
      .then(data => setBackendStatus(data))
      .catch(() => setBackendStatus('Backend not connected'))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Welcome Back!</h2>
            <p className="text-gray-600 mb-4">
              {user ? `Welcome, ${user.email}!` : 'Welcome to the Learning Platform!'}
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                ✅ Frontend is running successfully
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Backend Status</h2>
            <div className={`border rounded-lg p-4 ${
              backendStatus.includes('running') 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <p className={`text-sm ${
                backendStatus.includes('running') 
                  ? 'text-green-800' 
                  : 'text-red-800'
              }`}>
                {backendStatus.includes('running') ? '✅' : '❌'} {backendStatus}
              </p>
            </div>
          </div>

          {user && (
            <div className="bg-white rounded-lg shadow-sm p-6 border md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">User Information</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">User ID</dt>
                    <dd className="mt-1 text-sm text-gray-900 font-mono">{user?.id}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Created</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Sign In</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home