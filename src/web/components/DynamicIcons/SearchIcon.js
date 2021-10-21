import React from 'react'
import {colors} from 'shared/constants/cssConstants'

export default function SearchIcon({fillColor = colors.white, lineColor = colors.officialBlue}) {
  let outlineColor = colors.officialBlue
  if (fillColor !== colors.white) {
    lineColor = colors.white
    outlineColor = fillColor
  }
  return (
    <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='50' height='50' viewBox='0 0 50 50'>
      <defs>
        <path id='w3eyw2n1ea' d='M23.297 21.568L16.38 14.86c1.145-1.684 1.793-3.66 1.866-5.698.003-1.223-.242-2.434-.72-3.559-.907-2.213-2.656-3.97-4.86-4.881-2.265-.963-4.821-.963-7.086 0-2.204.91-3.954 2.668-4.86 4.881-.96 2.275-.96 4.842 0 7.117.907 2.213 2.657 3.97 4.86 4.881 1.12.48 2.325.727 3.543.723 2.024-.075 3.986-.727 5.655-1.88l6.892 6.963c.223.108.583.586 1.05.586.368.042.733-.103.972-.387.198-.211.309-.49.308-.781-.106-.48-.35-.916-.703-1.257zm-8.609-6.815c-2.654 2.656-6.806 3.06-9.919.966C1.656 13.625.45 9.615 1.885 6.14 3.322 2.664 7.002.69 10.676 1.425 14.351 2.16 16.998 5.4 17 9.162c.031 2.104-.805 4.128-2.31 5.591z'/>
      </defs>
      <g fill='none' fillRule='evenodd'>
        <g>
          <g>
            <g transform='translate(-1571 -202) translate(1572 202) translate(0 1)'>
              <ellipse cx='24' cy='23.822' fill={fillColor} stroke={outlineColor} strokeWidth='1.062' rx='24' ry='23.822'/>
              <g transform='translate(12 12)'>
                <mask id='8ggdnsjwdb' fill='#fff'>
                  <use xlinkHref='#w3eyw2n1ea'/>
                </mask>
                <use fill='#FFF' fillRule='nonzero' xlinkHref='#w3eyw2n1ea'/>
                <g fill={lineColor} fillRule='nonzero' mask='url(#8ggdnsjwdb)'>
                  <path d='M0 0H73.333V73.333H0z' transform='translate(-.667)'/>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}