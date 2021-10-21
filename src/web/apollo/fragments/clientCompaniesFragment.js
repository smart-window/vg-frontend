import { gql } from '@apollo/client';

export const clientReportFragment = gql`
fragment ClientCompaniesFragment on PaginatedClientsReport {
  row_count
  client_report_items {
    id
    clientName
    regionName
    totalEmployees
    activeEmployees
    operatingCountries { 
      id
      country {
        id
        name
      }
    }
  }
}
`