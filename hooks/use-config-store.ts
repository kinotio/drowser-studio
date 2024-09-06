import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Config = {
  provider: string
  model: string
  encrypted_key: string
  temperature: number
  maxTokens: number
}

type State = {
  config: Config
  setConfig: (config: Config) => void
}

const useConfigStore = create(
  persist<State>(
    (set, get) => ({
      config: {
        provider: '',
        model: '',
        encrypted_key: '',
        temperature: 0,
        maxTokens: 0
      },
      setConfig: ({ provider, model, encrypted_key, temperature, maxTokens }: Config) =>
        set({
          config: { provider, model, encrypted_key, temperature, maxTokens }
        })
    }),
    {
      name: 'config',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export { useConfigStore }
