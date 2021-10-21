import React from 'react'
import {fireEvent, render} from '@testing-library/react-native'
import VgTextInput from './VgTextInput'

describe('VgTextInput', () => {
  let onChangeText, onBlur

  beforeEach(() => {
    onChangeText = jest.fn()
    onBlur = jest.fn()
  })

  it('Renders a text input with a default value', () => {
    const { getByDisplayValue } = render(
      <VgTextInput
        defaultValue={'Total Hours'}
        keyboardType={'decimal-pad'}
        onChangeText={onChangeText}
        messageOnError={''}
        onBlur={onBlur}
      />
    )

    expect(getByDisplayValue('Total Hours')).toBeDefined()
  })

  it('Fires a the onChangeText function upon input change', () => {
    const { getByDisplayValue } = render(
      <VgTextInput
        defaultValue={'Total Hours'}
        keyboardType={'decimal-pad'}
        onChangeText={onChangeText}
        messageOnError={''}
        onBlur={onBlur}
      />
    )

    fireEvent.changeText(getByDisplayValue('Total Hours'), '1')

    expect(onChangeText).toHaveBeenCalled()
  })

  it('Displays an error message and icon', () => {
    const { getByText, getByLabelText } = render(
      <VgTextInput
        defaultValue={'Total Hours'}
        keyboardType={'decimal-pad'}
        onChangeText={onChangeText}
        messageOnError={'Please enter a non-zero number'}
        onBlur={onBlur}
      />
    )

    expect(getByText('Please enter a non-zero number')).toBeDefined()
    expect(getByLabelText('This icon indicates an error in an input')).toBeDefined()
  })
})