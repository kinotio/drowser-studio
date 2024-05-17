import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export function hasReport(report: string, router: AppRouterInstance) {
  if (report === '') {
    router.push('/')
    return
  }
}