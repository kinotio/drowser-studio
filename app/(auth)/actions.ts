'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { supabase } from '@/lib/supabase/server'

import { LoginFormData, RegisterFormData } from '@/app/(auth)/auth/page'

import { saveActivity } from '@/app/(dashboard)/actions'

export const login = async (form: LoginFormData) => {
  const {
    data: { user },
    error
  } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password
  })

  if (error) {
    return { error: `An error occurred while signin: ${error.message}` }
  }

  await saveActivity({
    user,
    type: 'login',
    description: 'Account logged in'
  })

  redirect('/dashboard/reports')
}

export const register = async (form: RegisterFormData) => {
  const { data } = await supabase.from('users').select('*').eq('username', form.username)

  if (Array.isArray(data) && data.length > 0) {
    return { error: 'An error occurred while signup, username already taken' }
  }

  const {
    data: { user },
    error
  } = await supabase.auth.signUp({
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

  await saveActivity({
    user,
    type: 'account_created',
    description: 'User account created'
  })

  redirect('/auth')
}

export const logout = async () => {
  await saveActivity({
    type: 'logout',
    description: 'Account logged out'
  })

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: `An error occurred while logout: ${error?.message}` }
  }

  cookies()
    .getAll()
    .map((cookie) => cookies().delete(cookie.name))

  redirect('/')
}
