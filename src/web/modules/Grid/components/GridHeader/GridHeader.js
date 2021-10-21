import React, { useState } from 'react'
import PropTypes from 'prop-types'

import VgCheckbox from 'web/components/VgCheckbox/VgCheckbox'
import ArrowDoubleIcon from 'assets/images/icons/arrowDouble.svg'
import ArrowDownIcon from 'assets/images/icons/arrowDown.svg'

import {
  DivHeaderContainer,
  DivHeaderCellContainer,
  DivHeaderCellLabel,
  ImgSortIconContainer,
} from './GridHeader.styles'

GridHeader.propTypes = {
  /**
   * Comes from <Grid> - Table columns listed in order of appearance. Each column object has the following properties:
   *   columnWidth {string} - percentage width of column e.g. '10%'
   *   fieldName {string} - should map to a field in each rowData item
   *   title {string} - the displayed text in the column header
   */
  columnConfig: PropTypes.array.isRequired,
  /**
   * Called on column click/sort with 2 params:
   *   fieldName: maps to a fieldName in columnConfig/rowData
   *   sortDirection: either 'asc' or 'desc'
   */
  handleSortChange: PropTypes.func,
  /**
   * Called when clicking the 'select all' checkbox.
   */
  handleSelectAllChange: PropTypes.func,
  /** If true, there will be a select all checkbox in the header as well as checkboxes in each row */
  hasSelectAll: PropTypes.bool,
}
GridHeader.defaultProps = {
  handleSortChange: () => { }
}

/**
 * The header row for <Grid> which shares the same columnConfig prop.
 * Handles sorting for the provided columns.
 *
 * @category Modules - Web
 * @subcategory Grid
 * @namespace GridHeader
 */
export default function GridHeader(props) {
  const {
    columnConfig,
    handleSortChange,
    hasSelectAll,
    defaultSortFieldname,
    defaultSortDirection,
    selectAllChecked
  } = props

  const [sortFieldname, setSortFieldname] = useState(defaultSortFieldname)
  const [sortDirection, setSortDirection] = useState(defaultSortDirection)

  /**
   * Callback for when a column header is clicked, currently just handles sorting
   * @param {object} columnData object containing column data passed in via columnConfig collection
   */
  function handleColumnHeaderClick(columnData) {
    if (!columnData.sortable) return
    const { fieldName } = columnData
    const columnCurrentlySorted = sortFieldname === fieldName
    const oppositeSortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    const newSortDirection = columnCurrentlySorted ? oppositeSortDirection : 'asc'
    setSortFieldname(fieldName)
    setSortDirection(newSortDirection)
    handleSortChange(columnData, newSortDirection)
  }

  /** onChange for 'select all' checkbox
   * @param {object} e event object (to stop event propagation)
   */
  function handleSelectAllChange(e) {
    e.stopPropagation()
    props.handleSelectAllChange()
  }

  const headerCells = columnConfig.map((columnData, index) => {
    const {title, columnWidth, fieldName, sortable} = columnData
    const columnCurrentlySorted = sortFieldname === fieldName

    const sortIconSrc = columnCurrentlySorted ? ArrowDownIcon : ArrowDoubleIcon
    const isArrowFlipped = columnCurrentlySorted && (sortDirection === 'asc')

    const hasCheckbox = hasSelectAll && index === 0

    return (
      <DivHeaderCellContainer
        columnWidth={columnWidth}
        sortable={sortable}
        onClick={() => handleColumnHeaderClick(columnData)}
        key={'header-' + fieldName}
        role='cell'
        aria-label={'header-' + fieldName}
      >
        {hasCheckbox &&
          <VgCheckbox checked={selectAllChecked} onChange={handleSelectAllChange}/>
        }
        <DivHeaderCellLabel hasCheckbox={hasCheckbox} title={title}>
          {title}
        </DivHeaderCellLabel>
        {sortable &&
          <ImgSortIconContainer
            src={sortIconSrc}
            isFlipped={isArrowFlipped}
            role='button'
          />
        }
      </DivHeaderCellContainer>
    )
  })
  return (
    <DivHeaderContainer role='row'>
      {headerCells}
    </DivHeaderContainer>
  )
}
