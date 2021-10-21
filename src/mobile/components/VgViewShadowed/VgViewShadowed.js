import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import {colors} from 'shared/constants/cssConstants'

VgViewShadowed.propTypes = {
  /** Component/s to display inside VgViewShadowed */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  /** Whether the box shadow should display on top or below button */
  isShadowOnTop: PropTypes.bool,
  /** Border radius for box shadow, defaults to 0 */
  borderRadius: PropTypes.number
}

const ViewVgViewShadowed = styled.View`
  width: 100%;
  border-radius: ${props => props.borderRadius ? props.borderRadius : 0}px;
  background-color: ${colors.gray50};
  shadow-color: ${colors.gray50};
  shadow-opacity: 0.5;
  shadow-offset: ${props => props.isShadowOnTop ? '0px -3px' : '0px 3px'};
  shadow-radius: 3px;
  elevation: 6;
`

/**
 * A wrapper to display box shadow compatible with Android and iOS
 * @category Components - Mobile
 * @namespace VgViewShadowed
 */
export default function VgViewShadowed({children, isShadowOnTop, borderRadius}) {
  return (
    <ViewVgViewShadowed
      testID='VgViewShadowed'
      isShadowOnTop={isShadowOnTop}
      borderRadius={borderRadius}
    >
      {children}
    </ViewVgViewShadowed>
  )
}