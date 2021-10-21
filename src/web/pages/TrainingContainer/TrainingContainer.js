import React, { useState, useEffect } from 'react'
import dateHelper from 'shared/services/dateHelper'
import {useHistory} from 'react-router'
import {
  DivTrainingContainer,
  DivTrainingNoneAvailable,
  ImgNoneAvailabel,
  DivExplanation,
  ImgLightBulb,
  DivExplanationParagraph,
  SpanExplanationTextBold,
  SpanExplanationText,
} from './TrainingContainer.styles'

import TrainingWrapper from 'web/components/TrainingWrapper/TrainingWrapper'
import trainingEmpty from '../../../assets/images/training-empty.svg'
import incandescent from '../../../assets/images/icons/incandescent.svg'
import { useMutation, useQuery, gql } from '@apollo/client'

/**
 * Employee Traning.
 * @category Modules - Web
 * @subcategory pages
 * @namespace TrainingContainer
 */

export const USER_QUERY = gql`
query {
  currentUser {
    id
    firstName
    lastName
    birthDate
    nationality {
      id
      isoCode
    }
  }
}
`

export const GET_TRAININGS_QUERY = gql`
  query ForUsersCountry {
    trainings {
      id
      name
      description
      bundleURL
    }
  }
`

export const GET_EMPLOYEE_TRAININGS_QUERY = gql`
  query ForCurrentUser {
    employeeTrainings {
      id
      trainingId
      userId
      status
      dueDate
    }
  }
`

export const CREATE_EMPLOYEE_TRAINING_MUTATION = gql`
mutation CreateEmployeeTraining(
  $trainingId: ID!, 
  $userId: ID!, 
  $status: String!,
  $dueDate: Date
) {
  createEmployeeTraining(
    trainingId: $trainingId, 
    userId: $userId, 
    status: $status,
    dueDate: $dueDate
  ) {
    id
    trainingId
    userId
    status
    dueDate
  }
}
`
export const UPDATE_EMPLOYEE_TRAINING_MUTATION = gql`
mutation UpdateEmployeeTraining(
  $trainingId: ID!, 
  $userId: ID!, 
  $status: String!,
  $dueDate: Date
) {
  updateEmployeeTraining(
    trainingId: $trainingId, 
    userId: $userId, 
    status: $status,
    dueDate: $dueDate
  ) {
    id
    trainingId
    userId
    status
    dueDate
  }
}
`

const TEN_DAYS = 1000 * 60 * 60 * 24 * 10

export default function TrainingContainer(props) {
  const history = useHistory()
  // TODO: remove once backend creates employee trainings
  const [createChecked, setCreateChecked] = useState(false)

  const userQueryResults = useQuery(USER_QUERY)
  const trainingsQueryResults = useQuery(GET_TRAININGS_QUERY)
  const employeeTrainingsQueryResults = useQuery(GET_EMPLOYEE_TRAININGS_QUERY)

  // TODO: remove once backend creates employee trainings
  const [createEmployeeTraining] = useMutation(
    CREATE_EMPLOYEE_TRAINING_MUTATION,
    {
      refetchQueries: [
        { query: GET_EMPLOYEE_TRAININGS_QUERY }
      ],
      awaitRefetchQueries: true
    }
  )

  // TODO: the following effect will be removed once employee trainings
  // are properly created on the backend
  useEffect(() => {
    const trainings = trainingsQueryResults.data && trainingsQueryResults.data.trainings
    const employeeTrainings = employeeTrainingsQueryResults.data && employeeTrainingsQueryResults.data.employeeTrainings
    if (!createChecked && trainings && employeeTrainings && userQueryResults?.data) {
      setCreateChecked(true)
      trainings.forEach(training => {
        if (!employeeTrainings.length || !employeeTrainings.find(et => et.trainingId === training.id)) {
          const today = new Date()
          const selectedDate = new Date(today.getTime() + TEN_DAYS)
          const dueDate = dateHelper.getStringDate(selectedDate)
          createEmployeeTraining({
            variables: {
              trainingId: training.id,
              userId: userQueryResults.data.currentUser.id,
              status: 'not_started',
              dueDate: dueDate
            }
          })
        }
      })
    }
  })

  if (userQueryResults.loading) return 'Loading...'
  if (userQueryResults.error) {
  }

  if (trainingsQueryResults.loading) return 'Loading...'
  if (trainingsQueryResults.error) {
    // TODO: Change to use inline error handling when implemented.
    history.push({
      pathname: '/error',
      state: {
        statusCode: '204',
        errorMessage: trainingsQueryResults.error.message
      }
    })
    return null
  }

  if (employeeTrainingsQueryResults.loading) return 'Loading...'
  if (employeeTrainingsQueryResults.error) {
  }

  const trainings = trainingsQueryResults.data && trainingsQueryResults.data.trainings
  const employeeTrainings = employeeTrainingsQueryResults.data && employeeTrainingsQueryResults.data.employeeTrainings
  return (
    <DivTrainingContainer>
      {!employeeTrainings || employeeTrainings.length === 0 ?
        < DivTrainingNoneAvailable >
          <ImgNoneAvailabel src={trainingEmpty} />
          <DivExplanation>
            <ImgLightBulb src={incandescent} />
            <DivExplanationParagraph>
              <SpanExplanationTextBold>You have no assigned training  modules. </SpanExplanationTextBold>
              <SpanExplanationText>Check back later to see what you can learn!</SpanExplanationText>
            </DivExplanationParagraph>
          </DivExplanation>
        </DivTrainingNoneAvailable>
        :
        <TrainingWrapper employeeTrainings={employeeTrainings} trainings={trainings}/>
      }
    </DivTrainingContainer>
  )
}
