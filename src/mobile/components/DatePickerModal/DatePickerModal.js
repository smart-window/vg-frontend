import React from 'react'
import PropTypes from 'prop-types'
import {Platform} from 'react-native'
import {useTranslation} from 'react-i18next'
import DateTimePicker from '@react-native-community/datetimepicker'
import GenericModal from 'mobile/components/GenericModal/GenericModal'
import styled from 'styled-components/native'
import {colors} from 'shared/constants/cssConstants'

export const ViewDatePicker = styled.View`
  min-height: 200px;
  background-color: ${colors.white};
  width: 100%;
`

DatePickerModal.propTypes = {
  /** Function that fires on modal close */
  handleClose: PropTypes.func,
  /** Function that fires on modal submit */
  handleSubmit: PropTypes.func,
  /** Date that the DateTimePicker displays as its value */
  date: PropTypes.object,
  /** Function that fires on date change (iOS) or on picker "Ok" (android) */
  changeDate: PropTypes.func,
  /** Minimum date to display on the picker */
  minDate: PropTypes.object,
  /** Maximum date to display on the picker */
  maxDate: PropTypes.object
}

/**
 * A modal that displays when the user needs to pick a date.
 * @category Components - Mobile
 * @namespace DatePickerModal
 */
export default function DatePickerModal(props) {
  const {
    handleClose,
    handleSubmit,
    date,
    changeDate,
    minDate,
    maxDate
  } = props

  const {t} = useTranslation()

  const datePicker = (
    <DateTimePicker
      testID='dateTimePicker'
      value={date}
      mode={'date'}
      is24Hour={true}
      display={Platform.OS === 'ios' ? 'spinner' : 'default'} // To do: add handling to use new iOS calendar picker when available
      onChange={changeDate}
      minimumDate={minDate}
      maximumDate={maxDate}
    />
  )

  if (Platform.OS !== 'ios') {
    return datePicker
  }

  return (
    <GenericModal
      title={t('Select a date')}
      cancelButtonText={t('Cancel')}
      applyButtonText={t('Apply')}
      handleCancel={handleClose}
      handleSubmit={handleSubmit}
    >
      <ViewDatePicker>
        {datePicker}
      </ViewDatePicker>
    </GenericModal>
  )
}