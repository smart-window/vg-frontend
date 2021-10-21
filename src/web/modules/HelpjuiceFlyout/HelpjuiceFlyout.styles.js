import PropTypes from 'prop-types'
import styled from 'styled-components'
import {colors, globalMediaQueries} from 'shared/constants/cssConstants'

export const AsideFlyoutContainer = styled.aside`
  display: flex;
  position: fixed;
    right: ${props => props.isExpanded ? 0 : '-30vw'};
    top: 106px;
  height: calc(100vh - 106px); /* subtract header */
  min-width: 591px; /* subtract sidebar width */
  width: calc(30vw - 9px);
  max-width: 1251px;
  transition: right 0.5s ease-out;
  z-index: 1;

  @media (max-width: 684px) {
    display: none;
  } 

  @media (max-width: 2000px) {
    right: ${props => props.isExpanded ? 0 : '-600px'};
  }

  @media (min-width: 4200px) {
    right: ${props => props.isExpanded ? 0 : '-1260px'};
  }

  @media (max-width: ${globalMediaQueries.standardScreenSize}) {
    top: 142px;
    height: calc(100vh - 142px);
  }
`
AsideFlyoutContainer.propTypes = {
  isExpanded: PropTypes.bool
}

export const ImgTabButton = styled.img`
  cursor: pointer;
  position: absolute;
    left: -51px;
    top: calc(50% - 75px); /* img height = 150 */
  z-index: 2; /* on top of left-border shadow */
  height: 175px;
`

export const ImgLeftBorder = styled.img`
    position: absolute;
      top: 54px;
      left: -15px;
    height: calc(100% - 44px);
    width: 21px;
    z-index: 1; /* on top of content shadow */
`

export const DivContent = styled.div`
  background: ${colors.white};
  border-top-left-radius: 32px;
  box-shadow: 0 0 8px 0 ${colors.gray30};
  height: 100%;
  min-width: 600px;
  width: 30vw;
  max-width: 1260px;
  overflow-y: auto;
  iframe {
    height: 100%;
    width: 100%;
    border-top-left-radius: 32px;
  }
`

export const SpanCloseIconContainer = styled.span`
    cursor: pointer;
    position: absolute;
      top: 26px;
      right: 21px;
    display: inline-flex;
      height: 18px;
      width: 18px;
    svg {
      height: 100%;
      width: 100%;
    }
`