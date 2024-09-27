'use server'

import { User } from '@supabase/supabase-js'
import { uniqueNamesGenerator, colors, animals, adjectives } from 'unique-names-generator'
import { isEmpty } from 'lodash'

import { supabase } from '@/lib/supabase/server'
import { ActivitiesType, TFileContent } from '@/lib/definitions'

type Config = {
  provider: string
  model: string
  encrypted_key: string
  temperature: number
  maxTokens: string
}

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

export const getSettings = async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('ai_configurations')
    .select('*')
    .eq('user_id', user?.id)

  if (!isEmpty(error)) {
    return {
      error: `An error occurred while getting ai configuration: ${error.message}`
    }
  }

  return data
}

export const saveSettings = async (config: Config) => {
  const {
    data: { user }
  } = await supabase.auth.getUser()

  const { provider, model, encrypted_key, temperature, maxTokens } = config

  const { data, error } = await supabase.from('ai_configurations').insert({
    provider,
    model,
    temperature,
    encrypted_key,
    max_tokens: maxTokens,
    user_id: user?.id
  })

  if (!isEmpty(error)) {
    return {
      error: `An error occurred while saving ai configuration: ${error.message}`
    }
  }

  return data
}

export const removeSettings = async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser()

  const { error } = await supabase.from('ai_configurations').delete().eq('user_id', user?.id)

  if (!isEmpty(error)) {
    return {
      error: `An error occurred while deleting ai configuration: ${error.message}`
    }
  }

  return { success: true }
}
