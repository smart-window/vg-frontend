import React, {useState, useContext, useEffect} from 'react'
import {GlobalModalContext} from 'shared/providers/GlobalModalProvider'
import PropTypes from 'prop-types'
import modalConstants from 'mobile/constants/modalConstants'
import { Platform } from 'react-native'
import {useTranslation} from 'react-i18next'

import analyticsService from 'mobile/services/analyticsServiceMobile'
import inputValidationHelper from 'shared/services/inputValidationHelper'
import stringFormatter from 'shared/services/stringFormatter'
import dateHelper from 'shared/services/dateHelper'
import {colors} from 'shared/constants/cssConstants'
import {timeTypesDisplayData} from 'shared/constants/timeTrackingConstants'

import VgButton from 'mobile/components/VgButton/VgButton'
import VgTextInput from 'mobile/components/VgTextInput/VgTextInput'
import CalendarIcon from 'mobile/icons/DynamicIcons/Calendar.js'

import {
  ViewInputRowWrapper,
  ViewInputColumnWrapper,
  TextLabelForEntry,
  TextLabelForEntryDescription,
  TextDateEntry,
  TextInputDescription,
  TextOptional,
  ViewButtonsContainer,
  ViewButtonContainer,
  TouchableOpacityTimeType,
  TextTimeType,
  ViewCalendarWrapper,
  ViewGrowContainer,
  ViewInputContainer,
  TouchableOpacityDateWrapper
} from './TimeEntryDrawerForm.styles'

TimeEntryDrawerForm.propTypes = {
  /** The fetched time types associated to the user's time policy */
  timeTypes: PropTypes.array,
  /** A function that collapses the drawer */
  collapseDrawer: PropTypes.func,
  /** A function that submits a time entry */
  submitTimeEntry: PropTypes.func,
  /** The value of the totalHours input */
  totalHours: PropTypes.string,
  /** A function that sets the total hours input value */
  setTotalHours: PropTypes.func,
  /** The value of the description input */
  description: PropTypes.string,
  /** A function that sets the description input value */
  setDescription: PropTypes.func,
  /** An object representing the selected time type */
  selectedTimeType: PropTypes.object,
  /** A function that sets the selected time type */
  setSelectedTimeType: PropTypes.func,
  /** The existing time entry data to be edited */
  timeEntryForEdit: PropTypes.object,
  /** Query to change existing time entry */
  changeTimeEntry: PropTypes.func
}

/**
 * The form within the time entry drawer.
 * @category Modules - Mobile
 * @namespace TimeEntryDrawerForm
 */
