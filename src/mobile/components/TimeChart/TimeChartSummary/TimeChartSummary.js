import React from 'react'
import {useTranslation} from 'react-i18next'
import {
  ViewChartInfo,
  ViewTextContainer,
  TextLabel,
  TextHours,
  ViewBlueHr
} from './TimeChartSummary.styles'

/**
 * A summary to display the time tracking total and average work hours
 * @category Components - Mobile
 * @namespace TimeChartSummary
 */
export default function TimeChartSummary({totalHoursWorked}) {
  const {t} = useTranslation()
  const averageHoursWorked = Math.round((totalHoursWorked / 8) * 100) / 100
  return (
    <ViewChartInfo>
      <ViewTextContainer>
        <TextHours>{`${totalHoursWorked} ${t('hr')}`}</TextHours>
        <TextLabel>{t('total time worked')}</TextLabel>
      </ViewTextContainer>
      <ViewBlueHr />
      <ViewTextContainer>
        <TextHours>{`${averageHoursWorked} ${t('hr')}`}</TextHours>
        <TextLabel>{t('daily avg time worked')}</TextLabel>
      </ViewTextContainer>
    </ViewChartInfo>
  )
}