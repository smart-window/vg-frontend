import React from 'react'
import styled from 'styled-components'

import { colors } from 'shared/constants/cssConstants'

export default function ProgressIndicator({ progress, text='', height = 8 }) {
  return (
    <DivProgressBarContainer>
      <DivProgress height={height}>
        <DivProgressIndicator progress={progress} height={height} />
      </DivProgress>
      <DivProgressBarValue progress={progress}>{text?text:progress+'%'}</DivProgressBarValue>
    </DivProgressBarContainer>
  )
}

const DivProgressBarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`
const DivProgress = styled.div`
  width: 100%;
  flex-grow: 1;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  height: ${(props) => props.height + 'px'};
  border-radius: ${(props) => props.height + 'px'};
`
const DivProgressIndicator = styled.div`
  height: ${(props) => props.height + 'px'};
  border-radius: ${(props) => props.height + 'px'};
  width: ${(props) => (props.progress >= 100 ? '100%' : props.progress + '%')};
  background-color: ${(props) =>
    props.progress >= 100 ? colors.successGreen : colors.officialBlue};
`
const DivProgressBarValue = styled.div`
  display: block;
  margin-left: 4px;
  min-width: 32px;
  font-size: 0.8rem;
  text-align: right;
  white-space: nowrap;
  color: ${(props) =>
    props.progress >= 100 ? colors.successGreen : colors.officialBlue};
`
