import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import analyticsService from 'web/services/analyticsService'
import paperPlaneIcon from 'assets/images/icons/paperPlane.svg'
import checkmarkIcon from 'assets/images/icons/checkmark.svg'
import dateHelper from 'shared/services/dateHelper'
import modalConstants from 'web/constants/modalConstants'
import {GlobalModalContext} from 'shared/providers/GlobalModalProvider'
import { useMutation, gql } from '@apollo/client'
import {
  DivTrainingWrapper,
  DivTrainingModules,
  DivTrainingsCaption,
  DivTrainingModulesGrid,
  DivTrainingModulesRow,
  DivTrainingModulesCard,
  ImgTrainingIconContainer,
  ImgTrainingIcon,
  DivDateInfo,
  DivDateInfoOverDue,
  DivTrainingTextBox,
  DivPoweredByText,
  DivTrainingTitle,
  SpanBoldedTrainingTitle,
  SpanNonBoldedTrainingTitle
} from './TrainingWrapper.styles'

TrainingWrapper.propTypes = {
  /** employee trainings */
  employeeTrainings: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** trainings */
  trainings: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export const UPDATE_EMPLOYEE_TRAINING_MUTATION = gql`
mutation UpdateEmployeeTraining(
  $id: ID!,
  $trainingId: ID!,
  $userId: ID!,
  $status: String!,
  $dueDate: Date,
  $completedDate: Date
) {
  updateEmployeeTraining(
    id: $id,
    trainingId: $trainingId,
    userId: $userId,
    status: $status,
    dueDate: $dueDate,
    completedDate: $completedDate
  ) {
    id
    trainingId
    userId
    status
    dueDate
    completedDate
  }
}
`

/**
 * The framework for a report. Receives a properties an array of objects which contain
 * a label (ignored by ReportBody), the content (ignored by ReportHeader),
 * the size and the sort order (ignored by ReportBody. Only one may be sorted. Assume the first in the list
 * with a sort order).
 * @category Modules - Web
 * @subcategory Reports
 * @namespace TrainingWrapper
 */

export default function TrainingWrapper(props) {
  const {showModal, hideModal} = useContext(GlobalModalContext)

  const { employeeTrainings, trainings } = props

  const [selectedTrainingId, setSelectedTrainingId] = useState(null)

  const DAY = 1000 * 60 * 60 * 24

  const [updateEmployeeTraining] = useMutation(UPDATE_EMPLOYEE_TRAINING_MUTATION)

  /**
   * Handles the status update (if necessary) of the provided employee training.
   * @param {object} employeeTraining - the employee training to maybe update.
   * @param {string} status - the new training status.
   */
  function updateEmployeeTrainingStatus(employeeTraining, status) {
    let completedDate = employeeTraining.completedDate
    if (status !== employeeTraining.status) {
      if (status === 'completed') {
        completedDate = dateHelper.getStringDate(new Date())
      }
      else if (completedDate) {
        completedDate = null
      }
      updateEmployeeTraining({
        variables: {
          id: employeeTraining.id,
          trainingId: employeeTraining.trainingId,
          userId: employeeTraining.userId,
          status: status,
          dueDate: employeeTraining.dueDate,
          completedDate: completedDate
        },
      })
    }
  }

  /**
   * Handles the selection of a training card and analytics
   * @param {Event} event
   * @param {object} employeeTraining selected employee training
   */
  function selectTrainingCard(event, employeeTraining) {
    event.stopPropagation()
    setSelectedTrainingId(employeeTraining.trainingId)
    const analyticsLabel = employeeTraining.status === 'completed' ? 'TrainingModules_CompletedTraining' : 'TrainingModules_ActiveTraining'
    analyticsService.logEvent('EE Employment Training', 'Clicked', analyticsLabel)
  }

  /**
   * Creates the UI for each employee training.
   * @param {string} status - the status of the employee trainings to process.
   * @returns {component} the react component for the trainings
   */
  function formatEmployeeTrainings(status) {
    const caption = status === 'active' ? 'Active Training Modules' : 'Completed Training Modules'
    const trainingsByStatus = employeeTrainings.filter(employeeTraining => {
      return ((status === 'active' && (employeeTraining.status === 'not_started' || employeeTraining.status === 'in_progress')) || (status === 'completed' && employeeTraining.status === 'completed'))
    })

    let count = 0
    let rowCount = 0
    const trainingModuleRows = []
    let trainingRow = []
    trainingsByStatus.forEach(employeeTraining => {
      const training = trainings.find(training => {
        return training.id === employeeTraining.trainingId
      }
      )
      const name = training ? training.name : 'Unknown Training'
      let dateInfo = null
      const dueDateInMs = new Date(employeeTraining.dueDate).getTime()
      const todayInMs = new Date().getTime()
      const numDays = Math.ceil((dueDateInMs - todayInMs) / DAY)
      if (status === 'completed') {
        dateInfo = <DivDateInfo>Completed</DivDateInfo>
      }
      else if (numDays < 0) {
        dateInfo = <DivDateInfoOverDue>OverDue</DivDateInfoOverDue>
      }
      else {
        dateInfo = <DivDateInfo>{`Due in ${numDays + (numDays === 1 ? ' Day' : ' Days')}`}</DivDateInfo>
      }
      const firstSpace = name.indexOf(' ')
      const titleFirstWord = name.substr(0, firstSpace)
      const restOfTitle = name.substr(firstSpace + 1)
      trainingRow.push(<DivTrainingModulesCard key={count} onClick={(e) => selectTrainingCard(e, employeeTraining)}>
        <ImgTrainingIconContainer background={status === 'completed' ? '#7CBE73' : '#54BAE3'}>
          <ImgTrainingIcon size={status === 'completed' ? '30px' : '60px'} margin={status === 'completed' ? '15px' : '0px'} src={status === 'completed' ? checkmarkIcon : paperPlaneIcon}/>
        </ImgTrainingIconContainer>
        {dateInfo}
        <DivTrainingTextBox>
          <DivPoweredByText>EMPLOYMENT TRAINING</DivPoweredByText>
          <DivTrainingTitle>
            <SpanBoldedTrainingTitle>{titleFirstWord + ' '}</SpanBoldedTrainingTitle>
            <SpanNonBoldedTrainingTitle>{restOfTitle}</SpanNonBoldedTrainingTitle>
          </DivTrainingTitle>
        </DivTrainingTextBox>
      </DivTrainingModulesCard>
      )
      if (++count % 3 === 0 || count === trainingsByStatus.length) {
        trainingModuleRows.push(<DivTrainingModulesRow key={rowCount++}>{trainingRow}
        </DivTrainingModulesRow>)
        trainingRow = []
      }
    })

    return <DivTrainingModules>
      <DivTrainingsCaption>{caption}</DivTrainingsCaption>
      <DivTrainingModulesGrid>
        {trainingModuleRows}
      </DivTrainingModulesGrid>
    </DivTrainingModules>
  }

  /**
   * Closes the training modal.
   */
  function closeTrainingModal() {
    hideModal()
    setSelectedTrainingId(null)
  }

  /**
   * Handles training completed indication from the training modal.
   * @param {object} employeeTraining - the employee training to be completed.
   */
  function handleTrainingCompleted(employeeTraining) {
    updateEmployeeTrainingStatus(employeeTraining, 'completed')
    closeTrainingModal()
  }

  useEffect(() => {
    const whichTraining = trainings.find(training => training.id === selectedTrainingId)
    const whichEmployeeTraining = employeeTrainings.find(employeeTraining => employeeTraining.trainingId === selectedTrainingId)
    if (whichTraining && whichEmployeeTraining) {
      const trainingStatus = whichEmployeeTraining.status
      if (trainingStatus === 'not_started') {
        updateEmployeeTrainingStatus(whichEmployeeTraining, 'in_progress')
      }
      showModal(modalConstants.TRAINING_MODAL, {
        training: whichTraining,
        employeeTraining: whichEmployeeTraining,
        onTrainingCanceled: closeTrainingModal,
        onTrainingCompleted: handleTrainingCompleted
      })
    }
  }, [selectedTrainingId])

  return (
    <DivTrainingWrapper>
      { employeeTrainings && employeeTrainings.length > 0 ?
        formatEmployeeTrainings('active')
        :
        null
      }
      { employeeTrainings && employeeTrainings.length > 0 ?
        formatEmployeeTrainings('completed')
        :
        null
      }
    </DivTrainingWrapper>
  )
}
