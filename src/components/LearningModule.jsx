import React, { useState, useEffect } from 'react'
import { Brain, CheckCircle, BookOpen, Lightbulb, AlertCircle, Clock, Trophy, RotateCcw, MessageCircle, Loader } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { updateModuleProgress, getModuleProgress } from '../services/progressService.js'

const LearningModule = () => {
  const [progressLoading, setProgressLoading] = useState(false)
  const [progressError, setProgressError] = useState('')
  const [progressSuccess, setProgressSuccess] = useState('')
  const [moduleProgress, setModuleProgress] = useState(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [followupQuestions, setFollowupQuestions] = useState([])
  const [loadingQuestions, setLoadingQuestions] = useState(false)
  const [questionsError, setQuestionsError] = useState('')

  const { user } = useAuth()
  const MODULE_NAME = 'Introduction to AI'

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
        
        setTimeout(() => {
          setProgressSuccess('')
        }, 5000)
      } else {
        setProgressError(result.error)
      }
    } catch (error) {
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
        
        setTimeout(() => {
          setProgressSuccess('')
        }, 3000)
      } else {
        setProgressError(result.error)
      }
    } catch (error) {
      setProgressError('Failed to reset module progress. Please try again.')
    } finally {
      setProgressLoading(false)
    }
  }

  const getFollowupQuestions = async () => {
    setLoadingQuestions(true)
    setQuestionsError('')

    try {
      const response = await fetch('/.netlify/functions/followup-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moduleName: MODULE_NAME,
          userProgress: moduleProgress
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setFollowupQuestions(data.questions)
      } else {
        setQuestionsError(data.error || 'Failed to generate follow-up questions')
      }
    } catch (error) {
      setQuestionsError('Network error: Unable to fetch follow-up questions')
    } finally {
      setLoadingQuestions(false)
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

        <main className="space-y-8">
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

            <div className="mt-8 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
              <h3 className="font-semibold text-indigo-900 mb-3">Key Concepts to Remember:</h3>
              <ul className="space-y-2 text-indigo-800">
                <li>• AI simulates human intelligence in machines</li>
                <li>• Machine learning enables systems to improve through experience</li>
                <li>• Deep learning uses neural networks for complex pattern recognition</li>
              </ul>
            </div>
          </section>

          {/* AI Follow-up Questions Section */}
          <section className="bg-white rounded-2xl shadow-sm border p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-6 w-6 text-purple-500" />
                <h2 className="text-xl font-semibold text-gray-900">AI Follow-up Questions</h2>
              </div>
              
              <button
                onClick={getFollowupQuestions}
                disabled={loadingQuestions}
                className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  loadingQuestions
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {loadingQuestions ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-5 w-5" />
                    <span>Get AI Follow Up Questions</span>
                  </>
                )}
              </button>
            </div>

            {questionsError && (
              <div className="mb-6 flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">{questionsError}</span>
              </div>
            )}

            {followupQuestions.length > 0 && (
              <div className="space-y-4">
                <p className="text-gray-600 mb-4">
                  Here are some AI-generated follow-up questions to deepen your understanding:
                </p>
                
                <div className="grid gap-4">
                  {followupQuestions.map((question, index) => (
                    <div key={question.id || index} className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 text-lg leading-relaxed">
                          {question.question}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          question.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                          question.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {question.difficulty}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="capitalize font-medium">
                          Type: {question.type?.replace('-', ' ')}
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{question.suggested_time}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-blue-800 text-sm">
                    💡 <strong>Tip:</strong> Take time to reflect on these questions. They're designed to help you 
                    apply what you've learned and think critically about AI concepts.
                  </p>
                </div>
              </div>
            )}

            {followupQuestions.length === 0 && !loadingQuestions && !questionsError && (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Click the button above to generate personalized follow-up questions based on this module.
                </p>
              </div>
            )}
          </section>

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