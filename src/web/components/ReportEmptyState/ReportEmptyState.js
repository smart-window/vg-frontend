import React from 'react'
import PropTypes from 'prop-types'
import { colors, fonts } from 'shared/constants/cssConstants'
import styled from 'styled-components'
import LightBulbIcon from 'web/components/DynamicIcons/LightBulbIcon'
import blurredTable from 'assets/images/blurred-table.png'

const SectionEmptyState = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  div {
    width: 100%;
  }
  img {
    width: 100%;
  }
`
const DivGrayHeader = styled.div`
  width: 100%;
  height: 30px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: ${colors.coolGray};
`

const DivEmptyStateInstructions = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  p {
    width: 248px;
    font-family: ${fonts.openSans};
    font-size: 1rem;
    font-style: italic;
    font-weight: 400;
    line-height: 22px;
  }
  span {
    font-family: ${fonts.openSans};
    font-size: 1rem;
    font-style: italic;
    font-weight: 700;
    line-height: 22px;
  }
`

ReportEmptyState.propTypes = {
  emptyMessage: PropTypes.string
}

ReportEmptyState.defaultProps = {
  emptyMessage: ''
}

function ReportEmptyState(props) {
  const { emptyMessage } = props
  return (
    <SectionEmptyState>
      <DivGrayHeader />
      <DivEmptyStateInstructions>
        <LightBulbIcon />
        <p>
          <span>Oops! No data found.</span>
        </p>
      </DivEmptyStateInstructions>
      <img src={blurredTable} alt={emptyMessage} />
    </SectionEmptyState>
  )
}

export default ReportEmptyState
