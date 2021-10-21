import React from 'react'
import {colors} from 'shared/constants/cssConstants'

export default function ChevronArrowIcon({
  height = 41,
  width = 20,
  fillColor = colors.officialBlue
}) {
  return (
    <svg width={width} height={height} viewBox='0 0 20 41' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
      <title>Icons/ChevronforButton</title>
      <g id='Icons/ChevronforButton' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
        <polyline id='Path-7' stroke={fillColor} strokeWidth='3' transform='translate(10.000000, 20.500000) rotate(90.000000) translate(-10.000000, -20.500000) ' points='-9 29 10 12 29 29'></polyline>
      </g>
    </svg>
  )
}