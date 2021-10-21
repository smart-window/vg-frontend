import timeEntriesHelper from './timeEntriesHelper'
import {getTimeEntriesMockData, getTimeEntriesChartMockData} from 'test/mockData/timeEntriesMock'
import dateHelper from 'shared/services/dateHelper'

describe('collapseTimeEntriesByDate', () => {
  it('should format time entries by date', () => {
    const timeEntries = getTimeEntriesMockData()[0].result.data.timeEntries
    const today = new Date()
    const currentMonthStartDayString = dateHelper.getMonthStartDay(today)
    const firstOfCurrentMonth = currentMonthStartDayString.substr(0, 8) + '01'

    const formattedTimeEntries = {
      '2020-11-23': {
        marked: true,
        totals: {
          'Break Time': [
            {'Break Time': 1, id: 2}
          ],
        },
      },
      '2020-11-24': {
        marked: true,
        totals: {
          'Work Time': [
            {'Work Time': 8, id: 6},
          ],
        },
      },
      [firstOfCurrentMonth]: {
        'marked': true,
        'totals': {
          'Work Time': [
            {
              'Work Time': 8,
              'id': 99,
            },
          ],
        },
      },
    }
    expect(timeEntriesHelper.collapseTimeEntriesByDate(timeEntries)).toEqual(formattedTimeEntries)
  })
})

describe('collapseTimeEntriesForChart', () => {
  it('should format time entries by date', () => {
    const daysOfTheWeek = [
      '2020-11-21',
      '2020-11-22',
      '2020-11-23',
      '2020-11-24',
      '2020-11-25',
      '2020-11-26',
      '2020-11-27',
      '2020-11-28',
    ]
    const timeEntries = getTimeEntriesChartMockData()[0].result.data.timeEntries
    const formattedTimeEntries = {
      'break time': {
        '2020-11-21': 0,
        '2020-11-22': 0,
        '2020-11-23': 1,
        '2020-11-24': 0,
        '2020-11-25': 0,
        '2020-11-26': 0,
        '2020-11-27': 0,
        '2020-11-28': 0,
      },
      'work time': {
        '2020-11-21': 0,
        '2020-11-22': 0,
        '2020-11-23': 0,
        '2020-11-24': 8,
        '2020-11-25': 8,
        '2020-11-26': 0,
        '2020-11-27': 0,
        '2020-11-28': 0,
      },
    }

    expect(timeEntriesHelper.collapseTimeEntriesForChart(timeEntries, daysOfTheWeek)).toEqual(formattedTimeEntries)
  })
})

describe('addWeekendEntries', () => {
  it('should add time entries for weekend dates', () => {
    const daysOfTheWeek = [
      '2020-11-21',
      '2020-11-22',
      '2020-11-23',
      '2020-11-24',
      '2020-11-25',
      '2020-11-26',
      '2020-11-27',
      '2020-11-28',
    ]

    const formattedTimeEntries = {
      'break time': {
        '2020-11-21': 0,
        '2020-11-22': 0,
        '2020-11-23': 1,
        '2020-11-24': 0,
        '2020-11-25': 0,
        '2020-11-26': 0,
        '2020-11-27': 0,
        '2020-11-28': 0,
      },
      'work time': {
        '2020-11-21': 0,
        '2020-11-22': 0,
        '2020-11-23': 0,
        '2020-11-24': 8,
        '2020-11-25': 8,
        '2020-11-26': 0,
        '2020-11-27': 0,
        '2020-11-28': 0,
      },
    }

    const formattedTimeEntriesWithWeekends = {
      'break time': {
        '2020-11-21': 0,
        '2020-11-22': 0,
        '2020-11-23': 1,
        '2020-11-24': 0,
        '2020-11-25': 0,
        '2020-11-26': 0,
        '2020-11-27': 0,
        '2020-11-28': 0,
      },
      'work time': {
        '2020-11-21': 0,
        '2020-11-22': 0,
        '2020-11-23': 0,
        '2020-11-24': 8,
        '2020-11-25': 8,
        '2020-11-26': 0,
        '2020-11-27': 0,
        '2020-11-28': 0,
      },
      'weekends': {
        '2020-11-21': 12,
        '2020-11-22': 12,
        '2020-11-28': 12,
      }
    }

    expect(timeEntriesHelper.addWeekendEntries(formattedTimeEntries, daysOfTheWeek)).toEqual(formattedTimeEntriesWithWeekends)
  })
})