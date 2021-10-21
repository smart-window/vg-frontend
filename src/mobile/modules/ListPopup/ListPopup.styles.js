import styled from 'styled-components/native'
import {colors} from 'shared/constants/cssConstants'
import {Dimensions} from 'react-native'

export const scrollContainerHeight = Dimensions.get('window').height - 78

export const ViewListPopup = styled.View`
  position: absolute;
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  height: ${Dimensions.get('window').height}px;
  width:  ${Dimensions.get('window').width}px;
  z-index: 100;
  padding: 39px 12px;
  background-color: ${colors.modalBackground};
`

export const SafeAreaViewScrollContainer = styled.View`
  position: relative;
  height: auto;
  width: 100%;
  max-height: ${scrollContainerHeight}px;
`

export const ScrollViewWhiteContainer = styled.ScrollView`
  background-color: ${colors.white};
  border-radius: 32px;
`

export const linearGradientStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  height: 90,
  zIndex: 1,
  borderRadius: 32,
}

export const linearGradientStyleBottom = {
  ...linearGradientStyle,
  bottom: 0,
  transform: [{ rotate: '180deg' }]
}