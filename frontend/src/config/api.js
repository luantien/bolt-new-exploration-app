/**
 * API Configuration Module
 * Handles backend service domain configuration with validation and error handling
 */

// Environment variables with fallbacks
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'
const API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION || 'v1'
const NODE_ENV = import.meta.env.VITE_NODE_ENV || 'development'

/**
 * Validates if a URL is properly formatted
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidUrl = (url) => {
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:'].includes(urlObj.protocol)
  } catch (error) {
    return false
  }
}

/**
 * Validates the backend configuration
 * @throws {Error} If configuration is invalid
 */
const validateConfig = () => {
  if (!BACKEND_URL) {
    throw new Error('VITE_BACKEND_URL environment variable is required')
  }

  if (!isValidUrl(BACKEND_URL)) {
    throw new Error(`Invalid VITE_BACKEND_URL format: ${BACKEND_URL}. Must be a valid HTTP/HTTPS URL.`)
  }

  // Remove trailing slash for consistency
  const normalizedUrl = BACKEND_URL.replace(/\/$/, '')
  
  // Validate that URL doesn't contain API path already
  if (normalizedUrl.includes('/api')) {
    console.warn('Warning: VITE_BACKEND_URL should not include /api path. It will be added automatically.')
  }

  return normalizedUrl
}

// Validate configuration on module load
let validatedBackendUrl
try {
  validatedBackendUrl = validateConfig()
} catch (error) {
  console.error('Backend configuration error:', error.message)
  // Fallback to localhost in development, throw in production
  if (NODE_ENV === 'production') {
    throw error
  } else {
    console.warn('Falling back to localhost for development')
    validatedBackendUrl = 'http://localhost:3001'
  }
}

/**
 * API Configuration object
 */
export const apiConfig = {
  baseUrl: validatedBackendUrl,
  apiVersion: API_VERSION,
  environment: NODE_ENV,
  
  // Computed properties
  get apiBaseUrl() {
    return `${this.baseUrl}/api`
  },
  
  get healthUrl() {
    return this.baseUrl
  },
  
  get feedbackUrl() {
    return `${this.apiBaseUrl}/llm-feedback`
  },
  
  get statusUrl() {
    return `${this.apiBaseUrl}/status`
  }
}

/**
 * Creates a configured fetch function with proper error handling
 * @param {string} endpoint - The API endpoint
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<Response>} - The fetch response
 */
export const apiRequest = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${apiConfig.apiBaseUrl}${endpoint}`
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Version': apiConfig.apiVersion,
      ...options.headers
    }
  }

  const requestOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  }

  try {
    const response = await fetch(url, requestOptions)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }
    
    return response
  } catch (error) {
    console.error(`API request failed for ${url}:`, error.message)
    throw error
  }
}

/**
 * Health check function to verify backend connectivity
 * @returns {Promise<boolean>} - True if backend is healthy
 */
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(apiConfig.healthUrl, {
      method: 'GET',
      headers: {
        'X-API-Version': apiConfig.apiVersion
      }
    })
    return response.ok
  } catch (error) {
    console.error('Backend health check failed:', error.message)
    return false
  }
}

/**
 * Get API status information
 * @returns {Promise<Object>} - API status object
 */
export const getApiStatus = async () => {
  try {
    const response = await apiRequest('/status')
    return await response.json()
  } catch (error) {
    console.error('Failed to get API status:', error.message)
    throw error
  }
}

// Log configuration in development
if (NODE_ENV === 'development') {
  console.log('API Configuration:', {
    baseUrl: apiConfig.baseUrl,
    apiBaseUrl: apiConfig.apiBaseUrl,
    environment: apiConfig.environment,
    apiVersion: apiConfig.apiVersion
  })
}

export default apiConfig