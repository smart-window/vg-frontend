import React from 'react'
import { render, screen, fireEvent} from '@testing-library/react'
import VgInput from './VgInput'
import InputTypes from './constants/InputTypes'
import 'test/mocks/react-google-maps.mock.js'
import 'test/mocks/google-window-object.mock.js'

it('restricts input for InputTypes.PHONE', () => {
  render(
    <VgInput label='phone input' type={InputTypes.PHONE}/>
  )

  const phoneInput = screen.getByLabelText('phone input')
  fireEvent.change(phoneInput, { target: { value: '123 with some extra text' } })
  expect(screen.queryByText('123')).toBeDefined()
})

it('restricts input for InputTypes.NUMBER', () => {
  render(
    <VgInput label='number input' type={InputTypes.NUMBER}/>
  )

  const phoneInput = screen.getByLabelText('number input')
  fireEvent.change(phoneInput, { target: { value: '123 with some extra text' } })
  expect(screen.queryByText('123')).toBeDefined()
})

it('hides characters for password input', () => {
  render(
    <VgInput label='password input' type={InputTypes.PRIVATE}/>
  )

  const phoneInput = screen.getByLabelText('password input')
  fireEvent.change(phoneInput, { target: { value: 'sooper secret password' } })
  expect(screen.queryByText('sooper secret password')).toBeNull()
})

it('displays a validation error for required fields onBlur', () => {
  const {getByLabelText, getByText} = render(
    <VgInput label='test input'/>
  )
  const input = getByLabelText('test input')
  fireEvent.blur(input)
  const errorText = getByText('This field is required')
  expect(errorText).toBeDefined()
})

it('correctly displays an address input', () => {
  render(
    <VgInput
      label='address input'
      type={InputTypes.ADDRESS}
      isOptional={false}
      onChange={jest.fn()}
      onBlur={jest.fn()}
      value={{formattedAddress: '123 Test Lane, Denver Co 80401', suite: '3'}}
    />
  )

  expect(screen.getByDisplayValue('123 Test Lane, Denver Co 80401'))
  expect(screen.getByDisplayValue('3'))
})