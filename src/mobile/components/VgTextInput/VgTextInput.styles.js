import styled from 'styled-components/native'
import {colors, mobileFonts} from 'shared/constants/cssConstants'

export const TextInputWithValidation = styled.TextInput`
  width: 100%;
  height: 100%;
  border-width: 1px;
  border-color: ${props => props.isValid ? colors.gray50 : colors.uiAlertRed};
  border-radius: 6px;
  font-family: ${mobileFonts.openSans(400)};
  font-size: 15px;
  line-height: 20px;
  color: ${colors.charcoal};
  padding-left: 12px;
`

export const TextNotValid = styled.Text`
  font-family: ${mobileFonts.openSans(400, true)};
  font-size: 12px;
  line-height: 16px;
  color: #BD0000;
`

export const ViewInputContainer = styled.View`
  position: relative;
  width: 100%;
  height: 100%;
`

export const ViewNotValidIcon = styled.View`
  position: absolute;
  top: ${props => props.inputHeight ? ((props.inputHeight - 24) / 2) : 3}px;
  right: 6px;
`