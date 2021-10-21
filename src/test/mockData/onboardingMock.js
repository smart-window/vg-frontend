import { ONBOARDING_EMPLOYEE_REPORT_QUERY } from 'web/components/EmployeeOnboardingsTable/EmployeeOnboardingsTable'

/* Query mocks */
export function getOnboardingTableMockData() {
  const basicReport = {
    request: {
      query: ONBOARDING_EMPLOYEE_REPORT_QUERY,
      variables: {
        pageSize: 5,
        sortColumn: 'fullName',
        sortDirection: 'asc',
        filterBy: [],
        searchBy: null,
      },
    },
    result: {
      data: {
        employee_onboardings: {
          __typename: 'PaginatedEmployeeOnboardings',
          employee_onboardings: [
            {
              __typename: 'EmployeeOnboarding',
              anticipatedStartDate: null,
              benefits: false,
              clientName: 'Client 4',
              contractId: '14',
              countryName: 'Japan',
              fullName: 'Alicia Tillman',
              id: '36',
              immigration: true,
              partnerName: 'Partner 7',
              percentComplete: 79.0,
              regionName: 'Asia',
              signatureStatus: 'signed',
            },
            {
              __typename: 'EmployeeOnboarding',
              anticipatedStartDate: null,
              benefits: false,
              clientName: 'Client 1',
              contractId: '134',
              countryName: 'India',
              fullName: 'Althea King',
              id: '43',
              immigration: true,
              partnerName: 'Partner 2',
              percentComplete: 0.0,
              regionName: 'Asia',
              signatureStatus: 'signed',
            },
            {
              __typename: 'EmployeeOnboarding',
              anticipatedStartDate: null,
              benefits: false,
              clientName: 'Client 9',
              contractId: '169',
              countryName: 'Nicaragua',
              fullName: 'Andres Jacobs',
              id: '13',
              immigration: true,
              partnerName: 'Partner 3',
              percentComplete: 100.0,
              regionName: 'Central America',
              signatureStatus: 'signed',
            },
          ],
          row_count: 3,
        },
      },
    },
  }
  const emptySearchResult = {
    request: {
      query: ONBOARDING_EMPLOYEE_REPORT_QUERY,
      variables: {
        pageSize: 5,
        sortColumn: 'fullName',
        sortDirection: 'asc',
        filterBy: [],
        searchBy: 'foobar',
      },
    },
    result: {
      data: {
        employees: {
          row_count: 0,
          employees: [],
        },
      },
    },
  }

  return [basicReport, emptySearchResult]
}

/** Time Reports Mock */
export function getFiltersMockData() {
  const filters = {
    request: {
      query: 'FILTER_OPTIONS_QUERY',
    },
    result: {
      data: {
        countries: [{ name: 'Brazil', id: 1 }],
        clients: [{ name: 'Velocity Global', id: 1 }],
      },
    },
  }
  return [filters]
}
