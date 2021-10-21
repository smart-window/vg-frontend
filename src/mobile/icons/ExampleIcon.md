# Icons Folder

React Native does not have innate SVG handling capabilities, which is why we have to use the "react-native-svg" library to handle the SVGs for us.

The two folders here serve to store dynamic versus static icons. If an icon will be displayed across the application with different styling, then the icon should be stored in the *DynamicIcons* folder. Otherwise, the icon should be put in the *StaticIcons* folder.

## Instructions to convert the SVG to a usable component:
1. Create a new js file with a name representing the icon in one of the icon folders
2. Copy this script and replace the "ExampleIcon" name with your new component name
3. Copy the contents of your SVG and replace what is in the return statement
4. Convert all opening and closing SVG tags to their corresponding tags imported from the "react-native-svg" library
  1. If any tags are in the SVG that are not represented in the SVG import, use the ForeignObject component
5. Convert hyphenated svg attributes to camelCase. E.g. `fill-rule` becomes `fillRule`
6. Format your new component according to functionality.
  1. If the icon will be dynamic, you can use the example props here to reference when formatting your SVG to be dynamically colored. If the icon is static, no need to have props or further formatting

``` javascript
import React from 'react'
import { colors } from '../../constants/cssConstants'
import Svg, {
  Circle, Ellipse, G, Text, TSpan, TextPath, Path, Polygon, Polyline, Line, Rect, Use, Image, Symbol, Defs, LinearGradient, RadialGradient, Stop, ClipPath, Pattern, Mask, ForeignObject
} from 'react-native-svg'

export default function ExampleIcon({ lineColor = colors.charcoal, fillColor = colors.white }) {
  return (
    <Svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='33' height='33' viewBox='0 0 33 33'>
      <Defs>
        <Path id='kxj8o8tq9a' d='M1.399 0L1.16 0.056...' />
        <Path id='53tru2kjqc' d='M2.268 0l.966.002...' />
      </Defs>
      <G fill='none' fillRule='evenodd'>
        <G>
          <G>
            <G transform='translate(-1661 -1294) translate(1661 1294) translate(.917 .917)'>
              <Mask id='33vvtob7sb' fill={fillColor}>
                <Use xlinkHref='#kxj8o8tq9a'/>
              </Mask>
              <Use fill={lineColor} fillRule='nonzero' xlinkHref='#kxj8o8tq9a'/>
              <G fill={fillColor} fillRule='nonzero' mask='url(#33vvtob7sb)'>
                <Path d='M0 0H33V33H0z' transform='translate(-.917 -.917)' />
              </G>
            </G>
            <G transform='translate(-1661 -1294) translate(1661 1294)'>
              <Mask id='4v7apmmlbd' fill={fillColor}>
                <Use xlinkHref='#53tru2kjqc'/>
              </Mask>
              <Use fill={lineColor} fillRule='nonzero' xlinkHref='#53tru2kjqc'/>
              <G fill={lineColor} mask='url(#4v7apmmlbd)'>
                <Path d='M0 0H33V33H0z' />
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  )
}