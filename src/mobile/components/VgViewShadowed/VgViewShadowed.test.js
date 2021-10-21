import React from 'react'
import {render} from '@testing-library/react-native'
import {colors} from 'shared/constants/cssConstants'
import VgViewShadowed from './VgViewShadowed'
import VgButton from 'mobile/components/VgButton/VgButton'

describe('VgViewShadowed', () => {

  it('Renders children with a shadow offset styling', () => {
    const pressHandler = jest.fn()
    const shadowStyling = {
      backgroundColor: colors.gray50,
      shadowColor: colors.gray50,
      shadowOpacity: 0.5,
      shadowRadius: 3,
      elevation: 6
    }
    const { getByText, getByTestId } = render(
      <VgViewShadowed>
        <VgButton text={'Apply'} handlePress={pressHandler} />
      </VgViewShadowed>
    )

    expect(getByText('Apply')).toBeDefined()
    expect(getByTestId('VgViewShadowed')).toHaveStyle(shadowStyling)
  })
})