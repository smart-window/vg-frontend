import React from 'react'
import PropTypes from 'prop-types'

import {TouchableOpacityContainer, TextButtonAction, ViewDisabledOverlay} from './VgButton.styles'

// TODO: a future enhancement could be to use {children} instead of props.text to accept icons etc

VgButton.propTypes = {
  /** callback for when the button is pressed */
  handlePress: PropTypes.func,
  /** if true, button is greyed out and press handler does nothing */
  isDisabled: PropTypes.bool,
  /** text/title witin the button */
  text: PropTypes.string.isRequired,
  /** Sets base styles of button. */
  type: PropTypes.oneOf(['submit', 'cancel'])
}

VgButton.defaultProps = {
  type: 'submit'
}

/**
 * Custom button component, as React Native's <Button> is not very flexible.
 * Named VgButton as Button seemed to clash with RN default
 */
export default function VgButton(props) {
  const {handlePress, isDisabled, text, type} = props

  const isTextWhite = type === 'submit'

  return (
    <TouchableOpacityContainer onPress={handlePress} type={type}>
      {isDisabled &&
        <ViewDisabledOverlay/>
      }
      <TextButtonAction isWhite={isTextWhite}>
        {text}
      </TextButtonAction>
    </TouchableOpacityContainer>
  )
}