import styled, {css} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'
import {Button, SpanArrowIconContainer} from 'web/components/VgButton/VgButton.styles'

export const ArticleContainer = styled.article`
  // give 2px for box-shadow
  margin-right: 2px;
  height: 60px;
  width: calc(100% - 2px);
  display: flex;
  flex-direction: row;

  ${Button} {
    height: 100%;
    width: 234px;
    margin-left: 12px;
  }
  ${SpanArrowIconContainer} {
    height: 24px;
  }
`

export const DivWidget = styled.div`
  background: ${colors.white};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  height: 60px;
  flex-grow: 1;
  display: flex;
    justify-content: space-between;
    align-items: center;
  padding: 9px 21px;
  box-sizing: border-box;
  border-radius: 18px;
  ${props => props.hasUploadIndicator && css`
    border: 1px dashed ${colors.gray30};
  `}
`

export const DivDocInfo = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`

export const DivDocHeader = styled.div`
  width: 100%;
  padding-left: 18px;
  svg {
    padding-left: 6px;
    padding-bottom: 2px;
    cursor: pointer;
  }
`

export const DivTitleInfo = styled.div`
  display: flex;
  align-items: flex-end;
`

export const H3UploadTitle = styled.h3`
  max-width: 219px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: ${fonts.openSans};
  font-weight: 600;
  font-size: 0.8rem;
  line-height: 16px;
  color: ${colors.charcoal};
  ${props => props.hasDownloadIndicator && css`
    text-decoration: underline;
    cursor: pointer;
  `}
`

export const PDocInfo = styled.p`
  margin-top: ${props => props.includeTopMargin ? 3 : 0}px;
  font-family: ${fonts.openSans};
  font-style: italic;
  font-size: 0.8rem;
  line-height: 16px;
  color: ${colors.gray50};
  span {
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }
`

export const DivDocInstructions = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-family: ${fonts.openSans};
  font-size: 0.8rem;
  line-height: 135%;
  text-align: right;
  color: ${colors.charcoal};
  h3 {
    font-weight: 600;
  }
  p {
    margin-top: 3px;
  }
  span {
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
    svg {
      margin-left: 12px;
    }
  }
`

export const DivIconsWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  box-sizing: border-box;
  min-width: 60px;
  padding-left: 12px;
  cursor: pointer;
  span {
    svg {
      margin-left: 0px;
    }
  }
  img {
    margin-left: 6px;
  }
`

export const DivDownloadComplete = styled.div`
  font-family: ${fonts.openSans};
  font-style: italic;
  font-size: 0.8rem;
  line-height: 16px;
  text-align: right;

  color: ${colors.green};
  span {
    text-decoration: underline;
    font-size: 10px;
  }
`

export const PSignedInstructions = styled.p`
  font-family: ${fonts.openSans};
  font-weight: 300;
  font-style: italic;
`

export const InputFileHidden = styled.input`
  display: none;
`

export const ADownloadHidden = styled.a`
  display: none;
`