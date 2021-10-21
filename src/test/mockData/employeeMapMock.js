import { EMPLOYEE_REPORT_QUERY } from 'web/components/EmployeeMap/EmployeeMap'

/* Query mocks */
export function getEmployeeMapMockData() {
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
        employees: {
          __typename: 'PaginatedEmployees',
          employees: [
            {
              __typename: 'Employee',
              id: '136',
              fullName: 'Abbey Mosciski',
              partnerName: 'Partner 1',
              clientName: 'Client 7',
              regionName: 'Africa',
              countryShortName: 'MYT',
              employmentType: null,
              status: 'onboarding',
              country: {
                __typename: 'Country',
                id: '140',
                name: 'Mayotte',
                latitude: -12.8333,
                longitude: 45.1667,
                region: {
                  __typename: 'Region',
                  id: '3',
                  name: 'Africa',
                  latitude: -20,
                  longitude: 30
                }
              },
              avatarUrl: '',
              countryName: 'Mayotte',
              email: 'email136@company.com',
              phone: '',
              title: null
            },
            {
              __typename: 'Employee',
              id: '2',
              fullName: 'Adelle Koepp',
              partnerName: 'Partner 9',
              clientName: 'Client 3',
              regionName: 'Europe',
              countryShortName: 'ALB',
              employmentType: null,
              status: 'active',
              country: {
                __typename: 'Country',
                id: '2',
                name: 'Albania',
                latitude: 41,
                longitude: 20,
                region: {
                  __typename: 'Region',
                  id: '2',
                  name: 'Europe',
                  latitude: 54,
                  longitude: -2
                }
              },
              avatarUrl: '',
              countryName: 'Albania',
              email: 'email2@company.com',
              phone: '',
              title: null
            },
            {
              __typename: 'Employee',
              id: '5',
              fullName: 'Adrien Doyle',
              partnerName: 'Partner 8',
              clientName: 'Client 4',
              regionName: 'Oceania',
              countryShortName: 'NCL',
              employmentType: null,
              status: 'offboarding',
              country: {
                __typename: 'Country',
                id: '156',
                name: 'New Caledonia',
                latitude: -21.5,
                longitude: 165.5,
                region: {
                  __typename: 'Region',
                  id: '4',
                  name: 'Oceania',
                  latitude: -27,
                  longitude: 133
                }
              },
              avatarUrl: '',
              countryName: 'New Caledonia',
              email: 'email5@company.com',
              phone: '',
              title: null
            }
          ],
          row_count: 3
        }
      }
    }
  }

  return [basicReport]
}
