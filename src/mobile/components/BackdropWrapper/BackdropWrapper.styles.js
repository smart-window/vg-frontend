import styled from 'styled-components/native'
import {measurements} from 'shared/constants/cssConstants'

export const ImageBackgroundBlue = styled.ImageBackground`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: ${(props) => props.paddingTop}px ${measurements.mobileBackdropPadding}px 0 ${measurements.mobileBackdropPadding}px;
  overflow: hidden;
  border-bottom-right-radius: 32px;
  border-bottom-left-radius: 32px;
`

export const SafeAreaViewContentWrapper = styled.SafeAreaView`
  height: ${props => props.height}px;
  width: 100%;
  margin-bottom: 12px;
  border-bottom-right-radius: 32px;
  border-bottom-left-radius: 32px;
  overflow: hidden;
`

export const scrollViewContainerStyle = {
  flexGrow: 1,
  justifyContent: 'space-between'
}