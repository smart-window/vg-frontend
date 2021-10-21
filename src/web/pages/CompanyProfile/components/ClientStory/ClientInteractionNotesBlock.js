import React, { useRef, useContext, useState } from 'react'
import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import VgInput from 'web/modules/VgInput/VgInput'
import { DivClientSummaryItem } from '../ClientInformation/ClientInformation.styles'
import Grid from 'web/modules/Grid/Grid'
import analyticsService from 'web/services/analyticsService'
import stringFormatter from 'shared/services/stringFormatter'
import addNewIcon from 'assets/images/icons/plusCircleGreen.svg'
import { DivAddNewRecord, ImgAddNew } from './ClientStory.styles'
import trashIcon from 'assets/images/icons/trashIcon.svg'
import { GlobalModalContext } from 'shared/providers/GlobalModalProvider'
import modalConstants from 'web/constants/modalConstants'
import {
  DivClientInteractionNotes,
  DivInputInfo,
  ImgTrashIcon,
  FontBlue,
  SpaceHeight20
} from './ClientInteractionNotesBlock.styles'

/**
 * Renders interaction notes component
 * @category Components - Web
 * @namespace ClientInteractionNotesBlock
 */
export default function ClientInteractionNotesBlock({ data }) {
  const gridRef = useRef()
  const [selectedRows] = useState(null)
  const { showModal } = useContext(GlobalModalContext)
  const clientInteractionNotesColumnConfig = [
    {
      fieldName: 'name',
      title: 'Name',
      columnWidth: '30%',
      renderer: (row) => <FontBlue>{row.name}</FontBlue>,
      sortable: true,
    },
    {
      fieldName: 'role',
      title: 'Role',
      columnWidth: '30%',
      sortable: true,
    },
    {
      fieldName: 'title',
      title: 'Title',
      columnWidth: '30%',
      sortable: true,
    },
    {
      fieldName: 'delete',
      title: '',
      columnWidth: '10%',
      sortable: false,
      renderer: (row) => <ImgTrashIcon src={trashIcon} alt='remove-item' onClick={() => showModal(modalConstants.CONFIRMATION_MODAL, {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this secondary contact record?',
        onSubmit: () => { }
      })} />
    },
  ]



  /**
   * Callback for <Grid>'s handleSortChange
   * @param {object} columnData passed in objects in column config
   * @param {string} fieldDirection e.g. 'asc'
   */
  function handleSortChange(columnData, fieldDirection) {
    analyticsService.logEvent(
      'Client Onboardings',
      'Clicked',
      `Sort_${stringFormatter.removeSpaces(columnData.title)}`
    )
  }

  return (
    <DivClientInteractionNotes>
      <DivInputInfo>
        <DivClientSummaryItem className='long-item'>
          <VgInput
            id='interactionHighlights'
            type={InputTypes.TEXTAREA}
            value={data.interactionHighlights}
            label='Interaction Highlights'
          />
          <SpaceHeight20 />
          <VgInput
            id='interactionChallenges'
            type={InputTypes.TEXTAREA}
            value={data.interactionChallenges}
            label='Interaction Challenges'
          />
        </DivClientSummaryItem>
        <DivClientSummaryItem className='long-item'>
          <Grid
            containerRef={gridRef}
            columnConfig={clientInteractionNotesColumnConfig}
            defaultSortFieldname={'fullName'}
            handleSortChange={handleSortChange}
            rowData={data.secondaryPointsofContact}
            selectedRows={selectedRows || new Set()}
          />
          <SpaceHeight20 />
          <DivAddNewRecord onClick={() => {}}>
            <ImgAddNew src={addNewIcon} alt='add-new' />
                Add New Communication Record
              </DivAddNewRecord>
        </DivClientSummaryItem>
      </DivInputInfo>
    </DivClientInteractionNotes>
  )
}
