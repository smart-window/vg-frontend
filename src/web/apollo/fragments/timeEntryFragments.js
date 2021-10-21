import { gql } from '@apollo/client'

/**
 * This file consists of all fragments created on the TimeEntry typename.
 * @category Apollo - Web
 */

/**
 * These are the fields used for the list of time entries in the
 * Time Entry Report.
 */
export const timeEntriesPageFragment = gql`
  fragment TimeEntriesPageTimeEntry on TimeEntryReportItem {
    id
    description
    eventDate
    totalHours
    timeTypeSlug
    userClientName
    userFullName
    userLastName
    userWorkAddressCountryName
  }
`
