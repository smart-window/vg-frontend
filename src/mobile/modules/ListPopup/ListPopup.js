import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {LinearGradient} from 'expo-linear-gradient'

import {
  ViewListPopup,
  SafeAreaViewScrollContainer,
  ScrollViewWhiteContainer,
  linearGradientStyle,
  linearGradientStyleBottom,
  scrollContainerHeight
} from './ListPopup.styles'

ListPopup.propTypes = {
  /** A collection of React Native Elements to display */
  children: PropTypes.array
}

/**
 * A popup list of radio buttons.
 * Renders a list of selectable React Native Elements for user press interaction.
 * @category Components - Mobile
 * @namespace ListPopup
 */
export default function ListPopup({children}) {
  const scrollContainer = useRef()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showScrollBottom, setShowScrollBottom] = useState(false)

  /**
   * OnLayout handler to display a bottom scroll indicator if the number of scrollable items is larger than container
   * @param {Event} event - The React Native Element that is checked on layout load
  */
  function setScrollIndicatorsOnLayout(event) {
    const nativeEvent = event.nativeEvent
    if (nativeEvent.layout?.height >= scrollContainerHeight) {
      setShowScrollBottom(true)
    }
  }

  /**
   * An onScroll handler to determine if scroll indicators should display based on scroll height and container height
   * @param {Event} event - The React Native Element that is checked on layout load
  */
  function setScrollIndicators(event) {
    const nativeEvent = event.nativeEvent
    const scrollPosition = nativeEvent.contentOffset.y
    const scrollHeight = event.nativeEvent.contentSize.height - scrollContainerHeight - 10 /** Add a little offset */
    if (scrollPosition <= 10) {
      setShowScrollTop(false)
    }
    else if (scrollPosition >= scrollHeight) {
      setShowScrollBottom(false)
    }
    else if (showScrollTop || showScrollBottom) {
      setShowScrollTop(true)
      setShowScrollBottom(true)
    }
  }

  return (
    <ViewListPopup testID='ListPopup'>
      <SafeAreaViewScrollContainer>
        { showScrollTop &&
          <LinearGradient
            testID='LinearGradientTop'
            colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0.4)']}
            style={linearGradientStyle}
          />
        }
        <ScrollViewWhiteContainer
          ref={scrollContainer}
          onScroll={setScrollIndicators}
          onLayout={setScrollIndicatorsOnLayout}
          scrollEventThrottle={'16'}
        >
          {children}
        </ScrollViewWhiteContainer>
        {
          showScrollBottom &&
          <LinearGradient
            testID='LinearGradientBottom'
            colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0.4)']}
            style={linearGradientStyleBottom}
          />
        }
      </SafeAreaViewScrollContainer>
    </ViewListPopup>
  )
}