import React, {useState, useEffect, useMemo} from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types'
import dateHelper from 'shared/services/dateHelper'
import timeEntriesHelper from 'shared/services/timeEntriesHelper'
import {useTranslation} from 'react-i18next'
import {useQuery, useMutation, gql} from '@apollo/client'
import analyticsService from 'mobile/services/analyticsServiceMobile'

import CalendarCard from 'mobile/components/CalendarCard/CalendarCard'
import TimeEntryDrawer from 'mobile/modules/TimeEntryDrawer/TimeEntryDrawer'
import BackdropWrapper from 'mobile/components/BackdropWrapper/BackdropWrapper'
import {colors} from 'shared/constants/cssConstants'

export const CALENDAR_DATA_QUERY = gql`
  query CalendarData(
    $startDate: Date!
    $endDate: Date!
  ) {
    timeEntries(
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      eventDate
      description
      totalHours
      timeTypeId
      userId
      timePolicyId
      timeType {
        id
        slug
      }
    }
    timeTypes {
      id
      slug
    }
  }
`

export const DELETE_TIME_ENTRY_MUTATION = gql`
  mutation DeleteTimeEntry($id: ID!) {
    deleteTimeEntry(id: $id) {
      id
    }
  }
`

TimeTracking.propTypes = {
  /** The history object to facilitate page redirects. */
  navigation: PropTypes.object,
  /** The route object containing information about the current route. */
  route: PropTypes.object
}

/**
 * The TimeTracking component a user lands on after successful log in.
 * @category Components - Mobile
 * @namespace TimeTracking
 */
