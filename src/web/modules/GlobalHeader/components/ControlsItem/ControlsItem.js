import React, {useState} from 'react'
import PropTypes from 'prop-types'

import {colors} from 'shared/constants/cssConstants'
import {
  SpanOuterContainer,
  SpanItemLabel,
  SpanIconContainer
} from './ControlsItem.styles'

ControlsItem.propTypes = {
  /** Additional content for this item - usually in the form of a DropdownModal */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  /** Called when clicking on the controls item/icon */
  onClick: PropTypes.func,
  /** Icon for item and menu header - this should be a react-ified svg function so we can set color */
  icon: PropTypes.func.isRequired,
  /** If the icon is a button, whether the corresponding route is selected */
  isSelected: PropTypes.bool,
  /** Label which goes under the icon for this controls item */
  label: PropTypes.string.isRequired,
  /** Title for MenuWrapper header, also used in aria-label of the main item button */
  menuHeaderTitle: PropTypes.string,
}

/**
 * Represents an icon, hover state, label, and optional content.
 * Intended to be used in GlobalHeader. If this changes, move to src/components.
 * @category Modules - Web
 * @subcategory GlobalHeader
 * @namespace ControlsItem
 */
export default function ControlsItem(props) {
  const [iconIsHovered, setIconIsHovered] = useState(false)

  const iconFillColor = (iconIsHovered || props.isSelected) ? colors.officialBlue : colors.white

  return (
    <SpanOuterContainer>
      <SpanIconContainer
        onClick={props.onClick}
        onMouseEnter={() => setIconIsHovered(true)}
        onMouseLeave={() => setIconIsHovered(false)}
        role='button'
        aria-label={props.label}
      >
        <props.icon fillColor={iconFillColor}/>
      </SpanIconContainer>
      <SpanItemLabel>{props.label}</SpanItemLabel>
      {props.children}
    </SpanOuterContainer>
  )
}