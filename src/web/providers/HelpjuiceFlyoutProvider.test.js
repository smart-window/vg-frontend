import React, { useContext } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import {
  HelpjuiceFlyoutContext,
  HelpjuiceFlyoutProvider,
} from './HelpjuiceFlyoutProvider'

it('initializes to the default app mode', () => {
  const wrapper = ({ children }) => (
    <HelpjuiceFlyoutProvider>{children}</HelpjuiceFlyoutProvider>
  )

  const { result } = renderHook(() => useContext(HelpjuiceFlyoutContext), {
    wrapper,
  })
  expect(result.current.isExpanded).toEqual(false)
})
