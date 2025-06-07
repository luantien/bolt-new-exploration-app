/**
 * Progress Service
 * Handles all user progress tracking operations with Supabase
 */

import { supabase } from '../config/supabase.js'

/**
 * Update or create user progress for a specific module
 * @param {string} moduleName - The name of the learning module
 * @param {boolean} isCompleted - Whether the module is completed
 * @returns {Promise<Object>} - Progress data or error
 */
export const updateModuleProgress = async (moduleName, isCompleted = false) => {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      throw new Error(`Authentication error: ${userError.message}`)
    }
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    if (!moduleName || typeof moduleName !== 'string') {
      throw new Error('Module name is required and must be a string')
    }

    // Upsert progress record
    const { data, error } = await supabase
      .from('user_progress')
      .upsert(
        {
          user_id: user.id,
          module_name: moduleName.trim(),
          is_completed: Boolean(isCompleted),
          last_accessed: new Date().toISOString()
        },
        {
          onConflict: 'user_id,module_name',
          ignoreDuplicates: false
        }
      )
      .select()
      .single()

    if (error) {
      console.error('Supabase upsert error:', error)
      throw new Error(`Failed to update progress: ${error.message}`)
    }

    return {
      success: true,
      data: data,
      message: isCompleted ? 'Module marked as complete!' : 'Progress updated successfully!'
    }

  } catch (error) {
    console.error('Progress update error:', error)
    return {
      success: false,
      error: error.message || 'Failed to update module progress',
      data: null
    }
  }
}

/**
 * Get user progress for a specific module
 * @param {string} moduleName - The name of the learning module
 * @returns {Promise<Object>} - Progress data or null
 */
export const getModuleProgress = async (moduleName) => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      throw new Error('User not authenticated')
    }

    if (!moduleName || typeof moduleName !== 'string') {
      throw new Error('Module name is required')
    }

    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('module_name', moduleName.trim())
      .maybeSingle()

    if (error) {
      console.error('Supabase select error:', error)
      throw new Error(`Failed to fetch progress: ${error.message}`)
    }

    return {
      success: true,
      data: data,
      exists: !!data
    }

  } catch (error) {
    console.error('Progress fetch error:', error)
    return {
      success: false,
      error: error.message || 'Failed to fetch module progress',
      data: null,
      exists: false
    }
  }
}

/**
 * Get all user progress records
 * @returns {Promise<Object>} - Array of progress records
 */
export const getAllUserProgress = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      throw new Error('User not authenticated')
    }

    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .order('last_accessed', { ascending: false })

    if (error) {
      console.error('Supabase select error:', error)
      throw new Error(`Failed to fetch progress: ${error.message}`)
    }

    return {
      success: true,
      data: data || [],
      count: data?.length || 0
    }

  } catch (error) {
    console.error('Progress fetch error:', error)
    return {
      success: false,
      error: error.message || 'Failed to fetch user progress',
      data: [],
      count: 0
    }
  }
}

/**
 * Delete progress for a specific module
 * @param {string} moduleName - The name of the learning module
 * @returns {Promise<Object>} - Success status
 */
export const deleteModuleProgress = async (moduleName) => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      throw new Error('User not authenticated')
    }

    if (!moduleName || typeof moduleName !== 'string') {
      throw new Error('Module name is required')
    }

    const { error } = await supabase
      .from('user_progress')
      .delete()
      .eq('user_id', user.id)
      .eq('module_name', moduleName.trim())

    if (error) {
      console.error('Supabase delete error:', error)
      throw new Error(`Failed to delete progress: ${error.message}`)
    }

    return {
      success: true,
      message: 'Progress deleted successfully'
    }

  } catch (error) {
    console.error('Progress delete error:', error)
    return {
      success: false,
      error: error.message || 'Failed to delete module progress'
    }
  }
}

export default {
  updateModuleProgress,
  getModuleProgress,
  getAllUserProgress,
  deleteModuleProgress
}