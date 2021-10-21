import styled from 'styled-components/native'
import {
  PixelRatio,
} from 'react-native'
import {colors, mobileFonts} from 'shared/constants/cssConstants'

export const ViewLogin = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

export const ImageBackgroundBlue = styled.ImageBackground`
  position: absolute;
    top: -50%;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-bottom-right-radius: ${PixelRatio.getPixelSizeForLayoutSize(32)}px;
  border-bottom-left-radius: ${PixelRatio.getPixelSizeForLayoutSize(32)}px;
`

export const ViewLogo = styled.View`
  height: 50%;
  justify-content: center;
  align-items: center;
`

export const ViewSignIn = styled.View`
  position: absolute;
    bottom: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
`

export const TouchableOpacityLogin = styled.TouchableOpacity`
  width: 269px;
  height: 82px;
  border-radius: 21px;
  background-color: ${colors.officialBlue};
  justify-content: center;
  align-items: center;
`

export const TextSignIn = styled.Text`
  font-family: ${mobileFonts.openSans(600)};
  font-size: 30px;
  color: ${colors.white};
`
export const TextOkta = styled.Text`
  font-family: ${mobileFonts.openSans(400, true)};
  font-size: 15px;
  letter-spacing: 0.75px;
  font-style: italic;
  color: ${colors.gray50};
  margin-top: 12px;
`

export const TextLoginError = styled.Text`
  font-family: ${mobileFonts.openSans(400, true)};
  font-size: 15px;
  letter-spacing: 0.75px;
  font-style: italic;
  color: ${colors.fuchsia};
  margin-top: 12px;
`