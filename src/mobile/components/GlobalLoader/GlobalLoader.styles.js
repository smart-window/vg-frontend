import styled, {css} from 'styled-components/native'
import {colors, measurements} from 'shared/constants/cssConstants'
import {Dimensions} from 'react-native'

export const ViewGlobalLoaderContainer = styled.View`
  opacity: 0;
  height: ${Dimensions.get('window').height}px;
  width: ${Dimensions.get('window').width}px;

  /* These properties are commented until we can fine-tune the SafeArea with the Nav */
  /* height: ${Dimensions.get('window').height - measurements.mobileNavBarHeight - 18}px; */
  /* width: ${Dimensions.get('window').width - 24}px; */
  /* margin: 66px 12px 33px 12px; */
  /* border-radius: 18px; */
  position: absolute;
    top: 0;
    left: 0;
  background: ${colors.white};
  ${props => props.isVisible &&
    css`
      opacity: 1;
      z-index: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `}
`

export const ImageAnimatedLoader = styled.Image`
  height: 240px;
  width: 240px;
`