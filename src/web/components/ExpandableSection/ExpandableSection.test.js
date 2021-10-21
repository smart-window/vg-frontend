import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import ExpandableSection from './ExpandableSection'
import {eeProfilelocalStorageIds} from 'web/components/ExpandableSection/SectionLocalStorageIds'
import storageConstants from 'shared/constants/storageConstants'

describe('ExpandableSection', () => {
  it('renders a section without the ability to collapse with child components', () => {
    render(
      <ExpandableSection
        title={'Personal Information'}
      >
        <div>Child Component</div>
      </ExpandableSection>
    )

    expect(screen.getByText('Personal Information')).toBeDefined()
    expect(screen.getByText('Child Component')).toBeDefined()
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('renders a section with the ability to expand and collapse', () => {
    render(
      <ExpandableSection
        title={'Personal Information'}
        localStorageId={eeProfilelocalStorageIds.PROFILE_WORK}
        isCollapsable={true}
      >
        <div>Child Component</div>
      </ExpandableSection>
    )

    const expandCollapseButton = screen.getByRole('button')
    const animatedConatiner = screen.getByTestId('animated-container')

    // Get styled component class name
    let documentAnimatedContainer = document.getElementsByClassName(animatedConatiner.className)
    // Get styled component style for testing height prop
    let style = window.getComputedStyle(documentAnimatedContainer[0])

    expect(style.height).toBe('0px')

    fireEvent.click(expandCollapseButton)
    documentAnimatedContainer = document.getElementsByClassName(animatedConatiner.className)
    style = window.getComputedStyle(documentAnimatedContainer[0])

    expect(style.height).toBe('100%')

    fireEvent.click(expandCollapseButton)
    documentAnimatedContainer = document.getElementsByClassName(animatedConatiner.className)
    style = window.getComputedStyle(documentAnimatedContainer[0])

    expect(style.height).toBe('0px')
  })

  it('remembers if the section was previously expanded', () => {
    const savedExpansionState = {
      [eeProfilelocalStorageIds.PROFILE_WORK]: true
    }
    localStorage.setItem(storageConstants.EXPANDED_SECTIONS, JSON.stringify(savedExpansionState))

    render(
      <ExpandableSection
        title={'Personal Information'}
        localStorageId={eeProfilelocalStorageIds.PROFILE_WORK}
        isCollapsable={true}
      >
        <div>Child Component</div>
      </ExpandableSection>
    )

    const animatedConatiner = screen.getByTestId('animated-container')

    const documentAnimatedContainer = document.getElementsByClassName(animatedConatiner.className)
    const style = window.getComputedStyle(documentAnimatedContainer[0])

    expect(style.height).toBe('100%')

  })
})