import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import styled from 'styled-components'
import { processBoardTaskFragment } from 'web/apollo/fragments/taskFragments'
import { useProcessSubscriptions } from './hooks/useProcessSubscriptions'
import Stage from './components/Stage/Stage'
import { useHistory, useParams } from 'react-router-dom'
import ProcessHeader from './components/ProcessHeader/ProcessHeader'
import TaskDetail from './components/TaskDetail/TaskDetail'
import { getFlatTasks, tempMockData } from './ProcessBoard.helpers'
import ProcessFooter from './components/ProcessFooter/ProcessFooter'
import OnboardingDiscussion from 'web/modules/OnboardingDiscussion/OnboardingDiscussion'

ProcessBoard.fragments = {
  process: gql`
    fragment ProcessBoardFragmentProcess on Process {
      name
      services {
        id
        name
      }
      stages {
        id
        name
        percentComplete
        tasks {
          ...ProcessBoardTask
        }
      }
    }
    ${processBoardTaskFragment}
  `,
}

export const PROCESS_QUERY = gql`
  query process($id: ID!) {
    process(id: $id) {
      id
      ...ProcessBoardFragmentProcess
    }
  }
  ${ProcessBoard.fragments.process}
`

/**
 * A board view that shows all the stages and tasks included in the process with the given id
 * @category Components - Web
 * @namespace ProcessBoard
 */
function ProcessBoard(props) {
  const [activeStageIds, setActiveStageIds] = useState({})
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const history = useHistory()
  const { processId, taskId } = useParams()
  const { data, subscribeToMore, loading } = useQuery(PROCESS_QUERY, {
    variables: { id: processId },
    onCompleted: (data) => {
      const activeTask = getFlatTasks(process.stages).find((task) =>
        taskId ? task.id === taskId : task.status !== 'completed'
      )

      if (activeTask) {
        setActiveStageIds((stageIds) => ({
          ...stageIds,
          [activeTask.stageId]: true,
        }))
        if (!taskId) {
          history.push(`${history.location.pathname}/task/${activeTask.id}`)
        }
      }
    },
  })
  const process = {
    ...data?.process,
    ...tempMockData
  }

  useProcessSubscriptions(subscribeToMore, process.id)

  return (
    !loading && (
      <DivContainer>
        <DivProcessContainer>
          <ProcessHeader
            process={process}
            isProfileOpen={isProfileOpen}
            setIsProfileOpen={setIsProfileOpen}
          />
          <DivDetailContainer>
            <DivStagesContainer>
              {process?.stages.map((stage, index) => (
                <Stage
                  key={stage.id}
                  isActive={activeStageIds[stage.id]}
                  isProfileOpen={isProfileOpen}
                  setActiveStageIds={setActiveStageIds}
                  stage={stage}
                  stageNum={index + 1}
                />
              ))}
            </DivStagesContainer>
            <DivTaskDetailContainer>
              {taskId && (
                <TaskDetail
                  process={process}
                  setActiveStageIds={setActiveStageIds}
                />
              )}
            </DivTaskDetailContainer>
          </DivDetailContainer>
          <ProcessFooter process={process} />
          {taskId && <OnboardingDiscussion taskId={taskId}/>}
        </DivProcessContainer>
        <DivProfileContainer isOpen={isProfileOpen} />
      </DivContainer>
    )
  )
}

export default ProcessBoard

const DivContainer = styled.div`
  display: flex;
  height: 100%;
`

const DivProfileContainer = styled.div`
  transition: width 0.5s ease-in;
  width: ${(p) => (p.isOpen ? '35%' : 0)};
`

const DivDetailContainer = styled.div`
  display: flex;
  height: calc(100% - 177px);
`
const DivStagesContainer = styled.div`
  overflow: auto;
`
const DivTaskDetailContainer = styled.div`
  flex-grow: 1;
`
const DivProcessContainer = styled.div`
  flex-grow: 1;
  position: relative;
  padding: 16px;
  height: 100%;
  box-sizing: border-box;
  overflow: auto
`
