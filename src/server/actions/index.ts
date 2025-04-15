// User actions
import { updateUser, getUserById, createUser, deleteUser } from '@/server/actions/user'

// Log actions
import { createLog } from '@/server/actions/log/create'
import {
  getLogById,
  getLogsByUserId,
  getAllLogs,
  getLastThreeLogs,
  countLogs
} from '@/server/actions/log/get'

// Metric actions
import { getCurrentYearMetrics, getMetric } from '@/server/actions/metric/get'
import { createMetric } from '@/server/actions/metric/create'
import { updateMetric } from '@/server/actions/metric/update'

// Report actions
import {
  getAllReport,
  getLastThreeReport,
  countReports,
  getReport
} from '@/server/actions/report/get'
import { createReport } from '@/server/actions/report/create'
import { deleteReport } from '@/server/actions/report/delete'

export {
  // User
  updateUser,
  getUserById,
  createUser,
  deleteUser,

  // Log
  createLog,
  getLogById,
  getLogsByUserId,
  getAllLogs,
  getLastThreeLogs,
  countLogs,

  // Metric
  getCurrentYearMetrics,
  getMetric,
  createMetric,
  updateMetric,

  // Report
  getAllReport,
  getLastThreeReport,
  createReport,
  countReports,
  getReport,
  deleteReport
}
