import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
  content: string
  setReport: (content: string) => void
}

export const useReportStore = create(
  persist<State>(
    (set, get) => ({
      content: '',
      setReport: (content: string) => set({ content: content })
    }),
    {
      name: 'report-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default useReportStore