export default function TimeEntryDrawerForm({
  date,
  setDate,
  timeTypes,
  collapseDrawer,
  submitTimeEntry,
  totalHours,
  setTotalHours,
  description,
  setDescription,
  selectedTimeType,
  setSelectedTimeType,
  timeEntryForEdit,
  changeTimeEntry,
  apiErrorMessage
}) {
  const {showModal, hideModal} = useContext(GlobalModalContext)
  const minDate = dateHelper.getMonthStartDay(dateHelper.getCurrentDateFromLastYear(), false)
  const maxDate = new Date()
  let pickedDate = null
  const [submitEnabled, setSubmitEnabled] = useState(false)
  const [keyboardPadding, setKeyboardPadding] = useState(false)
  const [hoursErrorMessage, setHoursErrorMessage] = useState('')
  const {t, i18n} = useTranslation()

  useEffect(() => {
    if (apiErrorMessage === 'You cannot exceed 24 hours in a day.') {
      setHoursErrorMessage(apiErrorMessage)
    }
    else {
      setHoursErrorMessage('')
    }
  }, [apiErrorMessage])

  useEffect(function didUpdate() {
    if (totalHours === '') {
      setSubmitEnabled(false)
    }
  }, [totalHours])

  /**
   *  Clears error message on input change, sets hours in state and handles submit activation
   *  @param {string} newHours - hours string passed in from input
  */
  function handleTotalHoursChange(newHours) {
    if (hoursErrorMessage) setHoursErrorMessage('')
    setSubmitEnabled(newHours !== '')
    setTotalHours(newHours)
  }

  /**
   *  Validation on the totalHours input after blur event, adds zeros to number if needed
   *  @param {string} text
  */
  function handleTotalHoursOnBlur(text) {
    if (text !== '') {
      const formattedText = stringFormatter.addZeroesToDecimal(text)
      return formattedText
    }
  }

  /**
   * Builds the time type buttons according to fetched time types
   *  @returns of no timeType is selected, null, otherwise time type buttons
  */
  function createTimeTypeButtons() {
    if (selectedTimeType) {
      return timeTypes.map((type, index) => {
        const lineColor = selectedTimeType.id === type.id ? colors.white : colors.officialBlue
        const fillColor = selectedTimeType.id !== type.id ? colors.white : colors.officialBlue
        const TimeTypeIcon = timeTypesDisplayData[type.slug].icon
        return (
          <ViewButtonContainer isFirst={index === 0} key={type.id}>
            <TouchableOpacityTimeType
              isSelected={selectedTimeType.id === type.id}
              onPress={() => {
                setSubmitEnabled(totalHours !== '')
                setSelectedTimeType(type)
              }}
            >
              <TimeTypeIcon
                lineColor={lineColor}
                fillLineColor={colors.officialBlue}
                fillColor={fillColor}
                height={36}
                width={36}
              />
            </TouchableOpacityTimeType>
            <TextTimeType>{t(stringFormatter.capitalizeEveryWord(type.slug))}</TextTimeType>
          </ViewButtonContainer>
        )
      })
    }
    return null
  }

  /** Calls submit if submit button enabled */
  function handleSubmitTimeEntry() {
    if (!submitEnabled) return

    if (timeEntryForEdit) {
      changeTimeEntry()
      setSubmitEnabled(false)
    }
    else {
      submitTimeEntry(date)
      setSubmitEnabled(false)
    }
  }

  /** Shows date picker if adding a time entry */
  function handleShowDatePicker() {
    if (!timeEntryForEdit) {
      showModal(modalConstants.DATE_PICKER_MODAL, {
        handleClose: handleDateSelectionCancel,
        handleSubmit: handleDateSelectionSuccess,
        date,
        changeDate,
        minDate,
        maxDate
      })
    }
  }

  /**
   * Sets a temporary date variable with calendar selected date
   * @param {Event} event - click event of device onChange event
   * @param {Date} date - selected date
  */
  function changeDate(event, date) {
    if (date) {
      pickedDate = date
      if (Platform.OS !== 'ios') handleDateSelectionSuccess()
    }
  }

  /** Resets temporary date data if user canceled picker transaction */
  function handleDateSelectionCancel() {
    pickedDate = null
    hideModal()
  }

  /** Sets local state with temporary date on successful picker transaction */
  function handleDateSelectionSuccess() {
    if (pickedDate) {
      setDate(pickedDate)
    }
    hideModal()
  }

  // Formats date for input value
  const formattedDate = dateHelper.getDateStringWithMonthName(date, 'short', 'numeric', i18n.language)
  return (
    <>
      <ViewInputRowWrapper>
        <TextLabelForEntry>{t('Date')}</TextLabelForEntry>
        <TouchableOpacityDateWrapper onPress={handleShowDatePicker}>
          <TextDateEntry shouldGreyOut={timeEntryForEdit}>
            {formattedDate}
          </TextDateEntry>
          <ViewCalendarWrapper>
            <CalendarIcon
              lineColor={timeEntryForEdit ? colors.gray50 : colors.charcoal}
              fillLineColor={timeEntryForEdit ? colors.gray50 : colors.charcoal}
            />
          </ViewCalendarWrapper>
        </TouchableOpacityDateWrapper>
      </ViewInputRowWrapper>
      <ViewInputRowWrapper>
        <TextLabelForEntry>{t('Total Hours')}</TextLabelForEntry>
        <ViewInputContainer>
          <VgTextInput
            keyboardType={'decimal-pad'}
            defaultValue={totalHours}
            messageOnError={hoursErrorMessage}
            onChangeText={handleTotalHoursChange}
            pattern={inputValidationHelper.regexValidNumberWithMaxTwoDecimals()}
            onBlur={setTotalHours}
            onBlurTextFormatter={handleTotalHoursOnBlur}
          />
        </ViewInputContainer>
      </ViewInputRowWrapper>
      <ViewInputRowWrapper>
        <TextLabelForEntry>{t('Time Entry Category')}</TextLabelForEntry>
        <ViewButtonsContainer>
          { createTimeTypeButtons() }
        </ViewButtonsContainer>
      </ViewInputRowWrapper>
      <ViewInputColumnWrapper>
        <TextLabelForEntryDescription>
          {t('Description')}
          <TextOptional>{`  (${t('Optional')})`}</TextOptional>
        </TextLabelForEntryDescription>
        <TextInputDescription
          keyboardPadding={keyboardPadding}
          multiline={true}
          value={description}
          onChangeText={(newDescription) => {
            setDescription(newDescription)
            setSubmitEnabled(totalHours !== '')
          }}
          onFocus={() => setKeyboardPadding(true)}
          onBlur={() => setKeyboardPadding(false) }
        ></TextInputDescription>
      </ViewInputColumnWrapper>
      <ViewGrowContainer>
        <VgButton
          handlePress={() => {
            collapseDrawer()
            analyticsService.logEvent('TimeTracking', 'Clicked', `Drawer_Cancel`)
          }}
          text={t('Cancel')}
          type={'cancel'}
        />
        <VgButton
          isDisabled={!submitEnabled}
          handlePress={handleSubmitTimeEntry}
          text={timeEntryForEdit ? t('Save Changes') : t('Submit Entry')}
          type='submit'
        />
      </ViewGrowContainer>
    </>
  )
}