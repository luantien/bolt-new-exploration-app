import React, { useState, useEffect } from 'react'
import { Brain, CheckCircle, MessageSquare, ArrowRight, BookOpen, Lightbulb, AlertCircle, Clock, Trophy, RotateCcw } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { requestAIFeedback } from '../services/feedbackService.js'
import { updateModuleProgress, getModuleProgress } from '../services/progressService.js'

const LearningModule = () => {
  // Existing state
  const [feedbackGiven, setFeedbackGiven] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [aiResponse, setAiResponse] = useState({ feedback: '', question: '' })

  // New progress tracking state
  const [progressLoading, setProgressLoading] = useState(false)
  const [progressError, setProgressError] = useState('')
  const [progressSuccess, setProgressSuccess] = useState('')
  const [moduleProgress, setModuleProgress] = useState(null)
  const [isCompleted, setIsCompleted] = useState(false)

  const { user } = useAuth()
  const MODULE_NAME = 'Introduction to AI'

  // Load existing progress on component mount
  useEffect(() => {
    const loadProgress = async () => {
      if (!user) return

      try {
        const result = await getModuleProgress(MODULE_NAME)
        if (result.success && result.data) {
          setModuleProgress(result.data)
          setIsCompleted(result.data.is_completed)
        }
      } catch (error) {
        console.error('Failed to load progress:', error)
      }
    }

    loadProgress()
  }, [user])

  // Update last accessed timestamp when component mounts
  useEffect(() => {
    const updateLastAccessed = async () => {
      if (!user) return

      try {
        await updateModuleProgress(MODULE_NAME, isCompleted)
      } catch (error) {
        console.error('Failed to update last accessed:', error)
      }
    }

    updateLastAccessed()
  }, [user, isCompleted])

  const handleFeedback = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await requestAIFeedback(
        'ai',
        'Completed introduction to AI fundamentals including understanding of artificial intelligence simulation, machine learning concepts, and neural networks. Successfully engaged with the learning material and demonstrated comprehension of core concepts.'
      )
      
      setAiResponse({
        feedback: response.feedback,
        question: response.question
      })
      
      setFeedbackGiven(true)
      setShowResponse(true)
      
    } catch (err) {
      console.error('Error fetching AI feedback:', err)
      setError(err.message || 'Failed to get AI feedback. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = async () => {
    setProgressLoading(true)
    setProgressError('')
    setProgressSuccess('')

    try {
      const result = await updateModuleProgress(MODULE_NAME, true)
      
      if (result.success) {
        setIsCompleted(true)
        setModuleProgress(result.data)
        setProgressSuccess(result.message)
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setProgressSuccess('')
        }, 5000)
      } else {
        setProgressError(result.error)
      }
    } catch (error) {
      console.error('Error completing module:', error)
      setProgressError('Failed to mark module as complete. Please try again.')
    } finally {
      setProgressLoading(false)
    }
  }

  const handleReset = async () => {
    setProgressLoading(true)
    setProgressError('')
    setProgressSuccess('')

    try {
      const result = await updateModuleProgress(MODULE_NAME, false)
      
      if (result.success) {
        setIsCompleted(false)
        setModuleProgress(result.data)
        setProgressSuccess('Module progress reset successfully!')
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setProgressSuccess('')
        }, 3000)
      } else {
        setProgressError(result.error)
      }
    } catch (error) {
      console.error('Error resetting module:', error)
      setProgressError('Failed to reset module progress. Please try again.')
    } finally {
      setProgressLoading(false)
    }
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Never'
    
    try {
      const date = new Date(timestamp)
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      return 'Invalid date'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <Brain className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{MODULE_NAME}</h1>
                <p className="text-gray-600 mt-1">Fundamentals of Artificial Intelligence</p>
              </div>
            </div>

            {/* Progress Status Badge */}
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
              isCompleted 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            }`}>
              {isCompleted ? (
                <>
                  <Trophy className="h-4 w-4" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4" />
                  <span>In Progress</span>
                </>
              )}
            </div>
          </div>
          
          {/* Progress Information */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Module 1 of 5</span>
              </div>
              <span className="text-gray-300">•</span>
              <span>15 min read</span>
            </div>
            
            {moduleProgress && (
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Last accessed: {formatTimestamp(moduleProgress.last_accessed)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Messages */}
        {progressSuccess && (
          <div className="mb-6 flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-xl border border-green-200 animate-fade-in">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">{progressSuccess}</span>
          </div>
        )}

        {progressError && (
          <div className="mb-6 flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">{progressError}</span>
          </div>
        )}

        {/* Main Content Area */}
        <main className="space-y-8" role="main" aria-label="Learning content">
          {/* Learning Material Section */}
          <section className="bg-white rounded-2xl shadow-sm border p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Lightbulb className="h-6 w-6 text-amber-500" />
              <h2 className="text-xl font-semibold text-gray-900">What is Artificial Intelligence?</h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                Artificial Intelligence (AI) represents one of the most transformative technologies of our time. 
                At its core, AI refers to the simulation of human intelligence in machines that are programmed 
                to think, learn, and problem-solve like humans.
              </p>
              
              <p>
                Modern AI systems can perform a wide range of tasks that traditionally required human intelligence, 
                including visual perception, speech recognition, decision-making, and language translation. These 
                capabilities are powered by sophisticated algorithms and vast amounts of data that enable machines 
                to recognize patterns and make predictions.
              </p>
              
              <p>
                The field encompasses various approaches, from rule-based systems that follow predetermined logic 
                to machine learning models that improve their performance through experience. Deep learning, a 
                subset of machine learning inspired by the human brain's neural networks, has been particularly 
                revolutionary in advancing AI capabilities.
              </p>
            </div>

            {/* Key Concepts Highlight */}
            <div className="mt-8 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
              <h3 className="font-semibold text-indigo-900 mb-3">Key Concepts to Remember:</h3>
              <ul className="space-y-2 text-indigo-800">
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 mt-0.5 text-indigo-600" />
                  <span>AI simulates human intelligence in machines</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 mt-0.5 text-indigo-600" />
                  <span>Machine learning enables systems to improve through experience</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 mt-0.5 text-indigo-600" />
                  <span>Deep learning uses neural networks for complex pattern recognition</span>
                </li>
              </ul>
            </div>
          </section>

          {/* AI Interaction Section */}
          <section 
            className="bg-white rounded-2xl shadow-sm border p-8"
            aria-label="Interactive AI engagement section"
          >
            <div className="flex items-center space-x-3 mb-6">
              <MessageSquare className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">Interactive Learning</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Test your understanding by engaging with our AI assistant. Click the button below to receive 
              personalized feedback on this learning module.
            </p>

            {/* Error Display */}
            {error && (
              <div className="mb-6 flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            <button
              id="ask-ai-button"
              onClick={handleFeedback}
              disabled={feedbackGiven || loading}
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                feedbackGiven
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : loading
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
              aria-label="Get AI feedback on your learning progress"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
                  <span>Getting Feedback...</span>
                </>
              ) : feedbackGiven ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Feedback Received</span>
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5" />
                  <span>Get AI Feedback</span>
                </>
              )}
            </button>

            {/* Response Display Area */}
            {showResponse && (
              <div 
                id="ai-response-area"
                className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 animate-fade-in"
                role="region"
                aria-label="AI feedback response"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-2">AI Assistant Response</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">Feedback:</h4>
                        <p className="text-blue-800 leading-relaxed">
                          {aiResponse.feedback}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">Follow-up Question:</h4>
                        <p className="text-blue-800 leading-relaxed italic">
                          {aiResponse.question}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Completion Section */}
          <section className="bg-white rounded-2xl shadow-sm border p-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Module Completion</h2>
              <p className="text-gray-600 mb-6">
                {isCompleted 
                  ? 'You have completed this module! You can reset your progress if you want to review the material again.'
                  : 'Ready to mark this module as complete? This will unlock the next learning module in your journey.'
                }
              </p>
              
              <div className="flex items-center justify-center space-x-4">
                {!isCompleted ? (
                  <button
                    onClick={handleComplete}
                    disabled={progressLoading}
                    className={`inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
                      progressLoading
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:shadow-lg transform hover:-translate-y-0.5'
                    }`}
                    aria-label="Mark learning module as complete"
                  >
                    {progressLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
                        <span>Updating Progress...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-6 w-6" />
                        <span>Complete Module</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 px-6 py-4 bg-green-100 text-green-700 rounded-xl border border-green-200">
                      <Trophy className="h-6 w-6" />
                      <span className="font-semibold">Module Completed!</span>
                    </div>
                    
                    <button
                      onClick={handleReset}
                      disabled={progressLoading}
                      className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        progressLoading
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-600 text-white hover:bg-gray-700 hover:shadow-lg transform hover:-translate-y-0.5'
                      }`}
                      aria-label="Reset module progress"
                    >
                      {progressLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
                          <span>Resetting...</span>
                        </>
                      ) : (
                        <>
                          <RotateCcw className="h-5 w-5" />
                          <span>Reset Progress</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Progress Information Display */}
              {moduleProgress && (
                <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Progress Details</h3>
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-sm">
                    <div>
                      <dt className="font-medium text-gray-500">Status</dt>
                      <dd className="mt-1 text-gray-900">
                        {moduleProgress.is_completed ? 'Completed' : 'In Progress'}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Last Accessed</dt>
                      <dd className="mt-1 text-gray-900">
                        {formatTimestamp(moduleProgress.last_accessed)}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Started</dt>
                      <dd className="mt-1 text-gray-900">
                        {formatTimestamp(moduleProgress.created_at)}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default LearningModule