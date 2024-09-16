'use server'

import { User } from '@supabase/supabase-js'
import { uniqueNamesGenerator, colors, animals, adjectives } from 'unique-names-generator'

import { supabase } from '@/lib/supabase/server'
import { ActivitiesType, TFileContent } from '@/lib/definitions'

export const saveReport = async ({ metadata }: { metadata: TFileContent }) => {
  const {
    data: { user }
  } = await supabase.auth.getUser()

  const slug = uniqueNamesGenerator({ dictionaries: [colors, animals, adjectives], separator: '-' })
  const name = slug.split('-').join(' ')

  const { data, error } = await supabase.from('reports').insert({
    name,
    slug,
    metadata,
    user_id: user?.id
  })

  if (error) {
    return { error: `An error occurred while saving report: ${error.message}` }
  }

  return data
}

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
