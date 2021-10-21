import { colors } from 'shared/constants/cssConstants'
import styled from 'styled-components'

export const DivRecordContainer = styled.div`
  display: flex; 
  align-items: center;
  margin-bottom: 12px;
  width: 100%;
`
export const DivRecordInfo = styled.div`
  display: flex;
  padding: 20px;
  background-color: ${colors.boneWhite};
  border-radius: 6px;
  margin-right: 20px;
  flex-grow: 1;
`

export const DivInputInfo = styled.div`
  display: flex;
  flex-grow: 1;
`
export const ImgUserAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 6px;
  &:last-child {
    margin-right: 0
  }
`
export const ImgTrashIcon = styled.img`
  cursor: pointer;
  opacity: 1;
  transition: all .3s ease;
  &:hover {
    opacity: 0.7;
  }
`
export const DivUserMoreCounts = styled.div`
  font-size: 1.2rem;
  color: ${colors.officialBlue};
  margin-left: 6px;
`

export const DivUserContainers = styled.div`
  min-width: 160px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`