import { shape, string } from 'prop-types'
import React from 'react'
import { colors, fonts } from 'shared/constants/cssConstants'
import styled from 'styled-components'

ProcessFooter.propTypes = {
  process: shape({
    id: string,
    status: string
  })
}

function ProcessFooter(props) {
  return (
    <DivContainer>
      <ButtonCompleteProcess>Mark Onboarding as Complete</ButtonCompleteProcess>
    </DivContainer>
  )
}

const DivContainer = styled.div`
  margin-top: 16px;
  text-align: right;
`

const ButtonCompleteProcess = styled.button`
  padding: 8px 16px;
  color: ${colors.white};
  background: ${colors.officialBlue};
  font-size: 1rem;
  font-family: ${fonts.openSans};
  border-radius: 6px;
  border: 1px solid ${colors.officialBlue};
`

export default ProcessFooter