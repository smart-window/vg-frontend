import styled from 'styled-components/native'
import {colors, mobileFonts} from 'shared/constants/cssConstants'

export const ViewCharts = styled.View`
  width: 100%;
`

export const yAxisStyling = {
  axis: {
    stroke: colors.white
  },
  tickLabels: {
    fontFamily: mobileFonts.deviceSpecificFont,
    fontSize: 12,
  },
  grid: {
    stroke: ({ tick }) => tick === 8 ? colors.charcoal : 'transparent'},
}

export const xAxisStyling = {
  axis: {
    stroke: colors.white
  },
  axisLabel: {fontSize: 12, padding: 30},
  tickLabels: {
    fontFamily: mobileFonts.deviceSpecificFont,
    fontSize: 12,
    fill: (tick) => {
      return new Date().getDate() === parseInt(tick.text) ? colors.officialBlue : colors.charcoal
    },
    fontWeight: (tick) => {
      if (new Date().getDate() === parseInt(tick.text)) return 600
    }
  }
}

export const victoryBarStyling = {
  data: {
    fill: ({ datum }) => datum.color
  }
}