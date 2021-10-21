import { gql } from '@apollo/client'

/**
 * This file consists of all fragments created on the Employment typename.
 * @category Apollo - Web
 */

/**
 * These are the fields needed for updating employment uploads and metadata.
 */
export const employmentFragment = gql`
 fragment EmploymentFields on Employment {
  id
  effectiveDate
  type
  partner {
    id
  }
  employee {
    id
  }
  job {
    probationaryPeriodLength
    probationaryPeriodTerm
    id
  }
  contract {
    id
    uuid
    payroll_13th_month
    payroll_14th_month
    client {
      name
    }
  }
  country {
    id
  }
 }
`
