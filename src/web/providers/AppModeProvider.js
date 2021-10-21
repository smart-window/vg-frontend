import React, { useState } from 'react'
import {useLocation} from 'react-router-dom'
import {routes} from 'web/constants/routeConstants'

// Default view for most users
const DEFAULT = 'default'
// Special view for new users being onboarded
const ONBOARDING = 'onboarding'
export const AppModes = {
  DEFAULT,
  ONBOARDING
}

const onboardingRoutes = new Set([routes.EE_WELCOME_WIZARD])

export const AppModeContext = React.createContext({
  appMode: '',
  setAppMode: () => {}
})

/**
 * Provider for "app mode" on web.
 * Depending on the selected mode, components might have different displays. e.g. <GlobalHeader>
 * This could be extended to a general 'AppContext' if there is other global state to keep track of.
 * @category Providers - Web
 * @module AppModeProvider
 */
export function AppModeProvider(props) {
  const currentLocation = useLocation()
  const initialAppMode = onboardingRoutes.has(currentLocation.pathname) ? AppModes.ONBOARDING : AppModes.DEFAULT
  const [appMode, setAppMode] = useState(initialAppMode)

  return (
    <AppModeContext.Provider
      value={{
        appMode,
        setAppMode,
      }}
    >
      {props.children}
    </AppModeContext.Provider>
  )
}
