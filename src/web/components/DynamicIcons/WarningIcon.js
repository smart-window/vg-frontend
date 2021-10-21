import React from 'react'
import {colors} from 'shared/constants/cssConstants'

export default function WarningIcon({lineColor = colors.uiAlertRed}) {
  return (
    <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M5.03004 32.7172L5.02764 32.7172C3.54964 32.7211 2.18589 31.9207 1.46769 30.6269L1.46778 30.6268L1.46089 30.6148C0.713038 29.3151 0.713038 27.715 1.4609 26.4153L1.46308 26.4114L14.433 3.61126L14.4331 3.61126L14.4358 3.60634C15.1593 2.31579 16.5223 1.51719 18 1.51719C19.4777 1.51719 20.8407 2.31579 21.5642 3.60634L21.5642 3.60635L21.567 3.61126L34.5369 26.4115L34.5391 26.4153C35.287 27.715 35.287 29.3151 34.5391 30.6148L34.539 30.6148L34.5323 30.6269C33.8141 31.9207 32.4504 32.7211 30.9724 32.7172L30.97 33.6172V32.7172L5.03004 32.7172Z' stroke={lineColor} strokeWidth='1.8'/>
      <path fillRule='evenodd' clipRule='evenodd' d='M16.777 21.0236C16.8037 21.5558 17.2429 21.9736 17.7758 21.9736H18.709C19.2427 21.9736 19.6824 21.5545 19.7079 21.0214L20.159 11.5858C20.1862 11.0155 19.7311 10.5381 19.1601 10.5381H17.3035C16.7315 10.5381 16.2761 11.0169 16.3047 11.5881L16.777 21.0236ZM18.2725 23.369C17.0525 23.3462 16.0409 24.3088 16.0033 25.5285C15.9698 26.1373 16.1929 26.7323 16.6186 27.1689C17.0442 27.6055 17.6334 27.8437 18.2429 27.8256C19.4631 27.819 20.4511 26.8322 20.4592 25.612C20.4674 24.3917 19.4926 23.3919 18.2725 23.369Z' fill={lineColor}/>
    </svg>
  )
}