import styled from 'styled-components/native'
import {colors, mobileFonts} from 'shared/constants/cssConstants'
import {Dimensions} from 'react-native'

export const TouchableOpacityAddTime = styled.TouchableOpacity`
  display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  width: 100%;
  height: 61px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  background-color: ${colors.white};
`

export const TextAddTime = styled.Text`
  font-family: ${mobileFonts.openSans(400)};
  font-size: 18px;
  line-height: 25px;
  margin-left: 15px;
`

export const linearGradientStyle = {
  position: 'absolute',
  bottom: 52,
  left: 12,
  height: 30,
  width: Dimensions.get('window').width - 24,
  boxSizing: 'border-box'
}

export const TextDrawerTitle = styled.Text`
  width: 100%;
  font-family: ${mobileFonts.openSans(400)};
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: ${colors.charcoal};
  padding-top: 18px;
`

export const TouchableOpacityXWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 1;
`

export const animatedViewStyles = {
  overflow: 'hidden',
  position: 'absolute',
  bottom: 15,
  right: 0,
  width: Dimensions.get('window').width - 24,
  marginLeft: 12,
  marginRight: 12,
  zIndex: 2
}

export const ViewDrawerContents = styled.View`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  padding: 0 18px 18px 18px;
`

export const TouchableOpacityBackdrop = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

export const SafeAreaViewContentWrapper = styled.SafeAreaView`
  height: 100%;
  width: 100%;
`

export const ScrollViewDrawerContents = styled.ScrollView`
  width: 100%;
  height: 100%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
`