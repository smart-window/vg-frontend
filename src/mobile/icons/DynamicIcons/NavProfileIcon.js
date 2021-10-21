import React from 'react'
import { colors } from 'shared/constants/cssConstants'
import Svg, {
  G, Path, Use, Defs, Mask
} from 'react-native-svg'

/**
 * The profile icon on the mobile nav component.
 * @category Mobile Icons
 * @subcategory DynamicIcons
 * @namespace NavProfileIcon
 * @property {string} lineColor defines the icon's outline color.
 * @property {string} fillColor defines the icon's fill color.
 */
export default function NavProfileIcon({ lineColor = colors.charcoal, fillColor = colors.white }) {
  return (
    <Svg accessibilityLabel='Navigate to Profile Icon' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='33' height='33' viewBox='0 0 33 33'>
      <Defs>
        <Path id='8fcdtngroa' d='M15.916 0.458L16.472 0.46 17.211 0.516 17.805 0.657 18.297 0.797 18.699 1.016 19.094 1.202 19.124 1.222 19.365 1.453 19.724 1.742 19.792 1.829 19.951 2.018 20.922 2.196 21.62 2.428 22.291 2.769 22.82 3.1 23.336 3.544 23.699 3.937 23.996 4.467 24.248 4.998 24.449 5.529 24.598 6.063 24.785 7.193 24.783 8.316 24.666 9.412 25.058 9.658 25.176 9.768 25.197 9.796 25.344 10.072 25.48 10.389 25.58 10.792 25.669 11.644 25.613 12.131 25.515 12.627 25.413 13.107 25.199 13.547 24.851 14.117 24.818 14.153 24.566 14.339 24.425 14.414 23.849 14.412 23.437 15.349 22.998 16.044 22.499 16.823 21.956 17.474 21.392 18.058 20.783 18.578 20.129 19.049 19.378 19.535 19.378 21.575 20.703 21.698 21.927 21.893 24.325 22.391 25.441 22.731 26.459 23.12 27.436 23.56 28.366 24.055 29.158 24.573 29.927 25.115 30.61 25.764 31.131 26.408 31.633 27.076 31.642 27.099 31.984 27.849 32.28 28.624 32.428 29.473 32.514 30.657 32.501 30.666 32.11 30.85 31.787 30.981 31.282 31.193 30.697 31.388 30.021 31.509 29.056 31.713 27.958 31.909 26.708 32.049 25.107 32.249 23.386 32.344 21.402 32.444 19.134 32.491 16.517 32.542 11.698 32.443 9.687 32.344 7.894 32.242 6.389 32.051 5.055 31.899 3.933 31.705 3.035 31.514 2.188 31.351 1.601 31.16 1.203 30.987 0.785 30.815 0.457 30.632 0.552 29.356 0.714 28.459 0.976 27.649 1.32 26.929 1.83 26.207 2.382 25.547 3.044 24.974 3.818 24.388 4.656 23.856 5.533 23.445 6.588 22.999 7.628 22.674 8.846 22.324 10.043 22.09 11.414 21.842 12.736 21.693 13.595 21.627 13.595 19.538 12.797 19.019 12.116 18.521 11.522 18.003 10.913 17.416 10.404 16.738 9.496 15.29 9.114 14.413 8.532 14.414 8.285 14.266 8.152 14.162 8.119 14.123 7.714 13.449 7.535 13.063 7.34 12.043 7.297 11.603 7.349 11.143 7.409 10.714 7.502 10.382 7.61 10.048 7.713 9.85 7.737 9.819 7.905 9.66 8.246 9.408 8.065 8.522 8.024 7.883 8.027 6.661 8.082 6.083 8.189 5.558 8.503 4.592 8.917 3.734 9.146 3.402 9.762 2.727 10.066 2.444 10.703 1.938 12.238 1.174 12.995 0.935 13.764 0.742 14.526 0.6 15.243 0.506z' />
        <Path id='hcwcj98u2c' d='M32.371 27.614l-.347-.77-.045-.11-.556-.744-.525-.652-.082-.09-.66-.63-.108-.089-.743-.526-.792-.52-.972-.525-1.002-.456-1.035-.4-1.142-.351-2.403-.506-1.228-.197-.475-.046v-1.056l.299-.194.67-.483.651-.554.611-.63.57-.683.07-.094.481-.756.427-.679.065-.122.147-.339.167.001.354-.189.118-.074.244-.18.146-.133.03-.035.102-.136.336-.553.299-.606.121-.576.097-.494.066-.544v-.199l-.085-.826-.022-.126-.098-.391-.046-.138-.13-.308-.177-.339-.078-.124-.021-.028-.107-.12-.113-.106-.032-.025.054-.506.005-.095.002-1.09-.013-.15-.18-1.097-.022-.095-.143-.518-.22-.595-.273-.583-.368-.666-.427-.464-.077-.074-.499-.431-.116-.087-.511-.32-.722-.374-.135-.057-.675-.225-.133-.034-.586-.109-.048-.062-.435-.35-.17-.17-.124-.1-.029-.02-.131-.075-.381-.18-.433-.24-.58-.166-.616-.148-.155-.024-.713-.053L15.956 0l-.072.002-.65.046-.752.098-.79.146-.8.2-.789.249-.14.057-1.482.74-.17.109-.616.49-.35.325-.65.71-.079.1-.22.322-.072.123-.4.833-.046.116-.303.937-.026.1-.104.508-.014.097-.053.561-.007 1.269.04.68.017.125.062.303-.108.103-.097.107-.022.03-.09.14-.1.193-.058.14-.104.324-.1.358-.026.12-.057.417-.053.468-.002.192.042.426.22 1.182.22.477.047.089.39.654.099.135.032.037.127.12.128.102.102.07.47.283h.197l.121.278.064.122.877 1.405.537.722.098.113.588.57.608.534.723.535.387.254v1.094l-1.255.142-1.39.25-1.17.23-1.259.359-1.026.321-.09.033-1.018.433-.881.415-.108.06-.81.515-.812.613-.688.596-.106.109-.533.64-.54.762-.078.135-.333.698-.045.115-.253.786-.03.118-.156.87L0 30.717l.86.483.105.05.404.168.369.16.65.218.12.03.818.16.849.18 1.12.196 1.345.156 1.441.183 1.8.106 1.95.096 4.682.097 2.567-.049 2.192-.046 1.944-.098 1.668-.092 1.614-.2 1.194-.135 1.124-.2.962-.203.623-.111.138-.035.565-.19.558-.233.299-.12.427-.201.153-.09.459-.32-.146-1.267-.15-.875-.047-.169-.286-.752zM15.953.937l.537.001.713.054.574.137.476.136.388.213.381.18.029.02.233.224.347.28.065.085.154.183.937.173.675.225.647.33.511.322.498.43.351.381.287.514.243.516.194.515.144.518.18 1.097v1.09l-.114 1.062.379.239.113.106.02.028.143.268.13.307.098.392.086.826-.054.472-.095.482-.098.465-.207.427-.337.553-.03.035-.245.18-.136.073-.556-.002-.398.91-.424.673-.482.756-.524.632-.544.567-.589.504-.632.457-.725.472v2.408l1.28.12 1.182.188 2.316.483 1.077.33.983.377.944.428.898.48.765.502.743.526.659.63.504.625.484.648.01.022.33.727.285.753.143.823.083.72-.013.01-.377.177-.312.127-.488.206-.565.19-.653.117-.931.198-1.061.19-1.207.136-1.546.194-1.662.092-1.916.097-2.19.046-2.527.049-4.654-.096-1.942-.096-1.733-.1-1.452-.184-1.289-.148-1.084-.188-.867-.185-.818-.159-.566-.185-.385-.167-.404-.168-.316-.177.092-.81.156-.87.253-.785.332-.699.493-.7.533-.641.639-.556.747-.568.81-.516.847-.399 1.019-.433 1.004-.315 1.176-.34 1.156-.227 1.325-.24 1.276-.145.83-.064v-2.456l-.771-.503-.658-.483-.573-.503-.588-.57-.492-.657-.877-1.405-.369-.851h-.562l-.239-.142-.128-.102-.032-.037-.391-.654-.172-.375-.189-.99-.041-.426.05-.446.057-.417.09-.322.105-.323.1-.193.022-.03.162-.154.33-.244-.175-.86-.04-.62.004-1.185.053-.561.103-.51.303-.937.4-.833.221-.322.594-.654.294-.275.616-.49 1.482-.742.73-.232.743-.187.736-.138.693-.092.65-.045z' />
      </Defs>
      <G fill='none' fillRule='evenodd'>
        <G>
          <G>
            <G transform='translate(-1610 -1294) translate(1610 1294)'>
              <Mask id='rglmdcaenb' fill={fillColor}>
                <Use xlinkHref='#8fcdtngroa'/>
              </Mask>
              <Use fill={lineColor} fillRule='nonzero' xlinkHref='#8fcdtngroa'/>
              <G fill={fillColor} fillRule='nonzero' mask='url(#rglmdcaenb)'>
                <Path d='M0 0H35.829V34.833H0z' transform='translate(-1.429 -.458)' />
              </G>
            </G>
            <G transform='translate(-1610 -1294) translate(1610 1294)'>
              <Mask id='qwie3swy9d' fill={fillColor}>
                <Use xlinkHref='#hcwcj98u2c'/>
              </Mask>
              <Use fill={lineColor} fillRule='nonzero' xlinkHref='#hcwcj98u2c'/>
              <G fill={lineColor} mask='url(#qwie3swy9d)'>
                <Path d='M0 0H33V33H0z' />
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  )
}