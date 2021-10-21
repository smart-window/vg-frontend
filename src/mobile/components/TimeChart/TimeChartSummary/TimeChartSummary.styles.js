import styled from 'styled-components/native'
import {colors, mobileFonts} from 'shared/constants/cssConstants'

export const ViewChartInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 21px;
  border-width: 1px;
  border-color: ${colors.officialBlue};
  margin: 37px 30px;

`

export const ViewTextContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 18px 0;
`

export const TextLabel = styled.Text`
  font-family: ${mobileFonts.openSans(400)};
  font-size: 12px;
  font-style: italic;
  color: ${colors.charcoal};
  text-align: center;
`

export const TextHours = styled.Text`
  font-family: ${mobileFonts.openSans(400)};
  font-size: 24px;
  color: ${colors.charcoal};
  text-align: center;
`

export const ViewBlueHr = styled.View`
  width: 1px;
  height: 70%;
  border-left-width: 1px;
  border-color: ${colors.officialBlue};
`