const BASE_EVENT_TYPES = [
  'unknown',
  'login',
  'account_created',
  'password_change',
  'report_imported',
  'report_deleted',
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
  STUDIO_REPORT_AI: '/studio/reports/:reportId/ai',
  STUDIO_ACTIVITIES: '/studio/activities',
  STUDIO_SETTINGS: '/studio/settings'
}

export const CASE_STATUS: Record<string, string> = {
  passed: 'passed',
  failed: 'failed'
}
export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export const FREE_MAX_REPORT_COUNT = 5

export const deviceIcons = {
  desktop: 'Laptop',
  mobile: 'Smartphone',
  unknown: 'CircleAlert'
}
