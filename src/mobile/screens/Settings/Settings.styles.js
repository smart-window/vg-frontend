import styled, {css} from 'styled-components/native'
import {colors, mobileFonts} from 'shared/constants/cssConstants'

export const ViewSettingsCard = styled.View`
  width: 100%;
  padding: 30px;
`

export const TextSettings = styled.Text`
  font-family: ${mobileFonts.openSans(400)};
  font-size: 21px;
  margin-top: 18px;
`

export const TouchableOpacitySignOutCard = styled.TouchableOpacity`
  width: 100%;
  padding: 30px;
  flex-direction: row;
  justify-content: space-between;
`

export const TextSignOut = styled.Text`
  font-family: ${mobileFonts.openSans(600)};
  font-size: 24px;
  color: ${colors.officialBlue};
`

export const TextCurrentLanguage = styled.Text`
  font-family: ${mobileFonts.openSans(600)};
  font-size: 15px;
  color: ${colors.gray50};
  ${props => props.isSelected &&
  css`
    color: ${colors.officialBlue};
  `}
`

export const TextSignoutError = styled.Text`
  font-family: ${mobileFonts.openSans(600)};
  font-size: 15px;
  color: ${colors.fuchsia};
`