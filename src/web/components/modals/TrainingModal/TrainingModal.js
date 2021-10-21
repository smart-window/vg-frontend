import React, { useState } from 'react'
import PropTypes from 'prop-types'
import analyticsService from 'web/services/analyticsService'
import checkmarkIcon from 'assets/images/icons/checkmark.svg'
import paperPlaneIcon from 'assets/images/icons/paperPlane.svg'
import {colors} from 'shared/constants/cssConstants'
import XIcon from 'web/components/DynamicIcons/XIcon'
import VgCheckbox from 'web/components/VgCheckbox/VgCheckbox'
import dateHelper from 'shared/services/dateHelper'

import {
  ImgTrainingIconContainer,
  ImgTrainingIcon,
  DivPoweredByText,
  DivTrainingTitle,
  SpanBoldedTrainingTitle,
  SpanNonBoldedTrainingTitle,
  DivLitmosTrainingContainerShadow,
  DivLitmosTrainingContainer,
  DivLitmosDateInfo,
  DivLitmosDateInfoOverdue,
  DivLitmosTrainingCompletion,
  DivLitmosTrainingFooter,
  DivLitmosTrainingHeader,
  ImgLitmosTrainingCloseButtonContainer,
  IFrameLitmosTraining,
  SpanLitmosTrainingCompletionText,
  DivLitmosTrainingCancel,
  DivLitmosTrainingSubmit,
  DivTrainingHeaderInfo
} from './TrainingModal.styles'

TrainingModal.propTypes = {
  /** the training module itself */
  training: PropTypes.object.isRequired,
  /** the employee to training mapping */
  employeeTraining: PropTypes.object.isRequired,
  /**
   * callback when training is canceled
   * @param employeeTraining
   */
  onTrainingCanceled: PropTypes.func.isRequired,
  /**
   * callback when training is completed
   * @param employeeTraining
   */
  onTrainingCompleted: PropTypes.func.isRequired
}

/**
 * The UI for viewing a training bundle and, optionally, confirming that the
 * training in question is complete. Also supports a "read-only" view of the
 * training if the employee has already marked it as complete.
 *
 * @category Components - Web
 * @namespace TrainingModal
 */
export default function TrainingModal({
  training,
  employeeTraining,
  onTrainingCanceled,
  onTrainingCompleted
}) {
  const [trainingCompleted, setTrainingCompleted] = useState(false)
  const trainingStatus = employeeTraining.status

  /** Handles the cancel (whether from close icon or cancel button) */
  function handleTrainingCanceled() {
    setTrainingCompleted(false)
    onTrainingCanceled(employeeTraining)
    analyticsService.logEvent('EE Employment Training', 'Clicked', 'Module_Cancel')
  }

  /** Toggles a user certification of whether they have completed the training */
  function toggleTrainingCertifiedChange() {
    if (trainingStatus !== 'completed') {
      setTrainingCompleted(!trainingCompleted)
      if (!trainingCompleted) analyticsService.logEvent('EE Employment Training', 'Clicked', 'TrainingModules_CertifyCompletion')
    }
  }

  /** Handles training submission */
  function handleTrainingCompleted() {
    if (trainingCompleted) {
      onTrainingCompleted(employeeTraining)
      analyticsService.logEvent('EE Employment Training', 'Clicked', 'TrainingModules_Submit')
    }
  }

  let dateInfo = null
  if (trainingStatus === 'completed') {
    dateInfo = <DivLitmosDateInfo>Completed</DivLitmosDateInfo>
  }
  else {
    const numDays = dateHelper.getNumDaysAgo(employeeTraining.dueDate)
    if (numDays < 0) {
      dateInfo = <DivLitmosDateInfoOverdue>OverDue</DivLitmosDateInfoOverdue>
    }
    else {
      dateInfo = <DivLitmosDateInfo>{`Due in ${numDays + (numDays === 1 ? ' Day' : ' Days')}`}</DivLitmosDateInfo>
    }
  }
  const firstSpace = training.name.indexOf(' ')
  const titleFirstWord = training.name.substr(0, firstSpace)
  const restOfTitle = training.name.substr(firstSpace + 1)
  return (
    <DivLitmosTrainingContainerShadow>
      <DivLitmosTrainingContainer>
        <DivLitmosTrainingHeader>
          <ImgTrainingIconContainer trainingStatus={trainingStatus}>
            <ImgTrainingIcon trainingStatus={trainingStatus} src={trainingStatus === 'completed' ? checkmarkIcon : paperPlaneIcon}/>
          </ImgTrainingIconContainer>
          <DivTrainingHeaderInfo>
            <DivPoweredByText>EMPLOYMENT TRAINING</DivPoweredByText>
            <DivTrainingTitle>
              <SpanBoldedTrainingTitle>{titleFirstWord + ' '}</SpanBoldedTrainingTitle>
              <SpanNonBoldedTrainingTitle>{restOfTitle}</SpanNonBoldedTrainingTitle>
            </DivTrainingTitle>
          </DivTrainingHeaderInfo>
          {dateInfo}
          <ImgLitmosTrainingCloseButtonContainer onClick={handleTrainingCanceled}>
            <XIcon fillColor={colors.black}/>
          </ImgLitmosTrainingCloseButtonContainer>
        </DivLitmosTrainingHeader>
        <IFrameLitmosTraining src={training.bundleURL} />
        <DivLitmosTrainingFooter>
          <DivLitmosTrainingCompletion>
            <VgCheckbox
              disabled={trainingStatus === 'completed'}
              checked={trainingStatus === 'completed' || trainingCompleted}
              onChange={toggleTrainingCertifiedChange}
            />
            <SpanLitmosTrainingCompletionText disabled={trainingStatus === 'completed'}>
              I certify that I have completed this training module
            </SpanLitmosTrainingCompletionText>
          </DivLitmosTrainingCompletion>
          <DivLitmosTrainingCancel onClick={handleTrainingCanceled}>
            Cancel
          </DivLitmosTrainingCancel>
          <DivLitmosTrainingSubmit
            onClick={handleTrainingCompleted}
            isDeactivated={!trainingCompleted}
          >
            Submit
          </DivLitmosTrainingSubmit>
        </DivLitmosTrainingFooter>
      </DivLitmosTrainingContainer>
    </DivLitmosTrainingContainerShadow>
  )
}