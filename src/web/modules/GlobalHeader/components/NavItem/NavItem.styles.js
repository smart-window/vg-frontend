import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {colors, fonts, globalMediaQueries} from 'shared/constants/cssConstants'

export const SpanNavItemContainer = styled.span`
  display: inline-flex;
    align-items: center;
    justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  box-sizing: border-box;
  cursor: pointer;
  pointer-events: all;
  margin-right: 16px;
  ${props => props.isSelected &&
    css`
      background-color: ${colors.officialBlue};
      box-shadow: 1px 1px 5px -1px ${colors.gray50};
    `
  }
  ${props => props.isHovered && !props.isSelected &&
    css`
      border: 1px solid ${colors.gray50};
      background-color: ${colors.white};
      box-shadow: 1px 1px 5px -1px ${colors.gray50};
      @media (max-width: ${globalMediaQueries.tabletWidth}) {
        border: none;
        box-shadow: none;
        background-color: unset;
      }
    `
  }
`
SpanNavItemContainer.propTypes = {
  isHovered: PropTypes.bool,
  isSelected: PropTypes.bool
}

export const DivHoverText = styled.div`
  width: fit-content;
  display: table; /* weird hack for Safari */
  position: absolute;
    top: 45px;
  font-family: ${fonts.openSans};
    font-size: 1rem;
    color: ${colors.charcoal};
    text-align: center;
  border: 1px solid ${colors.gray50};
    border-radius: 30px;
  box-shadow: 1px 1px 5px -1px ${colors.gray50};
  box-sizing: border-box;
  background-color: ${colors.white};
  padding: 12px 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 1;
  ${props => props.isSelected ?
    css`
      background: ${colors.officialBlue};
      color: ${colors.white};
      border-color: ${colors.officialBlue};
      font-weight: 600;
    ` : ''
  }
  @media (max-width: ${globalMediaQueries.tabletWidth}) {
    display: none;
  }
`
DivHoverText.propTypes = {
  isHovered: PropTypes.bool,
}

export const SpanIconContainer = styled.span`
  display: inline-flex;
    justify-content: center;
    align-items: center;
  height: 24px;
  width: 24px;
  pointer-events: none;
  svg {
    max-height: 100%;
    max-width: 100%;
  }
`