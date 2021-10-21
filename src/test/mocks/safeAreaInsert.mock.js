import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {render} from '@testing-library/react-native'

/**
 * @param {jsx} children - jsx contents to render
 */
export default function renderWithSafeAreaProvider(children) {
  return render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      {children}
    </SafeAreaProvider>
  )
}