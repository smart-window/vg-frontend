import React from 'react'
import { colors } from 'shared/constants/cssConstants'
import Svg, {
  G, Path
} from 'react-native-svg'

export default function ChevronArrow({
  lineColor = colors.officialBlue,
  height = 33,
  width = 15
}) {
  return (
    <Svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 15 33'>
      <G fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
        <G stroke={lineColor} strokeWidth='2.5'>
          <G>
            <G>
              <Path d='M-7.5 22.5L7.5 10.5 22.5 22.5' transform='translate(-356 -678) translate(52 652) translate(304 26) rotate(90 7.5 16.5)'/>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  )
}