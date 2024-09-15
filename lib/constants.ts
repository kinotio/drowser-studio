import pkg from '../package.json'

export const APP_VERSION = `v${pkg.version}`

export const CASE_STATUS: Record<string, string> = {
  passed: 'passed',
  failed: 'failed'
}

export const PATH = {
  HOME: '/',

  AUTH: '/auth',

  DASHBOARD_REPORTS: '/dashboard/reports',

  DASHBOARD_REPORT: '/dashboard/reports/:reportId',
  DASHBOARD_REPORT_CASES: '/dashboard/reports/:reportId/cases',
  DASHBOARD_REPORT_CASE: '/dashboard/reports/:reportId/cases/:caseId',
  DASHBOARD_REPORT_VISUALIZE: '/dashboard/reports/:reportId/visualize',
  DASHBOARD_REPORT_PLAYGROUND: '/dashboard/reports/:reportId/playground',
  DASHBOARD_REPORT_AI: '/dashboard/reports/:reportId/ai',

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
