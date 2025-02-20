'use server'

import { drizzle, eq, desc, and, sql, count } from '@/server/drizzle'

import { reports } from '@/server/db/schema'
import { ReportInferType } from '@/server/types'

export const getAllReport = async (payload: {
  userId: string
  searchTerm: string
  currentPage: number
  itemsPerPage: number
}) => {
  return drizzle
    .select()
    .from(reports)
    .where(and(eq(reports.user_id, payload.userId), sql`name LIKE ${`%${payload.searchTerm}%`}`))
    .orderBy(desc(reports.created))
    .limit(payload.itemsPerPage)
    .offset((payload.currentPage - 1) * payload.itemsPerPage)
}

export const getLastThreeReport = async (payload: { userId: string }) => {
  return drizzle
    .select()
    .from(reports)
    .where(eq(reports.user_id, payload.userId))
    .orderBy(desc(reports.created))
    .limit(3)
    .offset(0)
}

export const saveReport = async (payload: ReportInferType) => {
  return drizzle
    .insert(reports)
    .values({
      user_id: payload.userId,
      name: payload.name,
      slug: payload.slug,
      metadata: payload.metadata
    })
    .returning()
}

export const countReports = async (payload: { userId: string }) => {
  return drizzle
    .select({ count: count(reports.id) })
    .from(reports)
    .where(eq(reports.user_id, payload.userId))
}

export const getReport = async (payload: { userId: string; reportSlug: string }) => {
  return drizzle
    .select()
    .from(reports)
    .where(and(eq(reports.user_id, payload.userId), eq(reports.slug, payload.reportSlug)))
    .limit(1)
}

export const deleteReport = async (payload: { reportId: string }) => {
  return drizzle.delete(reports).where(eq(reports.id, payload.reportId)).returning()
}
