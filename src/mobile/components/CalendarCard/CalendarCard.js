import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import dateHelper from 'shared/services/dateHelper'
import analyticsService from 'mobile/services/analyticsServiceMobile'
import {LocaleConfig, Calendar} from 'react-native-calendars'
import calendarES from '../../../../public/locales/es/calendar.json'
import {useTranslation} from 'react-i18next'
import {colors} from 'shared/constants/cssConstants'

import Card from 'mobile/components/Card/Card'
import TimeTrackingSummary from 'mobile/components/TimeTrackingSummary/TimeTrackingSummary'
import ChevronArrow from 'mobile/icons/DynamicIcons/ChevronArrow'
import HorizontalLegend from 'mobile/components/HorizontalLegend/HorizontalLegend'

import {
  TextCalendarHeader,
  ViewArrowContainer,
  calendarStyle,
  calendarTheme,
  ViewCalendarContainer,
  ViewBackgroundGrey,
  ViewCalendarHeader,
  TextCalendarDescriptor
} from './CalendarCard.styles'

CalendarCard.propTypes = {
  /** A function called on calendar's day selection */
  handleSelectDay: PropTypes.func,
  /** An object of dates that the calendar should mark with either a pip or highlight */
  markedDates: PropTypes.object,
  /** An array of time entries to display on date or week selection */
  selectedTimeEntries: PropTypes.array,
  /** A function called when the calendar changes month */
  handleCalendarChange: PropTypes.func,
  /** A function called on the calendar's long press to select a week */
  handleSelectWeek: PropTypes.func,
  /** A function to expand the add time entry drawer on empty time entry */
  handleDrawerExpansion: PropTypes.func,
  /** Called when deleting a time entry */
  handleTimeEntryDelete: PropTypes.func,
}

/**
 * The calendar component for Time Entries
 * @category Components - Mobile
 * @namespace CalendarCard
 * Calendar component: https://github.com/wix/react-native-calendars
 */
export default function CalendarCard({
  handleSelectDay,
  markedDates,
  selectedTimeEntries,
  handleCalendarChange,
  handleSelectWeek,
  handleDrawerExpansion,
  handleTimeEntryDelete
}) {
  const minDate = dateHelper.getMonthStartDay(dateHelper.getCurrentDateFromLastYear(), false)
  const maxDate = new Date()
  const [locale, setLocale] = useState('en')
  const {t, i18n} = useTranslation()
  LocaleConfig.locales.es = calendarES
  LocaleConfig.locales.en = LocaleConfig.locales['']
  // TODO: add loading and error states
  /* eslint-disable no-unused-vars */

  useEffect(function didUpdate() {
    // Triggers a calendar rerender if the app language is changed.
    if (i18n.language !== LocaleConfig.defaultLocale) {
      LocaleConfig.defaultLocale = i18n.language
      setLocale(i18n.language)
    }
  }, [i18n.language])

  /**
   * Displays our custom header component on calendar
   * @param {Date} date - JS Date object
  */
  function createHeaderDisplay(date) {
    const time = dateHelper.getMonthAndYear(date, i18n.language)
    return (
      <ViewCalendarHeader>
        <TextCalendarHeader>{time}</TextCalendarHeader>
        <TextCalendarDescriptor>{t('Time Tracking Calendar')}</TextCalendarDescriptor>
      </ViewCalendarHeader>
    )
  }

  /**
   *  Displays our custom arrow component on calendar
   *  @param {string} direct - the left or right side arrow
  */
  function createArrow(direction) {
    return (
      <ViewArrowContainer isLeft={direction === 'left'}>
        <ChevronArrow
          width= {12}
          height= {26}
        />
      </ViewArrowContainer>
    )
  }

  /**
   *  On calendar month change, calls passed in handler with calendar date in Date format.
   *  @param {string} calendarDate - the month currently displayed on the calendar.
  */
  function onCalendarMonthChange(calendarDate) {
    const newCalendarDate = new Date(calendarDate.year, (calendarDate.month - 1), calendarDate.day)
    handleCalendarChange(newCalendarDate)
    analyticsService.logEvent('TimeTracking', 'Scrolled', 'Calendar_ScrollMonth')
  }

  /**
   *  Do not allow date to be selected if outside of current month
   *  @param {object} newDate - the date selected int the calendar's date format.
  */
  function selectDay(newDate) {
    handleSelectDay(newDate)
  }

  /**
   *  Calculate week days of selected date
   *  @param {object} date - the date selected int the calendar's date format.
  */
  function selectWeek({year, month, day}) {
    const selectedDate = new Date(year, (month - 1), day)
    const weekDays = dateHelper.getWeekDays(selectedDate)
    handleSelectWeek(weekDays)
  }

  return (
    <Card
      hasBorderTop={true}
      hasBorderBottom={true}
      fillSpace={true}
    >
      <ViewCalendarContainer>
        <ViewBackgroundGrey/>
        <Calendar
          key={locale}
          style={calendarStyle}
          theme={calendarTheme}
          renderHeader={createHeaderDisplay}
          renderArrow={createArrow}
          onDayPress={selectDay}
          onDayLongPress={selectWeek}
          enableSwipeMonths={true}
          markedDates={markedDates}
          markingType={'period'}
          onMonthChange={onCalendarMonthChange}
          minDate={minDate}
          maxDate={maxDate}
        />
        <ViewBackgroundGrey isRightAligned={true}/>
      </ViewCalendarContainer>
      <HorizontalLegend
        legendItems={[
          {
            label: t('Weekends')
          },
          {
            label: t('Days with time entries'),
            markerColor: colors.officialBlue,
            markerStyle: 'rounded'
          }
        ]}
      />
      <TimeTrackingSummary
        handleDrawerExpansion={handleDrawerExpansion}
        selectedTimeEntries={selectedTimeEntries}
        handleTimeEntryDelete={handleTimeEntryDelete}
      />
    </Card>
  )
}