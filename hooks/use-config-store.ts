import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Config = {
  provider: string
  model: string
  encrypted_key: string
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
        encrypted_key: ''
      },
      setConfig: ({ provider, model, encrypted_key }: Config) =>
        set({
          config: { provider, model, encrypted_key }
        })
    }),
    {
      name: 'config',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export { useConfigStore }
