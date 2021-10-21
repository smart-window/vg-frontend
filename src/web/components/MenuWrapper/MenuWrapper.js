import React from 'react'
import PropTypes from 'prop-types'

import {
  Header,
  DivContent,
  DivContentWrapper,
  H2HeaderTitle,
  DivSubheader
} from './MenuWrapper.styles'

MenuWrapper.propTypes = {
  /** Menu Content */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  /** Header icon - this should be an html tag or react-ified svg */
  icon: PropTypes.node,
  /** Title for the menu header */
  headerTitle: PropTypes.string.isRequired,
  /** Content for the 'sub-header' area (directly below h2) */
  subheaderContent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

/**
 * Wrapper component which provides a hybrid menu header and space for transcluded content
 * @category Components - Web
 * @namespace MenuWrapper
 */
export default function MenuWrapper(props) {
  const {children, icon, headerTitle, subheaderContent} = props
  return (
    <div role='menu'>
      <Header>
        {icon}
        <H2HeaderTitle>{headerTitle}</H2HeaderTitle>
        <DivSubheader>{subheaderContent}</DivSubheader>
      </Header>
      <DivContentWrapper>
        <DivContent>
          {children}
        </DivContent>
      </DivContentWrapper>
    </div>
  )
}