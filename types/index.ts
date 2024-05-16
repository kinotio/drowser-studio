export type TFileContent = { drowser: { cases: any[] } }

export type TDrowserReport = {
  drowser: {
    cases: TContentCase[]
  }
}

export type TContentCase = {
  id: string
  time: string
  cases: TContentSubCase[]
}

export type TContentSubCase = {
  id: string
  name: string
  actual: string
  exceptation: string
  status: string
  timestamp: string
}

