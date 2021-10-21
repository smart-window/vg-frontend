import React, { useState, useEffect, useContext, useRef } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import analyticsService from 'web/services/analyticsService'
import { GlobalLoaderContext } from 'shared/providers/GlobalLoaderProvider'
import Grid from 'web/modules/Grid/Grid'
import modalConstants from 'web/constants/modalConstants'
import usePageSize from 'web/modules/Grid/hooks/usePageSize'
import stringFormatter from 'shared/services/stringFormatter'
import {GlobalModalContext} from 'shared/providers/GlobalModalProvider'
import DocumentTemplateDrawer from 'web/components/DocumentTemplateDrawer/DocumentTemplateDrawer'
import DocumentManagementFilter from 'web/components/DocumentManagementFilter/DocumentManagementFilter'
import PlusButtonIcon from 'web/components/DynamicIcons/PlusButtonIcon'
import ReportEmptyState from 'web/components/ReportEmptyState/ReportEmptyState'
import {UPSERT_DOCUMENT_TEMPLATE, DELETE_DOCUMENT_TEMPLATE} from 'web/apollo/mutations/documentTemplateMutations'
import {GET_DOCUMENT_TEMPLATES} from 'web/apollo/queries/documentTemplateQueries'
import {
  DivDocumentManagementContainer,
  DivDocumentTemplatesTable,
  H2Subheader,
  DivFilterContainer,
  DivHeaderContainer,
  DivTableTitle,
  DivBottomSection,
  ButtonCreateTemplate,
  DivPlusIconContainer,
  DivSidebar
} from './DocumentManagement.styles'

const globalDocumentsGridColumnConfig = [
  { fieldName: 'name', title: 'Template Name', columnWidth: '26%', sortable: true },
  { fieldName: 'exampleFilename', title: 'Template File', columnWidth: '16%', sortable: true },
  { fieldName: 'partnerName', title: 'Partner', columnWidth: '20%', sortable: true },
  { fieldName: 'clientName', title: 'Client', columnWidth: '20%', sortable: true },
  { fieldName: 'countryIsoThree', title: 'Country', columnWidth: '10%', sortable: true },
  { fieldName: 'requiredString', title: 'Req', columnWidth: '8%', sortable: true },
]

/**
 * A simple view to display and admin document templates
 * @category Components - Web
 * @namespace DocumentTemplates
 */
