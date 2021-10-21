import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'
import ComboBoxItems from 'web/modules/ComboBox/components/ComboBoxItems/ComboBoxItems'
import stringFormatter from 'shared/services/stringFormatter'
import {
  DivInputLabelWrapper,
  InputFilterCategories
} from './ComboBox.styles'

ComboBox.propTypes = {
  /** Input label */
  label: PropTypes.string,
  /** Options of list items selected in checklist */
  selectedOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired
    })
  ),
  /** Function to handle an option selection */
  handleOptionSelect: PropTypes.func,
  /** Items to display in checklist */
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired
    })
  ),
  /** Boolean to determine if searching is available or not */
  allowSearching: PropTypes.bool,
  /** If true, only one selection at a time is possible */
  isSingleSelect: PropTypes.bool
}

ComboBox.defaultProps = {
  listItems: [],
  selectedOptions: []
}

/**
 * A combobox intended for single or multiple selection accompanied with a search functionality
 * @category Components - Web
 * @namespace ComboBox
 */
export default function ComboBox({
  label,
  selectedOptions,
  handleOptionSelect,
  listItems,
  allowSearching,
  isSingleSelect
}) {
  const parentInputRef = useRef()
  const [isOpen, setIsOpen] = useState(false)

  /** Generates value string displayed within the actual input */
  function buildValueString() {
    if (!selectedOptions) return ''
    else if (selectedOptions.length > 1) return 'Multiple Selected'
    else {
      return selectedOptions.map(cl => stringFormatter.capitalizeEveryWord(cl.slug)).join('')
    }
  }

  /**
   * called when a ComboBoxItem is clicked
   * @param {object} item one of props.selectedOptions
   */
  function onOptionSelect(item) {
    if (isSingleSelect) {
      setIsOpen(false)
    }
    handleOptionSelect(item)
  }

  return (
    <DivInputLabelWrapper key={label} data-testid={'combobox-wrapper-'+label}>
      <label htmlFor={'combobox-'+label}>
        {stringFormatter.capitalizeEveryWord(label)}
      </label>
      <InputFilterCategories
        id={'combobox-'+label}
        readOnly
        aria-label={`${label}-multiselect`}
        ref={parentInputRef}
        isOpen={isOpen}
        value={buildValueString()}
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(true)
        }}
      />
      <ComboBoxItems
        isOpen={isOpen}
        closeDropdown={() => setIsOpen(false)}
        listItems={listItems}
        parentRef={parentInputRef}
        allowSearching={allowSearching}
        selectedOptions={selectedOptions}
        handleOptionSelect={onOptionSelect}
        isSingleSelect={isSingleSelect}
      />
    </DivInputLabelWrapper>
  )
}