import { EMPLOYEE_REPORT_QUERY } from 'web/components/SupportedEmployeesTable/SupportedEmployeesTable'
import { FILTER_OPTIONS_QUERY } from 'web/components/SupportedEmployeesFilter/SupportedEmployeesFilter'

/* Query mocks */
export function getSupportedEmployeesTableMockData() {
  const basicReport = {
    request: {
      query: EMPLOYEE_REPORT_QUERY,
      variables: {
        pageSize: 5,
        sortColumn: 'fullName',
        sortDirection: 'asc',
        filterBy: [],
        searchBy: null
      }
    },
    result: {
      data: {
        paginatedEmployeesReport: {
          __typename: 'PaginatedEmployeesReport',
          employeeReportItems: [
            {
              __typename: 'EmployeeReportItem',
              avatarUrl: '',
              clientName: 'Company 6',
              countryName: 'Norway',
              email: 'email1@company.com',
              employmentType: null,
              fullName: 'First1 Last1',
              id: '7',
              partnerName: 'Partner 8',
              phone: '2225555555',
              regionName: null,
              title: null
            },
            {
              __typename: 'EmployeeReportItem',
              avatarUrl: '',
              clientName: 'Company 7',
              countryName: 'Norway',
              email: 'email10@company.com',
              employmentType: null,
              fullName: 'First10 Last10',
              id: '16',
              partnerName: 'Partner 4',
              phone: '',
              regionName: null,
              title: null
            },
            {
              __typename: 'EmployeeReportItem',
              avatarUrl: '',
              clientName: 'Company 1',
              countryName: 'United Nations',
              email: 'email100@company.com',
              employmentType: null,
              fullName: 'First100 Last100',
              id: '106',
              partnerName: 'Partner 2',
              phone: '',
              regionName: null,
              title: null
            }
          ],
          row_count: 3
        }
      }
    }
  }

  const emptySearchResult = {
    request: {
      query: EMPLOYEE_REPORT_QUERY,
      variables: {
        pageSize: 5,
        sortColumn: 'fullName',
        sortDirection: 'asc',
        filterBy: [],
        searchBy: 'foobar'
      }
    },
    result: {
      data: {
        paginatedEmployeesReport: {
          row_count: 0,
          employeeReportItems: []
        }
      }
    }
  }

  return [basicReport, emptySearchResult]
}

/** Time Reports Mock */
export function getFiltersMockData() {
  const filters = {
    request: {
      query: FILTER_OPTIONS_QUERY
    },
    result: {
      data: {
        countries: [{ name: 'Brazil', id: 1 }],
        clients: [{ name: 'Velocity Global', id: 1 }]
      }
    }
  }
  return [filters]
}
