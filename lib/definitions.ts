export type TFileContent = { drowser: { metrics: any; cases: any[] } }

export type TDriverBrowser = 'chrome' | 'firefox' | 'safari' | 'edge'

export type TDrowserReport = {
  drowser: {
    metrics: Record<string, any>
    cases: TContentCase[]
  }
}

export type TContentCase = {
  id: string
  time: string
  avg_duration: number
  coverage: number
  flaky: number
  month_of_test: string
  browser: TDriverBrowser
  cases: TContentSubCase[]
}

export type TContentSubCase = {
  id: string
  name: string
  actual: string
  exceptation: string
  status: string
  timestamp: string
  duration: number
  month_of_test: string
  type: string
  browser: TDriverBrowser
}

export type DataPoint = {
  x: string
  y: number
}

export type DataSet = {
  id: string
  data: DataPoint[]
}

export type MonthCount = {
  name: string
  count: number
}

export type MonthValue = {
  id: string
  value: number
}
