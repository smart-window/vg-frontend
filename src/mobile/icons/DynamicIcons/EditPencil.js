import React from 'react'
import Svg, {
  G, Path
} from 'react-native-svg'

/**
 * The blue edit icon.
 * @category Mobile Icons
 * @subcategory StaticIcons
 * @namespace EditPencil
 */
export default function EditPencil({height=48, width=48}) {
  return (
    <Svg accessibilityLabel='Edit pencil logo' xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 48 48'>
      <G fill='none' fill-rule='evenodd'>
        <G>
          <G>
            <Path fill='#499FDA' stroke='#FFF' d='M.446 9.585L9.581.451 9.842.257 10.1.127 10.425.064 10.686 0 11.008.064 11.27.127 11.528.257 11.79.451 16 4.726 4.727 16 .451 11.79.257 11.531.13 11.27.064 11.011 0 10.686.064 10.428.13 10.103.257 9.845zM17.032 5.333L45.927 34.292 46.128 34.492 46.262 34.691 46.328 34.891 46.396 35.161 48 46.194 48 46.529 47.934 46.93 47.735 47.265 47.533 47.532 47.265 47.732 46.998 47.866 46.729 47.931 46.396 48 46.193 48 35.16 46.396 34.691 46.262 34.489 46.131 34.29 45.931 5.333 17.04' transform='translate(-1200 -1635) translate(1200 1635)'/>
            <Path fill='#000' fill-opacity='0' stroke='#FFF' d='M8 13.333L37.333 42.667M42.667 37.333L13.333 8M40.667 47.333L47.333 40.667' transform='translate(-1200 -1635) translate(1200 1635)'/>
            <Path fill='#000' fill-opacity='0' stroke='#182026' d='M45.271 34.667L34.667 45.268' transform='translate(-1200 -1635) translate(1200 1635)'/>
            <Path fill='#000' fill-opacity='0' stroke='#FFF' stroke-linecap='round' stroke-linejoin='round' d='M45.333 34.795L45.333 34.795 45.271 34.667 34.667 45.268 34.792 45.333' transform='translate(-1200 -1635) translate(1200 1635)'/>
          </G>
        </G>
      </G>
    </Svg>
  )
}
