import { useState } from 'react'

import { supabase } from '@/lib/supabase/client'

type User = {
  id: string
  email: string
  name: string
  username: string
  created_at: string
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>()
  const [error, setError] = useState<string>()

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      setError(error.message)
      return { error: error.message }
    }

    const query = '*, user_roles (role), inboxes_preferences (preference)'

    const { data: users, error: selectError } = await supabase
      .from('users')
      .select(query)
      .eq('id', data.user.id)
      .limit(1)

    if (selectError) {
      setError(selectError.message)
      return { error: selectError.message }
    }

    const user = users[0]

    setUser(user)
  }

  return { user, getUser }
}
