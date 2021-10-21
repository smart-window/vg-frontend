import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  Dimensions,
  View,
} from 'react-native'
import { useMutation, gql } from '@apollo/client'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import dateHelper from 'shared/services/dateHelper'
import stringFormatter from 'shared/services/stringFormatter'
import analyticsService from 'mobile/services/analyticsServiceMobile'
import {LinearGradient} from 'expo-linear-gradient'
import AddIcon from 'mobile/icons/StaticIcons/AddIcon'
import {colors, measurements} from 'shared/constants/cssConstants'
import {useTranslation} from 'react-i18next'
import XIcon from 'mobile/icons/StaticIcons/XIcon'
import {PanGestureHandler, State} from 'react-native-gesture-handler'
import DismissKeyboard from 'mobile/components/DismissKeyboard/DismissKeyboard'

import {
  TouchableOpacityAddTime,
  TextAddTime,
  linearGradientStyle,
  TextDrawerTitle,
  TouchableOpacityXWrapper,
  animatedViewStyles,
  ViewDrawerContents,
  TouchableOpacityBackdrop,
  ScrollViewDrawerContents,
  SafeAreaViewContentWrapper
} from './TimeEntryDrawer.styles'
import TimeEntryDrawerForm from './TimeEntryDrawerForm/TimeEntryDrawerForm'

TimeEntryDrawer.propTypes = {
  /** The user's date selected to add time entry too */
  selectedDate: PropTypes.object,
  /** The fetched time types associated to the user's time policy */
  timeTypes: PropTypes.array,
  /** A function that sets state of the parent's marked dates to
   * trigger calendar rerender on time entry submission */
  setMarkedDates: PropTypes.func
}

export const CREATE_TIME_ENTRY_MUTATION = gql`
  mutation CreateTimeEntry(
    $eventDate: Date!,
    $totalHours: Float!,
    $description: String!,
    $timeTypeId: ID!
  ) {
    createTimeEntry(
      eventDate: $eventDate,
      totalHours: $totalHours,
      description: $description,
      timeTypeId: $timeTypeId
    ) {
      id
      eventDate
      description
      totalHours
      timeTypeId
      userId
      timePolicy {
        id
        slug
      }
      timeType {
        id
        slug
      }
    }
  }
`

export const EDIT_TIME_ENTRY_MUTATION = gql`
  mutation EditTimeEntry($id: ID!, $totalHours: Float!, $description: String!, $timeTypeId: ID!) {
    editTimeEntry(id: $id, totalHours: $totalHours, description: $description, timeTypeId: $timeTypeId) {
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
  }
`

/**
 * A drawer that allows users to add a time entry in.
 * @category Modules - Mobile
 * @namespace TimeEntryDrawer
 */
