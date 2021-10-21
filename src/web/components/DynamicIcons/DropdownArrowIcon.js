import React from 'react'
import {colors} from 'shared/constants/cssConstants'

export default function DropdownArrowIcon({fillColor=colors.gray30}) {
  return (
    <svg width='9' height='8' viewBox='0 0 9 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M5.13311 7.00311C4.8385 7.467 4.1615 7.467 3.86689 7.00311L0.468529 1.65208C0.151416 1.15276 0.510132 0.5 1.10164 0.5L7.89836 0.500001C8.48987 0.500001 8.84858 1.15276 8.53147 1.65208L5.13311 7.00311Z' fill={fillColor}/>
    </svg>
  )
}
