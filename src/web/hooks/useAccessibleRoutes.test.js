import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import useAccessibleRoutes from './useAccessibleRoutes'

const mockPermissions = {
  permissions: [
    {slug: 'onboarding'},
    {slug: 'reports'}
  ]
}

beforeEach(() => {
  React.useContext = jest.fn(() => mockPermissions)
})

it('converts context permissions to the correct Set form', () => {
  const {result} = renderHook(
    () => useAccessibleRoutes()
  )
  expect(result.current.has('/onboarding')).toBeTruthy()
})