import styled from 'styled-components'
import { colors, fonts } from 'shared/constants/cssConstants'
import { DivDragOverlay } from 'web/components/DragDrop/DragDrop.styles'
import {ArticleContainer} from 'web/components/AdHocDocument/AdHocDocument.styles'

export const PTitle = styled.p`
  font-family: ${fonts.helvetica};
  span {
    font-weight: 600;
  }
`

export const DivModalInside = styled.div`
  height: 452px;
  width: 100%;
  box-sizing: border-box;
  padding-top: 15px;
  ${DivDragOverlay} {
    opacity: 0.9;
  }
  ${ArticleContainer} {
    margin-top: 12px;
    margin-left: 3px;
    margin-bottom: 9px;
    width: calc(100% - 6px);
  }
`

export const ArticleDragArea = styled.article`
  border: 1px dashed ${colors.gray30};
  border-radius: 18px;

  svg {
    width: 30px;
    height: 30px;
    margin-left: 12px;
  }
`

export const DivDragContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 96px;
  width: 763px;
  div {
    color: ${colors.charcoal};
    font-family: ${fonts.openSans};
    font-size: 1rem;
    font-style: normal;
    font-weight: 300;
    line-height: 20px;
    text-align: right;
  }
`

export const DivIconWrapper = styled.div`
  cursor: pointer;
`

export const SpanBold = styled.span`
  font-weight: 600;
`

export const SpanUnderline = styled.span`
  text-decoration: underline;
  cursor: pointer;
`

export const DivEmptyState = styled.div`
  position: relative;
  width: 100%;
  height: 348px;
  box-sizing: border-box;
  margin-top: 12px;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    p {
      width: 245px;
      margin-left: 6px;
      color: ${colors.charcoal};
      font-family: ${fonts.openSans};
      font-size: 1.2rem;
      font-style: italic;
      font-weight: 700;
      line-height: 27px;
    }
  }
`

export const InputFileHidden = styled.input`
  display: none;
`

export const DivDocsContainer = styled.div`
  display: flex;
  height: 348px;
  overflow: auto;
  box-sizing: border-box;
  margin-top: 9px;
`

export const PErrorText = styled.p`
  width: 765px;
  font-family: ${fonts.openSans};
  font-size: 1rem;
  font-weight: 400;
  line-height: 24px;
`