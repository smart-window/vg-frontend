import styled from 'styled-components/native'
import {colors, mobileFonts} from 'shared/constants/cssConstants'

export const TextCardTitle = styled.Text`
  font-family: ${mobileFonts.openSans(400)};
  font-size: 18px;
  padding: 18px 18px 0 18px;
  width: 100%;
`

export const TextWeek = styled.Text`
  width: 100%;
  padding-left: 18px;
  font-family: ${mobileFonts.openSans(400, true)};
  color: ${colors.gray50};
  font-size: 12px;
  line-height: 16px;
`

export const TouchableOpacityDetails = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: ${colors.white};
  border-width: 1px;
  border-color: ${colors.officialBlue};
  border-radius: 15px;
  z-index: 2;
`

export const TextViewDetails = styled.Text`
  margin-right: 12px;
  font-family: ${mobileFonts.openSans(600)};
  color: ${colors.officialBlue};
  font-size: 18px;
  line-height: 21px;
`

export const ViewButtonWrapper = styled.View`
  width: 100%;
  padding: 0 30px;
  margin-bottom: 18px;
`

export const ViewEmptyState = styled.View`
  position: relative;
  margin: 39px 0px 21px 0px;
  width: 100%;
  padding: 0 18px;
  min-height: 400px;
`

export const ViewEmptyStateInstructions = styled.View`
  position: absolute;
  top: 100px;
  left: 18px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 1;
`

export const TextEmptyStateWrapper = styled.Text`
  width: 215px;
`

export const TextEmpty = styled.Text`
  font-family: ${mobileFonts.openSans(400, true)};
`

export const TextEmptySpan = styled.Text`
  font-family: ${mobileFonts.openSans(700, true)};
`

export const ImageTimeChartBlurred = styled.ImageBackground`
  width: 100%;
  height: 411px;
  display: flex;
  justify-content: center;
`