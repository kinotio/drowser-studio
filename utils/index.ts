import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export function hasReport(report: string, router: AppRouterInstance) {
  if (report === '') {
    router.push('/')
    return
  }
}

export function humanizeDuration(durationMs: number): string {
  const secondsTotal = Math.round(durationMs / 1000)
  const seconds = secondsTotal % 60
  const minutesTotal = Math.floor(secondsTotal / 60)
  const minutes = minutesTotal % 60
  const hoursTotal = Math.floor(minutesTotal / 60)
  const hours = hoursTotal % 24
  const days = Math.floor(hoursTotal / 24)

  let humanized = ''
  if (days > 0) humanized += `${days}d `
  if (hours > 0) humanized += `${hours}h `
  if (minutes > 0) humanized += `${minutes}m `
  if (seconds > 0 || (days === 0 && hours === 0 && minutes === 0)) {
    humanized += `${seconds}s`
  }

  return humanized.trim()
}

export function readableTimestamp(timestamp: string): string {
  const date = new Date(timestamp)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Adding 1 because getMonth returns zero-based month index
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  const readableTimestamp = `${year}-${month}-${day} - ${hours}:${minutes}:${seconds}`

  return readableTimestamp
}
