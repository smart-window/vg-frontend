import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import { Animated, View } from 'react-native'
import { RectButton, Swipeable } from 'react-native-gesture-handler'

import {
  actionTextStyles,
  leftActionStyles,
  rightActionStyles,
  actionItemStyles
} from './SwipeableRow.styles'

SwipeableRow.propTypes = {
  /** The main content to display (before the user swipes) */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  /**
   * If passed, this will create a single left action (right swipe) with specified text
   */
  leftActionText: PropTypes.node,
  /**
   * This contains an array of right options/actions to display on a left swipe.
   * The objects should be in the following format:
   * {
   *   jsx: React content to display for the item,
   *   xOffset: positive integer offset indicating the position of the action/item,
   *   onPress: handler for when the item/action is selected
   * }
   */
  rightActions: PropTypes.arrayOf(PropTypes.object)
}

/**
 * Generic swipeable container with left and right quick actions.
 * Code inspired by the react-native-gesture-handler reference implementation:
 *   https://snack.expo.io/@adamgrzybowski/react-native-gesture-handler-demo
 */
export default function SwipeableRow(props) {
  const {children, leftActionText, rightActions} = props
  const swipeableContainerRef = useRef()

  /** close the drawer */
  function close () {
    swipeableContainerRef.current?.close()
  }

  /* RENDER HELPER FUNCTIONS */

  function renderLeftActions(progress, dragX) {
    if (leftActionText) {
      return (
        <RectButton style={leftActionStyles} onPress={close}>
          <Animated.Text style={[actionTextStyles]}>
            {leftActionText}
          </Animated.Text>
        </RectButton>
      )
    }
  }

  function renderRightActions(progress, dragX) {
    if (rightActions?.length) {
      // order by highest to lowest x offset
      const sortedRightActions = rightActions.sort( (action1, action2) => action2.xOffset - action1.xOffset )
      const rightActionElements = sortedRightActions.map((rightAction, i) => {
        function handleRightActionPress() {
          if (rightAction.onPress) {
            rightAction.onPress()
          }
          close()
        }

        return (
          <Animated.View key={'action-'+i} style={actionItemStyles}>
            <RectButton
              style={[rightActionStyles]}
              onPress={handleRightActionPress}>
              {rightAction.jsx}
            </RectButton>
          </Animated.View>
        )
      })

      // set the right actions width to the offset of the leftmost element
      const maxXOffset = sortedRightActions[0].xOffset
      return (
        <View style={{ width: maxXOffset, flexDirection: 'row' }}>
          {rightActionElements}
        </View>
      )
    }
  }

  return (
    <Swipeable
      ref={swipeableContainerRef}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      containerStyle={[{backgroundColor: '#EFEFF4'}]}
    >
      {children}
    </Swipeable>
  )

}

