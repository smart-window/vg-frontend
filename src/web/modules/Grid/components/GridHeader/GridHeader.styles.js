import styled, {css} from 'styled-components'
import {colors, fonts, measurements} from 'shared/constants/cssConstants'

export const DivHeaderContainer = styled.div`
  display: flex;
  background-color: ${colors.coolGray};
  height: ${measurements.reportGridRowHeight}px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
  width: 100%;
`

export const DivHeaderCellContainer = styled.div`
  position: relative;
  display: inline-flex;
    align-items: center;
  background-color: ${colors.coolGray};
  height: 100%;
  padding-left: 9px;
  box-sizing: border-box;
  ${props => props.sortable && css`
    cursor: pointer;
  `};
  ${props => props.columnWidth &&
    css`
      width: ${props.columnWidth};
    `
  }
`

export const DivHeaderCellLabel = styled.div`
  width: calc(100% - ${props => props.hasCheckbox ? '36px' : '15px'}); // subtract icon and possibly checkbox width
  margin-left: ${props => props.hasCheckbox ? '6px' : '0'};
  font-family: ${fonts.openSans};
    font-size: 1rem;
    font-weight: 600;
    line-height: 20px;
    white-space: nowrap;
    text-align: left;
    color: ${colors.charcoal};
    text-overflow: ellipsis;
  overflow: hidden;
`

export const ImgSortIconContainer = styled.img`
  position: relative;
  height: 12px;
  width: 9px;
  margin-right: 6px;
  svg {
    height: 100%;
    width: 100%;
  }
  ${props => props.isFlipped &&
    css`
      transform: rotate(180deg);
    `
  }
`