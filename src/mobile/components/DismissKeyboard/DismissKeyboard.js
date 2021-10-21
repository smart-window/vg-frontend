import React from 'react'
import PropTypes from 'prop-types'
import {Keyboard, TouchableWithoutFeedback } from 'react-native'

/**
 * A component that wraps Text Input elements and dismissed keyboard on press
 * @category Components - Mobile
 * @namespace DismissKeyboard
 * Component reference: https://medium.com/@akshay.s.somkuwar/dismiss-hide-keyboard-on-tap-outside-of-textinput-react-native-b94016f35ff0
 */

DismissKeyboard.propTypes = {
  /** Component/s to display inside BackdropWrapper */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default function DismissKeyboard({ children }) {
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      {children}
    </TouchableWithoutFeedback>
  )
}