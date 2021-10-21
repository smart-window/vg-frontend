import { registerRootComponent } from 'expo'
import '../i18n'
import React, {useEffect, useState} from 'react'
import {CurrentUserProvider} from 'mobile/providers/CurrentUserProvider.mobile'
import {GlobalModalProvider} from 'shared/providers/GlobalModalProvider'
import {GlobalLoaderProvider} from 'shared/providers/GlobalLoaderProvider'
import useAsyncFonts from 'mobile/hooks/useAsyncFonts'
import MobileApp from 'mobile/components/MobileApp/MobileApp'
import * as firebase from 'firebase'
import firebaseConfig from 'shared/config/firebaseConfig'

export default function MobileAppContainer() {
  const [fontsLoaded, setFontsLoaded] = useState(false) // Handles async font loading
  const areFontsLoaded = useAsyncFonts() // Provides update for async font loading

  useEffect(function didMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    else {
      firebase.app()
    }
  }, [])

  useEffect(function didUpdate() {
    if (areFontsLoaded) {
      setFontsLoaded(areFontsLoaded)
    }
  }, [areFontsLoaded])

  if (!fontsLoaded) {
    return null
  }
  return (
    <CurrentUserProvider>
      <GlobalModalProvider>
        <GlobalLoaderProvider>
          <MobileApp />
        </GlobalLoaderProvider>
      </GlobalModalProvider>
    </CurrentUserProvider>
  )
}

registerRootComponent(MobileAppContainer)