import { string } from 'prop-types'
import React from 'react'
import { colors, fonts } from 'shared/constants/cssConstants'
import styled from 'styled-components'

DetailItem.propTypes = {
  title: string,
  value: string
}

function DetailItem(props) {
  const { title, value } = props
  return (
    <DivDetailContainer>
      <DivTitleText>{title}</DivTitleText>
      <DivValueText>{value}</DivValueText>
    </DivDetailContainer>
  )
}

const DivDetailContainer = styled.div`
  max-width: 150px;
  flex-grow: 1;
  &:not(:first-child) {
    margin-left: 8px;
  }
`

const DivTitleText = styled.div`
  font-family: ${fonts.openSans};
  font-size: 0.8rem;
  font-style: italic;
  font-weight: 300;
  color: rgba(0,0,0,0.5);
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const DivValueText = styled.div`
  font-family: ${fonts.openSans};
  font-size: 1rem;
  color: ${colors.charcoal};
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default DetailItem
