import { create } from 'zustand'

type State = {
  content: string
  setReport: (content: string) => void
}

const useReportStore = create<State>((set) => ({
  content: '',
  setReport: (content: string) => set(() => ({ content: content })),
}))

export default useReportStore
