import React from 'react'
import {render} from '@testing-library/react-native'
import TimeTrackingSummary from './TimeTrackingSummary'

describe('TimeTrackingSummary', () => {
  const selectedTimeEntries = [
    {
      '2020-12-03': {
        'marked': true,
        'totals': {
          'Work Time': [
            {
              'Work Time': 2,
              'id': 4,
            }
          ]
        }
      }
    }
  ]

  it('Renders an instructional component when no date is selected', () => {
    const { getByText } = render(<TimeTrackingSummary/>)

    expect(getByText('Long press')).toBeDefined()
  })

  it('Renders an empty time entries state when date selected, but no time entries exist', () => {
    const { getByText } = render(
      <TimeTrackingSummary
        selectedTimeEntries={[{'2016-05-13': {}}]}
      />
    )

    expect(getByText('No entries yet. Add one!')).toBeDefined()
  })

  it('Renders a unique header and time entries display when a date is selected', () => {
    const { getByText } = render(
      <TimeTrackingSummary
        selectedTimeEntries={selectedTimeEntries}
      />
    )

    expect(getByText('DECEMBER 03, 2020')).toBeDefined()
    expect(getByText('2.00   Work Time')).toBeDefined()
  })

  it('Renders a unique header and time entries display when a range of dates are selected', () => {
    selectedTimeEntries.push({
      '2020-12-10': {
        'marked': true,
        'totals': {
          'Work Time': [
            {
              'Work Time': 3,
              'id': 8,
            }
          ]
        }
      }
    })

    const { getByText } = render(
      <TimeTrackingSummary
        selectedTimeEntries={selectedTimeEntries}
      />
    )

    expect(getByText('DECEMBER 03, 2020')).toBeDefined()
    expect(getByText('DECEMBER 10, 2020')).toBeDefined()
    expect(getByText('2.00   Work Time')).toBeDefined()
    expect(getByText('3.00   Work Time')).toBeDefined()
  })

})