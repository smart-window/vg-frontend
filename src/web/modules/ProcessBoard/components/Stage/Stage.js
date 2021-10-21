import React from 'react'
import styled from 'styled-components'
import { colors, fonts } from 'shared/constants/cssConstants'
import Task from '../Task/Task'
import DropdownArrowIcon from 'web/components/DynamicIcons/DropdownArrowIcon'
import CheckmarkIcon from 'web/components/DynamicIcons/CheckmarkIcon'

/**
 * A column of the given stage it includes the stage name and completion rate
 * along with all of the tasks below
 * @category Components - Web
 * @namespace Stage
 */
function Stage(props) {
  const { isActive, isProfileOpen, setActiveStageIds, stage, stageNum } = props

  const isCompleted = stage.percentComplete === 1

  /**
   * If a stage is truthy it sets it to false. Otherwise, it sets it to true.
   */
  function toggleStage() {
    setActiveStageIds((stageIds) =>
      stageIds[stage.id]
        ? { ...stageIds, [stage.id]: false }
        : { ...stageIds, [stage.id]: true }
    )
  }

  return (
    <DivStageContainer>
      <DivStageHeading isActive={isActive} onClick={toggleStage}>
        {isCompleted ? (
          <CheckmarkIcon fillColor={colors.officialBlue} />
        ) : (
          <DivStageNum>{stageNum}</DivStageNum>
        )}
        <DivStageName hideText={isProfileOpen} isCompleted={isCompleted}>
          {stage.name}
        </DivStageName>
        <DropdownArrowIcon color={colors.gray30} />
      </DivStageHeading>
      {isActive &&
        stage.tasks.map((task) => (
          <Task
            key={task.id}
            isProfileOpen={isProfileOpen}
            task={task}
            stage={stage}
          />
        ))}
    </DivStageContainer>
  )
}

const DivStageContainer = styled.div`
  margin: 16px;
  border-bottom: 1px solid ${colors.coolGray};
`
const DivStageHeading = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  height: 43px;
  box-sizing: border-box;
  & > svg:first-child {
    margin-right: 16px;
    flex-shrink: 0;
  }
  & > svg:last-child {
    margin-left: 30px;
    transform: rotate(${(p) => (p.isActive ? 0 : 90)}deg);
    flex-shrink: 0;
    height: 15px;
    width: 12px;
  }
`

const DivStageName = styled.div`
  transition: width 0.5s ease-in;
  width: ${(p) => (p.hideText ? 0 : 200)}px;
  font-family: ${fonts.helvetica};
  font-size: 1rem;
  color: ${colors.officialBlue};
  text-decoration: ${(p) => (p.isCompleted ? 'line-through' : 'none')};
  line-height: 21px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const DivStageNum = styled.div`
  margin-right: 16px;
  width: 23px;
  font-family: ${fonts.openSans};
  font-size: 1.8rem;
  color: ${colors.officialBlue};
`

export default Stage
