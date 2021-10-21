import 'react-native'
import React from 'react'
import TimeChart from './TimeChart.js'
import {render} from '@testing-library/react-native'
import {timeTypesData} from 'test/mockData/timeEntriesMock'

describe('TimeChart', () => {
  const timeEntries = [
    {
      '__typename': 'TimeEntry',
      'description': null,
      'eventDate': '2020-11-23T00:00:00Z',
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
      'eventDate': '2020-11-24T00:00:00Z',
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
      'eventDate': '2020-12-15T00:00:00Z',
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
  ]

  it('Renders a chart with three Victory Bars', () => {
    const { getByTestId, getByLabelText } = render(
      <TimeChart
        timeEntries={timeEntries}
        timeTypes={timeTypesData}
      />
    )

    expect(getByTestId('TimeChart')).toBeDefined()
    expect(getByLabelText('Time tracking chart')).toBeDefined()
  })
})