import React from 'react'
import {render} from '@testing-library/react-native'
import ListPopup from './ListPopup'
import RadioButton from 'mobile/components/RadioButton/RadioButton'

describe('ListPopup', () => {
  const mockListItems = [
    {name: 'English', value: 'en', id: 1, checked: true},
    {name: 'Spanish', value: 'es', id: 2, checked: false},
    {name: 'AA', value: 'aa', id: 3, checked: false},
    {name: 'AB', value: 'ab', id: 4, checked: false},
    {name: 'AC', value: 'ac', id: 5, checked: false},
    {name: 'AD', value: 'ad', id: 6, checked: false},
  ]
  const list = mockListItems.map((item, index) => {
    return (
      <RadioButton
        key={index}
        item={item}
        isFirst={index === 0}
        onOptionSelect={jest.fn()}
      />
    )
  })
  it('Renders child elements within a ListPopup', () => {
    const { getByText, getByTestId } = render(
      <ListPopup>{list}</ListPopup>
    )

    expect(getByTestId('ListPopup')).toContainElement(getByText('English'))
  })
})