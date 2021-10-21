import React from 'react'
import PropTypes from 'prop-types'
import VgDatePicker from 'web/components/VgDatePicker/VgDatePicker'

import {
  DivInputLabelWrapper,
  DivDateInputsWrapper,
  DivDateInputWrapper,
} from './DateRange.styles'

DateRange.propTypes = {
  /** Label to left of inputs */
  label: PropTypes.string,
  /** selected from date */
  fromDate: PropTypes.oneOf([PropTypes.instanceOf(Date), PropTypes.string]),
  /** selected to date */
  toDate: PropTypes.oneOf([PropTypes.instanceOf(Date), PropTypes.string]),
  /** from date change handler */
  handleFromDateChange: PropTypes.func,
  /** to date change handler */
  handleToDateChange: PropTypes.func,
  /** If horizontal, from, to and label will all be on one line. */
  displayMode: PropTypes.oneOf(['horizontal', 'vertical'])
}
DateRange.defaultProps = {
  displayMode: 'vertical',
  label: 'Date Range'
}

/**
 * Component representing a date range with from/to date inputs.
 * @category Components - Web
 * @namespace DateRange
 */
export default function DateRange({
  label,
  fromDate,
  toDate,
  handleFromDateChange,
  handleToDateChange,
  displayMode
}) {

  const dateInputs = (
    <>
      <DivDateInputWrapper>
        {displayMode === 'vertical' && <label>from</label>}
        <VgDatePicker
          selectedDate={fromDate}
          onDateChange={handleFromDateChange}
          maxDate={toDate || new Date()}
        />
      </DivDateInputWrapper>
      <DivDateInputWrapper displayMode={displayMode}>
        <label>to</label>
        <VgDatePicker
          selectedDate={toDate}
          onDateChange={handleToDateChange}
          minDate={fromDate || null}
          maxDate={new Date()}
        />
      </DivDateInputWrapper>
    </>
  )

  return (
    <DivInputLabelWrapper>
      <label>{label}</label>
      {displayMode === 'vertical' ?
        <DivDateInputsWrapper>
          {dateInputs}
        </DivDateInputsWrapper>
        : dateInputs
      }
    </DivInputLabelWrapper>
  )
}