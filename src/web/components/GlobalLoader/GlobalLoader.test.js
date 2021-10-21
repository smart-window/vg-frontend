import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import GlobalLoader from './GlobalLoader'
import {GlobalLoaderProvider, GlobalLoaderContext} from 'shared/providers/GlobalLoaderProvider'

it('hides the loader by default', () => {
  render(
    <GlobalLoaderProvider>
      <GlobalLoader/>
    </GlobalLoaderProvider>
  )
  expect(screen.getByRole('alert', {hidden: true})).toBeDefined()
})

it('displays the loader after half a second on context change', () => {
  let isLoading = false
  const setIsLoading = val => { isLoading = val }
  render(
    <GlobalLoaderContext.Provider
      value={{isLoading, setIsLoading}}
    >
      <GlobalLoader/>
    </GlobalLoaderContext.Provider>
  )
  setIsLoading(true)
  setTimeout(() => {
    expect(screen.getByRole('alert', {hidden: false})).toBeDefined()
  }, 550)
})

it('hides the loader immediately upon context change to false', () => {
  let isLoading = false
  const setIsLoading = val => { isLoading = val }
  render(
    <GlobalLoaderContext.Provider
      value={{isLoading, setIsLoading}}
    >
      <GlobalLoader/>
    </GlobalLoaderContext.Provider>
  )
  setIsLoading(true)
  setIsLoading(false)
  expect(screen.getByRole('alert', {hidden: true})).toBeDefined()
})