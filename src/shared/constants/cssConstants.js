import {Platform} from 'react-native'

/**
 * @category Constants
 * @namespace cssConstants
 */

/** Define global app colors here */
export const colors = {
  white: '#ffffff',
  black: '#000000',
  charcoal: '#182026',
  officialBlue: '#499fda',
  lightBlue: '#54BAE3',
  fuchsia: '#b62070',
  purple: '#942b8b',
  blueberry: '#52358f',
  deepNavy: '#0f1b3c',
  uiAlertRed: '#bd0000',
  green: '#7cbe73',
  successGreen: '#5CB46A',
  yellow: '#E6A71F',
  darkYellow: '#E2A506',
  oktaButtonBorder: '#00456a',
  peachOrange: '#D96A4E',
  darkPink: '#B62071',
  /* grays */
  boneWhite: '#f7f7f8',
  coolGray: '#e6ebef',
  lightGray: '#cccccc',
  gray10: '#E5E5E5',
  gray20: '#CDCDCD',
  gray30: '#B3B3B3',
  gray50: '#808080',
  oktaBorder: '#d8d8d8',
  oktaFont: '#5a5a5a',
  /* transparencies */
  transparentText: 'rgba(0,0,0,0.5)',
  modalBackground: 'rgba(0,0,0,0.2)',
  dropShadow: 'rgba(0, 0, 0, 0.3)'
}

/* eslint-disable quotes */
/** Define css for app fonts here */
export const fonts = {
  openSans: "'Open Sans', sans-serif",
  helvetica: "'Helvetica', 'Manrope', sans-serif",
  roboto: "'Roboto Mono', monospace"
}
/* eslint-enable quotes */

// TODO: we might be able to consolidate by using the same google fonts on web
export const mobileFonts = {
  deviceSpecificFont: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto',
  openSans: (weight, isItalic) => `OpenSans_${fontWeightToMobileString[weight]}${isItalic ? '_Italic' : ''}`
}
const fontWeightToMobileString = {
  300: '300Light',
  400: '400Regular',
  600: '600SemiBold',
  700: '700Bold',
  800: '800ExtraBold'
}

export const globalMediaQueries = {
  tabletWidth: '750px',
  standardScreenSize: '1040px',
  minScreenWidth: '348px'
}

/** Define select global app measurements in the measurements const */
export const measurements = {
  mobileNavBarHeight: 80,
  mobilePageHeaderHeight: 42,
  mobileBackdropPadding: 12,
  // header size for the 'report' <Grid>s on web
  reportGridRowHeight: 30
}

export default {
  colors,
  fonts,
  globalMediaQueries,
  measurements
}
