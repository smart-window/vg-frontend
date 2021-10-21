import {CALENDAR_DATA_QUERY, DELETE_TIME_ENTRY_MUTATION} from 'mobile/screens/TimeTracking/TimeTracking'
import {TIME_CHART_DATA_QUERY} from 'mobile/screens/Dashboard/Dashboard'
import {TIME_ENTRIES_PAGED_QUERY} from 'web/components/TimeTrackingReport/TimeTrackingReport'
import {FILTER_OPTIONS_QUERY} from 'web/components/TimeTrackingFilter/TimeTrackingFilter'
import dateHelper from 'shared/services/dateHelper'

/* Query mocks */
export function getTimeEntriesMockData() {

  const today = new Date()
  const currentMonthStartDayString = dateHelper.getMonthStartDay(today, true)
  const firstOfCurrentMonth = currentMonthStartDayString.substr(0, 8) + '01'

  const timeEntryRead = {
    request: {
      query: CALENDAR_DATA_QUERY,
      variables: {
        startDate: currentMonthStartDayString,
        endDate: dateHelper.getMonthEndDay(today)
      }
    },
    result: {
      data: {
        timeEntries: [
          {
            '__typename': 'TimeEntry',
            'description': null,
            'eventDate': '2020-11-23',
            'id': 2,
            'timePolicyId': 1,
            'timeType': {
              '__typename': 'TimeType',
              'id': 2,
              'slug': 'break time',
            },
            'timeTypeId': 2,
            'totalHours': 1,
            'userId': 5,
          },
          {
            '__typename': 'TimeEntry',
            'description': null,
            'eventDate': '2020-11-24',
            'id': 6,
            'timePolicyId': 1,
            'timeType': {
              '__typename': 'TimeType',
              'id': 1,
              'slug': 'work time',
            },
            'timeTypeId': 1,
            'totalHours': 8,
            'userId': 5,
          },
          {
            '__typename': 'TimeEntry',
            'description': null,
            'eventDate': firstOfCurrentMonth,
            'id': 99,
            'timePolicyId': 1,
            'timeType': {
              '__typename': 'TimeType',
              'id': 1,
              'slug': 'work time',
            },
            'timeTypeId': 1,
            'totalHours': 8,
            'userId': 5,
          },
        ],
        timeTypes: [
          {
            '_typename': 'TimeType',
            slug: 'work time',
            id: 1
          },
          {
            '_typename': 'TimeType',
            slug: 'break time',
            id: 2
          },
          {
            '_typename': 'TimeType',
            slug: 'planned absence',
            id: 3
          }
        ]
      },
    },
  }

  const timeEntryDelete = {
    request: {
      query: DELETE_TIME_ENTRY_MUTATION,
      variables: {
        id: 99 // 3rd entry above
      }
    },
    result: {
      data: {
        __typename: 'Mutation',
        // Mock here the expected result of your query.
        deleteTimeEntry: {id: '99'}
      }
    }
  }

  return [timeEntryRead, timeEntryDelete]
}

export const erredTimeEntriesMockData = {
  request: {
    query: CALENDAR_DATA_QUERY,
  },
  error: new Error('Server not found')
}

