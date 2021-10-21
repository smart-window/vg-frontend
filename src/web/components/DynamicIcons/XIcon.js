import React from 'react'
import {colors} from 'shared/constants/cssConstants'

export default function XIcon({fillColor = colors.gray50}) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='18' height='18' viewBox='0 0 18 18'>
      <defs>
        <path id='igyclbvt9a' d='M.952.695c.302-.301.79-.301 1.091 0l7.602 7.601 7.512-7.51c.295-.295.773-.295 1.068 0 .295.295.295.773 0 1.068l-7.51 7.511 7.693 7.695c.274.274.299.702.074 1.004l-.074.087c-.301.3-.79.3-1.091 0l-7.695-7.695-7.783 7.785c-.296.295-.774.295-1.07 0-.294-.295-.294-.774 0-1.069l7.785-7.785-7.602-7.6C.678 1.511.654 1.083.878.781z'/>
      </defs>
      <g fill='none' fillRule='evenodd' transform='translate(-.514 -.514)'>
        <mask id='3qip3cwjmb' fill='#fff'>
          <use xlinkHref='#igyclbvt9a'/>
        </mask>
        <use fill='#D8D8D8' xlinkHref='#igyclbvt9a'/>
        <g fill={fillColor} fillRule='nonzero' mask='url(#3qip3cwjmb)'>
          <path d='M0 0H19.029V19.029H0z'/>
        </g>
      </g>
    </svg>
  )
}