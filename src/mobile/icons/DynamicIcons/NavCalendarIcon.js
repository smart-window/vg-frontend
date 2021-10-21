import React from 'react'
import { colors } from 'shared/constants/cssConstants'
import Svg, {
  G, Path, Rect, Mask
} from 'react-native-svg'

/**
 * The Calendar icon on the mobile nav component.
 * @category Mobile Icons
 * @subcategory DynamicIcons
 * @namespace NavCalendarIcon
 * @property {string} lineColor defines the icon's outline color.
 * @property {string} fillColor defines the icon's fill color.
 */
export default function NavCalendarIcon({lineColor = colors.charcoal, fillColor = colors.white}) {
  return (
    <Svg accessibilityLabel='Navigate to Calendar Icon' width='33' height='33' viewBox='0 0 33 33' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <Path fill-rule='evenodd' clip-rule='evenodd' d='M16.5005 0.916672L17.3155 0.964429L18.0838 1.01219L18.85 1.10874L19.6183 1.25201L20.3866 1.39528L21.1549 1.6351L21.8734 1.87493L22.5451 2.16251L23.2636 2.45009L23.9353 2.78439L24.5582 3.16852L25.23 3.59937L25.8052 4.0323L26.4281 4.46315L26.9534 4.99056L27.5307 5.46916L28.0093 6.0464L28.5367 6.57173L28.9676 7.19465L29.4005 7.76981L29.8314 8.44152L30.2156 9.06444L30.5499 9.73615L30.8375 10.4546L31.125 11.1263L31.3649 11.8447L31.6047 12.613L31.748 13.3813L31.8913 14.1475L31.9878 14.9157L32.0356 15.684L32.0833 16.499L32.0356 17.314L31.9878 18.0822L31.8913 18.8484L31.748 19.6167L31.6047 20.3849L31.3649 21.1511L31.125 21.8716L30.8375 22.5433L30.5499 23.2618L30.2156 23.9335L29.8314 24.5564L29.4005 25.226L28.9676 25.8033L28.5367 26.4262L28.0093 26.9536L27.5307 27.5308L26.9534 28.0095L26.4281 28.5369L25.8052 28.9677L25.23 29.3986L24.5582 29.8315L23.9353 30.2135L23.2636 30.5499L22.5451 30.8375L21.8734 31.1251L21.1549 31.3649L20.3866 31.6047L19.6183 31.748L18.85 31.8913L18.0838 31.9878L17.3155 32.0356L16.5005 32.0833L15.6855 32.0356L14.9172 31.9878L14.151 31.8913L13.3827 31.748L12.6144 31.6047L11.8482 31.3649L11.1277 31.1251L10.4559 30.8375L9.73748 30.5499L9.06575 30.2135L8.44281 29.8315L7.77107 29.3986L7.19589 28.9677L6.57296 28.5369L6.04553 28.0095L5.46828 27.5308L4.98965 26.9536L4.46223 26.4262L4.03137 25.8033L3.6005 25.226L3.16756 24.5564L2.78549 23.9335L2.4491 23.2618L2.16151 22.5433L1.87392 21.8716L1.63409 21.1511L1.39426 20.3849L1.25098 19.6167L1.10771 18.8484L1.01115 18.0822L0.96443 17.314L0.916672 16.499L0.96443 15.684L1.01115 14.9157L1.10771 14.1475L1.25098 13.3813L1.39426 12.613L1.63409 11.8447L1.87392 11.1263L2.16151 10.4546L2.4491 9.73615L2.78549 9.06444L3.16756 8.44152L3.6005 7.76981L4.03137 7.19465L4.46223 6.57173L4.98965 6.0464L5.46828 5.46916L6.04553 4.99056L6.57296 4.46315L7.19589 4.0323L7.77107 3.59937L8.44281 3.16852L9.06575 2.78439L9.73748 2.45009L10.4559 2.16251L11.1277 1.87493L11.8482 1.6351L12.6144 1.39528L13.3827 1.25201L14.151 1.10874L14.9172 1.01219L15.6855 0.964429L16.5005 0.916672Z' fill={fillColor}/>
      <Mask id='mask0' mask-type='alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='33' height='33'>
        <Path fill-rule='evenodd' clip-rule='evenodd' d='M16.5005 0.916672L17.3155 0.964429L18.0838 1.01219L18.85 1.10874L19.6183 1.25201L20.3866 1.39528L21.1549 1.6351L21.8734 1.87493L22.5451 2.16251L23.2636 2.45009L23.9353 2.78439L24.5582 3.16852L25.23 3.59937L25.8052 4.0323L26.4281 4.46315L26.9534 4.99056L27.5307 5.46916L28.0093 6.0464L28.5367 6.57173L28.9676 7.19465L29.4005 7.76981L29.8314 8.44152L30.2156 9.06444L30.5499 9.73615L30.8375 10.4546L31.125 11.1263L31.3649 11.8447L31.6047 12.613L31.748 13.3813L31.8913 14.1475L31.9878 14.9157L32.0356 15.684L32.0833 16.499L32.0356 17.314L31.9878 18.0822L31.8913 18.8484L31.748 19.6167L31.6047 20.3849L31.3649 21.1511L31.125 21.8716L30.8375 22.5433L30.5499 23.2618L30.2156 23.9335L29.8314 24.5564L29.4005 25.226L28.9676 25.8033L28.5367 26.4262L28.0093 26.9536L27.5307 27.5308L26.9534 28.0095L26.4281 28.5369L25.8052 28.9677L25.23 29.3986L24.5582 29.8315L23.9353 30.2135L23.2636 30.5499L22.5451 30.8375L21.8734 31.1251L21.1549 31.3649L20.3866 31.6047L19.6183 31.748L18.85 31.8913L18.0838 31.9878L17.3155 32.0356L16.5005 32.0833L15.6855 32.0356L14.9172 31.9878L14.151 31.8913L13.3827 31.748L12.6144 31.6047L11.8482 31.3649L11.1277 31.1251L10.4559 30.8375L9.73748 30.5499L9.06575 30.2135L8.44281 29.8315L7.77107 29.3986L7.19589 28.9677L6.57296 28.5369L6.04553 28.0095L5.46828 27.5308L4.98965 26.9536L4.46223 26.4262L4.03137 25.8033L3.6005 25.226L3.16756 24.5564L2.78549 23.9335L2.4491 23.2618L2.16151 22.5433L1.87392 21.8716L1.63409 21.1511L1.39426 20.3849L1.25098 19.6167L1.10771 18.8484L1.01115 18.0822L0.96443 17.314L0.916672 16.499L0.96443 15.684L1.01115 14.9157L1.10771 14.1475L1.25098 13.3813L1.39426 12.613L1.63409 11.8447L1.87392 11.1263L2.16151 10.4546L2.4491 9.73615L2.78549 9.06444L3.16756 8.44152L3.6005 7.76981L4.03137 7.19465L4.46223 6.57173L4.98965 6.0464L5.46828 5.46916L6.04553 4.99056L6.57296 4.46315L7.19589 4.0323L7.77107 3.59937L8.44281 3.16852L9.06575 2.78439L9.73748 2.45009L10.4559 2.16251L11.1277 1.87493L11.8482 1.6351L12.6144 1.39528L13.3827 1.25201L14.151 1.10874L14.9172 1.01219L15.6855 0.964429L16.5005 0.916672Z' fill={fillColor}/>
      </Mask>
      <G mask='url(#mask0)'>
        <Rect width='33' height='33' fill={fillColor}/>
      </G>
      <Path fill-rule='evenodd' clip-rule='evenodd' d='M16.4738 0.459122H16.5274L17.3441 0.506977L18.1412 0.557447L18.9342 0.65817L19.7025 0.801442L20.5233 0.957766L21.3001 1.20035L22.0539 1.45358L22.7155 1.73699L23.4679 2.03976L24.176 2.39426L24.8058 2.78272L25.5057 3.23318L26.066 3.65534L26.7529 4.13969L27.2461 4.63772L27.8836 5.17661L28.3329 5.72167L28.9138 6.311L29.3339 6.919L29.7864 7.52235L30.2216 8.20094L30.626 8.86022L30.9755 9.56582L31.2589 10.2742L31.5599 10.9812L31.8025 11.7081L32.0554 12.529L32.3461 14.0903L32.4454 14.8873L32.4932 15.6572L32.541 16.5258L32.4931 17.3424L32.4427 18.1395L32.3419 18.9324L32.1987 19.7007L32.0422 20.5218L31.7999 21.2959L31.5465 22.052L31.2631 22.7137L30.9603 23.466L30.6058 24.1741L30.217 24.8044L29.7673 25.501L29.3447 26.064L28.8609 26.7503L28.3622 27.2462L27.8233 27.8837L27.2783 28.3329L26.6889 28.9138L26.08 29.3345L25.4784 29.7838L24.798 30.2222L24.1406 30.6234L23.434 30.9754L22.7256 31.2588L22.0186 31.5598L21.2916 31.8024L20.4708 32.0553L18.9074 32.346L18.1124 32.4453L17.3425 32.4931L16.4738 32.5409L15.6572 32.493L14.86 32.4426L14.0671 32.3418L13.2988 32.1986L12.4776 32.0421L11.7036 31.7998L10.9474 31.5464L10.2857 31.263L9.53237 30.9597L8.82623 30.6042L8.19462 30.2167L7.4964 29.7654L6.93528 29.3447L6.24898 28.861L5.7531 28.3623L5.11556 27.8234L4.66567 27.2777L4.08539 26.6869L3.66418 26.0774L3.21571 25.4749L2.77697 24.796L2.37578 24.1387L2.0237 23.4321L1.74028 22.7237L1.43915 22.0164L1.19679 21.288L0.943798 20.469L0.653075 18.9057L0.553768 18.11L0.506987 17.3408L0.459229 16.4722L0.5565 14.8586L0.657287 14.0632L0.956853 12.4764L1.19945 11.6996L1.45269 10.9459L1.73611 10.2843L2.03939 9.53092L2.3949 8.8248L2.78242 8.19322L3.23378 7.49501L3.65452 6.93392L4.13889 6.24699L4.63693 5.75385L5.17585 5.11633L5.72155 4.66646L6.31234 4.08619L6.92037 3.6661L7.52373 3.21357L8.20235 2.7784L8.86165 2.37406L9.56727 2.02458L10.2757 1.74116L10.983 1.44005L11.7114 1.19769L12.5305 0.944713L14.0938 0.653999L14.8889 0.554734L15.6588 0.506879L16.4738 0.459122ZM17.2888 1.42198L16.5001 1.37592L14.9746 1.46692L14.2351 1.5593L13.4668 1.70257L12.7514 1.83269L11.9931 2.06998L11.3082 2.29627L10.6264 2.58802L9.9418 2.86041L9.30642 3.17451L8.69037 3.55431L8.04681 3.96556L7.45672 4.40925L6.89715 4.78725L6.33818 5.34339L5.82121 5.76171L5.3132 6.37113L4.83928 6.83246L4.39829 7.46944L3.98585 8.01811L3.55836 8.68116L3.19541 9.26967L2.87471 9.90648L2.58296 10.635L2.30878 11.2714L2.07171 11.9813L1.84493 12.697L1.56257 14.2046L1.46874 14.9435L1.37433 16.4722L1.46599 18.0249L1.55838 18.7644L1.70165 19.5326L1.83177 20.248L2.06907 21.0064L2.29537 21.6912L2.58712 22.373L2.85902 23.0565L3.17629 23.6939L3.55256 24.3076L3.9679 24.9519L4.40842 25.5426L4.78642 26.1021L5.34258 26.6611L5.76092 27.178L6.36973 27.6854L6.83378 28.1599L7.47078 28.6009L8.01947 29.0133L8.68254 29.4408L9.27108 29.8037L9.90791 30.1244L10.6364 30.4162L11.2725 30.6902L11.9852 30.9275L12.6986 31.1542L14.2084 31.4365L14.9458 31.5304L16.4738 31.6258L18.0266 31.5331L18.7661 31.4407L19.5344 31.2974L20.2502 31.1672L21.0099 30.9302L21.6931 30.7037L22.3749 30.412L23.0584 30.1401L23.6958 29.8228L24.3101 29.4462L24.9553 29.0317L25.5445 28.5908L26.1035 28.2134L26.661 27.6566L27.178 27.2383L27.6853 26.6295L28.1599 26.1655L28.6011 25.5283L29.0152 24.978L29.4414 24.3158L29.8053 23.7293L30.1245 23.0914L30.4162 22.363L30.6903 21.7269L30.9276 21.0142L31.1543 20.3009L31.4366 18.7911L31.5305 18.0538L31.6259 16.5258L31.5332 14.9729L31.4408 14.2317L31.2975 13.4653L31.1673 12.7496L30.9302 11.9899L30.7038 11.3067L30.4121 10.6249L30.1397 9.94037L29.8256 9.30502L29.4457 8.68898L29.0345 8.04545L28.5908 7.45538L28.2134 6.89646L27.6566 6.33895L27.2383 5.822L26.6288 5.31401L26.1675 4.84011L25.5296 4.39849L24.9826 3.98517L24.3178 3.55864L23.7312 3.19471L23.0933 2.8756L22.3648 2.58385L21.7284 2.30968L21.0185 2.07262L20.3027 1.84584L18.7928 1.56347L18.0555 1.46963L17.2888 1.42198ZM28.2118 9.67339C28.4382 9.56019 28.7135 9.65196 28.8267 9.87836C28.9273 10.0796 28.866 10.3195 28.6921 10.4498L28.6217 10.4933L26.7884 11.4099C26.562 11.5232 26.2867 11.4314 26.1735 11.205C26.0729 11.0037 26.1342 10.7638 26.3081 10.6335L26.3785 10.5901L28.2118 9.67339ZM30.7084 16.7292C30.7084 16.476 30.5032 16.2708 30.2501 16.2708H27.5001L27.4177 16.2782C27.2039 16.317 27.0418 16.5042 27.0418 16.7292C27.0418 16.9823 27.247 17.1875 27.5001 17.1875H30.2501L30.3325 17.1801C30.5463 17.1413 30.7084 16.9542 30.7084 16.7292ZM26.1735 21.795C26.2741 21.5938 26.5028 21.4989 26.7114 21.5598L26.7884 21.5901L28.6217 22.5067C28.8482 22.6199 28.9399 22.8952 28.8267 23.1216C28.7261 23.3229 28.4974 23.4178 28.2888 23.3569L28.2118 23.3266L26.3785 22.41C26.1521 22.2967 26.0603 22.0214 26.1735 21.795ZM22.3666 26.308C22.2363 26.1341 21.9964 26.0728 21.7951 26.1734C21.5687 26.2866 21.477 26.5619 21.5902 26.7883L22.5068 28.6216L22.5503 28.692C22.6806 28.8659 22.9205 28.9272 23.1218 28.8266C23.3482 28.7134 23.4399 28.4381 23.3267 28.2117L22.4101 26.3784L22.3666 26.308ZM16.7293 27.0417C16.9543 27.0417 17.1414 27.2038 17.1802 27.4176L17.1876 27.5V30.25C17.1876 30.5031 16.9824 30.7083 16.7293 30.7083C16.5043 30.7083 16.3171 30.5462 16.2783 30.3324L16.2709 30.25V27.5C16.2709 27.2469 16.4761 27.0417 16.7293 27.0417ZM22.3666 6.69203C22.2363 6.86591 21.9964 6.92724 21.7951 6.82662C21.5687 6.71341 21.477 6.4381 21.5902 6.2117L22.5068 4.37836L22.5503 4.30798C22.6806 4.13409 22.9205 4.07277 23.1218 4.17339C23.3482 4.28659 23.4399 4.5619 23.3267 4.78831L22.4101 6.62164L22.3666 6.69203ZM16.7293 5.95834C16.9543 5.95834 17.1414 5.7962 17.1802 5.58239L17.1876 5.5V2.75C17.1876 2.49687 16.9824 2.29167 16.7293 2.29167C16.5043 2.29167 16.3171 2.45381 16.2783 2.66762L16.2709 2.75V5.5C16.2709 5.75313 16.4761 5.95834 16.7293 5.95834ZM11.2051 26.1734C10.9787 26.0602 10.7034 26.152 10.5902 26.3784L9.6735 28.2117L9.64326 28.2887C9.58235 28.4973 9.67722 28.726 9.87847 28.8266C10.1049 28.9398 10.3802 28.8481 10.4934 28.6216L11.4101 26.7883L11.4403 26.7113C11.5012 26.5027 11.4063 26.274 11.2051 26.1734ZM6.2118 21.5901C6.43821 21.4769 6.71352 21.5686 6.82672 21.795C6.92735 21.9963 6.86602 22.2362 6.69214 22.3665L6.62175 22.41L4.78842 23.3266C4.56201 23.4398 4.2867 23.3481 4.1735 23.1216C4.07287 22.9204 4.1342 22.6805 4.30809 22.5502L4.37847 22.5067L6.2118 21.5901ZM5.95844 16.7292C5.95844 16.476 5.75324 16.2708 5.50011 16.2708H2.75011L2.66772 16.2782C2.45391 16.317 2.29178 16.5042 2.29178 16.7292C2.29178 16.9823 2.49698 17.1875 2.75011 17.1875H5.50011L5.5825 17.1801C5.79631 17.1413 5.95844 16.9542 5.95844 16.7292ZM4.1735 9.87836C4.27412 9.67711 4.50283 9.58224 4.71143 9.64315L4.78842 9.67339L6.62175 10.5901C6.84816 10.7033 6.93993 10.9786 6.82672 11.205C6.7261 11.4062 6.49739 11.5011 6.28879 11.4402L6.2118 11.4099L4.37847 10.4933C4.15206 10.3801 4.0603 10.1048 4.1735 9.87836ZM10.4499 4.30798C10.3196 4.13409 10.0797 4.07277 9.87847 4.17339C9.65206 4.28659 9.56029 4.5619 9.6735 4.78831L10.5902 6.62164L10.6336 6.69203C10.7639 6.86591 11.0038 6.92724 11.2051 6.82662C11.4315 6.71341 11.5233 6.4381 11.4101 6.2117L10.4934 4.37836L10.4499 4.30798Z' fill={lineColor}/>
      <Path d='M16.8078 8.25C17.061 8.25 17.2662 8.4552 17.2662 8.70833V16.6884C17.2662 16.9706 17.1469 17.2397 16.9378 17.4293L12.8719 21.1151C12.6844 21.2851 12.3945 21.2709 12.2245 21.0833C12.0545 20.8958 12.0687 20.6059 12.2562 20.4359L16.0212 17.0223C16.2303 16.8327 16.3495 16.5636 16.3495 16.2814V8.70833C16.3495 8.4552 16.5547 8.25 16.8078 8.25Z' fill={lineColor}/>
    </Svg>
  )
}