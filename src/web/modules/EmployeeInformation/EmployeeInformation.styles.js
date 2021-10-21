import styled from 'styled-components'
import {SectionContainer, DivAnimatedContainer} from 'web/components/ExpandableSection/ExpandableSection.styles'
import {DivPegaContainer} from 'web/components/PegaContainer/PegaContainer.styles'

export const DivContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  ${SectionContainer} {
    margin-top: 36px;
  }
  ${DivAnimatedContainer} {
    margin: 12px 0;
    padding: 0 6px;
  }
  ${DivPegaContainer} {
    height: 70%;
    width: 100%;
  }
`

export const DivDownloadContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-style: italic;
  font-size: 12px;
  border-bottom: 1px solid black;
  cursor: pointer;
`

export const ADownloadProfile = styled.a`
  display: none;
`
