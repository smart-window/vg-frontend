import React from 'react'
import { screen } from '@testing-library/react'
import {routes} from 'web/constants/routeConstants'
import FullPageError from './FullPageError'

import {renderWithRouter} from 'test/mocks/router.mock'

describe('FullPageError', () => {
  const statusCode = '404'
  const errorMessage = 'Resource not found.'
  const location = {
    pathname: routes.FULL_PAGE_ERROR,
    state: {
      errorMessage,
      statusCode
    }
  }

  it('renders an error page when location has state', () => {
    renderWithRouter(<FullPageError location={location} />)

    const compiledErrorMessage = `Status code ${statusCode}: ${errorMessage}`

    expect(screen.getByText(compiledErrorMessage)).toBeDefined()
  })
})