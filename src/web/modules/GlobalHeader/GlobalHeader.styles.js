import styled from 'styled-components'
import {globalMediaQueries} from 'shared/constants/cssConstants'
import {SpanOuterContainer} from './components/ControlsItem/ControlsItem.styles'

export const DivGlobalHeaderContainer = styled.div`
  width: calc(100vw - 24px - 30px);
  margin-left: 24px;
  margin-right: 30px;
  box-sizing: border-box;
  position: relative;
  @media (max-width: ${globalMediaQueries.tabletWidth}) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
`

export const DivTopRow = styled.div`
  width: 100%;
  height: 60px;
  @media (max-width: ${globalMediaQueries.tabletWidth}) {
    display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    height: fit-content;
  }
`

export const ImgLogo = styled.img`
  height: 48px;
  width: 261px;
  position: absolute;
    top: 6px;
    left: 0;
  cursor: pointer;
  @media (max-width: ${globalMediaQueries.tabletWidth}) {
    position: relative;
  }
`

export const DivControls = styled.div`
  position: absolute;
    top: 5px;
    right: 48px;
  height: 45px;
  z-index: 2;
  button {
    cursor: pointer;
  }
  ${SpanOuterContainer} {
    margin-left: 48px;
  }
  @media (max-width: ${globalMediaQueries.standardScreenSize}) {
    height: 66px;
  }
  @media (max-width: ${globalMediaQueries.tabletWidth}) {
    position: relative;
    top: unset;
    right: unset;
    padding-right: 48px;
    padding-top: 6px;
    /** Set the margin of the first Control Item to none */
    &:first-child {
      margin-left: 0;
    }
  }

  @media (max-width: 400px) {
    /** Control items spacing needs to be slightly smaller before window minWidth */
    ${SpanOuterContainer} {
      margin-left: 36px;
    }
  }
`

export const ImgBlueBorder = styled.img`
  position: absolute;
    bottom: 0;
    left: 0;
  width: 100%;
  height: 3px;
  @media (max-width: ${globalMediaQueries.tabletWidth}) {
    display: none;
  }
`