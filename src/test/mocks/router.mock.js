import React from 'react'
import {createMemoryHistory} from 'history'
import {Router, Route, Switch} from 'react-router-dom'
import {render} from '@testing-library/react'

export const mockedCurrentLocationValue = jest.fn()
export const mockedParamsValue = jest.fn()
export default jest.mock('react-router-dom', () => {
  return {
    useLocation: () => mockedCurrentLocationValue(),
    useParams: () => mockedParamsValue(),
    useHistory: () => ({}),
    Router: Router,
    Route: Route,
    Switch: Switch
  }
})

/**
 * @param {jsx} jsxContents - test contents to render
 * @param {function} mockHistoryPush - a jest.fn() to test whether routes were pushed
 * @param {object} renderOptions
 */
export function renderWithRouter(jsxContents, mockHistoryPush, renderOptions) {
  const memoryHistory = createMemoryHistory()

  if (mockHistoryPush) {
    memoryHistory.push = mockHistoryPush
  }
  return render(
    <Router history={memoryHistory}>
      <Route render={() => jsxContents} />
    </Router>,
    renderOptions
  )
}