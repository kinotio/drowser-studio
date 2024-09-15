import pkg from '../package.json'

export const APP_VERSION = `v${pkg.version}`

export const CASE_STATUS: Record<string, string> = {
  passed: 'passed',
  failed: 'failed'
}

export const PATH = {
  HOME: '/',

  AUTH: '/auth',

  DASHBOARD: '/dashboard',
  DASHBOARD_CASES: '/dashboard/cases',
  DASHBOARD_CASE: '/dashboard/cases/:id',
  DASHBOARD_ACTIVITIES: '/dashboard/activities',
  DASHBOARD_SETTINGS: '/dashboard/settings'
}

const BASE_EVENT_TYPES = [
  'unknown',
  'login',
  'account_created',
  'password_change',
  'report_added',
  'inboxes_preferences_change',
  'profile_information_change',
  'logout'
] as string[]

export const ACTIVITIES_TYPES = BASE_EVENT_TYPES

export const EVENT_TYPES: { [key: string]: string } = {
  unknown: 'unknown',
  login: 'login',
  accountCreated: 'account_created',
  passwordChange: 'password_change',
  reportAdded: 'report_added',
  inboxesPreferencesChange: 'inboxes_preferences_change',
  profileInformationChange: 'profile_information_change',
  logout: 'logout'
}

export const USER_INBOXES_PREFERENCES = {
  everything: 'everything',
  ignoring: 'ignoring'
}
