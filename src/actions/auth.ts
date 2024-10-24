'use server'

import { signIn as signInLogto, signOut as signOutLogto } from '@logto/next/server-actions'

import { logtoConfig } from '@/config/logto'

export const signIn = async () => {
  await signInLogto(logtoConfig)
}

export const signOut = async () => {
  await signOutLogto(logtoConfig)
}
