import React from 'react'
import {colors} from 'shared/constants/cssConstants'

export default function PlusButtonIcon({fillColor = colors.white, lineColor = colors.officialBlue, strokeWidth}) {
  let outlineColor = colors.officialBlue
  if (fillColor !== colors.white) {
    lineColor = colors.white
    outlineColor = fillColor
  }

  return strokeWidth ?
    (
      <svg width='22' height='22' viewBox='0 0 22 22' fill={fillColor} xmlns='http://www.w3.org/2000/svg'>
        <circle cx='11' cy='11' r='10' stroke={lineColor} strokeWidth={strokeWidth}/>
        <line x1='11' y1='7.5' x2='11' y2='14.5' stroke={lineColor} strokeWidth={strokeWidth} strokeLinecap='round'/>
        <line x1='7.5' y1='11' x2='14.5' y2='11' stroke={lineColor} strokeWidth={strokeWidth} strokeLinecap='round'/>
      </svg>
    ) :
    (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='50' height='50' viewBox='0 0 50 50'>
        <defs>
          <path id='h82gbyvgpa' d='M.952.695c.302-.301.79-.301 1.091 0l7.602 7.601 7.512-7.51c.295-.295.773-.295 1.068 0 .295.295.295.773 0 1.068l-7.51 7.511 7.693 7.695c.274.274.299.702.074 1.004l-.074.087c-.301.3-.79.3-1.091 0l-7.695-7.695-7.783 7.785c-.296.295-.774.295-1.07 0-.294-.295-.294-.774 0-1.069l7.785-7.785-7.602-7.6C.678 1.511.654 1.083.878.781z'/>
        </defs>
        <g fill='none' fillRule='evenodd'>
          <g>
            <g transform='translate(-1727 -295) translate(1728 296)'>
              <ellipse cx='24' cy='23.822' fill={fillColor} stroke={outlineColor} strokeWidth='1.062' rx='24' ry='23.822'/>
              <g>
                <g transform='rotate(45 .1 33.9) translate(.486 .486)'>
                  <use fill={lineColor} xlinkHref='#h82gbyvgpa'/>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
}