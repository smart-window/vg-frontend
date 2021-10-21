import {GET_DOCUMENT_TEMPLATE_CATEGORIES_BY_TYPE_QUERY} from 'web/apollo/queries/documentTemplateQueries'

export function getDocumentMockData() {

  const mockUserDocumentTemplateCategoriesQuery = {
    request: {
      query: GET_DOCUMENT_TEMPLATE_CATEGORIES_BY_TYPE_QUERY,
      variables: {
        type: 'employee'
      }
    },
    result: {
      data: {
        documentTemplateCategoriesByType: [
          {
            id: '24',
            slug: 'Expenses Documents',
            __typename: 'DocumentTemplateCategory',
          },
          {
            id: '25',
            slug: 'Employee Documents',
            __typename: 'DocumentTemplateCategory',
          },
          {
            id: '26',
            slug: 'Time Tracking Documents',
            __typename: 'DocumentTemplateCategory',
          },
          {
            id: '27',
            slug: 'Payslips Documents',
            __typename: 'DocumentTemplateCategory',
          },
          {
            id: '28',
            slug: 'Contract Documents',
            __typename: 'DocumentTemplateCategory',
          }
        ]
      }
    }
  }

  const mockClientrDocumentTemplateCategoriesQuery = {
    request: {
      query: GET_DOCUMENT_TEMPLATE_CATEGORIES_BY_TYPE_QUERY,
      variables: {
        type: 'client'
      }
    },
    result: {
      data: {
        documentTemplateCategoriesByType: [
          {
            id: '24',
            slug: 'SOW',
            __typename: 'DocumentTemplateCategory',
          },
          {
            id: '25',
            slug: 'Contracts',
            __typename: 'DocumentTemplateCategory',
          },
          {
            id: '26',
            slug: 'Certifications',
            __typename: 'DocumentTemplateCategory',
          }
        ]
      }
    }
  }
  return [mockUserDocumentTemplateCategoriesQuery, mockClientrDocumentTemplateCategoriesQuery]
}