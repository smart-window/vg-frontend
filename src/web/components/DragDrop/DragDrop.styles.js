import styled from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

export const DivDragDropWrapper = styled.div`
  position: relative;
`

export const DivDragOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  opacity: 0.65;
  border-radius: 18px;
  h2 {
    font-family: ${fonts.openSans};
    font-weight: bold;
    font-size: 1.4rem;
    line-height: 29px;
    text-align: right;
    color: ${colors.charcoal};
  }
`