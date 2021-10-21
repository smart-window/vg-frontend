import React from 'react'
import Svg, {
  G, Path
} from 'react-native-svg'

/**
 * The Velocity Global circle icon.
 * @category Mobile Icons
 * @subcategory DynamicIcons
 * @namespace VelocityGlobalCircle
 * @property {string} fillColor defines the icon's fill color.
 */
const VelocityGlobalCircle = ({
  fillColor = '#499FDA',
  width = '112',
  height = '112'
}) => (
  <Svg accessibilityLabel='Velocity Global circle logo' xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 345 319'>
    <G fill='none' fillRule='evenodd'>
      <G fill={fillColor} fillRule='nonzero'>
        <G>
          <Path d='M305.953 153.893l-18.77 19.505c-6.494 58.036-51.203 104.45-108.955 113.112-6.275.933-12.61 1.403-18.953 1.407-6.431.002-12.854-.487-19.21-1.46-.38-.06-.694-.327-.815-.692-.121-.364-.03-.765.237-1.041l105.14-109.187 40.72-42.248 24.58-25.619 33.953-37.641c.464-.518.468-1.3.009-1.823-.459-.522-1.236-.619-1.809-.225l-37.534 26.055-25.19 19.015L82.3 262.298l-25.132 19.014c2.445 2.08 4.953 4.037 7.52 5.932 5.58 4.172 11.444 7.951 17.548 11.31 23.554 13.12 50.077 19.982 77.038 19.932 87.86 0 159.273-71.412 159.273-159.212.015-5.843-.311-11.682-.977-17.487l-11.617 12.106zm-16.447-86.148l-26.169 15.9c-.917-1.283-1.895-2.568-2.873-3.852-24.377-31.08-61.69-49.229-101.189-49.219-70.925 0-128.7 57.717-128.7 128.7-.007 6.163.432 12.318 1.313 18.417.08.528.4.99.865 1.252.466.262 1.026.295 1.52.089L231.41 99.503c.352-.14.752.011.923.349.172.337.058.75-.263.951L44.39 217.175l-26.108 15.958c-2.704-4.981-5.094-10.127-7.154-15.408C3.763 199.118-.012 179.285 0 159.274 0 71.413 71.475 0 159.275 0c51.638.01 100.058 25.087 129.863 67.256.137.152.26.315.368.489' transform='translate(-832 -1532) translate(832 1532)' />
        </G>
      </G>
    </G>
  </Svg>
)

export default VelocityGlobalCircle