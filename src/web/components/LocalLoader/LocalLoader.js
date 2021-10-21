import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'
import circleLoaderIcon from 'assets/images/icons/circleLoader.svg'

LocalLoader.propTypes = {
  /** used to show/hide and fade out */
  visible: PropTypes.bool
}

/**
 * A loader/spinner to indicate localized loading states
 * @category Components - Web
 * @namespace LocalLoader
 */
export default function LocalLoader({visible}) {
  return (
    <DivLocalLoader role='alert' aria-busy='true' visible={visible}>
      <img src={circleLoaderIcon} alt={'spinner'}/>
      <span>saving changes...</span>
    </DivLocalLoader>
  )
}

export const DivLocalLoader = styled.div`
  display: flex;
    align-items: center;
  font-family: ${fonts.openSans};
    font-style: italic;
    font-size: 0.8rem;
    color: ${colors.gray30};
  opacity: 0;
  transition: opacity 300ms;

  ${props => props.visible === true && css`
    opacity: 1;
    transition: unset;
  `}
  span {
    margin-left: 6px;
  }
  img {
    animation-name: spin;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 2s;
    @keyframes spin {
      from {
        transform: rotate(0deg);
      } to {
        transform: rotate(360deg);
      }
    }
  }
`