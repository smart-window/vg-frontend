import {EMPLOYEE_QUERY} from 'web/pages/EmployeeProfile/EmployeeProfile.js'
import {GET_USER_DOCUMENTS_QUERY} from 'web/apollo/queries/documentQueries'

export function getEmployeeMockData() {

  const mockEmployeeQuery = {
    request: {
      query: EMPLOYEE_QUERY,
      variables: {
        id: 1
      }
    },
    result: {
      data: {
        'employee': {
          '__typename': 'Employee',
          'pegaAk': '11111',
          'user': {
            '__typename': 'User',
            'fullName': 'Darth Vader',
            'id': '207',
            'lastName': 'Cup',
            'firstName': 'Copper'
          },
          'employments': [
            {
              '__typename': 'Employment',
              'id': '01',
              'effectiveDate': '2021-04-06',
              'type': 'indefinite',
              'partner': {
                '__typename': 'Partner',
                'id': '1'
              },
              'employee': {
                '__typename': 'Employee',
                'id': '1'
              },
              'job': {
                '__typename': 'Job',
                'id': '131',
                probationaryPeriodLength: null,
                probationaryPeriodTerm: null
              },
              'contract': {
                uuid: '1234aaa-111',
                payroll_13th_month: null,
                payroll_14th_month: null,
                '__typename': 'Contract',
                'id': '112',
                'client': {
                  '__typename': 'Client',
                  'name': 'Client 1'
                }
              },
              'country': {
                '__typename': 'Country',
                'id': '137'
              }
            }
          ]
        }
      }
    }
  }
  /* eslint-disable no-unused-vars */
  const _userDocuments = {
    request: {
      query: GET_USER_DOCUMENTS_QUERY,
    },
    result: {
      data: {
        userDocuments: [
          {
            action: 'download',
            category: 'Visa/Immigration Documents',
            downloadUrl: 'https://link-to-download-the-file.com',
            exampleFileUrl: null,
            id: '5',
            mimeType: 'application/pdf',
            fileType: 'document',
            name: 'document-download-test',
            originalFilename: 'TestPdf.pdf',
            originalMimeType: 'application/pdf',
            docusignTemplateId: '',
            s3Upload: {
              __typename: 'S3Upload',
              presignedUrl: null,
              presignedDeleteUrl: null,
              s3Key: '8278a010-73df-45a8-8f2c-8a40be605c76',
            },
            status: 'completed',
            url: 'https://link-to-display-the-file.com',
            __typename: 'Document',
          },
          {
            action: 'download',
            category: 'Visa/Immigration Documents',
            downloadUrl: 'https://link-to-download-the-file.com',
            exampleFileUrl: null,
            id: '6',
            mimeType: 'image/jpeg',
            fileType: 'image',
            name: 'image-download-test',
            originalFilename: 'TestImage.jpg',
            originalMimeType: 'image/jpeg',
            docusignTemplateId: '',
            s3Upload: {
              __typename: 'S3Upload',
              presignedUrl: null,
              presignedDeleteUrl: null,
              s3Key: '8278a010-73df-45a8-8f2c-8a40be605c76',
            },
            status: 'not_started',
            url: 'https://link-to-display-the-file.com',
            __typename: 'Document',
          },
          {
            action: 'upload',
            category: 'Employee Documents',
            downloadUrl: 'https://link-to-download-the-file.com',
            exampleFileUrl: null,
            id: '7',
            mimeType: 'image/jpeg',
            fileType: 'image',
            name: 'image-upload-test',
            originalFilename: 'TestImage.jpg',
            originalMimeType: 'image/jpeg',
            docusignTemplateId: '',
            s3Upload: {
              __typename: 'S3Upload',
              presignedUrl: 'https://link-to-upload-a-file.com',
              presignedDeleteUrl: 'https://link-to-delete-an-uploaded-file.com',
              s3Key: 'e1ea3b58-2075-4cd4-ac2c-b391bd9d3acd',
            },
            status: 'completed',
            url: 'https://link-to-display-the-file.com',
            __typename: 'Document',
          },
          {
            action: 'upload',
            category: 'Payslips Documents',
            downloadUrl: 'https://link-to-download-the-file.com',
            exampleFileUrl: 'https://link-to-download-the-example-file.com',
            id: '8',
            mimeType: 'image/jpeg',
            fileType: 'image',
            name: 'image-download-upload-test',
            originalFilename: null,
            originalMimeType: null,
            docusignTemplateId: '',
            s3Upload: {
              presignedDeleteUrl: 'https://link-to-upload-a-file.com',
              presignedUrl: 'https://link-to-delete-an-uploaded-file.com',
              s3Key: '225ac8f6-8558-4292-8c02-759c4801f0c9',
              __typename: 'S3Upload',
            },
            status: 'not_started',
            url: 'https://link-to-display-the-file.com',
            __typename: 'Document',
          }
        ]
      }
    }
  }

  return [mockEmployeeQuery]
}
