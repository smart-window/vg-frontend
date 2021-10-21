import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import {colors, mobileFonts} from 'shared/constants/cssConstants'

CardHeader.propTypes = {
  /** A React SVG element */
  icon: PropTypes.object,
  /** The Card Header's title */
  title: PropTypes.string,
}

const ViewHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 12px;
  border-bottom-width: 18px;
  border-bottom-color: ${colors.coolGray};
`

const TextHeader = styled.Text`
  margin-left: 15px;
  font-family: ${mobileFonts.openSans(400)};
  font-size: 24px;
  color: ${colors.black};
`

/**
 * A repeating header element within most Card components.
 * Displays a passed in React SVG element and a title.
 * @category Components - Mobile
 * @namespace CardHeader
 */
export default function CardHeader({icon, title}) {
  // TODO: replace with i18n translations
  return (
    <ViewHeader testID='CardHeader'>
      { icon }
      <TextHeader>
        {title}
      </TextHeader>
    </ViewHeader>
  )
}