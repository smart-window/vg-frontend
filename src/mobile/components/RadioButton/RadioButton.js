import React from 'react'
import PropTypes from 'prop-types'
import {
  ViewRadioButton,
  ViewSelectedRadioButton,
  TouchableOpacityListItem,
  ViewTextContainer,
  TextItem,
  TextItemInfo,
} from './RadioButton.styles'

RadioButton.propTypes = {
  /** Indication of whether the radio button is selected or not */
  checked: PropTypes.bool,
  /** Function that fires on radio button selection */
  onOptionSelect: PropTypes.func,
}

/**
 * A popup list of radio buttons.
 * Renders an interactive radio button.
 * @category Components - Mobile
 * @namespace RadioButton
 */
export default function RadioButton({item, onOptionSelect, isFirst}) {
  return (
    <TouchableOpacityListItem
      key={item.name}
      isFirst={isFirst}
      onPress={() => onOptionSelect(item)}
      testID={`RadioButton-${item.value}`}
    >
      <ViewRadioButton
        accessible={true}
        accessibilityLabel={item.checked ? 'checked radio button' : 'unchecked radio button'}
        checked={item.checked}
      >
        {item.checked &&
          <ViewSelectedRadioButton testID='FilledRadioButton'/>
        }
      </ViewRadioButton>
      <ViewTextContainer>
        <TextItem>{item.name}</TextItem>
        {item.description && <TextItemInfo>{item.description}</TextItemInfo>}
      </ViewTextContainer>
    </TouchableOpacityListItem>
  )
}