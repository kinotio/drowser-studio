/* eslint-disable @typescript-eslint/no-explicit-any */
export type BrowserKey = 'chrome' | 'firefox' | 'safari' | 'edge'

export type TFileContent = { drowser: { metrics: any; cases: any[] } }

export type TDrowserReport = {
  drowser: {
    metrics: Record<string, any>
    cases: TContentCase[]
    metadata: { [key: string]: any }
  }
}

export type TContentCase = {
  id: string
  time: string
  avg_duration: number
  coverage: number
  flaky: number
  month_of_test: string
  browser: BrowserKey
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
  browser: BrowserKey
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

export type MenuType = {
  label: string
  path: string
  icon: string
}

type BaseEventType =
  | 'unknown'
  | 'login'
  | 'account_created'
  | 'password_change'
  | 'report_added'
  | 'inboxes_preferences_change'
  | 'profile_information_change'
  | 'logout'

export type ActivitiesType = BaseEventType
export type EventType = BaseEventType

export type Event = {
  type: EventType
  message: string
}

export type UserRole = {
  role: string
}

export type UserInboxesPreferences = {
  preference: string
}

export type User = {
  id: string
  email: string
  name: string
  username: string
  created_at: string
  user_roles: UserRole[]
  inboxes_preferences: UserInboxesPreferences[]
}

export type Inboxe = {
  id: number
  message: string
  created_at: string
}

export type Settings = {
  provider: string
  model: string
  temperature: number
  max_tokens: string
  encrypted_key: string
}

export type Report = {
  collectionId: string
  collectionName: string
  created: string
  id: string
  metadata: ReportMetadata
  name: string
  slug: string
  updated: string
  user_id: string
}

type ReportMetadata = {
  drowser?: {
    cases: TContentCase[]
    metrics: Metric
  }
}

export type Activity = {
  collectionId: string
  collectionName: string
  created: string
  description: string
  device: string
  id: string
  type: string
  updated: string
  user_id: string
}

export type Plan = {
  collectionId: string
  collectionName: string
  created: string
  description: string
  duration: string
  id: string
  metadata: { features: string[] }
  name: string
  price: number
  type: string
  updated: string
  price_id: string
}

export type Metric = {
  avg_test_duration: number
  failed_tests: number
  flaky_tests: number
  graphs: {
    avg_test_duration: Array<{
      count: number
      name: string
    }>
    failed_tests: Array<{
      count: number
      name: string
    }>
    flaky_tests: Array<{
      id: string
      value: number
    }>
    passing_tests: Array<{
      count: number
      name: string
    }>
    test_coverage: Array<{
      count: number
      name: string
    }>
    total_tests: Array<{
      data: Array<any>
      id: string
    }>
  }
  passing_tests: number
  test_coverage: number
  total_tests: number
}

export type Subscription = {
  plan_id: string
  user_id: string
}

export type MonthlyMetric = {
  id: string
  user_id: string
  month: number
  year: number
  total: number
  created?: string
  updated?: string
}

export type ChartDataItem = {
  name: string
  total: number
}
