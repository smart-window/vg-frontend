import styled, {css} from 'styled-components/native'
import {colors, mobileFonts} from 'shared/constants/cssConstants'

export const TouchableOpacityContainer = styled.TouchableOpacity`
  position: relative;
  display: flex;
    justify-content: center;
    align-items: center;
  /* TODO: button is currently assumed to take up half the container width, but we need more flexible patterns */
  width: 49%;
  max-width: 176px;
  height: 54px;
  border-radius: 21px;
  ${props => (props.type === 'submit') && css`
    background: ${colors.officialBlue};
    opacity: 1;
  `}
`

export const TextButtonAction = styled.Text`
  font-family: ${mobileFonts.openSans(400)};
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: ${props => props.isWhite ? colors.white : colors.charcoal};
`

export const ViewDisabledOverlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  opacity: 0.5;
  z-index: 1;
`