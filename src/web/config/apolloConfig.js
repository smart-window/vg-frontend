import { InMemoryCache } from '@apollo/client'

/**
 * Defines caching strategy and other config for web GQL requests.
 * This could be combined with the mobile config if we end up wanting to repeat the same logic there.
 *
 * @category Config - Web
 * @module apolloConfig
 */

export const cacheOptions = {
  typePolicies: {
    Query: {
      fields: {
        // time entries report pagination
        timeEntriesReport: {
          keyArgs: ['sortColumn', 'sortDirection', 'searchBy', 'filterBy'],
          merge(existing = { row_count: 0, time_entries: [] }, incoming, {args}) {
            if (!args.lastId) {
              // sorting/filtering changed, restart from page 0
              // TODO: get all previous pages too
              return incoming
            }
            else {
              // NOTE: paging here so do not use row count as it reflects
              // the # of rows including the lastId/lastValue filter
              // whereas the original request reflected the true window size
              return { row_count: existing.row_count, time_entry_report_items: [...existing.time_entry_report_items, ...incoming.time_entry_report_items] }
            }
          }
        },
        paginatedEmployeesReport: {
          keyArgs: ['sortColumn', 'sortDirection', 'searchBy', 'filterBy'],
          merge(existing = { row_count: 0, employeeReportItems: [] }, incoming, {args}) {
            if (!args.lastId) {
              // sorting/filtering changed, restart from page 0
              // TODO: get all previous pages too
              return incoming
            }
            else {
              // NOTE: paging here so do not use row count as it reflects
              // the # of rows including the lastId/lastValue filter
              // whereas the original request reflected the true window size
              return { ...existing, employeeReportItems: [...existing.employeeReportItems, ...incoming.employeeReportItems] }
            }
          }
        },
        employeeTrainingsReport: {
          keyArgs: ['sortColumn', 'sortDirection', 'searchBy', 'filterBy'],
          merge(existing = { row_count: 0, time_entries: [] }, incoming, {args}) {
            if (!args.lastId) {
              // sorting/filtering changed, restart from page 0
              // TODO: get all previous pages too
              return incoming
            }
            else {
              // NOTE: paging here so do not use row count as it reflects
              // the # of rows including the lastId/lastValue filter
              // whereas the original request reflected the true window size
              return { row_count: existing.row_count, employee_training_report_items: [...existing.employee_training_report_items, ...incoming.employee_training_report_items] }
            }
          }
        }
      }
    },
    ClientOnboarding: {
      keyFields: ['contractId', 'partnerId']
    }
  }
}
const inMemoryCache = new InMemoryCache(cacheOptions)

export default {
  inMemoryCache
}
