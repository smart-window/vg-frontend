import React from 'react'
import {render} from '@testing-library/react-native'
import DatePickerModal from './DatePickerModal'

describe('DatePickerModal', () => {
  const handleClose = jest.fn()
  const handleSubmit = jest.fn()
  const date = new Date(2020, 11, 21)
  const changeDate = jest.fn()
  const minDate = new Date(2020, 11, 1)
  const maxDate = new Date(2020, 11, 31)

  it('Renders a date picker with a title and two buttons', () => {
    const { getByTestId, getByText } = render(
      <DatePickerModal
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        date={date}
        changeDate={changeDate}
        minDate={minDate}
        maxDate={maxDate}
      />
    )

    expect(getByTestId('dateTimePicker')).toBeDefined()
    expect(getByText('Select a date')).toBeDefined()
    expect(getByText('Cancel')).toBeDefined()
    expect(getByText('Apply')).toBeDefined()
  })
})