import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import GridHeader from './components/GridHeader/GridHeader'
import VgCheckbox from 'web/components/VgCheckbox/VgCheckbox'

import {
  SectionGridContainer,
  DivRowsContainer,
  DivRow,
  DivCellContainer,
  DivCellContent
} from './Grid.styles'

Grid.propTypes = {
  /** ref to the outer <section>, used for things like infinite scroll */
  containerRef: PropTypes.object,
  /**
   * Table columns + config listed in order of appearance.
   */
  columnConfig: PropTypes.arrayOf(
    PropTypes.shape({
      /** percentage width of column e.g. '10%'. */
      columnWidth: PropTypes.string.isRequired,
      /** should map to a field in each rowData item */
      fieldName: PropTypes.string.isRequired,
      /** the displayed text in the column header */
      title: PropTypes.string.isRequired,
      /** whether the column is sortable */
      sortable: PropTypes.bool,
      /** value map (key should be column value, value is label to display) */
      valueMap: PropTypes.object,
      /** a function that renders a custom component on the column */
      renderer: PropTypes.func,
    })
  ).isRequired,
  /** default column to sort by, should map to a fieldName in columnConfig/rowData */
  defaultSortFieldname: PropTypes.string,
  defaultSortDirection: PropTypes.oneOf(['asc', 'desc']),
  /** called when a table row is clicked on */
  onRowClick: PropTypes.func,
  /** called when scrolling to the end of the grid/rows */
  onScrollEnd: PropTypes.func,
  /** If true, there will be a select all checkbox in the header as well as checkboxes in each row */
  hasSelectAll: PropTypes.bool,
  /** Called whenever the selected rows changes */
  onSelectedRowsChange: PropTypes.func,
  /** Array of records to populate grid rows with data */
  rowData: PropTypes.array.isRequired,
  /**
   * Called on column click/sort with 2 params:
   *   fieldName: maps to a fieldName in columnConfig/rowData
   *   sortDirection: either 'asc' or 'desc'
   */
  handleSortChange: PropTypes.func,
  /** Boolean indicating if select all button is checked */
  selectAllChecked: PropTypes.bool,
  /** Function to change select all button checked state */
  setSelectAllChecked: PropTypes.func,
  /** Set of selected rows the parent holds */
  selectedRows: PropTypes.instanceOf(Set),
  /** id of the selected row used to visually distinguish which row is selected */
  selectedRowId: PropTypes.string
}

Grid.defaultProps = {
  defaultSortDirection: 'desc',
  onScrollEnd: () => {},
  onSelectedRowsChange: () => {},
  onRowClick: () => {},
  selectedRowId: null
}

/**
 * A generic grid used for displaying and sorting a list of records.
 *
 * @category Modules - Web
 * @subcategory Grid
 * @namespace Grid
 */
export default function Grid({
  columnConfig,
  containerRef,
  defaultSortDirection,
  defaultSortFieldname,
  handleSortChange,
  onRowClick,
  onScrollEnd,
  hasSelectAll,
  onSelectedRowsChange,
  rowData,
  selectAllChecked,
  setSelectAllChecked,
  selectedRows,
  selectedRowId
}) {

  const rowsContainerRef = useRef()

  /**
   * hooked up to onScroll of the rows container.
   * Fires props.onScrollEnd when the user gets to the bottom of the scroll area.
   */
  function handleInfiniteScroll() {
    const {scrollTop, scrollHeight, clientHeight} = rowsContainerRef.current
    const isAtEndOfList = scrollHeight - scrollTop === clientHeight
    if (isAtEndOfList) {
      onScrollEnd()
    }
  }

  /**
   * Called when clicking on a selection checkbox for an individual row
   * @param {integer} recordId
   */
  function handleRowSelect(recordId) {
    const newSelectedRows = new Set(selectedRows)
    if (newSelectedRows.has(recordId)) {
      newSelectedRows.delete(recordId)
      if (selectAllChecked) setSelectAllChecked(false)
    }
    else {
      newSelectedRows.add(recordId)
    }
    onSelectedRowsChange(newSelectedRows)
  }

  /**
   * Called when clicking on 'select all' in <GridHeader>
   */
  function handleSelectAllChange() {
    const newSelectAllVal = !selectAllChecked
    setSelectAllChecked(newSelectAllVal)

    let newSelectedRows = []
    if (newSelectAllVal) {
      newSelectedRows = rowData.map((record) => record.id)
    }
    const newSelectedRowsSet = new Set(newSelectedRows)
    onSelectedRowsChange(newSelectAllVal ? new Set() : newSelectedRowsSet)
  }

  // build the rows from rowData and columnConfig
  const rows = rowData.map( (record, rowIndex) => {
    const rowCells = columnConfig.map( (column, colIndex) => {
      let rowField = record[column.fieldName]
      if (column.valueMap && column.valueMap[rowField]) {
        rowField = column.valueMap[rowField]
      }
      const hasCheckbox = hasSelectAll && colIndex === 0
      if (selectAllChecked && !selectedRows.has(record.id)) selectedRows.add(record.id)
      const checked = selectedRows.has(record.id)

      return (
        <DivCellContainer title={rowField} columnWidth={column.columnWidth} key={'field-' + colIndex}>
          {hasCheckbox &&
            <VgCheckbox checked={checked} onChange={() => handleRowSelect(record.id)}/>
          }
          <DivCellContent hasCheckbox={hasCheckbox}>
            {column.renderer ? column.renderer(record) : rowField}
          </DivCellContent>
        </DivCellContainer>
      )
    })

    return (
      <DivRow selected={selectedRowId === record.id} role='row' key={'record-' + rowIndex} onClick={() => onRowClick(record)}>
        {rowCells}
      </DivRow>
    )
  })

  return (
    <SectionGridContainer role='table' ref={containerRef}>
      <GridHeader
        columnConfig={columnConfig}
        defaultSortFieldname={defaultSortFieldname}
        defaultSortDirection={defaultSortDirection}
        handleSortChange={handleSortChange}
        handleSelectAllChange={handleSelectAllChange}
        hasSelectAll={hasSelectAll}
        selectAllChecked={selectAllChecked}
      />
      <DivRowsContainer ref={rowsContainerRef} onScroll={handleInfiniteScroll} role='rowgroup'>
        {rows}
      </DivRowsContainer>
    </SectionGridContainer>
  )
}
