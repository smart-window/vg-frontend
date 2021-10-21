import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AnimatedDropdown from './AnimatedDropdown'

describe('AnimatedDropdown', () => {
  it('is open when the correct prop is passed', () => {
    render(
      <AnimatedDropdown
        onClickOutside={jest.fn()}
        isDropdownOpen={true}
      >
        <div>Child of dropdown</div>
      </AnimatedDropdown>
    )

    const animatedConatiner = screen.getByRole('dialog')

    const documentAnimatedContainer = document.getElementsByClassName(animatedConatiner.className)
    const style = window.getComputedStyle(documentAnimatedContainer[0])

    expect(screen.getByText('Child of dropdown')).toBeDefined()
    expect(style.opacity).toBe('1')
  })

  it('is closed when the correct prop is passed', () => {
    render(
      <AnimatedDropdown
        onClickOutside={jest.fn()}
        isDropdownOpen={false}
      >
        <div>Child of dropdown</div>
      </AnimatedDropdown>
    )

    const animatedConatiner = screen.getByRole('dialog')

    const documentAnimatedContainer = document.getElementsByClassName(animatedConatiner.className)
    const style = window.getComputedStyle(documentAnimatedContainer[0])

    expect(style.opacity).toBe('0')
  })

  it('is closed when a user clicks outside of the dropdown', () => {
    const mockOnClickOutside = jest.fn()
    render(
      <div data-testid='wrapper'>
        <AnimatedDropdown
          onClickOutside={mockOnClickOutside}
          isDropdownOpen={true}
        >
          <div>Child of dropdown</div>
        </AnimatedDropdown>
      </div>
    )

    fireEvent.click(screen.getByTestId('wrapper'))

    expect(mockOnClickOutside).toHaveBeenCalled()
  })
})
