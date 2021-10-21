import React from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import {routes} from 'web/constants/routeConstants'
import {mockedRoutePermissionsSet} from 'test/mocks/useAccessibleRoutes.mock'
import {mockedPermissionsSet} from 'test/mocks/usePermissions.mock.js'
import 'test/mocks/usePermissions.mock'
import {mockedIsAuthenticatedValue, mockedLogoutFunction} from 'test/mocks/okta.mock'
import {renderWithRouter, mockedCurrentLocationValue} from 'test/mocks/router.mock'
import GlobalHeader from './GlobalHeader'

mockedCurrentLocationValue.mockImplementation(() => ({pathname: routes.HOME}))
global.gtag = jest.fn()

describe('Render Tests', () => {

  it('loads and displays header when user is authenticated', () => {
    mockedIsAuthenticatedValue.mockImplementation(() => true)
    renderWithRouter(<GlobalHeader/>)
    expect(screen.getByTestId('global-header')).toBeDefined()
  })

  it('does not display header controls when user is unauthenticated', () => {
    mockedIsAuthenticatedValue.mockImplementation(() => false)
    renderWithRouter(<GlobalHeader/>)
    expect(screen.queryByRole('toolbar')).toBeNull()
  })
})

describe('Navigation Tests', () => {
  it('navigates home on VG logo click', () => {
    mockedCurrentLocationValue.mockImplementation(() => ({pathname: routes.ONBOARDING}))
    mockedIsAuthenticatedValue.mockImplementation(() => true)
    const mockHistoryPush = jest.fn()
    renderWithRouter(<GlobalHeader/>, mockHistoryPush)
    fireEvent.click(screen.getByAltText('Velocity Global'))
    expect(mockHistoryPush).toHaveBeenCalledWith(routes.HOME)
  })

  it('logs out on logout button click', () => {
    mockedIsAuthenticatedValue.mockImplementation(() => true)
    renderWithRouter(<GlobalHeader />)
    fireEvent.click(screen.getByLabelText('User Profile'))
    fireEvent.click(screen.getByText('Sign Out'))
    expect(mockedLogoutFunction).toHaveBeenCalledWith('/')
  })

  it('navigates to routes.SEARCH on search button click', () => {
    mockedIsAuthenticatedValue.mockImplementation(() => true)
    const mockHistoryPush = jest.fn()
    mockedPermissionsSet.mockImplementationOnce(() => new Set(['search']))
    renderWithRouter(<GlobalHeader/>, mockHistoryPush)
    fireEvent.click(screen.getByLabelText('Search'))
    expect(mockHistoryPush).toHaveBeenCalledWith(routes.SEARCH)
  })

  it('navigates to add/edit payroll request on menu item click', () => {
    mockedIsAuthenticatedValue.mockImplementation(() => true)
    const mockHistoryPush = jest.fn()
    renderWithRouter(<GlobalHeader/>, mockHistoryPush)
    fireEvent.click(screen.getByLabelText('Add/Edit'))
    fireEvent.click(screen.getByText('Payroll Request'))
    expect(mockHistoryPush).toHaveBeenCalledWith(routes.PAYROLL_REQUEST)
  })

  it('Navigates to a particular icon', () => {
    mockedIsAuthenticatedValue.mockImplementation(() => true)
    const mockHistoryPush = jest.fn()
    renderWithRouter(<GlobalHeader/>, mockHistoryPush)
    fireEvent.click(screen.getByLabelText( 'Calendars' ))
    expect(mockHistoryPush).toHaveBeenCalledWith(routes.CALENDARS)
  })

  it('hides icons if the user lacks permissions', () => {
    mockedRoutePermissionsSet.mockImplementation(() => new Set([]))
    renderWithRouter(<GlobalHeader />)
    expect(screen.queryByLabelText( 'Calendars' )).toBeNull()
  })
})

describe('Notifications Tests', () => {

  const mockNotifications = [
    {
      'context': 'VG-PEO-WORK OB-276',
      'createdBy': 'klewstill@velocityglobal.com',
      'createdBy_fullname': 'Klew Still',
      'createTime': '2020-09-30T16:54:10.606Z',
      'ID': 'VG-PEO-WORK OB-276',
      'message': 'Klew Still mentioned you in a comment',
      'notificationName': 'pyAddUserMentionedPost',
      'pxObjClass': 'Pega-API-CaseManagement-Social-Notification',
      'status': 'READ',
      'uuid': 'abc123'
    },
    {
      'context': 'VG-PEO-WORK PTO-39',
      'createdBy': 'klewstill@velocityglobal.com',
      'createdBy_fullname': 'Klew Still',
      'createTime': '2020-09-28T22:45:13.340Z',
      'ID': 'VG-PEO-WORK PTO-39',
      'message': 'Klew Still commented in PTO-39 that you are following',
      'notificationName': 'pyAddPulsePost',
      'pxObjClass': 'Pega-API-CaseManagement-Social-Notification',
      'status': 'READ',
      'uuid': 'def456'
    }
  ]

  it('uses the correct empty state', () => {
    mockedIsAuthenticatedValue.mockImplementation(() => true)
    renderWithRouter(<GlobalHeader/>)
    fireEvent.click(screen.getByLabelText('Notifications'))
    expect(screen.queryByText( 'Nothing new for you' )).toBeDefined()
  })

  it('navigates to notification settings', () => {
    mockedIsAuthenticatedValue.mockImplementation(() => true)
    const mockHistoryPush = jest.fn()
    renderWithRouter(<GlobalHeader/>, mockHistoryPush)
    fireEvent.click(screen.getByLabelText('Notifications'))
    fireEvent.click(screen.getByText('Settings'))
    expect(mockHistoryPush).toHaveBeenCalledWith(routes.NOTIFICATION_SETTINGS)
  })

  it('navigates to a specific notification', () => {
    global.fetch = () => ({
      json: () => ({notifications: mockNotifications})
    })
    mockedIsAuthenticatedValue.mockImplementation(() => true)
    const mockHistoryPush = jest.fn()
    renderWithRouter(<GlobalHeader/>, mockHistoryPush)
    fireEvent.click(screen.getByLabelText('Notifications'))
    waitFor(() => {
      // mock data fetch
      fireEvent.click(screen.getAllByRole('menuItem')[0])
      expect(mockHistoryPush).toHaveBeenCalledWith(
        expect.stringMatching(/\/cases.*/)
      )
    })
  })

  it('displays the pip when there are new notifications', () => {
    global.fetch = () => ({
      json: () => ({notifications: mockNotifications, hasNewNotifications: true})
    })
    mockedIsAuthenticatedValue.mockImplementation(() => true)
    renderWithRouter(<GlobalHeader/>)
    waitFor(() => {
      expect(screen.getByLabelText('new notifications!')).toBeDefined()
    })
  })

  it('hides the pip when there aren\'t new notifications', () => {
    global.fetch = () => ({
      json: () => ({notifications: mockNotifications, hasNewNotifications: false})
    })
    mockedIsAuthenticatedValue.mockImplementation(() => true)
    renderWithRouter(<GlobalHeader/>)
    waitFor(() => {
      expect(screen.getByLabelText('new notifications!')).toBeNull()
    })
  })
})

