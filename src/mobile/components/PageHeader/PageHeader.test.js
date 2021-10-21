import React from 'react'
import {render} from '@testing-library/react-native'
import PageHeader from './PageHeader'

describe('PageHeader', () => {

  it('Renders a title and the Velocity Global Circle icon', () => {
    const { getByText, getByLabelText } = render(<PageHeader title={'Settings'} />)

    expect(getByText('Settings')).toBeDefined()
    expect(getByLabelText('Velocity Global circle logo')).toBeDefined()
  })
})