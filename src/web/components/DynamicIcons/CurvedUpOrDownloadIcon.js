import React from 'react'
import { colors } from 'shared/constants/cssConstants'

export default function CurvedUpOrDownloadIcon({isUpload=false, isBold=false, strokeColor=colors.charcoal}) {
  const strokeWidth = isBold ? '2' : '1'
  return isUpload ? (
    <svg strokeWidth={strokeWidth} width='20' height='19' viewBox='0 0 20 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M19 13.5424V13.5424C19 16.1423 16.8924 18.2499 14.2925 18.2499H5.71941C3.11295 18.2499 1 16.137 1 13.5305V13.5305' stroke={strokeColor} strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M1 13.75V13.25' stroke={strokeColor} strokeLinecap='round'/>
      <path d='M19 13.75V13.25' stroke={strokeColor} strokeLinecap='round'/>
      <path d='M9.86591 14.623L9.86591 1.88454' stroke={strokeColor} strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M14.5 7.48718L9.86591 0.99998L5.23182 7.48718' stroke={strokeColor} strokeLinecap='round' strokeLinejoin='round'/>
    </svg>
  ) : (
    <svg strokeWidth={strokeWidth} width='20' height='19' viewBox='0 0 20 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M19 13.5424V13.5424C19 16.1423 16.8924 18.2499 14.2925 18.2499H5.71941C3.11295 18.2499 1 16.137 1 13.5305V13.5305' stroke={strokeColor} strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M1 13.75V13.25' stroke={strokeColor} strokeLinecap='round'/>
      <path d='M19 13.75V13.25' stroke={strokeColor} strokeLinecap='round'/>
      <path d='M9.86603 0.999939V13.7384' stroke={strokeColor} strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M5.23193 8.13583L9.86602 14.623L14.5001 8.13583' stroke={strokeColor} strokeLinecap='round' strokeLinejoin='round'/>
    </svg>
  )
}