import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components/native'
import {colors} from 'shared/constants/cssConstants'

Card.propTypes = {
  /** If present, adds a border radius to the top of the card */
  hasBorderTop: PropTypes.bool,
  /** If presents, adds a border radius to the bottom of the card */
  hasBorderBottom: PropTypes.bool,
  /** If present, adds margin to the top of the Card component. */
  hasMarginTop: PropTypes.bool,
  /** If present, causes card to flex grow. */
  fillSpace: PropTypes.bool,
  /** Component/s to display inside Card */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

const ViewCard = styled.View`
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  background-color: ${colors.white};
  ${props => props.hasBorderTop &&
  css`
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
  `}
  ${props => props.hasBorderBottom &&
  css`
    border-bottom-left-radius: 32px;
    border-bottom-right-radius: 32px;
  `}
  ${props => props.hasMarginTop &&
  css`
    margin-top: 12px;
  `}
  ${props => props.fillSpace &&
  css`
    display: flex;
    flex-grow: 1;
  `}
`

/**
 * A Card component for displaying information with a white background inside the BackdropWrapper component.
 * Can format styling to have a border radius on the top or bottom via passed in props.
 * @category Components - Mobile
 * @namespace Card
 */
export default function Card({ hasBorderTop, hasBorderBottom, hasMarginTop, fillSpace, children }) {
  return (
    <ViewCard
      testID={'Card'}
      hasBorderTop={hasBorderTop}
      hasBorderBottom={hasBorderBottom}
      hasMarginTop={hasMarginTop}
      fillSpace={fillSpace}
    >
      { children }
    </ViewCard>
  )
}