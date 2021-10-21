import React from 'react'
import PropTypes from 'prop-types'
import CheckmarkIcon from 'web/components/DynamicIcons/CheckmarkIcon'
import {colors} from 'shared/constants/cssConstants'
import {H3SectionHeading, SpanCheckmarkIconContainer} from './SectionHeading.styles'

SectionHeading.propTypes = {
  /** Child components are embedded on the right side of the header */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  sectionIsComplete: PropTypes.bool,
  title: PropTypes.string.isRequired
}

/**
 * Heading for a section within a WelcomeWizard page
 * @category Modules - Web
 * @subcategory WelcomeWizard
 * @namespace SecionHeading
 */
export default function SectionHeading({
  children,
  sectionIsComplete,
  title
}) {
  return (
    <H3SectionHeading isComplete={sectionIsComplete}>
      {sectionIsComplete &&
          <SpanCheckmarkIconContainer>
            <CheckmarkIcon fillColor={colors.successGreen}/>
          </SpanCheckmarkIconContainer>
      }
      {title}
      {children}
    </H3SectionHeading>
  )
}