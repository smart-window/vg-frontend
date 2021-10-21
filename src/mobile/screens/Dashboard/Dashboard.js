import React, {useEffect, useContext} from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types'
import {GlobalLoaderContext} from 'shared/providers/GlobalLoaderProvider'
import analyticsService from 'mobile/services/analyticsServiceMobile'
import dateHelper from 'shared/services/dateHelper'
import Card from 'mobile/components/Card/Card'
import TimeChart from 'mobile/components/TimeChart/TimeChart'
import BackdropWrapper from 'mobile/components/BackdropWrapper/BackdropWrapper'
import mobilePageConstants from 'mobile/constants/mobilePageConstants'
import {useTranslation} from 'react-i18next'
import ChevronArrow from 'mobile/icons/DynamicIcons/ChevronArrow'
import LightBulb from 'mobile/icons/DynamicIcons/LightBulb'
import ViewVgViewShadowed from 'mobile/components/VgViewShadowed/VgViewShadowed'
import TimeChartBlurredIcon from '/assets/images/blurredTimeChart.png'
import { colors } from 'shared/constants/cssConstants'
import {useQuery, gql} from '@apollo/client'
import {
  TextCardTitle,
  TextWeek,
  TouchableOpacityDetails,
  TextViewDetails,
  ViewButtonWrapper,
  ViewEmptyState,
  ViewEmptyStateInstructions,
  TextEmptyStateWrapper,
  TextEmptySpan,
  ImageTimeChartBlurred,
  TextEmpty
} from './Dashboard.styles'

export const TIME_CHART_DATA_QUERY = gql`
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

Dashboard.propTypes = {
  /** The history object to facilitate page redirects. */
  navigation: PropTypes.object
}
/**
 * The Dashboard component a user lands on after successful log in.
 * @category Components - Mobile
 * @namespace Dashboard
 */
export default function Dashboard({navigation}) {
  const {t, i18n} = useTranslation()
  const today = new Date()
  // Should this be based on language?
  const todayString = dateHelper.getDateStringWithMonthName(today, 'short', '2-digit', i18n.language)
  const eightDaysAgo = dateHelper.substractDaysFromDate(new Date(), 7)
  const eightDaysAgoString = dateHelper.getDateStringWithMonthName(eightDaysAgo, 'short', '2-digit', i18n.language)
  const {setIsLoading} = useContext(GlobalLoaderContext)

  /* eslint-disable no-unused-vars */
  const {loading, error, data} = useQuery(TIME_CHART_DATA_QUERY,
    {
      variables: {
        startDate: dateHelper.getStringDate(eightDaysAgo),
        endDate: dateHelper.getStringDate(today)
      }
    }
  )

  useEffect(function loadingScreenOnMount() {
    // On mount, show loading screen for 1 second only if need to
    if (loading) {
      setIsLoading(true)
    }
  }, [])

  /** Press Handler for button details */
  function onPressDetailsHandler() {
    let state
    if (!emptyState) {
      state = {
        today: new Date().valueOf(),
        eightDaysAgo: eightDaysAgo.valueOf()
      }
      analyticsService.logEvent('TimeTracking', 'Clicked', 'DashboardButton_WeekDetails')
    }
    else {
      analyticsService.logEvent('TimeTracking', 'Clicked', 'DashboardButton_EmptyState')
    }
    navigation.navigate(mobilePageConstants.TIMETRACKING, state)
  }

  const emptyState = (!data || !data.timeEntries.length)

  return (
    <View testID='Dashboard'>
      <BackdropWrapper title='Velocity Global'>
        <Card hasBorderTop={true} fillSpace={true} hasBorderBottom={true}>
          <TextCardTitle>{t('Your Last Week of Time Entries')}</TextCardTitle>
          <TextWeek>{`${eightDaysAgoString} - ${todayString}`}</TextWeek>
          {
            emptyState ?
              <ViewEmptyState>
                {
                  !loading &&
                    <>
                      <ViewEmptyStateInstructions>
                        <LightBulb
                          lineColor={colors.charcoal}
                          height={51}
                          width={59}
                        />
                        <TextEmptyStateWrapper>
                          <TextEmptySpan>{t('Make a Time Entry')}</TextEmptySpan>
                          <TextEmpty>{t(' in the Time Tracking area to see data on this page')}</TextEmpty>
                        </TextEmptyStateWrapper>
                      </ViewEmptyStateInstructions>
                      <ImageTimeChartBlurred
                        source={TimeChartBlurredIcon}
                        resizeMode={'cover'}
                      />
                    </>
                }
              </ViewEmptyState>
              :
              <TimeChart
                timeEntries={data?.timeEntries || []}
                timeTypes={data?.timeTypes || []}
              />
          }
          <ViewButtonWrapper>
            <ViewVgViewShadowed borderRadius={18}>
              <TouchableOpacityDetails onPress={onPressDetailsHandler}>
                <TextViewDetails>{emptyState ? t('Go To Time Tracking') : t('View details for this week')}</TextViewDetails>
                <ChevronArrow
                  height={24}
                  width={12}
                />
              </TouchableOpacityDetails>
            </ViewVgViewShadowed>
          </ViewButtonWrapper>
        </Card>
      </BackdropWrapper>
    </View>
  )
}