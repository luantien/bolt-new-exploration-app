import React, { useState } from 'react'
import { Brain, CheckCircle, MessageSquare, ArrowRight, BookOpen, Lightbulb } from 'lucide-react'

const LearningModule = () => {
  const [feedbackGiven, setFeedbackGiven] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showResponse, setShowResponse] = useState(false)

  const handleFeedback = () => {
    setFeedbackGiven(true)
    setShowResponse(true)
  }

  const handleComplete = () => {
    setIsCompleted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <Brain className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Introduction to AI</h1>
              <p className="text-gray-600 mt-1">Fundamentals of Artificial Intelligence</p>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <BookOpen className="h-4 w-4" />
            <span>Module 1 of 5</span>
            <span className="text-gray-300">•</span>
            <span>15 min read</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
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
            
            <button
              onClick={handleFeedback}
              disabled={feedbackGiven}
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                feedbackGiven
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
              aria-label="Get AI feedback on your learning progress"
            >
              {feedbackGiven ? (
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
                className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 animate-fade-in"
                role="region"
                aria-label="AI feedback response"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">AI Assistant Response</h3>
                    <p className="text-blue-800 leading-relaxed">
                      Excellent progress! You've successfully completed the introduction to AI fundamentals. 
                      Your engagement with the material shows a solid understanding of the core concepts. 
                      The key takeaways about AI simulation, machine learning, and neural networks will 
                      serve as a strong foundation for the upcoming modules.
                    </p>
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
                Ready to mark this module as complete? This will unlock the next learning module in your journey.
              </p>
              
              <button
                onClick={handleComplete}
                disabled={isCompleted}
                className={`inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
                  isCompleted
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
                aria-label="Mark learning module as complete"
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="h-6 w-6" />
                    <span>Module Completed!</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-6 w-6" />
                    <span>Complete Module</span>
                  </>
                )}
              </button>

              {isCompleted && (
                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200 animate-fade-in">
                  <p className="text-green-800 font-medium">
                    🎉 Congratulations! You've successfully completed the Introduction to AI module.
                  </p>
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