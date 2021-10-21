import React, {useContext, useEffect, useState, useRef} from 'react'

import {GlobalLoaderContext} from 'shared/providers/GlobalLoaderProvider'
import loaderGif from 'assets/images/loader.gif'
import {ViewGlobalLoaderContainer, ImageAnimatedLoader} from './GlobalLoader.styles'

/**
 * Uses GlobalLoaderContext to set visibility of the app loader.
 * @category Components - Mobile
 * @namespace GlobalLoader
 */
export default function GlobalLoader() {
  const {isLoading} = useContext(GlobalLoaderContext)
  const [isDelayComplete, setIsDelayComplete] = useState(false)
  // used to store previous value of isLoading
  const [oldIsLoadingContextValue, saveIsLoadingContextValue] = useState(isLoading)
  // ensure timeout isn't reset on every render
  const delayTimeout = useRef(null)

  useEffect(function onIsLoadingUpdate() {
    if (isLoading && !oldIsLoadingContextValue) {
      // delay rendering when isLoading changes to true
      setIsDelayComplete(true)
      clearTimeout(delayTimeout.current)
    }
    else {
      // reset state variable when loading completes
      delayTimeout.current = setTimeout(() => {
        setIsDelayComplete(false)
      }, 1000)
    }
    saveIsLoadingContextValue(isLoading)
  }, [isLoading, oldIsLoadingContextValue])

  const isVisible = isDelayComplete && isLoading

  return (
    // TODO: role='alert' aria-busy='true', but for RN
    // I can't get the RN accessibility props to play well with testing-library, and am seeing some other weird behavior with this component.
    <ViewGlobalLoaderContainer isVisible={isVisible}>
      <ImageAnimatedLoader source={loaderGif}/>
    </ViewGlobalLoaderContainer>
  )
}