import React from 'react'
import {render} from '@testing-library/react-native'
import TimeChartSummary from './TimeChartSummary'

describe('TimeChartSummary', () => {

  it('Renders a time summary with the correct hours', () => {
    const { getByText } = render(
      <TimeChartSummary
        totalHoursWorked={32}
      />
    )

    expect(getByText('32 hr')).toBeDefined()
    expect(getByText('4 hr')).toBeDefined()
  })
})