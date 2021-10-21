import styled, {css} from 'styled-components/native'
import {colors, mobileFonts} from 'shared/constants/cssConstants'

export const ViewInputRowWrapper = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
`

export const ViewInputColumnWrapper = styled.View`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 30px 12px 0 12px;
`

export const TextLabelForEntry = styled.Text`
  font-family: ${mobileFonts.openSans(400)};
  font-size: 15px;
  line-height: 20px;
  margin-right: 18px;
  color: ${colors.charcoal};
  text-align: right;
  max-width: 100px;
`

export const TextLabelForEntryDescription = styled.Text`
  font-family: ${mobileFonts.openSans(400)};
  font-size: 15px;
  line-height: 20px;
  margin-right: 18px;
  color: ${colors.charcoal};
`

export const TextDateEntry = styled.Text`
  width: 194px;
  height: 39px;
  margin-right: 3px;
  border-width: 1px;
  border-color: ${colors.gray50};
  border-radius: 6px;
  font-family: ${mobileFonts.openSans(400)};
  font-size: 15px;
  line-height: 20px;
  color: ${colors.charcoal};
  padding-left: 12px;
  padding-top: 8px;
  ${props => props.shouldGreyOut && css`
    color: ${colors.gray50}
    border-color: ${colors.gray50}
  `}
`

export const TextInputDescription = styled.TextInput`
  width: 100%;
  height: 78px;
  margin-top: 9px;
  margin-right: 3px;
  margin-bottom: ${props => props.keyboardPadding ? 80 : 0}px;
  border-width: 1px;
  border-color: ${colors.gray50};
  border-radius: 6px;
  font-family: ${mobileFonts.openSans(400)};
  font-size: 15px;
  line-height: 20px;
  color: ${colors.charcoal};
  padding: 12px;
`

export const TextOptional = styled.Text`
  font-family: ${mobileFonts.openSans(400, true)};
  font-size: 12px;
  line-height: 16px;
  color: ${colors.gray50};
`

export const ViewButtonsContainer = styled.View`
  display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
  width: 194px;
  margin-top: 30px;
`

export const ViewButtonContainer = styled.View`
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  margin-left: ${ props => props.isFirst ? 0 : '6px'};
  width: 97px;
`

export const TouchableOpacityTimeType = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 66px;
  background: ${ props => props.isSelected ? colors.officialBlue : colors.white};
  border-width: 1px;
  border-color: ${colors.officialBlue};
  border-radius: 21px;
`

export const TextTimeType = styled.Text`
  margin-top: 6px;
  font-family: ${mobileFonts.openSans(400)};
  font-size: 12px;
  line-height: 16px;
  color: ${colors.charcoal};
`

export const TouchableOpacityDateWrapper = styled.TouchableOpacity``

export const ViewCalendarWrapper = styled.View`
  position: absolute;
  top: 5px;
  right: 9px;
`

export const ViewGrowContainer = styled.View`
  display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    flex-grow: 1;
  width: 100%;
  margin-top: 30px;
`

export const ViewInputContainer = styled.View`
  width: 194px;
  height: 39px;
  margin-right: 3px;
`