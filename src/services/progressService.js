import { supabase } from '../config/supabase.js'

export const updateModuleProgress = async (moduleName, isCompleted = false) => {
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
      throw new Error(`Failed to update progress: ${error.message}`)
    }

    return {
      success: true,
      data: data,
      message: isCompleted ? 'Module marked as complete!' : 'Progress updated successfully!'
    }

  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to update module progress',
      data: null
    }
  }
}

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
      throw new Error(`Failed to fetch progress: ${error.message}`)
    }

    return {
      success: true,
      data: data,
      exists: !!data
    }

  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch module progress',
      data: null,
      exists: false
    }
  }
}