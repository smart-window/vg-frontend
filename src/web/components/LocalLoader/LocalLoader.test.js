import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import LocalLoader from './LocalLoader'

it('hides the loader by default', () => {
  render(<LocalLoader/>)
  expect(screen.getByRole('alert')).toHaveStyle('opacity: 0')
})

it('displays the loader when visible=true', () => {
  render(<LocalLoader visible={true}/>)
  expect(screen.getByRole('alert')).toHaveStyle('opacity: 1')
})