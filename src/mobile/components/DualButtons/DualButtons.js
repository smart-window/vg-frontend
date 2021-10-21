import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components/native'
import {colors} from 'shared/constants/cssConstants'

DualButtons.propTypes = {
  /** A React SVG element to display as the left button */
  iconLeft: PropTypes.object,
  /** A React SVG element to display as the right button */
  iconRight: PropTypes.object,
}

const ViewButtons = styled.View`
    height: 84px;
    flex-direction: row;
    padding: 9px 0;
    border-top-width: 1px;
    border-top-color: ${colors.officialBlue};
`

const TouchableOpacityDual = styled.TouchableOpacity`
    width: 50%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${colors.white};
    ${props => props.borderLeft &&
    css`
      border-left-width: 1px;
      border-left-color: ${colors.officialBlue};
    `}
`

/**
 * A repeating buttons component within a Card component.
 * Displays two React SVG elements as side-by-side buttons.
 * @category Components - Mobile
 * @namespace DualButtons
 */
export default function DualButtons({iconLeft, iconRight}) {
  return (
    <ViewButtons testID='DualButtons'>
      <TouchableOpacityDual>
        {iconLeft}
      </TouchableOpacityDual>
      <TouchableOpacityDual
        testID='RightDualButton'
        borderLeft={true}
      >
        {iconRight}
      </TouchableOpacityDual>
    </ViewButtons>
  )
}