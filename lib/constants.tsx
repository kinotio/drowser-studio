import { ClipboardIcon } from 'lucide-react'
import pkg from '../package.json'

export const APP_VERSION = `v${pkg.version}`

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
