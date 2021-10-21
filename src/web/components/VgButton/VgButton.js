import React from 'react'
import PropTypes from 'prop-types'
import ChevronArrowIcon from 'web/components/DynamicIcons/ChevronArrowIcon'
import {colors} from 'shared/constants/cssConstants'
import {Button, SpanArrowIconContainer, SpanButtonText} from './VgButton.styles'

VgButton.propTypes = {
  /** Which way the arrow will face. If not passed, there will be no arrow. */
  arrowDirection: PropTypes.oneOf(['left', 'right']),
  /** button onClick handler */
  onClick: PropTypes.func,
  /** If true, button colors will be reversed (blue text / white background) */
  invertColors: PropTypes.bool,
  /** Shape of button */
  shape: PropTypes.oneOf(['oval', 'rectangle']),
  /** Inner text */
  text: PropTypes.string,
  /** Use blue background gradient */
  useGradient: PropTypes.bool,
  /** Type of button, can be 'button', 'reset' or 'submit' */
  type: PropTypes.string,
  /** Determines if button is in active state or not, defaults to true */
  isActive: PropTypes.bool,
  /** button onMouseEnter handler */
  onMouseEnter: PropTypes.func,
  /** button onMouseLeave handler */
  onMouseLeave: PropTypes.func
}

VgButton.defaultProps = {
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  isActive: true
}

/**
 * The main button for the web application.
 * Changes styles and appearance based on which props are passed.
 *
 * @category Components - Web
 * @subcategory VgButton
 * @namespace VgButton
 */
export default function VgButton({
  arrowDirection, invertColors, onClick,
  shape, text, useGradient, type, isActive, size,
  onMouseEnter, onMouseLeave, children, ...props
}) {
  /** onClick handler */
  function handleOnClick() {
    if (isActive) onClick()
  }

  return (
    <Button
      onClick={handleOnClick} invertColors={invertColors}
      shape={shape} useGradient={useGradient} type={type || 'button'}
      isActive={isActive} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...props}
    >
      {arrowDirection &&
        <SpanArrowIconContainer arrowDirection={arrowDirection}>
          <ChevronArrowIcon fillColor={invertColors ? colors.officialBlue : colors.white}/>
        </SpanArrowIconContainer>
      }
      <SpanButtonText invertColors={invertColors} arrowDirection={arrowDirection} shape={shape} size={size}>
        {text}
      </SpanButtonText>
      {children}
    </Button>
  )
}