export default function TimeTracking({navigation, route}) {
  const [calendarDate, setCalendarDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedWeek, setSelectedWeek] = useState(null)
  const [selectedTimeEntries, setSelectedTimeEntries] = useState(null)
  const [shouldExpandDrawer, setShouldExpandDrawer] = useState(null)
  const [timeEntryForEdit, setTimeEntryForEdit] = useState(null)
  const {t} = useTranslation()

  const startDate = dateHelper.getMonthStartDay(calendarDate)
  const endDate = dateHelper.getMonthEndDay(calendarDate)
  /* eslint-disable no-unused-vars */
  const {loading, error, data} = useQuery(CALENDAR_DATA_QUERY,
    {
      variables: {
        startDate,
        endDate
      }
    }
  )

  const [deleteTimeEntry] = useMutation(DELETE_TIME_ENTRY_MUTATION, {
    update(cache, { data: { deleteTimeEntry } }) {
      cache.modify({
        fields: {
          timeEntries(existingEntries = []) {
            const updatedEntries = existingEntries.filter((r) => {
              const id = r.__ref.split(':')[1]
              return id !== deleteTimeEntry.id
            })
            return [...updatedEntries]
          },
        },
      })
    },
  })

  const formattedTimeEntries = useMemo(() => {
    if (!data && loading) return null
    return data ? timeEntriesHelper.collapseTimeEntriesByDate(data.timeEntries) : {}
  }, [data, loading])

  const [markedDates, setMarkedDates] = useState(formattedTimeEntries ? formattedTimeEntries : {})

  useEffect(function handleRouteParamsUpdate() {
    // Triggers a multi day selection on calendar dictated by state params passed in from Dashboard
    if (route.params && route.params.today) {
      const {today, eightDaysAgo} = route.params
      const selectedDays = dateHelper.getMultipleDays(new Date(eightDaysAgo), new Date(today), true)
      handleSelectWeek(selectedDays)
      if (formattedTimeEntries) navigation.setParams({today: null, eightDaysAgo: null})
    }
  }, [route.params, formattedTimeEntries])

  useEffect(function handleTimeEntriesDataChange() {
    // Triggers a calendar rerender for on data change or week/date selection
    if (selectedWeek) {
      findAndSetTimeEntries(selectedWeek)
    }
    else if (selectedDate) {
      findAndSetTimeEntries([selectedDate.dateString])
    }
    else {
      findAndSetTimeEntries()
    }

    formatAndSetDateMarkers()
  }, [formattedTimeEntries, selectedDate, selectedWeek])

  /**
   *  Sets the selected date and time entry in state
   *  @param {array} selectedDays - the selected day or days
  */
  function findAndSetTimeEntries(selectedDays) {
    if (!selectedDays) {
      setSelectedTimeEntries(null)
    }
    else {
      const timeEntries = selectedDays.map((day) => {
        return { [day]: (formattedTimeEntries && formattedTimeEntries[day]) ? formattedTimeEntries[day] : {} }
      })
      setSelectedTimeEntries(timeEntries)
    }
  }

  /**
   *  Adds the necessary calendar formatting for selected day and sets marked dates data
  */
  function formatAndSetDateMarkers() {
    const markedDatesData = formattedTimeEntries ? {...formattedTimeEntries} : null
    if (selectedWeek && markedDatesData) {
      // go through week selection and mark every date to be marked
      selectedWeek.forEach((day, index) => {
        markedDatesData[day] = {
          ...markedDatesData[day],
          selected: true,
          startingDay: index === 0,
          endingDay: index === selectedWeek.length - 1,
          color: colors.officialBlue,
          dotColor: colors.white
        }
      })
    }
    else if (selectedDate && markedDatesData) {
      markedDatesData[selectedDate.dateString] = {
        ...markedDatesData[selectedDate.dateString],
        selected: true,
        startingDay: true,
        endingDay: true,
        color: colors.officialBlue,
        dotColor: colors.white
      }
    }

    setMarkedDates(markedDatesData)
  }

  /**
   * Delete a particular time entry on the server and update the UI.
   * TODO: Like our other mutations, this is reliant upon network. We should revisit this.
   * @param {number} entryId - id of the TimeEntry to delete
   */
  function handleTimeEntryDelete(entryId) {
    setMarkedDates(null)
    deleteTimeEntry({
      variables: {id: entryId}
    })
  }

  /**
   *  On calendar change, sets the calendar date.
   *  Also sets the marked dates to null to trigger calendar refresh on fresh time entries fetch.
   *  Note: The JS Date object refers to months from 0-11, the calendar returns the actual month number.
   *    A date in December will be date/11, but the calendar will return the same date as date/12,
   *    which is why we need to subtract a month here.
   *  @param {string} newCalendarDate - the month currently displayed on the calendar in Date format.
  */
  function handleCalendarChange(newCalendarDate) {
    setCalendarDate(newCalendarDate)
    setMarkedDates(null)
    setSelectedDate(null)
    setSelectedWeek(null)
    setSelectedTimeEntries(null)
  }

  /**
   * Do not allow date to be selected if outside of current month,
   * then set selected date and clear selected week in state and recreate time entries.
   * @param {object} newDate - the date selected in the calendar's date format
   */
  function handleSelectDay(newDate = null) {
    const currentMonth = new Date(calendarDate).getMonth() + 1
    if (newDate.month !== currentMonth) return
    if (newDate && newDate.dateString !== selectedDate?.dateString) {
      setSelectedDate(newDate)
      analyticsService.logEvent('TimeTracking', 'Clicked', 'Calendar_DaySelection')
    }
    else {
      setSelectedDate(null)
    }
    setSelectedWeek(null)
  }

  /**
   * Set the selected week and clear selected date in state, recreate time entries
   * @param {object} weekDays - the dates selected in the calendar's date format
   */
  function handleSelectWeek(weekDays) {
    setSelectedWeek(weekDays)
    setSelectedDate(null)
    analyticsService.logEvent('TimeTracking', 'Clicked', 'Calendar_WeekSelection')
  }

  /**
   * Set selected date and expand time entry drawer when time entry empty state clicked
   * @param {string} dateString - the date string selected in 'YYYY-MM-DD' format
   */
  function handleDrawerExpansion(dateString=null, timeEntryId=null) {
    if (!dateString) {
      setShouldExpandDrawer(false)
    }
    else {
      setShouldExpandDrawer(true)
      const splitDateString = dateString.split('-')
      const dateInCalendarDayFormat = {
        dateString,
        year: +splitDateString[0],
        month: +splitDateString[1],
        day: +splitDateString[2]
      }
      setSelectedDate(dateInCalendarDayFormat)
      setTimeEntryForEdit(data.timeEntries.find(entry => entry.id === timeEntryId))
    }
  }

  return (
    <View testID='TimeTracking'>
      <BackdropWrapper allowBounce={false} title={t('Time Tracking')}>
        <CalendarCard
          markedDates={markedDates}
          selectedTimeEntries={selectedTimeEntries}
          handleCalendarChange={handleCalendarChange}
          handleSelectDay={handleSelectDay}
          handleSelectWeek={handleSelectWeek}
          handleDrawerExpansion={handleDrawerExpansion}
          handleTimeEntryDelete={handleTimeEntryDelete}
        />
      </BackdropWrapper>
      {
        (!selectedWeek || shouldExpandDrawer) &&
        <TimeEntryDrawer
          selectedDate={selectedDate ? new Date(selectedDate.year, (selectedDate.month - 1), selectedDate.day) : new Date()}
          timeTypes={data ? data.timeTypes : []}
          setMarkedDates={setMarkedDates}
          shouldExpandDrawer={shouldExpandDrawer ? true : false}
          handleDrawerExpansion={handleDrawerExpansion}
          timeEntryForEdit={timeEntryForEdit}
          setTimeEntryForEdit={setTimeEntryForEdit}
        />
      }
    </View>
  )
}