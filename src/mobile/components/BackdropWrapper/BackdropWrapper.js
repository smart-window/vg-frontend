import React from 'react'
import PropTypes from 'prop-types'
import PageHeader from 'mobile/components/PageHeader/PageHeader'
import {Dimensions} from 'react-native'

import backdrop from 'assets/images/mobile-backdrop.png'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {measurements} from 'shared/constants/cssConstants'

import {
  ImageBackgroundBlue,
  SafeAreaViewContentWrapper,
  scrollViewContainerStyle
} from './BackdropWrapper.styles'

BackdropWrapper.propTypes = {
  /** Component/s to display inside BackdropWrapper */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  /** Allow the inner view scroll behavior to bounce */
  allowBounce: PropTypes.bool
}

/**
 * The blue backdrop for mobile display, always displayed for every page after login.
 * Responsible for displaying interactive elements passed to it.
 * @category Components - Mobile
 * @namespace BackdropWrapper
 */
export default function BackdropWrapper({ children, allowBounce=true, title }) {
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top
  const paddingBottom = insets.bottom
  // This contentHeight is a universal calculation that (should) work on android and ios
  const contentHeight = Dimensions.get('window').height - paddingTop -
    measurements.mobilePageHeaderHeight - measurements.mobileNavBarHeight - measurements.mobileBackdropPadding
  return (
    <ImageBackgroundBlue
      testID='BackdropWrapper'
      source={backdrop}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
    >
      <PageHeader
        title={title}
      />

      <SafeAreaViewContentWrapper height={contentHeight}>
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={scrollViewContainerStyle}
          bounces={allowBounce}
        >
          { children }
        </ScrollView>
      </SafeAreaViewContentWrapper>
    </ImageBackgroundBlue>
  )
}