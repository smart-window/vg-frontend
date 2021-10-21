import styled from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

export const SpanOuterContainer = styled.span`
  position: relative;
  display: inline-flex;
    align-items: center;
    justify-content: center;
`

export const SpanItemLabel = styled.div`
  position: absolute;
    top: 41px;
  font-family: ${fonts.openSans};
    font-size: 0.8rem;
    font-weight: 300;
    white-space: nowrap;
    text-align: center;
    color: ${colors.charcoal};
  width: fit-content;
  display: flex;
    align-items: center;
    justify-content: center;
  pointer-events: none;
`

export const SpanIconContainer = styled.span`
  display: flex;
  height: 39px;
  width: 39px;
  cursor: pointer;
  svg {
    height: 100%;
    width: 100%;
  }
`