export default function DocumentTemplates() {
  const { setIsLoading } = useContext(GlobalLoaderContext)
  const {showModal, hideModal} = useContext(GlobalModalContext)

  useEffect(
    function didMount() {
      setIsLoading(false)
    },
    [setIsLoading]
  )

  const gridRef = useRef()
  const pageSize = usePageSize(gridRef)
  const [pageNumber, setPageNumber] = useState(1)
  const [sortColumn, setSortColumn] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchTerm, setSearchTerm] = useState(null)
  const [selectedRows] = useState(null)
  const [filters, setFilters] = useState([])
  const [documentTemplateModalOpen, setDocumentTemplateModalOpen] = useState(false)
  const [selectedDocumentTemplate, setSelectedDocumentTemplate] = useState(null)

  const {
    fetchMore: fetchMoreDocumentTemplates,
    refetch: refetchDocumentTemplates,
    loading,
    data: { documentTemplatesReport: documentTemplateReport = {} } = {}
  } = useQuery(GET_DOCUMENT_TEMPLATES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      pageSize: 25,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      filterBy: filters,
      searchBy: searchTerm
    }
  })

  const { documentTemplates = [], row_count = 0 } = documentTemplateReport

  const [
    createDocumentTemplate,
  ] = useMutation(UPSERT_DOCUMENT_TEMPLATE)

  const [deleteDocumentTemplate] = useMutation(DELETE_DOCUMENT_TEMPLATE)

  /**
   * Use Apollo's fetchMore() function to update useQuery().data with the next page, if more records exist.
   * Merge logic for this query can be found in web/config/apolloConfig
   */
  async function handleScrollEnd() {
    if (documentTemplates.length < row_count) {
      const lastDocumentTemplate = documentTemplates[documentTemplates.length - 1]
      // update # of records fetched so far so we can get all pages on a sort change
      setPageNumber(pageNumber + 1)
      await fetchMoreDocumentTemplates({
        variables: {
          pageSize,
          lastId: +lastDocumentTemplate.id,
          lastValue: lastDocumentTemplate[sortColumn]
        }
      })
    }
  }

  /**
   * Callback for <Grid>'s handleSortChange
   * @param {object} columnData passed in objects in column config
   * @param {string} fieldDirection e.g. 'asc'
   */
  function handleSortChange(columnData, fieldDirection) {
    setSortColumn(columnData.fieldName)
    setSortDirection(fieldDirection)
    analyticsService.logEvent(
      'Document Management',
      'Clicked',
      `Sort_${stringFormatter.removeSpaces(columnData.title)}`
    )
  }

  /**
   * Callback for handling a search on the report
   * @param {string} searchTerm e.g. 'search term'
   */
  function handleSearchChange(searchTerm) {
    setSearchTerm(searchTerm)
    if (searchTerm !== '')
      analyticsService.logEvent(
        'Document Management',
        'Clicked',
        'Search_EnterSearch'
      )
  }

  /**
   * Callback for opening the template modal
   */
  function openDocumentTemplateModal() {
    if (!documentTemplateModalOpen) {
      setDocumentTemplateModalOpen(true)
    }
  }

  /**
   * Callback for closing the template modal
   */
  function onCancelDocumentTemplateModal() {
    setDocumentTemplateModalOpen(false)
    hideModal()
  }

  /**
   * Callback for closing the template drawer
   */
  function onCancelDocumentTemplateDrawer() {
    setSelectedDocumentTemplate(null)
  }

  /**
   * Callback for upserting a document template
   * @param {object} params the params for upserting a template
   */
  async function onCreateDocumentTemplate(params) {
    await createDocumentTemplate(params)
    refetchDocumentTemplates()
    setDocumentTemplateModalOpen(false)
    hideModal()
  }

  /**
   * Callback for deleting a document template
   * @param {object} params the params for deleting a template
   */
  async function onDeleteDocumentTemplate(params) {
    await deleteDocumentTemplate(params)
    refetchDocumentTemplates()
    setSelectedDocumentTemplate(null)
  }

  useEffect(() => {
    if (documentTemplateModalOpen) {
      showModal(modalConstants.DOCUMENT_TEMPLATE_MODAL, {
        onSubmit: onCreateDocumentTemplate,
        onCancel: onCancelDocumentTemplateModal
      })
    }
  }, [documentTemplateModalOpen])

  const useEmptyState = !loading && !documentTemplates.length
  const emptyMessage = 'Oops! No data found'

  return (
    <DivDocumentManagementContainer>
      <DivDocumentTemplatesTable data-testid='div-document-templates'>
        <DivHeaderContainer>
          <DivTableTitle>
            <H2Subheader>Employee Onboarding Templates</H2Subheader>
          </DivTableTitle>
          <DivFilterContainer>
            <DocumentManagementFilter
              onClear={setFilters}
              onSearchChange={handleSearchChange}
              onFilterChange={setFilters}
            />
          </DivFilterContainer>
        </DivHeaderContainer>
        {useEmptyState ? (
          <ReportEmptyState emptyMessage={emptyMessage} />
        ) : (
          <Grid
            containerRef={gridRef}
            columnConfig={globalDocumentsGridColumnConfig}
            defaultSortFieldname={'dueDate'}
            handleSortChange={handleSortChange}
            onScrollEnd={handleScrollEnd}
            onRowClick={(documentTemplate) => setSelectedDocumentTemplate(prev => prev?.id === documentTemplate.id ? null : documentTemplate)}
            selectedRowId={selectedDocumentTemplate?.id}
            rowData={documentTemplates}
            selectedRows={selectedRows || new Set()}
          />
        )}
        <DivBottomSection>
          <ButtonCreateTemplate
            onClick={openDocumentTemplateModal}
          >
            <DivPlusIconContainer>
              <PlusButtonIcon />
            </DivPlusIconContainer>
            Create Onboarding Template
          </ButtonCreateTemplate>
        </DivBottomSection>
      </DivDocumentTemplatesTable>
      <DivSidebar open={!!selectedDocumentTemplate}>
        <DocumentTemplateDrawer
          onSubmit={onCreateDocumentTemplate}
          onCancel={onCancelDocumentTemplateDrawer}
          onDelete={onDeleteDocumentTemplate}
          documentTemplateId={selectedDocumentTemplate?.id}
        />
      </DivSidebar>
    </DivDocumentManagementContainer>
  )
}
