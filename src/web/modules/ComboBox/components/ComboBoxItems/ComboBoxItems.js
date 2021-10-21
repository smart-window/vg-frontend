import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import AnimatedDropdown from 'web/components/AnimatedDropdown/AnimatedDropdown'
import VgCheckbox from 'web/components/VgCheckbox/VgCheckbox'
import stringFormatter from 'shared/services/stringFormatter'
import useDebounce from 'shared/hooks/useDebounce'
import XIcon from 'assets/images/icons/X.png'
import {
  DivComboBoxItems,
  DivChecklist,
  DivSearchContainer,
  UlGenericList,
  LiListItem,
  InputSearch,
  ButtonSearch
} from './ComboBoxItems.styles'

ComboBoxItems.propTypes = {
  /** Array of list item objects to display */
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired
    })
  ).isRequired,
  /** Boolean indicating whether or not to display the search functionality */
  allowSearching: PropTypes.bool,
  /** Parent element the checklist uses to determine width and position */
  parentRef: PropTypes.element.isRequired,
  /** Boolean indicating whether or not to animate the checklist opened or closed */
  isOpen: PropTypes.bool.isRequired,
  /** Parent function to run on dropdown close */
  closeDropdown: PropTypes.func.isRequired,
  /* Array of selected listItems */
  selectedOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired
    })
  ),
  /** Parent function to run on option click  */
  handleOptionSelect: PropTypes.func,
  /** If true, only one option can be selected at a time */
  isSingleSelect: PropTypes.bool
}

/**
 * List items pertaining to the parent ComboBox
 * @category Components - Web
 * @namespace ComboBoxItems
 */
export default function ComboBoxItems({
  listItems,
  allowSearching,
  parentRef,
  isOpen,
  closeDropdown,
  selectedOptions,
  handleOptionSelect,
  isSingleSelect
}) {
  const [items, setItems] = useState(listItems)
  const [searchString, setSearchString] = useState('')
  const [listWidth, setListWidth] = useState('100%')
  const [parentInputHeight, setParentInputHeight] = useState(0)

  useEffect(function handleListItemsUpdate() {
    // Update list items if not in the middle of the search
    if (!searchString) {
      setItems(listItems)
    }
  }, [listItems])

  useEffect(function parentRefRendered() {
    // Dynamically sets the width of the checklist and its position from parent top
    if (parentRef) {
      const refDimensions = parentRef.current.getBoundingClientRect()
      setListWidth(refDimensions.width)
      setParentInputHeight(refDimensions.height)
    }
  }, [parentRef])

  /**
   * Selects or deselects item on click
   * @param {object} - item user selected
  */
  function itemSelect(item) {
    if (isSingleSelect) {
      handleOptionSelect(item)
    }
    else if (!selectedOptions.find(selectedOption => selectedOption.id === item.id)) {
      const newOptions = [...selectedOptions, item]
      handleOptionSelect(newOptions, item)
    }
    else {
      const optionsWithoutSelected = selectedOptions.filter(listItem => listItem.id !== item.id)
      handleOptionSelect(optionsWithoutSelected)
    }
  }

  /**
   * Creates an unordered list of items with checkboxes
   * @returns {Element} - a Ul html element with multiple li elements
   */
  function createList() {
    const listElements = items.map((listItem, i) => {
      const foundOption = selectedOptions.find(item => item.id === listItem.id)
      const checked = foundOption ? true : false
      return (
        <LiListItem
          key={listItem.id}
          onClick={() => {itemSelect(listItem)}}
          isSingleSelect={isSingleSelect}
          isSelected={checked}
        >
          {!isSingleSelect && <VgCheckbox checked={checked}/>}
          <p>{listItem.slug && stringFormatter.capitalizeEveryWord(listItem.slug)}</p>
        </LiListItem>
      )
    })
    return (
      <UlGenericList>
        {listElements}
      </UlGenericList>
    )
  }

  /**
   * Filters checklist based on user's search query.
   * State is updated immediately, but actual filtering is debounced on user input.
   * @param {string} searchStr value of search input
  */
  function handleSearch(searchStr) {
    setSearchString(searchStr)
    debouncedSearchHandler(searchStr)
  }
  const debouncedSearchHandler = useDebounce(searchStr => {
    const items = listItems.filter(item => item.slug.toLowerCase().includes(searchStr.toLowerCase()))
    setItems(items)
  }, 500)

  return (
    <DivComboBoxItems top={parentInputHeight + 1}>
      <AnimatedDropdown
        isDropdownOpen={isOpen}
        onClickOutside={closeDropdown}
      >
        <DivChecklist open
          listWidth={listWidth}
        >
          {
            allowSearching &&
            <DivSearchContainer>
              <InputSearch
                placeholder='Search'
                value={searchString}
                onChange={e => handleSearch(e.target.value)}
              />
              <ButtonSearch
                isVisible={searchString.length > 0}
                type='reset'
                aria-label='Clear search term'
                onClick={() => {
                  setSearchString('')
                  setItems(listItems)
                }}
              >
                <img src={XIcon} alt='clear search term icon' />
              </ButtonSearch>
            </DivSearchContainer>
          }
          {createList()}
        </DivChecklist>
      </AnimatedDropdown>
    </DivComboBoxItems>
  )
}