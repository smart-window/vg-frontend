import React, { useState } from 'react'

export const GlobalLoaderContext = React.createContext({
  isLoading: false,
  setIsLoading: () => {}
})

/**
 * Provider for global spinner/loader context.
 * @category Providers - Web
 * @module GlobalLoaderProvider
 */
export function GlobalLoaderProvider(props) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <GlobalLoaderContext.Provider
      value={{
        isLoading,
        setIsLoading
      }}
    >
      {props.children}
    </GlobalLoaderContext.Provider>
  )
}