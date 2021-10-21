import styled from 'styled-components'
import {fonts} from 'shared/constants/cssConstants'

export const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #F7F7F8;
  padding: 10px;
  font-family: ${fonts.helvetica};
  overflow: auto;
`

export const DivTitle = styled.div`
  margin: 10px;
`

export const H1Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
`

export const DivContentContainer = styled.div`
  background-color: white;
  margin: 10px;
  border-radius: 5px;
  padding: 15px;
`

export const H2Subheader = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 10px 0;
`

export const TableLedger = styled.table`
  border: 1px solid black;
  width: 100%;
  text-align: center;
`

export const TRrow = styled.tr`
  border: 1px solid black;
`