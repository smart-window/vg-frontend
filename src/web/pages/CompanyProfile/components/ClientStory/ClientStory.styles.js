import { colors } from 'shared/constants/cssConstants'
import styled from 'styled-components'
import VgButton from 'web/components/VgButton/VgButton'

export const DivAddNewRecord = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`

export const ImgAddNew = styled.img`
  margin-right: 9px;
`

export const AddButton = styled(VgButton)`
  height: 30px;
  width: 78px;
  border-radius: 6px;
  margin-right: 30px;
`

export const DivNoRecords = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-style: italic;
  padding: 32px;
  color: ${colors.gray50}
`

export const BlueA = styled.a`
  cursor: pointer;
  color: ${colors.officialBlue}
`