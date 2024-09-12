'use server'

import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase/server'

import { LoginFormData, RegisterFormData } from '@/app/(auth)/auth/page'
import { revalidatePath } from 'next/cache'

export const login = async (form: LoginFormData) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password
  })

  if (error) {
    return { error: `An error occurred while signin: ${error.message}` }
  }

  redirect('/')
}

export const register = async (form: RegisterFormData) => {
  const { data } = await supabase.from('users').select('*').eq('username', form.username)

  if (Array.isArray(data) && data.length > 0) {
    return { error: 'An error occurred while signup, username already taken' }
  }

  const { error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      data: {
        name: form.name,
        username: form.username
      }
    }
  })

  if (error) {
    return { error: `An error occurred while signup: ${error.message}` }
  }

  redirect('/auth')
}
