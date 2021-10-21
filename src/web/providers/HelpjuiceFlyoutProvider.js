import React, { useState } from 'react'

export const HelpjuiceFlyoutContext = React.createContext({
  isExpanded: false,
  setIsExpanded: () => {}
})

/**
 * Provider for help juice flyout on web.
 * It allows the help juice flyout to be opened from anywhere in the app
 * @category Providers - Web
 * @module HelpjuiceFlyoutProvider
 */
export function HelpjuiceFlyoutProvider(props) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <HelpjuiceFlyoutContext.Provider
      value={{
        isExpanded,
        setIsExpanded,
      }}
    >
      {props.children}
    </HelpjuiceFlyoutContext.Provider>
  )
}
