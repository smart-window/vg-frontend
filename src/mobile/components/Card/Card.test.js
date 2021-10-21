import React from 'react'
import {render} from '@testing-library/react-native'
import Card from './Card'
import CardHeader from 'mobile/components/CardHeader/CardHeader'
import GearCircle from 'mobile/icons/StaticIcons/GearCircle'

describe('Card', () => {
  const cardHeader =(
    <CardHeader
      icon={<GearCircle />}
      title={'Settings'}
    />
  )

  it('Renders child components', () => {
    const { getByTestId } = render(
      <Card>
        {cardHeader}
      </Card>
    )

    expect(getByTestId('Card')).toContainElement(getByTestId('CardHeader'))
  })
})