/**
 * Feedback Service
 * Handles all feedback-related API calls
 */

import { apiRequest, apiConfig } from '../config/api.js'

/**
 * Request AI feedback for learning progress
 * @param {string} topic - The learning topic
 * @param {string} userProgress - Description of user's progress
 * @returns {Promise<Object>} - Feedback response with feedback and question
 */
export const requestAIFeedback = async (topic, userProgress) => {
  if (!topic || !userProgress) {
    throw new Error('Both topic and userProgress are required')
  }

  if (topic.length > 100) {
    throw new Error('Topic must be 100 characters or less')
  }

  if (userProgress.length < 10 || userProgress.length > 1000) {
    throw new Error('User progress must be between 10 and 1000 characters')
  }

  try {
    const response = await apiRequest('/llm-feedback', {
      method: 'POST',
      body: JSON.stringify({
        topic: topic.trim(),
        userProgress: userProgress.trim()
      })
    })

    const data = await response.json()
    
    // Validate response structure
    if (!data.feedback || !data.question) {
      throw new Error('Invalid response format from feedback service')
    }

    return {
      feedback: data.feedback,
      question: data.question
    }
  } catch (error) {
    console.error('Feedback service error:', error.message)
    throw new Error(`Failed to get AI feedback: ${error.message}`)
  }
}

/**
 * Get feedback service status
 * @returns {Promise<Object>} - Service status information
 */
export const getFeedbackServiceStatus = async () => {
  try {
    const response = await apiRequest('/status')
    return await response.json()
  } catch (error) {
    console.error('Failed to get feedback service status:', error.message)
    throw error
  }
}

export default {
  requestAIFeedback,
  getFeedbackServiceStatus
}