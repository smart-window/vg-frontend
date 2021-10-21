import styled, {css} from 'styled-components/native'
import {colors, mobileFonts} from 'shared/constants/cssConstants'

export const ViewCalendarLegend = styled.View`
  width: 100%;
  padding: 6px 12px 0 12px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const ViewLegendItemWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
  margin-left: ${props => props.isFirst ? 0 : 9}px;
`

export const ViewLegendMarker = styled.View`
  width: 9px;
  height: 9px;
  background-color: ${props => props.markerColor ? props.markerColor : colors.coolGray};
  ${props => props.markerStyle === 'rounded' && css`
    border-radius: 5px;
  `}
`
export const TextLegendDescriptor = styled.Text`
  font-family: ${mobileFonts.openSans(400)};
  font-size: 9px;
  line-height: 12px;
  margin-left: 6px;
`