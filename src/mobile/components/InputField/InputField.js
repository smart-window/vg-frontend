import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import {colors, mobileFonts} from 'shared/constants/cssConstants'

InputField.propTypes = {
  /** A label for the input's value */
  label: PropTypes.string,
  /** The input's value */
  labelItem: PropTypes.string
}

const ViewInputField = styled.View`
    height: 51px;
    width: 50%;
    margin-top: 18px;
`
const TextLabel = styled.Text`
  font-family: ${mobileFonts.openSans(400, true)};
  font-size: 12px;
  font-style: italic;
  color: ${colors.gray50};
`
const TextInputField = styled.TextInput`
  width: 100%;
  margin-top: 6px;
  font-family: ${mobileFonts.openSans(400)};
  font-size: 18px;
  color: ${colors.charcoal};
`

/**
 * A repeating input component within a Card component.
 * Renders a non-interactive input with a label and a value.
 * @category Components - Mobile
 * @namespace InputField
 */
export default function InputField({label, labelItem}) {
  return (
    <ViewInputField testID='InputField'>
      <TextLabel>
        {label}
      </TextLabel>
      <TextInputField
        pointerEvents='none'
        value={labelItem}
      />
    </ViewInputField>
  )
}