import styled from 'styled-components'
import { colors } from 'shared/constants/cssConstants'

export const DivInputInfo = styled.div`
  display: flex;
  flex-grow: 1;
  margin-bottom: 20px;
`

export const DivClientInteractionNotes = styled.div`
`

export const ImgTrashIcon = styled.img`
  cursor: pointer;
  opacity: 1;
  width:15px;
  float: right;
  transition: all .3s ease;
  &:hover {
    opacity: 0.7;
  }
`

export const FontBlue = styled.label`
  color: ${colors.officialBlue}
`

export const SpaceHeight20 = styled.div`
  height:20px;
`