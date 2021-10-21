import styled from 'styled-components'
import { colors, fonts } from 'shared/constants/cssConstants'
import { SectionGridContainer } from 'web/modules/Grid/Grid.styles'

export const DivEmployeesContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  padding: 16px;
`

export const DivEmployeesListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
`

export const DivTableTitle = styled.div`
  font-size: 1.6rem;
  font-family: ${fonts.helvetica};
  font-weight: 400;
  margin: 10px 0;
  text-align: center;
`

export const DivEmployeeTableWrapper = styled.div`
  width: 400px;
  ${SectionGridContainer} {
    height: 120px;
  }
`

export const ButtonSeeDetails = styled.button`
  display: flex;
  justify-content: center;
  padding: 0 21px;
  align-items: center;
  color: ${colors.officialBlue};
  border: 1px solid ${colors.officialBlue};
  box-sizing: border-box;
  box-shadow: 0px 1px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  height: 56px;
  width: 100%;
  font-family: ${fonts.helvetica};
  font-weight: 400;
  font-size: 1.2rem;
  background-color: ${colors.white};
  margin-top: 16px;
  cursor: pointer;
`

export const DivButtonArrow = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;

  svg {
    height: 20px;
    width: 20px;
  }
`

export const DivSidebar = styled.div`
  transition: width .2s ease-in, padding .2s ease-in;
  padding: ${p => p.open ? '4px': 0};
  flex-shrink: 0;
  width: ${p => p.open ? '348px': 0};
  height: 415px;
  overflow: hidden;
`
