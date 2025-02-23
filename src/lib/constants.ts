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

export const LOG_TYPES = BASE_EVENT_TYPES

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

export const analyzeTemplates = [
  {
    id: 'quick-analysis',
    icon: 'Brain',
    title: 'Quick Analysis',
    description: 'Instant test report overview',
    prompts: [
      'Summarize the key findings from this test report',
      'What are the main issues identified?',
      'Show the success rate of all test cases'
    ]
  },
  {
    id: 'performance',
    icon: 'ChartBar',
    title: 'Performance Analysis',
    description: 'Deep dive into test metrics',
    prompts: [
      'Analyze test execution times and identify bottlenecks',
      'Compare performance across different test suites',
      'Show trends in test duration over time'
    ]
  },
  {
    id: 'failures',
    icon: 'CircleAlert',
    title: 'Failure Analysis',
    description: 'Investigate test failures',
    prompts: [
      'List all failed tests with their error messages',
      'Identify common patterns in test failures',
      'Suggest potential fixes for failed tests'
    ]
  },
  {
    id: 'improvements',
    icon: 'TrendingUp',
    title: 'Recommendations',
    description: 'Get actionable insights',
    prompts: [
      'Suggest improvements for test coverage',
      'Identify flaky tests and propose solutions',
      'Recommend test optimization strategies'
    ]
  }
]
