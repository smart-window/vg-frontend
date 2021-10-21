import styled, {css} from 'styled-components'
import {colors} from 'shared/constants/cssConstants'

export const DivGlobalLoaderContainer = styled.div`
  display: none;
  height: 100%;
  width: 100%;
  position: absolute;
  background: ${colors.white};
  overflow: hidden;
  z-index: 10;
  ${props => props.isVisible &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `}
  ${props => props.inOnboardingMode &&
    css`
      z-index: 10;
      height: 100vh;
      width: 100vw;
      left: 0;
      position: fixed;
    `
  }
  img {
    height: 33%;
    min-height: 200px;
    max-height: 600px;
  }
`