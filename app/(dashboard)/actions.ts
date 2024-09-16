'use server'

import { User } from '@supabase/supabase-js'

import { supabase } from '@/lib/supabase/server'
import { ActivitiesType } from '@/lib/definitions'

export const saveActivity = async ({
  user,
  type,
  description
}: {
  user?: User | null
  type: ActivitiesType
  description: string
}) => {
  const {
    data: { user: userFromSession }
  } = await supabase.auth.getUser()

  const { device } = await (await fetch(`${process.env.APP_URL}/api/device`)).json()

  const { data, error } = await supabase.from('activities').insert({
    type,
    description,
    device,
    user_id: user?.id ?? userFromSession?.id
  })

  if (error) {
    return { error: `An error occurred while saving activity: ${error.message}` }
  }

  return data
}
