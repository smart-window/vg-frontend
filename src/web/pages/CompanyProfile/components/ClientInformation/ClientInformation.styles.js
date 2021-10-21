import { colors } from 'shared/constants/cssConstants'
import styled, { css } from 'styled-components'
import VgButton from 'web/components/VgButton/VgButton'

export const DivContentBlock = styled.div`
  margin-bottom: 32px;
`

export const DivContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.coolGray};
  border-radius: 8px 8px 0 0;
  padding: 4px 12px;

  font-size: 1.2rem;
  height: 30px;
  cursor: pointer;

`

export const DivContentBody = styled.div`
  padding: 0;
  height: 0;
  overflow: hidden;
  transition: all .3s ease;
  ${props => props.expanded && css`
    height: max-content;
    padding: 9px 0;
  `}
`

export const DivDetailButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 2px;
`

export const ViewButton = styled(VgButton)`
  height: 52px;
  background-color: white;
  border: solid 1px ${colors.officialBlue};
  justify-content: space-between;
  padding: 0 20px;
  border-radius: 15px;
  &:first-child {
    margin-right: 27px;
  }
  span {
    color: ${colors.officialBlue};
    font-size: 1rem;
  }
`

export const DivClientSummary = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 24px;
`
export const DivClientSummaryItem = styled.div`
  width: 174px;
  margin-right: 24px;
  &.long-item {
    flex-grow: 1;
    flex-grow: 10;
  }
  &:last-child {
    margin-right: 0;
  }
  &.fixed-width {
    width: 160px;
    max-width: 160px;
  }
`