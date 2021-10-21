import React from 'react'
import {render} from '@testing-library/react-native'
import DualButtons from './DualButtons'
import EditPencil from 'mobile/icons/DynamicIcons/EditPencil'
import MapPin from 'mobile/icons/StaticIcons/MapPin'
import { colors } from 'shared/constants/cssConstants'

describe('DualButtons', () => {

  it('Renders an icon for the left and right buttons', () => {
    const { getByLabelText } = render(
      <DualButtons
        iconLeft={<MapPin />}
        iconRight={<EditPencil />}
      />
    )

    expect(getByLabelText('Edit pencil logo')).toBeDefined()
    expect(getByLabelText('Map pin logo')).toBeDefined()
  })

  it('Renders the right button with a blue border on the left side', () => {
    const style = {
      borderLeftWidth: 1,
      borderLeftColor: colors.officialBlue
    }
    const { getByTestId } = render(
      <DualButtons
        iconLeft={<MapPin />}
        iconRight={<EditPencil />}
      />
    )

    expect(getByTestId('RightDualButton')).toHaveStyle(style)
  })
})