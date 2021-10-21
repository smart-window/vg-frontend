import React from 'react'
import {fireEvent, render} from '@testing-library/react-native'
import Nav from './Nav'
import mobilePageConstants from 'mobile/constants/mobilePageConstants'

describe('Nav', () => {

  const mockNavigationState = {index: 0}

  it('Renders three navigational icons', () => {
    const { getByLabelText } = render(<Nav state={mockNavigationState}/>)

    expect(getByLabelText('Navigate to Dashboard Icon')).toBeDefined()
    expect(getByLabelText('Navigate to Calendar Icon')).toBeDefined()
    expect(getByLabelText('Navigate to Settings Icon')).toBeDefined()
    // expect(getByLabelText('Navigate to Profile Icon')).toBeDefined()
  })

  it('Fires a navigate call upon button press', () => {
    const navigation = { navigate: jest.fn() }
    const { getByTestId } = render(<Nav navigation={navigation} state={mockNavigationState}/>)

    fireEvent.press(getByTestId('Nav' + mobilePageConstants.DASHBOARD))

    expect(navigation.navigate).toHaveBeenCalledWith(mobilePageConstants.DASHBOARD)
  })
})