import React from 'react'
import {colors} from 'shared/constants/cssConstants'

export default function CheckmarkIcon({
  height = 21,
  width = 23,
  fillColor = colors.white
}) {
  return (
    <svg width={width} height={height} viewBox='0 0 23 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M6.63232 20.4878C6.31592 19.7935 6.12256 19.3584 6.05225 19.1826L5.24805 17.3237C5.00195 16.7524 4.79102 16.2866 4.61523 15.9263L4.12744 14.9375C3.18701 13.0742 2.0752 11.7603 0.791992 10.9956C2.29492 9.72998 3.63525 9.09717 4.81299 9.09717C5.59521 9.09717 6.21045 9.40039 6.65869 10.0068C7.10693 10.6045 7.48926 11.646 7.80566 13.1313C10.0908 8.79834 11.8706 5.80566 13.145 4.15332C14.2876 2.66797 15.2632 1.68359 16.0718 1.2002C16.8892 0.716797 17.9702 0.475098 19.3149 0.475098C20.1587 0.475098 21.0728 0.637695 22.0571 0.962891C19.7632 2.46582 17.2583 4.93555 14.5425 8.37207C11.8354 11.8086 9.19873 15.8472 6.63232 20.4878Z' fill={fillColor}/>
    </svg>
  )
}