import styled, {css} from 'styled-components'
import {colors, fonts, measurements} from 'shared/constants/cssConstants'

export const SectionGridContainer = styled.section`
  width: 100%;
  overflow-y: hidden;
`
export const DivRowsContainer = styled.div`
  width: 100%;
  height: calc(100% - ${measurements.reportGridRowHeight}px); // subtract <GridHeader> columns
  overflow-y: auto;
`

export const DivRow = styled.div`
  display: flex;
  height: ${measurements.reportGridRowHeight + 3}px;
  width: 100%;
  background-color: ${p => p.selected ? colors.boneWhite : colors.white};
  border-bottom: 3px solid ${colors.boneWhite};
  box-sizing: border-box;
  font-weight: ${p => p.selected ? '600' : 'normal'};
  cursor: pointer;
  &:hover {
    background-color: #F7F7F8;
  }
`

export const DivCellContainer = styled.div`
  display: flex;
    align-items: center;
  height: ${measurements.reportGridRowHeight};
  padding-left: 9px;
  padding-right: 6px;
  box-sizing: border-box;

  ${props => props.columnWidth &&
    css`
      width: ${props.columnWidth};
    `
  }
`

export const DivCellContent = styled.div`
  height: 20px;
  width: calc(100% - ${props => props.hasCheckbox ? '36px' : '0px'});
  margin-left: ${props => props.hasCheckbox ? '6px' : '0'};
  font-family: ${fonts.openSans};
    font-size: 0.8rem;
    line-height: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    color: ${colors.charcoal};
  overflow: hidden;
`