export default function TimeEntryDrawer({
  selectedDate,
  timeTypes,
  setMarkedDates,
  shouldExpandDrawer,
  handleDrawerExpansion,
  timeEntryForEdit,
  setTimeEntryForEdit
}) {
  const [date, setDate] = useState(selectedDate)
  const [totalHours, setTotalHours] = useState('')
  const [description, setDescription] = useState('')
  const [selectedTimeType, setSelectedTimeType] = useState(timeTypes[0])
  const [isExpanded, setIsExpanded] = useState(false)
  const currentDrawerHeight = new Animated.Value(61)
  const heightAnim = useRef(currentDrawerHeight).current
  const [apiError, setApiError] = useState({})
  const {t} = useTranslation()
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top

  useEffect(function didUpdate(){
    // Updates timeTypes when parent's async fetch returns
    if (timeTypes && !selectedTimeType) {
      setSelectedTimeType(timeTypes[0])
    }
  }, [timeTypes, selectedTimeType])

  useEffect(function didUpdate() {
    // Expand drawer if parent indicates to
    if (shouldExpandDrawer) {
      expandDrawer()
      if (timeEntryForEdit) {
        // TODO: move hours, description and timetype to form component
        setTotalHours(JSON.stringify(timeEntryForEdit.totalHours))
        setDescription(timeEntryForEdit.description ? timeEntryForEdit.description : '')
        setSelectedTimeType(timeTypes.find(type => type.id === timeEntryForEdit.timeTypeId))
      }
    }
  }, [shouldExpandDrawer])

  /** Triggers drawer's animation to expand */
  function expandDrawer() {
    // Will change heightAnim value to 1 in 300 milliseconds
    Animated.timing(heightAnim, {
      toValue: Dimensions.get('window').height - measurements.mobileNavBarHeight -
        paddingTop - measurements.mobilePageHeaderHeight - measurements.mobileBackdropPadding,
      duration: 300,
      useNativeDriver: false,
    }).start()
    setIsExpanded(true)
    setDate(selectedDate)
  }

  /** Trigger drawer to close and reset all values */
  function collapseDrawer() {
    // Will change heightAnim value to 0 in 300 milliseconds
    Animated.timing(heightAnim, {
      toValue: 61,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      resetAllDrawerValues()
    })
  }

  /** Resets all default values and data for time entry form */
  function resetAllDrawerValues() {
    setTotalHours('')
    setDescription('')
    setIsExpanded(false)
    setSelectedTimeType(timeTypes[0])
    handleDrawerExpansion(false)
    setTimeEntryForEdit(null)
    setDate(selectedDate)
    setApiError({})
  }

  /** Creates an Animated event on gesture */
  const _onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          y: currentDrawerHeight
        },
      },
    ],
    { useNativeDriver: false }
  )

  /** Expands drawer when gesture occurs */
  function _onHandlerStateChange(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      if (event.nativeEvent.translationY < -50) {
        expandDrawer()
      }
    }
  }

  /**
   * Submits a new time entry via CreateTimeEntry query
   * @param {Date} date - date for submitted entry
  */
  function submitTimeEntry(date) {
    const eventDate = dateHelper.getStringDate(date)
    const totalHoursReplacedCommas = totalHours.replace(/,/g, '.')
    createTimeEntry({
      variables: {
        eventDate,
        totalHours: parseFloat(totalHoursReplacedCommas),
        description: description,
        timeTypeId: selectedTimeType.id
      },
    })
    const capitalizedTimeType = stringFormatter.capitalizeEveryWord(selectedTimeType.slug)
    analyticsService.logEvent(
      'TimeTracking', 'Clicked',
      `SubmitTimeEntry_TotalHours${stringFormatter.removeSpaces(capitalizedTimeType)}`
    )
  }

  /** Edits a time entry via EditTimeEntry query */
  function changeTimeEntry() {
    const totalHoursReplacedCommas = totalHours.replace(/,/g, '.')
    editTimeEntry({
      variables: {
        id: timeEntryForEdit.id,
        totalHours: parseFloat(totalHoursReplacedCommas),
        description: description,
        timeTypeId: selectedTimeType.id
      },
    })
  }

  /**
   *  Mutation query to create a new time Entry
   *  @returns {object} createQuery - returned query from mutation request
  */
  /* eslint-disable no-unused-vars */
  const [createTimeEntry] = useMutation(
    CREATE_TIME_ENTRY_MUTATION, {
      onCompleted: collapseDrawer,
      onError: (error) => setApiError(error),
      update(cache, { data: { createTimeEntry } }) {
        const monthOfAddedDate = createTimeEntry.eventDate.split('-')[1] - 1
        const monthBeingDisplayed = selectedDate.getMonth()
        // Do not clear marked dates if the date of the added time entry is not in the current month
        if (monthOfAddedDate === monthBeingDisplayed) {
          setMarkedDates(null)
        }
        cache.modify({
          fields: {
            timeEntries(existingEntries = []) {
              const newEntryRef = cache.writeFragment({
                data: createTimeEntry,
                fragment: gql`
                  fragment TimeEntry on TimeEntries {
                    id
                    eventDate
                    description
                    totalHours
                    timeTypeId
                    userId
                    timePolicy {
                      id
                      slug
                    }
                    timeType {
                      id
                      slug
                    }
                  }
                `
              })
              return [...existingEntries, newEntryRef]
            }
          }
        })
      }
    }
  )

  /**
   *  Mutation query to edit time Entry
   *  @returns {object} editQuery - returned object with data, loading and error, unused
  */
  /* eslint-disable no-unused-vars */
  const [editTimeEntry] = useMutation(
    EDIT_TIME_ENTRY_MUTATION, {
      onCompleted: collapseDrawer,
      onError: (error) => setApiError(error),
      update(cache, { data: { editTimeEntry } }) {
        cache.modify({
          fields: {
            timeEntries(existingEntries = []) {
              setMarkedDates(null)
              const newEntryRef = cache.writeFragment({
                data: editTimeEntry,
                fragment: gql`
                  fragment TimeEntry on TimeEntries {
                    id
                    eventDate
                    description
                    totalHours
                    timeTypeId
                    userId
                    timePolicy {
                      id
                      slug
                    }
                    timeType {
                      id
                      slug
                    }
                  }
                `
              })
              const newEntries = existingEntries.map(entry => {
                const id = entry.__ref.split(':')[1]
                if (id === editTimeEntry.id) {
                  return newEntryRef
                }
                return entry
              })
              return newEntries
            }
          }
        })
      }
    }
  )
  return (
    <>
      <LinearGradient
        testID='LinearGradientBottom'
        colors={['rgba(255,255,255,0.4)', colors.charcoal]}
        style={linearGradientStyle}
      />
      {isExpanded && <TouchableOpacityBackdrop onPress={collapseDrawer} />}
      <PanGestureHandler
        enabled={!isExpanded}
        onGestureEvent={_onGestureEvent}
        onHandlerStateChange={_onHandlerStateChange}
      >
        <Animated.View
          style={[
            animatedViewStyles,
            {height: heightAnim}
          ]}
          testID={'AnimatedView'}
        >
          {
            !isExpanded &&
            <TouchableOpacityAddTime
              onPress={() => {
                expandDrawer()
                analyticsService.logEvent('TimeTracking', 'Clicked', `Drawer_+AddTimeEntry`)
              }}
            >
              <AddIcon />
              <TextAddTime>{t('Add Time Entry')}</TextAddTime>
            </TouchableOpacityAddTime>
          }
          <SafeAreaViewContentWrapper>
            <ScrollViewDrawerContents
              contentContainerStyle={{flexGrow: 1}}
              nestedScrollEnabled={true}
            >
              <DismissKeyboard>
                <ViewDrawerContents>
                  {
                    isExpanded &&
                    <View>
                      <TouchableOpacityXWrapper
                        onPress={() => {
                          collapseDrawer()
                          analyticsService.logEvent('TimeTracking', 'Clicked', `Drawer_Cancel`)
                        }}
                      >
                        <XIcon/>
                      </TouchableOpacityXWrapper>
                      <TextDrawerTitle>
                        { timeEntryForEdit ?
                          t('Edit Time Entry') :
                          t('New Time Entry')
                        }
                      </TextDrawerTitle>
                    </View>
                  }
                  <TimeEntryDrawerForm
                    timeTypes={timeTypes}
                    collapseDrawer={collapseDrawer}
                    submitTimeEntry={submitTimeEntry}
                    totalHours={totalHours}
                    setTotalHours={setTotalHours}
                    description={description}
                    setDescription={setDescription}
                    selectedTimeType={selectedTimeType}
                    setSelectedTimeType={setSelectedTimeType}
                    timeEntryForEdit={timeEntryForEdit}
                    changeTimeEntry={changeTimeEntry}
                    date={date}
                    setDate={setDate}
                    apiErrorMessage={apiError?.message}
                  />
                </ViewDrawerContents>
              </DismissKeyboard>
            </ScrollViewDrawerContents>
          </SafeAreaViewContentWrapper>
        </Animated.View>
      </PanGestureHandler>
    </>
  )
}