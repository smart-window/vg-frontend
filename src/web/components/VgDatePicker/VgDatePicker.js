import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import calendarIcon from 'assets/images/icons/calendar.svg'
import dateHelper from 'shared/services/dateHelper'
import {DivDatePickerWrapper, ImgCalendar} from './VgDatePicker.styles'

VgDatePicker.propTypes = {
  /** True if there is a validation error */
  hasError: PropTypes.bool,
  /** Date to display as selected in the date picker, if null no date selected */
  selectedDate: PropTypes.oneOf([PropTypes.instanceOf(Date), PropTypes.string]),
  /** Handler for when the user changes a date on the picker */
  onDateChange: PropTypes.func.isRequired,
  /** Date indicating minimum date user is able to select */
  minDate: PropTypes.instanceOf(Date),
  /** Date indicating maximum date user is able to select */
  maxDate: PropTypes.instanceOf(Date),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
}
VgDatePicker.defaultProps = {
  onBlur: () => {},
  onFocus: () => {}
}

// TODO: this needs unit tests

/**
 * A date picker component to display on request.
 * Intended to be absolutely positioned to a parent.
 * Source: https://github.com/Hacker0x01/react-datepicker
 * "popperPlacement" can be any of the following:  'auto', 'auto-left', 'auto-right', 'bottom', 'bottom-end', 'bottom-start', 'left', 'left-end', 'left-start', 'right', 'right-end', 'right-start', 'top', 'top-end', 'top-start'
 * @category Components - Web
 * @namespace VgDatePicker
 */
export default function VgDatePicker({
  hasError,
  minDate,
  maxDate,
  onBlur,
  onDateChange,
  onFocus,
  selectedDate,
}) {
  const didMountRef = useRef(false)
  /**
   * The datepicker doesn't reliably call blur, so calling it manually when the date changes.
   * didMountRef is used to avoid blurring on the initial render.
   * */
  useEffect(function blurOnValueChange() {
    if (didMountRef.current) {
      onBlur(selectedDate)
    }
    else {
      didMountRef.current = true
    }
  }, [selectedDate])

  /** Stops event propagation up to window on calendar click NOT input click */
  function stopPropagation(event) {
    // If click event occurs on input itself NOT the calendar, click event should go through
    if (!event.target.classList.contains('react-datepicker-ignore-onclickoutside')) {
      event.stopPropagation()
    }
  }

  // convert string dates from backend to Date objects
  const parsedDate = dateHelper.dateStringIsAPIFormat(selectedDate) ? dateHelper.convertAPIDateToDate(selectedDate) : selectedDate

  return (
    <DivDatePickerWrapper onClick={stopPropagation}>
      <DatePicker
        dateFormat={'dd LLL yyyy'}
        selected={parsedDate || null}
        onChange={onDateChange}
        popperPlacement={'bottom-end'}
        minDate={minDate}
        maxDate={maxDate}
        onBlur={onBlur}
        onFocus={onFocus}
        isClearable
      />
      {
        !selectedDate && !hasError &&
        <ImgCalendar
          src={calendarIcon}
          alt='Select a date'
        />
      }
    </DivDatePickerWrapper>
  )
}