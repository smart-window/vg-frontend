import React, {useContext, useEffect, useState, useRef} from 'react'

import {GlobalLoaderContext} from 'shared/providers/GlobalLoaderProvider'
import {AppModeContext, AppModes} from 'web/providers/AppModeProvider'
import loaderGif from 'assets/images/loader.gif'
import {DivGlobalLoaderContainer} from './GlobalLoader.styles'

/**
 * Uses GlobalLoaderContext to set visibility of the app loader.
 * @category Components - Web
 * @namespace GlobalLoader
 */
export default function GlobalLoader() {
  const {appMode} = useContext(AppModeContext)
  const {isLoading} = useContext(GlobalLoaderContext)
  const [isMinDisplayTimeComplete, setIsMinDisplayTimeComplete] = useState(false)
  // used to store previous value of isLoading
  const [oldIsLoadingContextValue, saveIsLoadingContextValue] = useState(isLoading)
  // ensure timeout isn't reset on every render
  const minDisplayTimeout = useRef(null)

  useEffect(function onIsLoadingUpdate() {
    if (isLoading && !oldIsLoadingContextValue) {
      // delay rendering when isLoading changes to true
      minDisplayTimeout.current = setTimeout(() => {
        setIsMinDisplayTimeComplete(true)
      }, 1000)
    }
    else if (!isLoading && oldIsLoadingContextValue) {
      // reset state variable when loading completes
      setIsMinDisplayTimeComplete(false)
      clearTimeout(minDisplayTimeout.current)
    }
    saveIsLoadingContextValue(isLoading)
  }, [isLoading, oldIsLoadingContextValue])

  const isVisible = isMinDisplayTimeComplete && isLoading
  const inOnboardingMode = appMode === AppModes.ONBOARDING

  return (
    <DivGlobalLoaderContainer isVisible={isVisible} inOnboardingMode={inOnboardingMode} role='alert' aria-busy='true'>
      <img src={loaderGif} alt='loading with velocity'/>
    </DivGlobalLoaderContainer>
  )
}