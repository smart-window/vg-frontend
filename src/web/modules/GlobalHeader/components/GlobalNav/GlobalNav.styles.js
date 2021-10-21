import styled, {css} from 'styled-components'
import {colors, fonts, globalMediaQueries} from 'shared/constants/cssConstants'

export const DivGlobalNavContainer = styled.div`
  height: fit-content;
  display: flex;
  align-items: center;
  @media (max-width: ${globalMediaQueries.standardScreenSize}) {
    margin-bottom: 36px;
  }
  @media (max-width: ${globalMediaQueries.tabletWidth}) {
    position: relative;
    align-items: flex-start;
    height: 100%;
  }
`

export const DivNavItemScrollContainer = styled.div`
  height: 52px;
  align-items: flex-start;
  overflow: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
`

export const DivScrollIndicator = styled.div`
  pointer-events: none;
  height: calc(100% - 4px);
  width: 180px;
  z-index: 2;
  position: absolute;
    top: 0;
    left: 0;
  display: flex;
  flex-direction: center;
  align-items: center;
  background: -webkit-linear-gradient(right,rgba(256,256,256,0) 0%,rgba(256,256,256,0.9) 90%,rgba(256,256,256,1) 100%);
  ${props => props.alignRight && css`
    left: unset;
    right: 0;
    transform: rotate(180deg);
  `}
`

export const NavItems = styled.nav`
  height: fit-content;
  width: fit-content;
  position: relative;
  z-index: 1; /* On top of page-title */
  margin-bottom: 12px;
  @media (max-width: ${globalMediaQueries.tabletWidth}) {
    display: flex;
    padding-left: 21px;
  }
`

export const DivPageTitle = styled.div`
  height: 36px;
  width: fit-content;
  min-width: 200px;
  float: right;
  position: absolute;
    bottom: 3px;
    right: 0px;
  display: flex;
    justify-content: center;
    align-items: center;
  img {
    position: absolute;
      height: 100%;
      width: 100%;
  }
  p {
    position: relative;
      top: 2px;
    padding: 0px 36px;
    font-family: ${fonts.helvetica};
      font-size: 1.4rem;
      font-weight: 600;
    color: ${colors.white};
  }
  @media (max-width: ${globalMediaQueries.standardScreenSize}) {
    bottom: -31px;
      width: 100%;
      height: 40x;
      background-color: ${colors.officialBlue};
    img {
      display: none;
    }
  }
`

