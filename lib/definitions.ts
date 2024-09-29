export type TFileContent = { drowser: { metrics: any; cases: any[] } }

export type TDriverBrowser = 'chrome' | 'firefox' | 'safari' | 'edge'

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

export type MenuType = {
  label: string
  path: string
  icon: string
}

export type ActivityType = {
  id: number
  type: string
  description: string
  device: 'desktop' | 'mobile'
  timestamp: string
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

export type Report = {
  id: string
  name: string
  slug: string
  metadata: any
  created_at: string
}

export type Setting = {
  id: number
  provider: string
  model: string
  temperature: number
  max_tokens: string
  encrypted_key: string
}
