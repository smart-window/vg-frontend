import {useFonts} from 'expo-font'
import {
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
  OpenSans_800ExtraBold_Italic
} from '@expo-google-fonts/open-sans'

/**
 * Asynchronously load any custom fonts.
 * @category Hooks - Mobile
 * @module fontsHandler
 * @returns {object} fontsLoaded - a listener for font loading progress
 * Note - refer to this website for available fonts and instructions on importing them appropriately
 *  https://directory.now.sh/
 */
export default function useAsyncFonts() {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold,
    OpenSans_800ExtraBold_Italic
  })
  return fontsLoaded
}