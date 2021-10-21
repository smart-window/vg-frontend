import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {SpanNavItemContainer, SpanIconContainer, DivHoverText} from './NavItem.styles'
import {colors} from 'shared/constants/cssConstants'

NavItem.propTypes = {
  isSelected: PropTypes.bool,
  /** Corresponds to a name in <GlobalNav> */
  name: PropTypes.string,
  /** 'react-ified' svg function for the nav item - not a 'node' because we need to set color here */
  icon: PropTypes.func,
  /** click handler */
  handleClick: PropTypes.func
}

/**
 * Individual Item within GlobalNav
 * @category Modules - Web
 * @subcategory GlobalHeader
 * @namespace NavItem
 */
export default function NavItem(props) {
  const {handleClick, isSelected, name} = props
  const [isHovered, setIsHovered] = useState(false)

  const iconColor = isSelected ? colors.officialBlue : colors.charcoal

  return (
    <SpanNavItemContainer
      isHovered={isHovered}
      isSelected={isSelected}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role='button'
      aria-label={name}
    >
      <SpanIconContainer>
        <props.icon color={iconColor} />
      </SpanIconContainer>
      { isHovered &&
        <DivHoverText isSelected={isSelected}>
          {name}
        </DivHoverText>
      }
    </SpanNavItemContainer>
  )
}