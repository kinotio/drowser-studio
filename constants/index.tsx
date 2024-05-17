import { ClipboardIcon } from 'lucide-react'

export const APP_VERSION = 'v0.1.0'

export const DASHBOARD_MENU = [
  {
    label: 'Tests',
    url: '/tests',
    icon: ClipboardIcon
  }
]

export const caseStatus: Record<string, string> = {
  passed: 'passed',
  failed: 'failed'
}
