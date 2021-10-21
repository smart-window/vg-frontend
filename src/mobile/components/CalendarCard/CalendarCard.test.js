import React from 'react'
import {render} from '@testing-library/react-native'
import CalendarCard from './CalendarCard'
import dateHelper from 'shared/services/dateHelper'

describe('TimeTracking', () => {
  let handleSelectDay
  const calendarDate = new Date()
  let selectedTimeEntries
  let handleCalendarChange
  let selectedDate
  let handleSelectWeek
  const markedDates = {'2020-10-12': {marked: true}}
  let handleDrawerExpansion

  beforeEach(() => {
    handleSelectDay = jest.fn()
    handleCalendarChange = jest.fn()
    handleSelectWeek = jest.fn()
    handleDrawerExpansion = jest.fn()
  })

  it('Renders a calendar according to the current date', () => {
    const month = dateHelper.getMonthAndYear(calendarDate)

    const { getByText } = render(
      <CalendarCard
        handleSelectDay={handleSelectDay}
        calendarDate={calendarDate}
        markedDates={markedDates}
        selectedTimeEntries={selectedTimeEntries}
        handleCalendarChange={handleCalendarChange}
        selectedDate={selectedDate}
        handleSelectWeek={handleSelectWeek}
        handleDrawerExpansion={handleDrawerExpansion}
      />
    )

    expect(getByText(month)).toBeDefined()
  })
})