import styled from 'styled-components'
import {colors, globalMediaQueries} from 'shared/constants/cssConstants'

export const AsideMainContainer = styled.aside`
  position: absolute;
    right: -21px;
    top: 81px;
  width: 348px;
  @media (max-width: ${globalMediaQueries.tabletWidth}) {
    position: fixed;
      right: calc((100vw - 348px) / 2);
      top: 135px;
    z-index: 3;
  }
`

export const DivBackgroundMask = styled.div`
  position: fixed;
    top: 0;
    left: 0;
  height: 100vh;
  width: 100vw;
  background: ${colors.modalBackground};
  z-index: 3;
`

export const DivModalContents = styled.div`
  position: relative;
  z-index: 4;
  height: 100%;
  width: 100%;
  padding: 30px;
  background: ${colors.white};
  box-shadow: 0 1px 5px 1px ${colors.gray30};
  border-radius: 16px;
  box-sizing: border-box;
`

export const SpanCloseIconContainer = styled.span`
  cursor: pointer;
  z-index: 2;
  position: absolute;
    top: 30px;
    right: 30px;
  display: inline-flex;
    height: 15px;
    width: 15px;
  svg {
    height: 100%;
    width: 100%;
  }
`

export const ImgFancyDropdownArrow = styled.img`
  position: absolute;
    top: -21px;
    right: -1px;
  @media (max-width: ${globalMediaQueries.tabletWidth}) {
    display: none;
  }
`