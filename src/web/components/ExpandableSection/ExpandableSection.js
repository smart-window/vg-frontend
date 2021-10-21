import React, {useState} from 'react'
import PropTypes from 'prop-types'
import DropdownArrowIcon from 'web/components/DynamicIcons/DropdownArrowIcon'
import {colors} from 'shared/constants/cssConstants'
import localStorageService from 'web/services/localStorageService'
import storageConstants from 'shared/constants/storageConstants'

import {
  SectionContainer,
  HeaderTab,
  ButtonDropdownArrow,
  DivAnimatedContainer
} from './ExpandableSection.styles'

ExpandableSection.propTypes = {
  /** Component/s to display within section */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  /** Title of section */
  title: PropTypes.string,
  /** Indicates if dropdown is collapsable or not, defaults false */
  isCollapsable: PropTypes.bool,
  /** Indicates if the section should by default be expanded or collapsed */
  startsExpanded: PropTypes.bool,
  /** If passed, the expanded/collapsed state will be saved in localStorage (maybe this should be named localStorageId?) */
  localStorageId: PropTypes.string
}

ExpandableSection.defaultProps = {
  isCollapsable: false,
  startsExpanded: false
}

/**
 * Animated sections that expand and collapse
 * @category Components - Web
 * @namespace ExpandableSection
 */
export default function ExpandableSection({children, title, isCollapsable, localStorageId, startsExpanded}) {
  const expandedSections = localStorageService.getFromStorage(storageConstants.EXPANDED_SECTIONS) || {}
  const savedExpansionState = expandedSections[localStorageId]
  const [isExpanded, setIsExpanded] = useState(!isCollapsable || savedExpansionState ||
    // the previously saved state, whether true or false, should take precedent over initial expansion state
    (savedExpansionState !== undefined ? savedExpansionState : startsExpanded)
  )

  /** Save expansion state in local storage and set in state */
  function handleExpansion() {
    const expandedSections = localStorageService.getFromStorage(storageConstants.EXPANDED_SECTIONS) || {}
    expandedSections[localStorageId] = !isExpanded
    localStorageService.setInStorage(storageConstants.EXPANDED_SECTIONS, expandedSections)
    setIsExpanded(!isExpanded)
  }

  return (
    <SectionContainer title={title}>
      <HeaderTab>
        <h3>
          {title}
        </h3>
        {
          isCollapsable &&
          <ButtonDropdownArrow onClick={handleExpansion} isExpanded={isExpanded}>
            <DropdownArrowIcon fillColor={colors.charcoal}/>
          </ButtonDropdownArrow>
        }
      </HeaderTab>
      <DivAnimatedContainer isExpanded={isExpanded} data-testid='animated-container'>
        {children}
      </DivAnimatedContainer>
    </SectionContainer>
  )
}
