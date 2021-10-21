import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import {colors, mobileFonts, measurements} from 'shared/constants/cssConstants'
import VelocityGlobalCircle from 'mobile/icons/DynamicIcons/VelocityGlobalCircle'

PageHeader.propTypes = {
  /** The title of the page. */
  title: PropTypes.string
}

const ViewPageHeader = styled.View`
  width: 100%;
  height: ${measurements.mobilePageHeaderHeight}px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  /* padding-top: 6px; */
`

const TextPageHeader = styled.Text`
  padding-top: 6px;
  font-family: ${mobileFonts.deviceSpecificFont};
  font-size: 24px;
  font-weight: bold;
  color: ${colors.white};
  line-height: 28px;
`

/**
 * A repeating header element that displays on a mobile page component.
 * Displays a passed the page title and the white Velocity Global circle icon.
 * @category Components - Mobile
 * @namespace PageHeader
 */
export default function PageHeader({title}) {
  return (
    <ViewPageHeader testID='PageHeader'>
      <TextPageHeader>{title}</TextPageHeader>
      <VelocityGlobalCircle
        fillColor={colors.white}
        height='48'
        width='51'
      />
    </ViewPageHeader>
  )
}