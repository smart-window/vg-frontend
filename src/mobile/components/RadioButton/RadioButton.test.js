import React from 'react'
import {render} from '@testing-library/react-native'
import RadioButton from './RadioButton'

describe('RadioButton', () => {
  it('Renders a filled in RadioButton when checked is true', () => {
    const { getByText } = render(
      <RadioButton
        item={{name: 'Spanish', value: 'es', id: 1, description: 'A cool language', checked: false}}
        onOptionSelect={jest.fn()}
      />
    )

    expect(getByText('Spanish')).toBeDefined()
  })

  it('Renders a filled in RadioButton when checked is true', () => {
    const { getByTestId } = render(
      <RadioButton
        item={{name: 'English', value: 'es', id: 1, description: 'A cool language', checked: true}}
        onOptionSelect={jest.fn()}
      />
    )

    expect(getByTestId('FilledRadioButton')).toBeDefined()
  })
})