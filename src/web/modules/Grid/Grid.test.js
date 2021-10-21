import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Grid from './Grid'

const mockColumnConfig = [
  { fieldName: 'id', title: 'Employee ID', columnWidth: '12%', sortable: true },
  { fieldName: 'userFullName', title: 'Employee Name', columnWidth: '15%', sortable: true },
  { fieldName: 'clientName', title: 'Client', columnWidth: '13%', sortable: true },
  { fieldName: 'region', title: 'Region', columnWidth: '8%', sortable: true },
  { fieldName: 'userWorkAddressCountryName', title: 'Ctry', columnWidth: '6%', sortable: true },
  { fieldName: 'eventDate', title: 'Time Entry Date', columnWidth: '13%', sortable: true },
  { fieldName: 'totalHours', title: 'Hours', columnWidth: '7%', sortable: true },
  { fieldName: 'timeTypeSlug', title: 'Time Category', columnWidth: '12%', sortable: true },
  { fieldName: 'description', title: 'Description', columnWidth: '14%', sortable: true },
]

const mockRowData = [
  { id: '0198-HHH-098', userFullName: 'Firstname Longlastname', partnerName: 'Normal Long ICP Name, Inc.', clientName: 'Normal Client Name, Inc.', region: 'Americas', countryCode: 'USA', createdAt: '30 December 2020', hours: 20, timeType: 'Work Time', description: 'Some string that might run over, but hover to see it all.' },
  { id: '0198-HHH-098', userFullName: 'Firstname Longlastname', partnerName: 'Normal Long ICP Name, Inc.', clientName: 'Normal Client Name, Inc.', region: 'Americas', countryCode: 'USA', createdAt: '30 December 2020', hours: 20, timeType: 'Work Time', description: 'Some string that might run over, but hover to see it all.' },
  { id: '0198-HHH-098', userFullName: 'Firstname Longlastname', partnerName: 'Normal Long ICP Name, Inc.', clientName: 'Normal Client Name, Inc.', region: 'Americas', countryCode: 'USA', createdAt: '30 December 2020', hours: 20, timeType: 'Work Time', description: 'Some string that might run over, but hover to see it all.' },
]

describe('Grid', () => {
  it('renders the grid with some data', () => {
    render(
      <Grid
        columnConfig={mockColumnConfig}
        defaultSortFieldname={'createdAt'}
        hasSelectAll={true}
        rowData={mockRowData}
        selectedRows={new Set()}
        selectAllChecked={false}
        setSelectAllChecked={jest.fn()}
      />
    )

    expect(screen.getAllByText('0198-HHH-098')).toHaveLength(3)
    expect(screen.getByText('Time Category')).toBeDefined()
  })

  it('selects all when clicking the header checkbox', () => {
    render(
      <Grid
        columnConfig={mockColumnConfig}
        defaultSortFieldname={'createdAt'}
        hasSelectAll={true}
        rowData={mockRowData}
        selectedRows={new Set()}
        selectAllChecked={true}
        setSelectAllChecked={jest.fn()}
      />
    )

    const allCheckBoxes = screen.getAllByRole('checkbox')
    for (const checkbox of allCheckBoxes) {
      expect(checkbox.checked).toEqual(true)
    }
  })

  it('calls infinite scroll handler at bottom of list', () => {
    const handleScrollEnd = jest.fn()
    Object.defineProperty(Element.prototype, 'scrollHeight', {
      value: 2000
    })
    Object.defineProperty(Element.prototype, 'scrollTop', {
      value: 100
    })
    Object.defineProperty(Element.prototype, 'clientHeight', {
      value: 1900
    })

    render(
      <Grid
        columnConfig={mockColumnConfig}
        defaultSortFieldname={'createdAt'}
        hasSelectAll={true}
        onScrollEnd={handleScrollEnd}
        rowData={mockRowData}
        selectedRows={new Set()}
        selectAllChecked={false}
        setSelectAllChecked={jest.fn()}
      />
    )
    const rowGroupRef = screen.getByRole('rowgroup')
    fireEvent.scroll(rowGroupRef, { target: { scrollY: 2000 } })
    expect(handleScrollEnd).toHaveBeenCalled()
  })

  it('calls sort handler correctly when clicking on a column', () => {

    const mockHandleSortChange = jest.fn()

    render(
      <Grid
        columnConfig={mockColumnConfig}
        defaultSortFieldname={'createdAt'}
        hasSelectAll={true}
        handleSortChange={mockHandleSortChange}
        rowData={mockRowData}
        selectedRows={new Set()}
        selectAllChecked={false}
        setSelectAllChecked={jest.fn()}
      />
    )

    const nameColumn = screen.getByLabelText('header-userFullName')
    fireEvent.click(nameColumn)
    expect(mockHandleSortChange).toHaveBeenCalledWith(mockColumnConfig[1], 'asc')
  })

  it('calls onRowClick when a row is clicked on', () => {
    const mockOnRowClick = jest.fn()

    const user = {
      id: '0198-HHH-098',
      userFullName: 'John Doe',
      partnerName: 'Normal Long ICP Name, Inc.',
      clientName: 'Normal Client Name, Inc.',
      region: 'Americas', countryCode: 'USA',
      createdAt: '30 December 2020',
      hours: 20,
      timeType: 'Work Time',
      description: 'Some string that might run over, but hover to see it all.'
    }

    render(
      <Grid
        columnConfig={mockColumnConfig}
        defaultSortFieldname={'createdAt'}
        hasSelectAll={true}
        handleSortChange={() => { }}
        rowData={[user, ...mockRowData]}
        onRowClick={mockOnRowClick}
        selectedRows={new Set()}
        selectAllChecked={false}
        setSelectAllChecked={jest.fn()}
      />
    )

    const nameCell = screen.getByText('John Doe')
    fireEvent.click(nameCell)
    expect(mockOnRowClick).toHaveBeenCalledWith(user)
  })
})