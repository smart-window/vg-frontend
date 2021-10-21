
import styled from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

export const DivDownloadAll = styled.div`
  cursor: pointer;
  position: relative;
    bottom: 4px;
  font-family: ${fonts.openSans};
  font-style: normal;
  font-size: 0.8rem;
  line-height: 100%;
  color: ${colors.officialBlue};
  float: right;
  svg {
    margin: 0 15px;
  }
`

export const ADownload = styled.a`
  display: none;
`