export function getTimeEntriesChartMockData() {
  const today = new Date()
  const eightDaysAgo = dateHelper.substractDaysFromDate(new Date(), 7)

  const timeEntryRead = {
    request: {
      query: TIME_CHART_DATA_QUERY,
      variables: {
        startDate: dateHelper.getStringDate(eightDaysAgo),
        endDate: dateHelper.getStringDate(today)
      }
    },
    result: {
      data: {
        timeEntries: [
          {
            '__typename': 'TimeEntry',
            'description': null,
            'eventDate': '2020-11-23',
            'id': 2,
            'timePolicyId': 1,
            'timeType': {
              '__typename': 'TimeType',
              'id': 2,
              'slug': 'break time',
            },
            'timeTypeId': 2,
            'totalHours': 1,
            'userId': 5,
          },
          {
            '__typename': 'TimeEntry',
            'description': null,
            'eventDate': '2020-11-24',
            'id': 6,
            'timePolicyId': 1,
            'timeType': {
              '__typename': 'TimeType',
              'id': 1,
              'slug': 'work time',
            },
            'timeTypeId': 1,
            'totalHours': 8,
            'userId': 5,
          },
          {
            '__typename': 'TimeEntry',
            'description': null,
            'eventDate': '2020-11-25',
            'id': 99,
            'timePolicyId': 1,
            'timeType': {
              '__typename': 'TimeType',
              'id': 1,
              'slug': 'work time',
            },
            'timeTypeId': 1,
            'totalHours': 8,
            'userId': 5,
          },
        ],
        timeTypes: [
          {
            '_typename': 'TimeType',
            slug: 'work time',
            id: 1
          },
          {
            '_typename': 'TimeType',
            slug: 'break time',
            id: 2
          },
          {
            '_typename': 'TimeType',
            slug: 'planned absence',
            id: 3
          }
        ]
      },
    },
  }

  const timeEntryReadNoData = {
    request: {
      query: TIME_CHART_DATA_QUERY,
      variables: {
        startDate: dateHelper.getStringDate(eightDaysAgo),
        endDate: dateHelper.getStringDate(today)
      }
    },
    result: {
      data: {
        timeEntries: [],
        timeTypes: [
          {
            '_typename': 'TimeType',
            slug: 'work time',
            id: 1
          },
          {
            '_typename': 'TimeType',
            slug: 'break time',
            id: 2
          },
          {
            '_typename': 'TimeType',
            slug: 'planned absence',
            id: 3
          }
        ]
      },
    },
  }

  const timeEntryDelete = {
    request: {
      query: DELETE_TIME_ENTRY_MUTATION,
      variables: {
        id: 99 // 3rd entry above
      }
    },
    result: {
      data: {
        __typename: 'Mutation',
        // Mock here the expected result of your query.
        timeEntries: []
      }
    }
  }

  return [timeEntryRead, timeEntryReadNoData, timeEntryDelete]
}

/** Time Reports Mock */
export function getTimeTypesMockData() {
  const timeEntryRead = {
    request: {
      query: FILTER_OPTIONS_QUERY,
    },
    result: {
      data: {
        timeTypes: [
          {
            '_typename': 'TimeType',
            slug: 'work time',
            id: 1
          },
          {
            '_typename': 'TimeType',
            slug: 'break time',
            id: 2
          },
          {
            '_typename': 'TimeType',
            slug: 'planned absence',
            id: 3
          }
        ],
        countries: [
          {name: 'Brazil', id: 1}
        ],
        clients: [
          {name: 'Velocity Global', id: 1}
        ]
      },
    },
  }
  return [timeEntryRead]
}

export function getTimeEntriesReportMockData() {

  const basicReport = {
    request: {
      query: TIME_ENTRIES_PAGED_QUERY,
      variables: {
        pageSize: 5,
        sortColumn: 'eventDate',
        sortDirection: 'desc',
        filterBy: [],
        searchBy: null
      }
    },
    result: {
      data: {
        timeEntriesReport: {
          row_count: 3,
          time_entry_report_items: [
            {
              __typename: 'TimeEntryReportItem',
              id: '20',
              description: null,
              eventDate: '2020-10-23',
              totalHours: 1,
              timeTypeSlug: 'planned absence',
              userClientName: 'Test Company',
              userFullName: 'Test User',
              userLastName: 'User',
              userWorkAddressCountryName: null
            },
            {
              __typename: 'TimeEntryReportItem',
              id: '21',
              description: null,
              eventDate: '2020-10-24',
              totalHours: 1,
              timeTypeSlug: 'planned absence',
              userClientName: 'Test Company',
              userFullName: 'Test User',
              userLastName: 'User',
              userWorkAddressCountryName: null
            },
            {
              __typename: 'TimeEntryReportItem',
              id: '22',
              description: null,
              eventDate: '2020-10-25',
              totalHours: 1,
              timeTypeSlug: 'planned absence',
              userClientName: 'Test Company',
              userFullName: 'Test User',
              userLastName: 'User',
              userWorkAddressCountryName: null
            }
          ]
        }
      }
    }
  }

  const emptySearchResult = {
    request: {
      query: TIME_ENTRIES_PAGED_QUERY,
      variables: {
        pageSize: 5,
        sortColumn: 'eventDate',
        sortDirection: 'desc',
        filterBy: [],
        searchBy: 'foobar'
      }
    },
    result: {
      data: {
        timeEntriesReport: {
          row_count: 0,
          time_entry_report_items: []
        }
      }
    }
  }

  return [basicReport, emptySearchResult]
}

/* Data mocks */
export const timeTypesData = [
  {
    __typename: 'TimeType',
    id: 1,
    slug: 'work time',
  },
  {
    __typename: 'TimeType',
    id: 2,
    slug: 'break time',
  },
  {
    __typename: 'TimeType',
    id: 3,
    slug: 'planned absence',
  },
]
