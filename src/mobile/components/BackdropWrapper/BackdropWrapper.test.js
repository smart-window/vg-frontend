import React from 'react'
import {Text, View} from 'react-native'
import BackdropWrapper from './BackdropWrapper'
import renderWithSafeAreaProvider from 'test/mocks/safeAreaInsert.mock.js'

describe('BackdropWrapper', () => {
  it('Renders a Page Header and child component', () => {
    const { getByText, getByTestId, getByLabelText } = renderWithSafeAreaProvider(
      <BackdropWrapper title={'Settings'}>
        <View>
          <Text>Child Component</Text>
        </View>
      </BackdropWrapper>
    )

    expect(getByTestId('BackdropWrapper')).toBeDefined()
    expect(getByText('Settings')).toBeDefined()
    expect(getByLabelText('Velocity Global circle logo')).toBeDefined()
    expect(getByText('Child Component')).toBeDefined()
  })
})