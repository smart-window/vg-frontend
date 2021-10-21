import React from 'react'
import {render} from '@testing-library/react-native'
import CardHeader from './CardHeader'
import GearCircle from 'mobile/icons/StaticIcons/GearCircle'

describe('CardHeader', () => {

  it('Renders an icon and a title', () => {
    const { getByText, getByLabelText } = render(
      <CardHeader
        icon={<GearCircle />}
        title={'Settings'}
      />
    )

    expect(getByText('Settings')).toBeDefined()
    expect(getByLabelText('Settings logo')).toBeDefined()
  })
})