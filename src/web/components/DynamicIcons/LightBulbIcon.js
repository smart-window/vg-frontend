import React from 'react'
import PropTypes from 'prop-types'
import { colors } from 'shared/constants/cssConstants'

LightBulbIcon.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
}

LightBulbIcon.defaultProps = {
  color: colors.charcoal,
  height: 61,
  width: 51,
}

export default function LightBulbIcon() {
  return (
    <svg width={51} height={61} viewBox='0 0 51 61' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path fillRule='evenodd' clipRule='evenodd' d='M19.8333 55.3677V52.5343H32.5833V55.3677H19.8333Z' stroke='#182026' strokeLinecap='round' strokeLinejoin='round'/>
      <path fillRule='evenodd' clipRule='evenodd' d='M19.8333 52.5343V49.701H32.5833V52.5343H19.8333Z' stroke='#182026' strokeLinecap='round' strokeLinejoin='round'/>
      <path fillRule='evenodd' clipRule='evenodd' d='M32.5833 55.3677V55.9733L32.5084 56.4974L32.2775 57.0181L31.9738 57.449L31.5191 57.7122L26.7409 59.5327L26.2083 59.6177L25.6787 59.5327L20.8975 57.7122L20.4429 57.449L20.1391 57.0181L19.9113 56.4974L19.8333 55.9733V55.3677H32.5833Z' stroke='#182026' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M29.75 46.8677L32.2402 34.6903L34 25.6177' stroke='#182026' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M19.7171 46.8677L19.3306 45.2007L18.7955 43.6107L18.1768 42.0955L17.4821 40.73L16.7082 39.4469L15.9376 38.1638L14.2378 35.7408L13.3879 34.5283L12.6172 33.3179L11.9194 32.1042L11.2247 30.742L10.6895 29.3765L10.3031 27.8614L10.0719 26.2713L9.99589 25.4373L9.91669 24.6033L10.0719 22.9363L10.3031 21.3463L10.6895 19.8279L11.2247 18.3908L11.9194 16.9505L12.6932 15.6674L13.6983 14.4538L14.7002 13.3182L15.8605 12.2575L17.0936 11.3486L18.4851 10.5894L19.8765 9.90828L21.344 9.37364L22.9646 8.9192L24.5091 8.69252L26.2089 8.61767L27.9086 8.69252L29.4521 8.9192L31.0727 9.37364L32.5402 9.90828L33.9317 10.5894L35.3231 11.3486L36.5594 12.2575L37.7165 13.3182L38.7216 14.4538L39.7235 15.6674L40.4973 16.9505L41.192 18.3908L41.7272 19.8279L42.1136 21.3463L42.3448 22.9363L42.5 24.6033L42.424 25.4373L42.3448 26.2713L42.1136 27.8614L41.7272 29.3765L41.192 30.742L40.4973 32.1042L39.8027 33.3179L39.0288 34.5283L38.1789 35.7408L36.4792 38.1638L35.7085 39.4469L34.9346 40.73L34.2399 42.0955L33.6223 43.6107L33.0871 45.2007L32.7007 46.8677' stroke='#182026' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M18.4167 25.6177L20.1765 34.6903L22.6667 46.8677' stroke='#182026' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M32.5833 25.8825L29.6543 28.451L26.7252 25.8825L26.4665 25.7079L26.2077 25.6177L25.9501 25.7079L25.6914 25.8825L22.7624 28.451L19.8333 25.8825' stroke='#182026' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M32.5833 47.576H19.8333' stroke='#182026' strokeLinecap='round' strokeLinejoin='round'/>
      <line x1='26.5' y1='0.5' x2='26.5' y2='4.5' stroke='#182026' strokeLinecap='round'/>
      <line x1='12.686' y1='4.1715' x2='14.744' y2='7.60147' stroke='#182026' strokeLinecap='round'/>
      <line x1='36.8285' y1='7.31401' x2='38.8865' y2='3.88403' stroke='#182026' strokeLinecap='round'/>
    </svg>
  )
}
