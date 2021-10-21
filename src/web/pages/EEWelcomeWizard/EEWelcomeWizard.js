import React, {useContext, useEffect} from 'react'
import styled from 'styled-components'
import {AppModeContext, AppModes} from 'web/providers/AppModeProvider'
import WelcomeWizard from 'web/modules/WelcomeWizard/WelcomeWizard'
import {GlobalLoaderContext} from 'shared/providers/GlobalLoaderProvider'

const DivWizardPage = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  /* background: rgba(255,255,255,0.7); */
`

/**
 * This page represents the EE Welcome Wizard.
 * @category Components - Web
 * @namespace EEWelcomeWizard
 */
export default function EEWelcomeWizard() {
  const {setAppMode} = useContext(AppModeContext)
  const {setIsLoading} = useContext(GlobalLoaderContext)

  // Change the app mode to onboarding on mount (potentially redundant)
  useEffect(function didMount() {
    setAppMode(AppModes.ONBOARDING)
    setIsLoading(false)

    return function cleanup() {
      // Return to default app mode when the user navigates away from onboarding
      setAppMode(AppModes.DEFAULT)
    }
  }, [])

  return (
    <DivWizardPage>
      <WelcomeWizard/>
    </DivWizardPage>
  )
}