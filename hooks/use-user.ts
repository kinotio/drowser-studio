import { useState } from 'react'
import { isEmpty } from 'lodash'

import { supabase } from '@/lib/supabase/client'
import { User, Inboxe } from '@/lib/definitions'

export const useUser = () => {
  const [user, setUser] = useState<User | null>()
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [inboxes, setInboxes] = useState<Inboxe[]>([])

  const getUser = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase.auth.getUser()

      if (!isEmpty(error)) {
        setError(error.message)
        return { error: error.message }
      }

      const query = '*, user_roles (role), inboxes_preferences (preference)'

      const { data: users, error: selectError } = await supabase
        .from('users')
        .select(query)
        .eq('id', data?.user?.id)
        .limit(1)

      if (!isEmpty(selectError)) {
        setError(selectError.message)
        return { error: selectError.message }
      }

      const user = users?.[0]

      setUser(user)

      return user
    } finally {
      setLoading(false)
    }
  }

  const getUserInboxes = async () => {
    try {
      setLoading(true)

      const {
        data: { user }
      } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from('inboxes')
        .select('id, message, created_at')
        .eq('user_id', user?.id)
        .limit(10)

      if (!isEmpty(error)) {
        setError(error.message)
        return { error: error.message }
      }

      setInboxes(data as Inboxe[])
    } finally {
      setLoading(false)
    }
  }

  return { user, loading, inboxes, getUser, getUserInboxes }
}
