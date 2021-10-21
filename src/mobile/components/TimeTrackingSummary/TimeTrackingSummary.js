import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'
import {View} from 'react-native'

import {GlobalModalContext} from 'shared/providers/GlobalModalProvider'
import dateHelper from 'shared/services/dateHelper'
import analyticsService from 'mobile/services/analyticsServiceMobile'
import stringFormatter from 'shared/services/stringFormatter'
import SwipeableRow from 'mobile/components/SwipeableRow/SwipeableRow'
import modalConstants from 'mobile/constants/modalConstants'

import LightBulb from 'mobile/icons/DynamicIcons/LightBulb'
import AddIcon from 'mobile/icons/StaticIcons/AddIcon'
import EditPencil from 'mobile/icons/DynamicIcons/EditPencil'
import TrashIcon from 'mobile/icons/DynamicIcons/TrashIcon'
import PullOutArrow from 'mobile/icons/StaticIcons/PullOutArrow'

import {
  ViewDateInspector,
  ViewInstructionsWrapper,
  ViewInstructionsTextWrapper,
  TextFlexRow,
  TextBoldDateSelectInstructions,
  TextDateSelectInstructions,
  ViewTimeEntries,
  TextTimeEntry,
  TouchableOpacityAddEntry,
  ViewNoEntriesInstructions,
  TextNoEntriesYet,
  ViewTimeEntry,
  TextEntry,
  TouchableOpacityQuickAction,
  ViewRowContainer
} from './TimeTrackingSummary.styles'

TimeTrackingSummary.propTypes = {
  /** Object containing user time tracking information. */
  dayData: PropTypes.object,
  /** Array containing the currently selected week to display info about */
  selectedWeek: PropTypes.array,
  /** Called when the user deletes a time entry */
  handleTimeEntryDelete: PropTypes.func
}

/**
 * A component that displays further information about a user's weekly time tracking.
 * @category Components - Mobile
 * @namespace TimeTrackingSummary
 */
