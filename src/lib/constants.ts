import pkg from '../../package.json'

export const APP_VERSION = `v${pkg.version}`

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

export const PATH = {
  HOME: '/',
  STUDIO_REPORTS: '/studio/reports',
  STUDIO_REPORT: '/studio/reports/:reportId',
  STUDIO_REPORT_CASES: '/studio/reports/:reportId/cases',
  STUDIO_REPORT_CASE: '/studio/reports/:reportId/cases/:caseId',
  STUDIO_REPORT_VISUALIZE: '/studio/reports/:reportId/visualize',
  STUDIO_REPORT_PLAYGROUND: '/studio/reports/:reportId/playground',
  STUDIO_REPORT_AI: '/studio/reports/:reportId/ai',
  STUDIO_ACTIVITIES: '/studio/activities',
  STUDIO_SETTINGS: '/studio/settings'
}
