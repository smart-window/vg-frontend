import React from 'react'
import PropTypes from 'prop-types'

import {
  ViewCalendarLegend,
  ViewLegendMarker,
  TextLegendDescriptor,
  ViewLegendItemWrapper
} from './HorizontalLegend.styles'

HorizontalLegend.propTypes = {
  /** An array of objects containing legend labels and marker style */
  legendItems: PropTypes.arrayOf(PropTypes.shape({
    /** A label for the legend item */
    label: PropTypes.string.isRequired,
    /** A string representing marker style, opts 'rounded' or null */
    markerStyle: PropTypes.string,
    /** A hex code for marker color, defaults to gray */
    markerColor: PropTypes.string,
  }))
}

/**
 * The legend that displays a color and label in a horizontal row
 * @category Components - Mobile
 * @namespace HorizontalLegend
 */
export default function HorizontalLegend({ legendItems }) {
  function createLegend() {
    return legendItems.map((legendItem, index) => {
      const { label, markerColor, markerStyle } = legendItem
      return (
        <ViewLegendItemWrapper key={index} isFirst={index === 0}>
          <ViewLegendMarker markerColor={markerColor} markerStyle={markerStyle} />
          <TextLegendDescriptor>{label}</TextLegendDescriptor>
        </ViewLegendItemWrapper>
      )
    })
  }

  return (
    <ViewCalendarLegend>
      { createLegend() }
    </ViewCalendarLegend>
  )
}