import React from 'react'
import {colors} from 'shared/constants/cssConstants'

export default function TimeOffIcon({color}) {
  const lineColor = color || colors.charcoal
  const binderColor = lineColor === colors.officialBlue ? colors.white : colors.charcoal
  return (
    <svg width='33' height='30' viewBox='0 0 33 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <mask id='path-1-inside-1' fill='white'>
        <path fillRule='evenodd' clipRule='evenodd' d='M2 2.14288C0.895431 2.14288 0 3.03831 0 4.14288V8.57143H32.1429V4.14288C32.1429 3.03831 31.2474 2.14288 30.1429 2.14288H2ZM32.1429 9.64286H0V28C0 29.1046 0.895433 30 2 30H30.1429C31.2474 30 32.1429 29.1046 32.1429 28V9.64286Z'/>
      </mask>
      <path fillRule='evenodd' clipRule='evenodd' d='M2 2.14288C0.895431 2.14288 0 3.03831 0 4.14288V8.57143H32.1429V4.14288C32.1429 3.03831 31.2474 2.14288 30.1429 2.14288H2ZM32.1429 9.64286H0V28C0 29.1046 0.895433 30 2 30H30.1429C31.2474 30 32.1429 29.1046 32.1429 28V9.64286Z' fill='white'/>
      <path d='M0 8.57143H-0.8C-0.8 9.01326 -0.441828 9.37143 0 9.37143L0 8.57143ZM32.1429 8.57143V9.37143C32.5847 9.37143 32.9429 9.01326 32.9429 8.57143H32.1429ZM32.1429 9.64286H32.9429C32.9429 9.20104 32.5847 8.84286 32.1429 8.84286V9.64286ZM0 9.64286V8.84286C-0.441828 8.84286 -0.8 9.20104 -0.8 9.64286H0ZM0.8 4.14288C0.8 3.48014 1.33726 2.94288 2 2.94288V1.34288C0.453603 1.34288 -0.8 2.59649 -0.8 4.14288H0.8ZM0.8 8.57143V4.14288H-0.8V8.57143H0.8ZM0 9.37143H32.1429V7.77143H0V9.37143ZM31.3429 4.14288V8.57143H32.9429V4.14288H31.3429ZM30.1429 2.94288C30.8056 2.94288 31.3429 3.48014 31.3429 4.14288H32.9429C32.9429 2.59648 31.6893 1.34288 30.1429 1.34288V2.94288ZM2 2.94288H30.1429V1.34288H2V2.94288ZM32.1429 8.84286H0V10.4429H32.1429V8.84286ZM0.8 28V9.64286H-0.8V28H0.8ZM2 29.2C1.33726 29.2 0.8 28.6628 0.8 28H-0.8C-0.8 29.5464 0.453606 30.8 2 30.8V29.2ZM30.1429 29.2H2V30.8H30.1429V29.2ZM31.3429 28C31.3429 28.6628 30.8056 29.2 30.1429 29.2V30.8C31.6893 30.8 32.9429 29.5464 32.9429 28H31.3429ZM31.3429 9.64286V28H32.9429V9.64286H31.3429Z' fill={lineColor} mask='url(#path-1-inside-1)'/>
      <line x1='5.85742' y1='0.5' x2='5.85742' y2='3.78572' stroke={binderColor} strokeLinecap='round'/>
      <line x1='14.4285' y1='0.5' x2='14.4285' y2='3.78572' stroke={binderColor} strokeLinecap='round'/>
      <line x1='23.0002' y1='0.5' x2='23.0002' y2='3.78572' stroke={binderColor} strokeLinecap='round'/>
      <line x1='10.1431' y1='0.5' x2='10.1431' y2='3.78572' stroke={binderColor} strokeLinecap='round'/>
      <line x1='18.7146' y1='0.5' x2='18.7146' y2='3.78572' stroke={binderColor} strokeLinecap='round'/>
      <line x1='27.2856' y1='0.5' x2='27.2856' y2='3.78572' stroke={binderColor} strokeLinecap='round'/>
      <circle cx='15.9037' cy='13.895' r='1.03795' fill={lineColor}/>
      <circle cx='15.9037' cy='19.2523' r='1.03795' fill={lineColor}/>
      <circle cx='15.9037' cy='24.6094' r='1.03795' fill={lineColor}/>
      <circle cx='21.4828' cy='24.6094' r='1.03795' fill={lineColor}/>
      <circle cx='21.2945' cy='13.895' r='1.03795' fill={lineColor}/>
      <circle cx='21.2945' cy='19.2523' r='1.03795' fill={lineColor}/>
      <circle cx='10.514' cy='19.2523' r='1.03795' fill={lineColor}/>
      <circle cx='4.73765' cy='19.2523' r='1.03795' fill={lineColor}/>
      <circle cx='10.514' cy='24.6094' r='1.03795' fill={lineColor}/>
      <circle cx='26.0379' cy='24.6094' r='1.03795' fill={lineColor}/>
      <circle cx='4.73765' cy='24.6094' r='1.03795' fill={lineColor}/>
      <circle cx='26.6854' cy='13.895' r='1.03795' fill={lineColor}/>
      <circle cx='26.6854' cy='19.2523' r='1.03795' fill={lineColor}/>
    </svg>
  )
}