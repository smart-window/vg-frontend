import React, {useContext} from 'react'
import { renderHook } from '@testing-library/react-hooks'
import {createMemoryHistory} from 'history'
import {Router, Route} from 'react-router-dom'
import {AppModeContext, AppModeProvider, AppModes} from './AppModeProvider'

it('initializes to the default app mode', () => {
  const memoryHistory = createMemoryHistory()
  const wrapper = ({children}) => (
    <Router history={memoryHistory}>
      <Route render={() => (
        <AppModeProvider>
          {children}
        </AppModeProvider>
      )} />
    </Router>
  )

  const {result} = renderHook(
    () => useContext(AppModeContext),
    {wrapper}
  )
  expect(result.current.appMode).toEqual(AppModes.DEFAULT)
})