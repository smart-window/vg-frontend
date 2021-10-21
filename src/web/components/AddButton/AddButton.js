import React from 'react'
import PropTypes from 'prop-types'
import PlusButtonIcon from '../DynamicIcons/PlusButtonIcon'
import styled, {css} from 'styled-components'
import { colors, fonts } from 'shared/constants/cssConstants'

AddButton.propTypes = {
  /** The button text */
  text: PropTypes.string.isRequired,
  /** click handler */
  onClick: PropTypes.func,
  /** if true, there will be a solid outline around the button and text */
  hasOutline: PropTypes.bool
}

/**
 * Green plus button with clickable text
 * @category Components - Web
 * @namespace AddButton
 */
export default function AddButton({text, onClick, hasOutline}) {
  return (
    <DivAddButtonContainer onClick={onClick} hasOutline={hasOutline}>
      <PlusButtonIcon lineColor={colors.green} strokeWidth={2}/>
      <p>{text}</p>
    </DivAddButtonContainer>
  )
}

export const DivAddButtonContainer = styled.div`
  position: relative;
  display: flex;
    align-items: center;
  &:hover {
    cursor: pointer
  }

  ${props => props.hasOutline && css`
    border: 1px solid ${colors.green};
    border-radius: 12px;
  `}

  svg {
    height: 21px;
    width: 21px;
  }
  p {
    margin-left: 6px;
    font-family: ${fonts.openSans};
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0px;
  }
`