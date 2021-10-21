import styled, {css} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

export const H3SectionHeading = styled.h3`
  height: 26px;
  font-family: ${fonts.openSans};
    font-size: 1rem;
    line-height: 20px;
    color: ${colors.officialBlue};
  position: relative;
  padding-bottom: 5px;
  box-sizing: border-box;
  border-bottom: 1px solid ${colors.officialBlue};
  margin-top: 33px;
  &:first-of-type {
    margin-top: unset;
  }
  ${props => props.isComplete && css`
    color: ${colors.successGreen};
    border-bottom-color: ${colors.successGreen};
  `}
`

export const SpanCheckmarkIconContainer = styled.span`
  position: absolute;
    top: 4px;
    left: -21px;
  display: inline-flex;
    height: 15px;
    width: 15px;
  svg {
    height: 100%;
    width: 100%;
  }
`

export const SpanChidlren = styled.span`
  float: right;
`