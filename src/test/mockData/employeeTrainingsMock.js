import {TRAINING_REPORT_QUERY} from 'web/components/EmployeeTrainingReport/EmployeeTrainingReport'

/* Query mocks */
export function getEmployeeTrainingReportMockData() {

  const basicReport = {
    request: {
      query: TRAINING_REPORT_QUERY,
      variables: {
        pageSize: 5,
        sortColumn: 'dueDate',
        sortDirection: 'desc',
        filterBy: [],
        searchBy: null
      }
    },
    result: {
      data: {
        employeeTrainingsReport: {
          row_count: 3,
          employee_training_report_items: [
            {
              __typename: 'EmployeeTraining',
              id: '20',
              dueDate: '2021-12-25',
              status: 'in_progress',
              completedDate: null,
              trainingName: 'Training One',
              userFullName: 'Test User',
              userLastName: 'User',
              userClientName: 'Test Company',
              userOktaUserUid: 'asdfss8df7sad',
              userWorkAddressCountryName: 'United States'
            },
            {
              __typename: 'EmployeeTraining',
              id: '21',
              dueDate: '2021-12-26',
              status: 'in_progress',
              completedDate: null,
              trainingName: 'Training Two',
              userFullName: 'Test User',
              userLastName: 'User',
              userClientName: 'Test Company',
              userOktaUserUid: 'asdfss8df7sad',
              userWorkAddressCountryName: 'United States'
            },
            {
              __typename: 'EmployeeTraining',
              id: '22',
              dueDate: '2021-12-27',
              status: 'in_progress',
              completedDate: null,
              trainingName: 'Training Three',
              userFullName: 'Test User',
              userLastName: 'User',
              userClientName: 'Test Company',
              userOktaUserUid: 'asdfss8df7sad',
              userWorkAddressCountryName: 'United States'
            }
          ]
        }
      }
    }
  }

  const emptySearchResult = {
    request: {
      query: TRAINING_REPORT_QUERY,
      variables: {
        pageSize: 5,
        sortColumn: 'dueDate',
        sortDirection: 'desc',
        filterBy: [],
        searchBy: 'foobar'
      }
    },
    result: {
      data: {
        employeeTrainingsReport: {
          row_count: 0,
          employee_training_report_items: []
        }
      }
    }
  }

  return [basicReport, emptySearchResult]
}
