import styled from 'styled-components'
import {globalMediaQueries} from 'shared/constants/cssConstants'

export const DivAppContainer = styled.div`
  @media (max-width: ${globalMediaQueries.minScreenWidth}) {
    width: ${globalMediaQueries.minScreenWidth};
    overflow-x: scroll;
  }
`

export const ImgAppBackground = styled.img`
  position: fixed;
    top: -290px;
    left: 4px;
  z-index: -999;
  height: 120%;
`

export const MainRouteContainer = styled.main`
  z-index: 0;
  margin-right: 30px;
  margin-left: 24px;
  padding-bottom: 36px;
  width: calc(100vw - 54px);
  height: calc(100vh - 112px);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  @media (max-width: ${globalMediaQueries.standardScreenSize}) {
    height: calc(100vh - 148px);
  }

  @media (max-width: ${globalMediaQueries.tabletWidth}) {
    height: calc(100vh - 250px);
  }

  @media (max-width: ${globalMediaQueries.minScreenWidth}) {
    width: calc(${globalMediaQueries.minScreenWidth} - 55px);
  }
`