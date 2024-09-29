import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'

import { supabase } from '@/lib/supabase/client'
import { Setting } from '@/lib/definitions'

export const useSettings = () => {
  const [settings, setSettings] = useState<Setting | null>()
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)

      try {
        const {
          data: { user }
        } = await supabase.auth.getUser()

        const { data, error } = await supabase
          .from('ai_configurations')
          .select('id, provider, model, temperature, max_tokens, encrypted_key')
          .eq('user_id', user?.id)
          .limit(1)

        if (!isEmpty(error)) {
          const msg = `An error occurred while getting ai configuration: ${error.message}`
          setError(msg)
          return { error: msg }
        }

        const setting = data?.[0]

        setSettings(setting)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  return { settings, loading, error }
}
