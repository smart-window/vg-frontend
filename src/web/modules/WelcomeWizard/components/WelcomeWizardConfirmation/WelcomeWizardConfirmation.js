import React from 'react'
import PropTypes from 'prop-types'
import {routes} from 'web/constants/routeConstants'
import VgButton from 'web/components/VgButton/VgButton'
import blueSlashes from 'assets/images/icons/blue-slashes.svg'
import { useHistory } from 'react-router'

import {H2FormHeading, DivFormContents, DivButtonsRow} from '../../wwSharedStyles'
import {DivContainer} from './WelcomeWizardConfirmation.styles'

WelcomeWizardConfirmation.propTypes = {
  docsToSign: PropTypes.object
}

/**
 * Last page of EEWW
 * @category Modules - Web
 * @subcategory WelcomeWizard
 * @namespace WelcomeWizardConfirmation
 */

export default function WelcomeWizardConfirmation() {
  const history = useHistory()

  /** routes them to the profile page */
  function redirectToProfilePage() {
    history.replace(routes.MY_PROFILE)
  }

  return (
    <DivContainer>
      <H2FormHeading>You’re all set! We are thrilled to have you aboard.</H2FormHeading>
      <DivFormContents>
        <h3>Here is some important information about your employment through Velocity Global:</h3>
        <ul>
          <li>
            <img src={blueSlashes} alt='Important piece 1 indicator' />
            <p>Your personal employment manager at Velocity Global is Veronica Taylor, Client Experience Associate. Reach Veronica at <span>veronicataylor@velocityglobal.com</span> with any questions or issues.</p>
          </li>
          <li>
            <img src={blueSlashes} alt='Important piece 2 indicator' />
            <p>Learn how to use Velocity Global’s online platform by checking out the software training options under Employment Training</p>
          </li>
        </ul>
      </DivFormContents>
      <DivButtonsRow>
        <VgButton text='Done' arrowDirection='right' shape='oval' useGradient={true} onClick={redirectToProfilePage}/>
      </DivButtonsRow>
    </DivContainer>
  )
}