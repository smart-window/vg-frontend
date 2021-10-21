import styled, {css} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

export const Button = styled.button`
  cursor: pointer;
  width: 289px;
  height: 57px;
  display: flex;
    align-items: center;
    justify-content: center;
  padding: ${props => props.shape === 'rectangle' ? '0 21px' : '0 12px'};
  box-shadow: 0 1px 4px 2px ${colors.gray10};
  background: ${colors.officialBlue};
  ${props => props.useGradient && css`
    background: linear-gradient(270.02deg, ${colors.lightBlue} 0.01%, #4DA8DD 55.95%, ${colors.officialBlue} 138.57%, ${colors.officialBlue} 158.9%);
  `}
  border: none;
  border-radius: ${props => props.shape === 'rectangle' ? '16px' : '33px'};
  ${props => props.invertColors && css`
    background: unset;
    background-color: ${colors.white};
    border: 1px solid ${colors.officialBlue};
  `}
  ${props => !props.isActive && css`
    opacity: 0.7;
    cursor: unset;
  `}
`

export const SpanArrowIconContainer = styled.div`
  display: flex;
  margin-left: 0px;
  margin-right: auto;
  width: 14px;
  height: 30px;
  svg {
    width: 100%;
    height: 100%;
  }
  transform: rotate(180deg);
  ${props => props.arrowDirection === 'right' && css`
    transform: unset;
    order: 1; // flex order
    margin-left: auto;
    margin-right: 0px;
  `}
`

export const SpanButtonText = styled.span`
  font-family: ${fonts.openSans};
  font-weight: 600;
  font-size: 1.2rem;
  color: ${props => props.invertColors ? colors.officialBlue: colors.white};
  ${props => props.shape === 'oval' && css `
    margin-left: ${props.arrowDirection === 'right' ? 'auto' : 0};
    margin-right: ${props.arrowDirection === 'left' ? 'auto' : 0};
  `}
`