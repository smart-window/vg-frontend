import styled from 'styled-components'
import { fonts } from 'shared/constants/cssConstants'
import {ArticleContainer, DivDownloadComplete} from 'web/components/Document/Document.styles'
import {DivAddButtonContainer} from 'web/components/AddButton/AddButton'

export const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;

  ${DivAddButtonContainer} {
    position: absolute;
    bottom: 6px;
    right: 3px;
  }
`

export const DivEmptyState = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  img {
    height: 481px;
    width: 100%;
  }
`

export const DivEmptyStateInstructions = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  p {
    font-family: ${fonts.openSans};
    font-size: 1rem;
    font-style: italic;
    font-weight: 700;
    line-height: 22px;
  }
`

export const DivSectionContainer = styled.div`
  margin-top: 36px;
  ${ArticleContainer} {
    max-width: unset;
    width: calc(100% - 6px); // To account for box shadow
    margin-left: 3px;
  }
`

export const DivDocumentContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 348px;
  box-sizing: border-box;
  padding: 0 0 0 3px;
  margin-top: 12px;
  ${ArticleContainer} {
    margin-top: 3px;
    margin-bottom: 9px;
  }
  ${DivDownloadComplete} {
    display: none;
  }
`