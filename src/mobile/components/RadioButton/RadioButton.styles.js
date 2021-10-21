import styled, {css} from 'styled-components/native'
import { colors, mobileFonts } from 'shared/constants/cssConstants'

export const ViewRadioButton = styled.View`
  display: flex;
    align-items: center;
    justify-content: center;
  height: 30px;
  width: 30px;
  border: 2px solid ${colors.gray50};
  border-radius: 100px;
  ${props => props.checked &&
    css`
      border: 2px solid ${colors.officialBlue};
    `}
`

export const ViewSelectedRadioButton = styled.View`
  height: 16px;
  width: 16px;
  border-radius: 100px;
  background-color: ${colors.officialBlue};
`

export const TouchableOpacityListItem = styled.TouchableOpacity`
  display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  width: 100%;
  padding: 12px 27px;
  border-top-width: 0.5px;
  border-top-color: ${colors.lightGray};
  ${props => props.isFirst &&
  css`
    border-top-width: 0px;
  `}
`

export const ViewTextContainer = styled.View`
  margin-left: 33px;
`

export const TextItem = styled.Text`
  font-family: ${mobileFonts.openSans(400)};
  font-size: 18px;
  line-height: 18px;
  color: ${colors.charcoal};
`

export const TextItemInfo = styled.Text`
  font-family: ${mobileFonts.openSans(400)};
  font-size: 18px;
  line-height: 18px;
  color: ${colors.gray50};
  margin-top: 3px;
`