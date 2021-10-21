import { func, object } from 'prop-types'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { taskTypes } from 'web/constants/processConstants'
import { getFlatTasks } from '../../ProcessBoard.helpers'
import TaskDetailFooter from '../TaskDetailFooter/TaskDetailFooter'
import EmailTemplateTask from '../TaskTypes/components/EmailTemplateTask/EmailTemplateTask'
import InstructionsTask from '../TaskTypes/components/InstructionsTask/InstructionsTask'
import AutoTask from '../TaskTypes/components/AutoTask/AutoTask'
import CreateCxpEmployeeTask from '../TaskTypes/components/CreateCxpEmployeeTask/CreateCxpEmployeeTask'
import PegaNetsuiteClientCreationTask from '../TaskTypes/components/PegaNetsuiteClientCreationTask/PegaNetsuiteClientCreationTask'
import PegaNetsuiteEmployeeCreationTask from '../TaskTypes/components/PegaNetsuiteEmployeeCreationTask/PegaNetsuiteEmployeeCreationTask'
import InvoiceApprovalTask from '../TaskTypes/components/InvoiceApprovalTask/InvoiceApprovalTask'
import BackgroundCheckTask from '../TaskTypes/components/BackgroundCheckTask/BackgroundCheckTask'
import PaymentVerificationTask from '../TaskTypes/components/PaymentVerificationTask/PaymentVerificationTask'
import MeetingSetTask from '../TaskTypes/components/MeetingSetTask/MeetingSetTask'
import CamTierAssignmentTask from '../TaskTypes/components/CamTierAssignmentTask/CamTierAssignmentTask'
import TaskDetailHeader from '../TaskDetailHeader/TaskDetailHeader'
import DependentTaskOverlay from '../DependentTaskOverlay/DependentTaskOverlay'

TaskDetail.propTypes = {
  process: object,
  setActiveStageIds: func.isRequired,
}

function renderTaskType(task) {
  const { type } = task

  switch (type) {
    case taskTypes.EMAIL_TEMPLATE:
      return <EmailTemplateTask />
    case taskTypes.INSTRUCTION:
      return <InstructionsTask />
    case taskTypes.AUTO:
      return <AutoTask />
    case taskTypes.CREATE_CXP_EMPLOYEE:
      return <CreateCxpEmployeeTask />
    case taskTypes.PEGA_NETSUITE_CLIENT_CREATION:
      return <PegaNetsuiteClientCreationTask />
    case taskTypes.PEGA_NETSUITE_EMPLOYEE_CREATION:
      return <PegaNetsuiteEmployeeCreationTask />
    case taskTypes.INVOICE_APPROVAL:
      return <InvoiceApprovalTask />
    case taskTypes.BACKGROUND_CHECK:
      return <BackgroundCheckTask />
    case taskTypes.PAYMENT_VERIFICATION:
      return <PaymentVerificationTask />
    case taskTypes.MEETING_SET:
      return <MeetingSetTask />
    case taskTypes.CAM_TIER_ASSIGNMENT:
      return <CamTierAssignmentTask />
    default:
      return null
  }
}

function TaskDetail(props) {
  const { process, setActiveStageIds } = props
  const { taskId } = useParams()

  const tasks = getFlatTasks(process.stages)
  const taskIndex = tasks.findIndex((task) => task.id === taskId)
  const task = tasks[taskIndex]
  const nextTask = tasks[taskIndex + 1]
  const prevTask = tasks[taskIndex - 1]
  const stage = process.stages.find((stage) => stage.id === task.stageId)

  useEffect(
    function openNextStage() {
      setActiveStageIds((ids) => ({ ...ids, [task.stageId]: true }))
    },
    [setActiveStageIds, task.stageId]
  )

  return task ? (
    <DivContainer>
      <TaskDetailHeader task={task} />
      <DivDetailContainer>
        <DependentTaskOverlay task={task} />
        {renderTaskType(task)}
      </DivDetailContainer>
      <TaskDetailFooter
        task={task}
        stage={stage}
        prevTask={prevTask}
        nextTask={nextTask}
      />
    </DivContainer>
  ) : null
}

const DivContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const DivDetailContainer = styled.div`
  flex: 1 1 100%;
  position: relative;
`

export default TaskDetail
