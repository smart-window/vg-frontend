import styled from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'
import {DivModalContents} from 'web/components/DropdownModal/DropdownModal.styles'
import {Header, DivContent, DivContentWrapper} from 'web/components/MenuWrapper/MenuWrapper.styles'

export const SpanControlsItemContainer = styled.span`
  display: inline-flex;
  ${DivModalContents} {
    padding-bottom: 0;
  }
  ${Header} {
    margin-bottom: 9px;
  }
  ${DivContentWrapper} {
    margin: 0 -30px;
    overflow: hidden;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
  }
  ${DivContent} {
    max-height: 429px;
    height: fit-content;
    overflow-y: scroll;
  }
`

export const SpanNotificationsPip = styled.span`
  position: absolute;
    top: 9px;
    right: 9px;
  border-radius: 50%;
  height: 7px;
  width: 7px;
  background-color: ${colors.uiAlertRed};
`

export const DivNotificationItem = styled.div`
  height: 72px;
  padding: 9px 30px;
  box-sizing: border-box;
  display: flex;
    align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${colors.boneWhite};
  }
`

export const DivNotificationContents = styled.div`
  width: 204px;
  margin: 0 15px;
  font-family: ${fonts.openSans};
`

export const DivNotificationMessage = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
    line-height: 18px;
    color: ${colors.charcoal};
`

export const DivNotificationMetadata = styled.div`
  width: 100%;
  font-size: 0.666rem;
    line-height: 1.25;
    color: ${colors.gray50};
`

export const SpanChevronIconContainer = styled.span`
  display: inline-flex;
    height: 22px;
    width: 11px;
  svg {
    height: 100%;
    width: 100%;
  }
`

export const PMenuSubheader = styled.p`
  font-family: ${fonts.openSans};
    line-height: 17px;
    font-size: 0.8rem;
    text-align: center;
    color: ${colors.officialBlue};
    text-decoration: underline;
  cursor: pointer;
`

export const DivEmptyContainer = styled.div`
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  margin-bottom: 47px;
  img {
    height: 60px;
    width: 60px;
  }
  h3 {
    width: 188px;
    height: 28px;
    font-family: ${fonts.openSans};
      font-size: 1.4rem;
      font-style: italic;
      color: ${colors.coolGray};
  }
`