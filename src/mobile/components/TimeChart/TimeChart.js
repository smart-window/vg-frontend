import React, {useState, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import { Dimensions } from 'react-native'
import HorizontalLegend from 'mobile/components/HorizontalLegend/HorizontalLegend'
import TimeChartSummary from './TimeChartSummary/TimeChartSummary'
import timeEntriesHelper from 'shared/services/timeEntriesHelper'
import Svg from 'react-native-svg'
import {colors} from 'shared/constants/cssConstants'
import {timeTypesDisplayData} from 'shared/constants/timeTrackingConstants'
import {
  VictoryBar,
  VictoryStack,
  VictoryChart,
  VictoryAxis
} from 'victory-native'

import {
  ViewCharts,
  yAxisStyling,
  xAxisStyling,
  victoryBarStyling
} from './TimeChart.styles'
import stringFormatter from 'shared/services/stringFormatter'
import dateHelper from 'shared/services/dateHelper'

/**
 * A stacked chart component with Victory Native.
 * Displays a user's weekly time tracking data.
 * @category Components - Mobile
 * @namespace TimeChart
 */
export default function TimeChart({
  timeEntries,
  timeTypes
}) {
  const {t, i18n} = useTranslation()
  const barWidth = Dimensions.get('window').width - 24 - 40 - 36 // 24 is backdrop padding, 42 is y axis, 36 is card padding
  const [clickedBarName, setClickedBarName] = useState(null)
  const [legendItems, setLegendItems] = useState([])
  const [victoryBars, setVictoryBars] = useState([])
  const [totalHoursWorked, setTotalHoursWorked] = useState(0)

  useEffect(function didUpdate() {
    buildChartLegend(timeTypes)
  }, [timeTypes, i18n.language])

  useEffect(function didUpdate() {
    const eightDaysAgo = dateHelper.substractDaysFromDate(new Date(), 7)
    const daysOfTheWeek = dateHelper.getMultipleDays(eightDaysAgo, new Date())
    const formattedTimeEntries = timeEntriesHelper.collapseTimeEntriesForChart(timeEntries, daysOfTheWeek)
    const formattedTimeEntriesWithWeekends = timeEntriesHelper.addWeekendEntries(formattedTimeEntries, daysOfTheWeek)
    buildVictoryBars(formattedTimeEntriesWithWeekends)
    calculateSummaryHours(timeEntries)
  }, [timeEntries])

  /**
   * Create the Time Chart legend items based on fetched Time Types
   * @param {array} timeTypes - array of fetched time type objects
  */
  function buildChartLegend(timeTypes) {
    const legendItems = timeTypes.map(type => {
      const timeTypeName = type.slug
      const color = timeTypeName === 'weekends' ? colors.coolGray : timeTypesDisplayData[timeTypeName].colorRepresentation
      return {
        label: t(stringFormatter.capitalizeEveryWord(timeTypeName)),
        markerColor: color
      }
    })
    legendItems.unshift({label: t('Weekends')})
    setLegendItems(legendItems)
  }

  /**
   * Loop over each work category and create a bar for each category
   * @param {clickedProps} - The properties of the graph data clicked
  */
  function displayDayInfo(clickedProps) {
    if (clickedProps.datum.xName !== clickedBarName) {
      setClickedBarName(clickedProps.datum.xName)
    }
    else {
      setClickedBarName(null)
    }
  }

  /**
   * Creates Victory Bars for each time type to display total hours logged per day
   * @param {object} timeEntries - fetched time entries formatted to contain total hours logged per day by time type
  */
  function buildVictoryBars(timeEntries) {
    // Loop over each work category and create a bar for each time type
    const bars = Object.keys(timeEntries).map((timeType) => {
      const weeklyData = []
      const color = timeType === 'weekends' ? colors.coolGray : timeTypesDisplayData[timeType].colorRepresentation
      Object.keys(timeEntries[timeType]).forEach(date => {
        const day = date.split('-')[2]
        const dayData = {x: day, y: timeEntries[timeType][date], color}
        weeklyData.push(dayData)
      })
      return (
        <VictoryBar
          key={timeType}
          style={victoryBarStyling}
          data={weeklyData}
          barWidth={(barWidth / 8) - 4}
          events={[{
            target: 'data',
            eventHandlers: {
              onPress: (event, clickedProps) => displayDayInfo(clickedProps),
            }
          }]}
        />
      )
    })

    setVictoryBars(bars)
  }

  /**
   * Calculate the number of hours the user has worked the past 8 days
   * @param {array} timeEntries - array of time entry objects
   */
  function calculateSummaryHours(timeEntries){
    const totalHoursWorked = timeEntries.reduce((totalHours, entry) => {
      // TODO: establish time type as work time type in time policy
      if (entry.timeType.slug.includes('work')) totalHours += entry.totalHours
      return totalHours
    }, 0)
    setTotalHoursWorked(totalHoursWorked)
  }
  return (
    <ViewCharts testID='TimeChart'>
      <Svg accessibilityLabel='Time tracking chart' height={300}>
        <VictoryChart
          domain={{ y: [0, 12] }}
          domainPadding={{ x: 22, y: 5 }} standalone={false}
        >
          <VictoryStack
            colorScale={[colors.officialBlue, colors.green, colors.yellow]}
          >
            {victoryBars}
          </VictoryStack>
          <VictoryAxis
            dependentAxis
            tickValues={[4, 8, 12]}
            tickFormat={(tick) => `${tick}${t('hr')}`}
            crossAxis={true}
            style={yAxisStyling}/>
          <VictoryAxis
            label={t('Date')}
            crossAxis={true}
            style={xAxisStyling}/>
        </VictoryChart>
      </Svg>
      <HorizontalLegend
        legendItems={legendItems}
      />
      <TimeChartSummary
        totalHoursWorked={totalHoursWorked}
      />
    </ViewCharts>
  )
}