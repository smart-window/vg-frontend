import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import 'test/mocks/usePermissions.mock'
import {mockedIsAuthenticatedValue} from 'test/mocks/okta.mock.js'
import HelpjuiceFlyout from './HelpjuiceFlyout'

jest.mock('web/services/scriptsHelper.js')
global.gtag = jest.fn()

it('loads and displays flyout when user is authenticated', () => {
  mockedIsAuthenticatedValue.mockImplementation(() => true)
  render(<HelpjuiceFlyout/>)
  expect(screen.getByAltText('Open Knowledge Management')).toBeDefined()
})

it('displays nothing flyout when user is not authenticated', () => {
  mockedIsAuthenticatedValue.mockImplementation(() => false)
  render(<HelpjuiceFlyout/>)
  expect(screen.queryByAltText('Open Knowledge Management')).toBeNull()
})

it('clicking tab opens the flyout', () => {
  mockedIsAuthenticatedValue.mockImplementation(() => true)
  render(<HelpjuiceFlyout/>)
  fireEvent.click(screen.getByAltText('Open Knowledge Management'))
  // expect(screen.getByTestId('flyout-container')).toHaveStyle(`right: 0`)
})

it('clicking X closes the flyout', () => {
  mockedIsAuthenticatedValue.mockImplementation(() => true)
  render(<HelpjuiceFlyout/>)
  fireEvent.click(screen.getByAltText('Open Knowledge Management'))
  fireEvent.click(screen.getByLabelText('Close Knowledge Management'))
  // expect(screen.getByTestId('flyout-container')).toHaveStyle(`right: -614px`)
})