export default function TimeTrackingSummary({
  selectedTimeEntries,
  handleDrawerExpansion,
  handleTimeEntryDelete
}) {
  const { t, i18n } = useTranslation()
  const {showModal} = useContext(GlobalModalContext)

  /**
   * Format a date string from '2020-05-15' to  15 May 2020 (year optional)
   * @param {string} dateString - the date in string format of "2020-05-15"
   * @param {bool} includeYear - an indicator of whether or not to include year in returned string
   * Note: If this function is needed outside of this component, please move to dateHelper.js
  */
  function formatDateStringForSummary(dateString, includeYear) {
    const splitTimeEntryDateString = dateString.split('-')
    const year = splitTimeEntryDateString[0]
    const month = splitTimeEntryDateString[1] - 1
    const day = splitTimeEntryDateString[2]
    const newDate = new Date(year, month, day)
    const stringifiedDate = dateHelper.getDateStringWithMonthName(newDate, 'long', '2-digit', i18n.language)
    return stringifiedDate
  }

  /**
   * Returns a RN text element for every date that has been selected
   * @returns array of RN Text elements
   */
  function createTimeEntriesSection() {
    return selectedTimeEntries.map((timeEntry) => {
      const timeEntryDateString = formatDateStringForSummary(Object.keys(timeEntry)[0], true)
      return (
        <View key={timeEntryDateString}>
          <TextTimeEntry>{(`${timeEntryDateString}`).toUpperCase()}</TextTimeEntry>
          { createTimeEntries(timeEntry) }
        </View>
      )
    })
  }

  /**
   * Returns a Swipeable time entry row if data exists, otherwise returns an empty state
   * @param {object} timeEntry - a single time entry in the format of:
   *  {
   *    '2020-10-10': {
   *      totals: {
   *        'Work Time': [{'Work Time': 5}, {'Work Time': 4}],
   *        'Break Time': [{'Break Time': 1'}],
   *        'Planned Absence': [{'Planned Absence': 1}],
   *      marked: true
   *     }
   *  }
   */
  function createTimeEntries(timeEntry) {
    const timeEntryDate = Object.keys(timeEntry)[0]
    if (timeEntry[timeEntryDate].totals) {
      return Object.keys(timeEntry[timeEntryDate].totals).reduce((timeEntries, timeType) => {
        timeEntry[timeEntryDate].totals[timeType].forEach((entry) => {

          // create quick actions for <SwipeableRow>
          const deleteActionJsx =
            <TouchableOpacityQuickAction testID={'deleteEntry'}>
              <TrashIcon/>
            </TouchableOpacityQuickAction>

          const editActionJsx =
          <TouchableOpacityQuickAction>
            <EditPencil height={20} width={20} />
          </TouchableOpacityQuickAction>

          const formattedDate = dateHelper.getTextStringFromNumericDateString(timeEntryDate)
          const quickActions = [
            {
              xOffset: 48,
              jsx: deleteActionJsx,
              onPress: () => {
                showModal(modalConstants.CONFIRMATION_MODAL, {
                  handleSubmit: () => handleTimeEntryDelete(entry.id),
                  // TODO: i18n parameterized translations
                  message: `${t('Are you sure you want to delete your')} ${timeType} ${t('entry for')} ${formattedDate}?`,
                  submitButtonText: t('Delete Entry')
                })
              }
            },
            {
              xOffset: 96,
              jsx: editActionJsx,
              onPress: () => handleDrawerExpansion(timeEntryDate, entry.id)
            }
          ]

          timeEntries.push(
            <ViewRowContainer key={entry.id}>
              <SwipeableRow rightActions={quickActions}>
                <ViewTimeEntry>
                  <TextEntry>{`${stringFormatter.addZeroesToDecimal(`${entry[timeType]}`)}   ${t(timeType)}`}</TextEntry>
                  <PullOutArrow />
                </ViewTimeEntry>
              </SwipeableRow>
            </ViewRowContainer>
          )
        })
        return timeEntries
      }, [])
    }
    else {
      const splitDate = timeEntryDate.split('-')
      const newTimeEntryDate = new Date(splitDate[0], (splitDate[1] - 1), splitDate[2])
      const isFutureDate = newTimeEntryDate > new Date()
      return (
        <ViewNoEntriesInstructions key={timeEntryDate}>
          <TextNoEntriesYet>{!isFutureDate ? `${t('No entries yet')}. ${t('Add one')}!` : t('Entries can’t be made for future dates') }</TextNoEntriesYet>
          <TouchableOpacityAddEntry onPress={() => {
            handleDrawerExpansion(timeEntryDate)
            analyticsService.logEvent('TimeTracking', 'Clicked', `Drawer_NoEntriesYet`)
          }}>
            {!isFutureDate && <AddIcon />}
          </TouchableOpacityAddEntry>
        </ViewNoEntriesInstructions>
      )
    }
  }

  return (
    <ViewDateInspector isWeeklyView={selectedTimeEntries && selectedTimeEntries.length > 1}>
      {
        !selectedTimeEntries &&
        <ViewInstructionsWrapper>
          <LightBulb/>
          <ViewInstructionsTextWrapper>
            <TextFlexRow isRow={true}>
              <TextBoldDateSelectInstructions>
                {t('Press')}
              </TextBoldDateSelectInstructions>
              <TextDateSelectInstructions>
                {t(' to select a day')}
              </TextDateSelectInstructions>
            </TextFlexRow>
            <TextFlexRow isRow={true}>
              <TextBoldDateSelectInstructions>
                {t('Long press')}
              </TextBoldDateSelectInstructions>
              <TextDateSelectInstructions>
                {t(' to select an entire week')}
              </TextDateSelectInstructions>
            </TextFlexRow>
          </ViewInstructionsTextWrapper>
        </ViewInstructionsWrapper>
      }
      {
        selectedTimeEntries &&
        <ViewTimeEntries>
          { createTimeEntriesSection() }
        </ViewTimeEntries>
      }
    </ViewDateInspector>
  )
}