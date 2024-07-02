import pkg from '../package.json'

export const APP_VERSION = `v${pkg.version}`

export const CASE_STATUS: Record<string, string> = {
  passed: 'passed',
  failed: 'failed'
}

export const PATH = {
  DASHBOARD: '/dashboard',
  DASHBOARD_CASES: '/dashboard/cases',
  DASHBOARD_CASE: '/dashboard/cases/:id'
}
