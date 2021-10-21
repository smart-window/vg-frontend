import React from 'react'
import {render} from '@testing-library/react-native'
import InputField from './InputField'

describe('InputField', () => {

  it('Renders Text and InputField elements with the data passed in via props', () => {
    const { getByText, getByDisplayValue } = render(
      <InputField
        label='First Name'
        labelItem='Nancy'
      />
    )

    expect(getByText('First Name')).toBeDefined()
    expect(getByDisplayValue('Nancy')).toBeDefined()
  })

  it('Renders an InputField element that does not allow pointerEvents', () => {
    const { getByDisplayValue } = render(
      <InputField
        label='First Name'
        labelItem='Nancy'
      />
    )

    expect(getByDisplayValue('Nancy')).toHaveProp('pointerEvents', 'none')
  })
})