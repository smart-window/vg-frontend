import React from 'react'
import {render} from '@testing-library/react-native'
import {colors} from 'shared/constants/cssConstants'
import HorizontalLegend from './HorizontalLegend'

describe('HorizontalLegend', () => {

  it('Renders a number of legend items', () => {
    const { getByText } = render(
      <HorizontalLegend
        legendItems={[
          {
            label: 'Weekends'
          },
          {
            label: 'Days with time entries',
            markerColor: colors.green,
            markerStyle: 'rounded'
          }
        ]}
      />
    )

    expect(getByText('Weekends')).toBeDefined()
    expect(getByText('Days with time entries')).toBeDefined()
  })
})