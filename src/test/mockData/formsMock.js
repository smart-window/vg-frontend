import {CURRENT_USER_QUERY} from 'web/modules/WelcomeWizard/WelcomeWizard'
import {GET_CURRENT_USER_DOCUMENTS_QUERY} from 'web/apollo/queries/documentQueries'
import {EEWW_FORMS_QUERY} from 'shared/hooks/queries/useFormsCurrentUserQuery'
import {FORMS_QUERY} from 'shared/hooks/queries/useFormsGenericUserQuery'
import formConstants from 'shared/constants/formConstants'

/* Query mocks */
export function getProfileFormMockData() {
  const eeProfileForms = {
    request: {
      query: FORMS_QUERY,
      variables: {
        formSlugs: [
          formConstants.PROFILE_PERSONAL_INFO_FORM_SLUG,
          formConstants.PROFILE_CONTACT_INFO_FORM_SLUG,
          formConstants.BANK_INFO_FORM_SLUG,
          formConstants.WORK_INFO_FORM_SLUG,
          formConstants.IDENTIFICATION_INFO_FORM_SLUG,
          formConstants.OTHER_INFO_FORM_SLUG
        ],
        userId: 234
      }
    },
    result: {
      data: {
        'formsBySlugForUser': [
          {
            '__typename': 'Form',
            'formFields': [
              {
                '__typename': 'FormField',
                'config': {},
                'id': '885',
                'optional': false,
                'slug': 'legal-first-name',
                'sourceTableField': 'first_name',
                'type': 'text',
                'value': 'Luke'
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '886',
                'optional': false,
                'slug': 'legal-last-name',
                'sourceTableField': 'last_name',
                'type': 'text',
                'value': 'Skywalker'
              },
              {
                '__typename': 'FormField',
                'config': {
                  'hiddden': true
                },
                'id': '887',
                'optional': false,
                'slug': 'full-name',
                'sourceTableField': 'full_name',
                'type': 'text',
                'value': 'Aaliyah Labadie'
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '888',
                'optional': true,
                'slug': 'preferred-first-name',
                'sourceTableField': 'preferred_first_name',
                'type': 'text',
                'value': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'type_override': 'id'
                },
                'id': '889',
                'optional': false,
                'slug': 'nationality',
                'sourceTableField': 'nationality_id',
                'type': 'select',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '890',
                'optional': false,
                'slug': 'date-of-birth',
                'sourceTableField': 'birth_date',
                'type': 'date',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '891',
                'optional': false,
                'slug': 'gender',
                'sourceTableField': 'gender',
                'type': 'select',
                'value': ''
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '892',
                'optional': false,
                'slug': 'marital-status',
                'sourceTableField': 'marital_status',
                'type': 'select',
                'value': ''
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '906',
                'optional': false,
                'slug': 'emergency-contact-name',
                'sourceTableField': 'emergency_contact_name',
                'type': 'text',
                'value': 'foo'
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '907',
                'optional': false,
                'slug': 'emergency-contact-relationship',
                'sourceTableField': 'emergency_contact_relationship',
                'type': 'select',
                'value': ''
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '908',
                'optional': false,
                'slug': 'emergency-contact-phone',
                'sourceTableField': 'emergency_contact_phone',
                'type': 'phone',
                'value': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Have you completed a university degree?',
                  'order': 1
                },
                'id': '1020',
                'optional': false,
                'slug': 'has-completed-university',
                'sourceTableField': 'country_specific_fields.has_completed_university',
                'type': 'boolean',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Highest Degree Type Completed',
                  'order': 2
                },
                'id': '1021',
                'optional': false,
                'slug': 'highest-degree-completed',
                'sourceTableField': 'country_specific_fields.highest_degree_completed',
                'type': 'text',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Degree Code',
                  'order': 3
                },
                'id': '1022',
                'optional': false,
                'slug': 'degree-code',
                'sourceTableField': 'country_specific_fields.degree_code',
                'type': 'number',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Ethnicity',
                  'order': 4
                },
                'id': '1023',
                'optional': false,
                'slug': 'ethnicity',
                'sourceTableField': 'country_specific_fields.ethnicity',
                'type': 'text',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Do you identify as someone with a disability?',
                  'order': 5
                },
                'id': '1028',
                'optional': false,
                'slug': 'has-disability',
                'sourceTableField': 'country_specific_fields.has_disability',
                'type': 'boolean',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Disability Type If applicable',
                  'order': 6
                },
                'id': '1029',
                'optional': true,
                'slug': 'disability-type',
                'sourceTableField': 'country_specific_fields.disability_type',
                'type': 'text',
                'value': null
              }
            ],
            'id': '340',
            'slug': 'eeprofile-personal-info'
          },
          {
            '__typename': 'Form',
            'formFields': [
              {
                '__typename': 'FormField',
                'config': {},
                'id': '893',
                'optional': false,
                'slug': 'primary-phone',
                'sourceTableField': 'phone',
                'type': 'phone',
                'value': ''
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '894',
                'optional': false,
                'slug': 'business-email',
                'sourceTableField': 'business_email',
                'type': 'text',
                'value': ''
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '895',
                'optional': true,
                'slug': 'personal-email',
                'sourceTableField': 'personal_email',
                'type': 'text',
                'value': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.personal_address_id',
                  'label': 'Personal Address'
                },
                'id': '896',
                'optional': false,
                'slug': 'personal-address-line-1',
                'sourceTableField': 'line_1',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.personal_address_id',
                  'label': 'Personal Address'
                },
                'id': '897',
                'optional': true,
                'slug': 'personal-address-line-2',
                'sourceTableField': 'line_2',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.personal_address_id',
                  'label': 'Personal Address'
                },
                'id': '898',
                'optional': true,
                'slug': 'personal-address-line-3',
                'sourceTableField': 'line_3',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.personal_address_id',
                  'label': 'Personal Address'
                },
                'id': '899',
                'optional': false,
                'slug': 'personal-address-city',
                'sourceTableField': 'city',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.personal_address_id',
                  'label': 'Personal Address'
                },
                'id': '900',
                'optional': false,
                'slug': 'personal-address-postal-code',
                'sourceTableField': 'postal_code',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.personal_address_id',
                  'label': 'Personal Address'
                },
                'id': '901',
                'optional': true,
                'slug': 'personal-address-county-district',
                'sourceTableField': 'county_district',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.personal_address_id',
                  'label': 'Personal Address'
                },
                'id': '902',
                'optional': false,
                'slug': 'personal-address-state-province',
                'sourceTableField': 'state_province',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.personal_address_id',
                  'label': 'Personal Address'
                },
                'id': '903',
                'optional': false,
                'slug': 'personal-address-state-province-iso-alpha-2-code',
                'sourceTableField': 'state_province_iso_alpha_2_code',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.personal_address_id',
                  'label': 'Personal Address',
                  'type_override': 'id'
                },
                'id': '904',
                'optional': false,
                'slug': 'personal-address-country-id',
                'sourceTableField': 'country_id',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.personal_address_id',
                  'label': 'Personal Address'
                },
                'id': '905',
                'optional': false,
                'slug': 'personal-address-formatted-address',
                'sourceTableField': 'formatted_address',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '909',
                'optional': true,
                'slug': 'timezone',
                'sourceTableField': 'timezone',
                'type': 'select',
                'value': ''
              }
            ],
            'id': '341',
            'slug': 'eeprofile-contact-info'
          },
          {
            '__typename': 'Form',
            'formFields': [
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Bank Account Holder Name'
                },
                'id': '493',
                'optional': false,
                'slug': 'bank-account-holder-name',
                'sourceTableField': 'bank_account_holder_name',
                'type': 'text',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Bank Name'
                },
                'id': '494',
                'optional': false,
                'slug': 'bank-name',
                'sourceTableField': 'bank_name',
                'type': 'text',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Bank Account Number'
                },
                'id': '495',
                'optional': true,
                'slug': 'bank-account-number',
                'sourceTableField': 'bank_account_number',
                'type': 'number',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Account Type'
                },
                'id': '496',
                'optional': true,
                'slug': 'bank-account-type',
                'sourceTableField': 'bank_account_type',
                'type': 'text',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.bank_address_id',
                  'label': 'Bank Address'
                },
                'id': '855',
                'optional': false,
                'slug': 'bank-address-line-1',
                'sourceTableField': 'line_1',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.bank_address_id',
                  'label': 'Bank Address'
                },
                'id': '856',
                'optional': true,
                'slug': 'bank-address-line-2',
                'sourceTableField': 'line_2',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.bank_address_id',
                  'label': 'Bank Address'
                },
                'id': '857',
                'optional': true,
                'slug': 'bank-address-line-3',
                'sourceTableField': 'line_3',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.bank_address_id',
                  'label': 'Bank Address'
                },
                'id': '858',
                'optional': false,
                'slug': 'bank-address-city',
                'sourceTableField': 'city',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.bank_address_id',
                  'label': 'Bank Address'
                },
                'id': '859',
                'optional': false,
                'slug': 'bank-address-postal-code',
                'sourceTableField': 'postal_code',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.bank_address_id',
                  'label': 'Bank Address'
                },
                'id': '860',
                'optional': true,
                'slug': 'bank-address-county-district',
                'sourceTableField': 'county_district',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.bank_address_id',
                  'label': 'Bank Address'
                },
                'id': '861',
                'optional': false,
                'slug': 'bank-address-state-province',
                'sourceTableField': 'state_province',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.bank_address_id',
                  'label': 'Bank Address'
                },
                'id': '862',
                'optional': false,
                'slug': 'bank-address-state-province-iso-alpha-2-code',
                'sourceTableField': 'state_province_iso_alpha_2_code',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.bank_address_id',
                  'label': 'Bank Address',
                  'type_override': 'id'
                },
                'id': '863',
                'optional': false,
                'slug': 'bank-address-country-id',
                'sourceTableField': 'country_id',
                'type': 'address',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'foreign_key_path': 'users.bank_address_id',
                  'label': 'Bank Address'
                },
                'id': '864',
                'optional': false,
                'slug': 'bank-address-formatted-address',
                'sourceTableField': 'formatted_address',
                'type': 'address',
                'value': null
              }
            ],
            'id': '308',
            'slug': 'eeww-bank-info'
          },
          {
            '__typename': 'Form',
            'formFields': [],
            'id': '309',
            'slug': 'eeww-work-info'
          },
          {
            '__typename': 'Form',
            'formFields': [
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'C.T.P.S. Nº',
                  'order': 4
                },
                'id': '500',
                'optional': false,
                'slug': 'social-security-number',
                'sourceTableField': 'country_specific_fields.social_security_number.BR',
                'type': 'private',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'ORGÃO EMISSOR/UF',
                  'order': 2
                },
                'id': '702',
                'optional': false,
                'slug': 'qualification-card-issuing-body',
                'sourceTableField': 'country_specific_fields.qualification_card_issuing_body',
                'type': 'text',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'DATA EMISSÃO',
                  'order': 3
                },
                'id': '703',
                'optional': false,
                'slug': 'qualification-card-issuing-date',
                'sourceTableField': 'country_specific_fields.qualification_card_issuing_date',
                'type': 'date',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'CTPS SÉRIE',
                  'order': 5
                },
                'id': '704',
                'optional': false,
                'slug': 'ctps-series',
                'sourceTableField': 'country_specific_fields.ctps_series',
                'type': 'text',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'UF',
                  'order': 6
                },
                'id': '705',
                'optional': false,
                'slug': 'social-issuing-body',
                'sourceTableField': 'country_specific_fields.social_issuing_body',
                'type': 'text',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'R.G. Nº',
                  'order': 7
                },
                'id': '706',
                'optional': false,
                'slug': 'registro-geral-number',
                'sourceTableField': 'country_specific_fields.registro_geral_number',
                'type': 'text',
                'value': 'registro numero uno'
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'DATA DE EMISSÃO',
                  'order': 8
                },
                'id': '707',
                'optional': false,
                'slug': 'rgn-issuing-date',
                'sourceTableField': 'country_specific_fields.rgn_issuing_date',
                'type': 'date',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'ORGÃO EMISSOR /UF',
                  'order': 9
                },
                'id': '708',
                'optional': false,
                'slug': 'rgn-issuing-body',
                'sourceTableField': 'country_specific_fields.rgn_issuing_body',
                'type': 'text',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'PIS Nº',
                  'order': 10
                },
                'id': '709',
                'optional': false,
                'slug': 'social-integration-number',
                'sourceTableField': 'country_specific_fields.social_integration_number',
                'type': 'text',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'EMISSÃO',
                  'order': 11
                },
                'id': '710',
                'optional': false,
                'slug': 'emission',
                'sourceTableField': 'country_specific_fields.emission',
                'type': 'text',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'C.P.F. Nº',
                  'order': 12
                },
                'id': '711',
                'optional': false,
                'slug': 'natural-persons-register',
                'sourceTableField': 'country_specific_fields.national_persons_register',
                'type': 'private',
                'value': null
              }
            ],
            'id': '310',
            'slug': 'eeww-identification-info'
          },
          {
            '__typename': 'Form',
            'formFields': [
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'CNH Nº',
                  'order': 1
                },
                'id': '701',
                'optional': false,
                'slug': 'national-qualification-card',
                'sourceTableField': 'country_specific_fields.national_qualification_card',
                'type': 'text',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'CERT. MILITAR',
                  'order': 1
                },
                'id': '712',
                'optional': true,
                'slug': 'millitary-certificate',
                'sourceTableField': 'country_specific_fields.millitary_certificate',
                'type': 'text',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'TITULO DE ELEITOR',
                  'order': 2
                },
                'id': '713',
                'optional': false,
                'slug': 'voter-title',
                'sourceTableField': 'country_specific_fields.voter_title',
                'type': 'text',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'ZONA',
                  'order': 3
                },
                'id': '714',
                'optional': false,
                'slug': 'zone',
                'sourceTableField': 'country_specific_fields.zone',
                'type': 'text',
                'value': null
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'SEÇÃO',
                  'order': 4
                },
                'id': '715',
                'optional': false,
                'slug': 'section',
                'sourceTableField': 'country_specific_fields.section',
                'type': 'text',
                'value': null
              }
            ],
            'id': '311',
            'slug': 'eeww-other-info'
          }
        ]
      }
    },
  }

  return [eeProfileForms]
}

export function getProfileWorkInfoMockData() {
  const eeWorkInfoForms = {
    request: {
      query: FORMS_QUERY,
      variables: {
        formSlugs: [
          formConstants.PROFILE_WORK_INFO_FORM_SLUG
        ],
        userId: 234
      }
    },
    result: {
      data: {
        'formsBySlugForUser': [
          {
            '__typename': 'Form',
            'id': '339',
            'slug': 'eeprofile-work-info',
            'formFields': [
              {
                '__typename': 'FormField',
                'id': '3653',
                'slug': 'work-address-line-1',
                'optional': false,
                'config': {
                  'foreign_key_path': 'users.work_address_id',
                  'label': 'Work Address'
                },
                'type': 'address',
                'value': `58 Rue d'Argout`,
                'sourceTableField': 'line_1'
              },
              {
                '__typename': 'FormField',
                'id': '3654',
                'slug': 'work-address-line-2',
                'optional': true,
                'config': {
                  'foreign_key_path': 'users.work_address_id',
                  'label': 'Work Address'
                },
                'type': 'address',
                'value': null,
                'sourceTableField': 'line_2'
              },
              {
                '__typename': 'FormField',
                'id': '3655',
                'slug': 'work-address-line-3',
                'optional': true,
                'config': {
                  'foreign_key_path': 'users.work_address_id',
                  'label': 'Work Address'
                },
                'type': 'address',
                'value': null,
                'sourceTableField': 'line_3'
              },
              {
                '__typename': 'FormField',
                'id': '3656',
                'slug': 'work-address-city',
                'optional': false,
                'config': {
                  'foreign_key_path': 'users.work_address_id',
                  'label': 'Work Address'
                },
                'type': 'address',
                'value': 'Paris',
                'sourceTableField': 'city'
              },
              {
                '__typename': 'FormField',
                'id': '3657',
                'slug': 'work-address-postal-code',
                'optional': false,
                'config': {
                  'foreign_key_path': 'users.work_address_id',
                  'label': 'Work Address'
                },
                'type': 'address',
                'value': '75002',
                'sourceTableField': 'postal_code'
              },
              {
                '__typename': 'FormField',
                'id': '3658',
                'slug': 'work-address-county-district',
                'optional': true,
                'config': {
                  'foreign_key_path': 'users.work_address_id',
                  'label': 'Work Address'
                },
                'type': 'address',
                'value': 'Département de Paris',
                'sourceTableField': 'county_district'
              },
              {
                '__typename': 'FormField',
                'id': '3659',
                'slug': 'work-address-state-province',
                'optional': false,
                'config': {
                  'foreign_key_path': 'users.work_address_id',
                  'label': 'Work Address'
                },
                'type': 'address',
                'value': 'Île-de-France',
                'sourceTableField': 'state_province'
              },
              {
                '__typename': 'FormField',
                'id': '3660',
                'slug': 'work-address-state-province-iso-alpha-2-code',
                'optional': false,
                'config': {
                  'foreign_key_path': 'users.work_address_id',
                  'label': 'Work Address'
                },
                'type': 'address',
                'value': 'IDF',
                'sourceTableField': 'state_province_iso_alpha_2_code'
              },
              {
                '__typename': 'FormField',
                'id': '3661',
                'slug': 'work-address-country-id',
                'optional': false,
                'config': {
                  'foreign_key_path': 'users.work_address_id',
                  'label': 'Work Address',
                  'type_override': 'id'
                },
                'type': 'address',
                'value': '73',
                'sourceTableField': 'country_id'},
              {
                '__typename': 'FormField',
                'id': '3662',
                'slug': 'work-address-formatted-address',
                'optional': false,
                'config': {
                  'foreign_key_path': 'users.work_address_id',
                  'label': 'Work Address'
                },
                'type': 'address',
                'value': `58 Rue d'Argout, 75002 Paris, France`,
                'sourceTableField': 'formatted_address'},
              {
                '__typename': 'FormField',
                'id': '3674',
                'slug': 'job-title',
                'optional': false,
                'config': {
                  'label': 'Job title (only given by the collective agreement)',
                  'order': 1
                },
                'type': 'text',
                'value': null,
                'sourceTableField': 'country_specific_fields.job_title'
              },
              {
                '__typename': 'FormField',
                'id': '3675',
                'slug': 'qualification',
                'optional': false,
                'config': {
                  'label': 'Qualification (Job Title particular to the company)',
                  'order': 2
                },
                'type': 'text',
                'value': null,
                'sourceTableField': 'country_specific_fields.qualification'
              },
              {
                '__typename': 'FormField',
                'id': '3676',
                'slug': 'category',
                'optional': false,
                'config': {
                  'label': 'Category (Manager, Employee)',
                  'order': 3
                },
                'type': 'text',
                'value': null,
                'sourceTableField': 'country_specific_fields.category'
              }
            ]
          }
        ]
      }
    }
  }

  return [eeWorkInfoForms]
}

export function getEewwFormMockData() {

  const eewwForm = {
    request: {
      query: EEWW_FORMS_QUERY,
      variables: {
        formSlugs: [
          formConstants.BASIC_INFO_FORM_SLUG,
          formConstants.PERSONAL_INFO_FORM_SLUG,
          formConstants.CONTACT_INFO_FORM_SLUG,
          formConstants.BANK_INFO_FORM_SLUG,
          formConstants.WORK_INFO_FORM_SLUG,
          formConstants.IDENTIFICATION_INFO_FORM_SLUG,
          formConstants.OTHER_INFO_FORM_SLUG
        ]
      }
    },
    result: {
      data: {
        'formsBySlugForCurrentUser': [
          {
            '__typename': 'Form',
            'formFields': [
              {
                '__typename': 'FormField',
                'config': {},
                'id': '95',
                'optional': false,
                'slug': 'legal-first-name',
                'type': 'text',
                'value': 'Test',
                'sourceTableField': 'first_name'
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '96',
                'optional': false,
                'slug': 'legal-last-name',
                'type': 'text',
                'value': 'Lastname',
                'sourceTableField': 'last_name'
              },
              {
                '__typename': 'FormField',
                'config': {
                  'hiddden': true
                },
                'id': '97',
                'optional': false,
                'slug': 'full-name',
                'type': 'text',
                'value': null,
                'sourceTableField': 'full_name'
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '98',
                'optional': true,
                'slug': 'preferred-first-name',
                'type': 'text',
                'value': 'Chris',
                'sourceTableField': 'preferred_first_name'
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '99',
                'optional': false,
                'slug': 'nationality',
                'type': 'select',
                'value': '2',
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '100',
                'optional': false,
                'slug': 'date-of-birth',
                'type': 'date',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '101',
                'optional': false,
                'slug': 'gender',
                'type': 'select',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '102',
                'optional': false,
                'slug': 'marital-status',
                'type': 'select',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '103',
                'optional': false,
                'slug': 'primary-phone',
                'type': 'phone',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '104',
                'optional': false,
                'slug': 'business-email',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '105',
                'optional': true,
                'slug': 'personal-email',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '106',
                'optional': false,
                'slug': 'emergency-contact-name',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '107',
                'optional': false,
                'slug': 'emergency-contact-relationship',
                'type': 'select',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {},
                'id': '108',
                'optional': false,
                'slug': 'emergency-contact-phone',
                'type': 'phone',
                'value': null,
                'sourceTableField': ''
              },
              {
                config: {foreign_key_path: 'users.work_address_id', label: 'Work Address'},
                id: '426',
                optional: false,
                slug: 'work-address-line-1',
                sourceTableField: 'line_1',
                type: 'address',
                value: 'Khalifa Bin Zayed Street',
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.work_address_id', label: 'Work Address'},
                id: '427',
                optional: true,
                slug: 'work-address-line-2',
                sourceTableField: 'line_2',
                type: 'address',
                value: 'Shabhanet Ashrej',
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.work_address_id', label: 'Work Address'},
                id: '428',
                optional: true,
                slug: 'work-address-line-3',
                sourceTableField: 'line_3',
                type: 'address',
                value: null,
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.work_address_id', label: 'Work Address'},
                id: '429',
                optional: false,
                slug: 'work-address-city',
                sourceTableField: 'city',
                type: 'address',
                value: 'Al Zahiyah Abu Dhabi',
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.work_address_id', label: 'Work Address'},
                id: '430',
                optional: false,
                slug: 'work-address-postal-code',
                sourceTableField: 'postal_code',
                type: 'address',
                value: 'Al Zahiyah',
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.work_address_id', label: 'Work Address'},
                id: '431',
                optional: true,
                slug: 'work-address-county-district',
                sourceTableField: 'county_district',
                type: 'address',
                value: 'Eastern Region',
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.work_address_id', label: 'Work Address'},
                id: '432',
                optional: false,
                slug: 'work-address-state-province',
                sourceTableField: 'state_province',
                type: 'address',
                value: 'Abu Dhabi',
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.work_address_id', label: 'Work Address'},
                id: '433',
                optional: false,
                slug: 'work-address-state-province-iso-alpha-2-code',
                sourceTableField: 'state_province_iso_alpha_2_code',
                type: 'address',
                value: null,
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.work_address_id', label: 'Work Address', type_override: 'id'},
                id: '434',
                optional: false,
                slug: 'work-address-country-id',
                sourceTableField: 'country_id',
                type: 'address',
                value: '18',
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.work_address_id', label: 'Work Address'},
                id: '435',
                optional: false,
                slug: 'work-address-formatted-address',
                sourceTableField: 'formatted_address',
                type: 'address',
                value: 'Khalifa Bin Zayed St - Al Zahiyah - Abu Dhabi - United Arab Emirates',
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.personal_address_id', label: 'Personal Address'},
                id: '436',
                optional: false,
                slug: 'personal-address-line-1',
                sourceTableField: 'line_1',
                type: 'address',
                value: '1800 Orleans Street',
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.personal_address_id', label: 'Personal Address'},
                id: '437',
                optional: true,
                slug: 'personal-address-line-2',
                sourceTableField: 'line_2',
                type: 'address',
                value: 'Dunbar Broadway',
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.personal_address_id', label: 'Personal Address'},
                id: '438',
                optional: true,
                slug: 'personal-address-line-3',
                sourceTableField: 'line_3',
                type: 'address',
                value: null,
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.personal_address_id', label: 'Personal Address'},
                id: '439',
                optional: false,
                slug: 'personal-address-city',
                sourceTableField: 'city',
                type: 'address',
                value: 'Baltimore',
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.personal_address_id', label: 'Personal Address'},
                id: '440',
                optional: false,
                slug: 'personal-address-postal-code',
                sourceTableField: 'postal_code',
                type: 'address',
                value: '21287',
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.personal_address_id', label: 'Personal Address'},
                id: '441',
                optional: true,
                slug: 'personal-address-county-district',
                sourceTableField: 'county_district',
                type: 'address',
                value: 'Cuyahoga County',
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.personal_address_id', label: 'Personal Address'},
                id: '442',
                optional: false,
                slug: 'personal-address-state-province',
                sourceTableField: 'state_province',
                type: 'address',
                value: 'Maryland',
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.personal_address_id', label: 'Personal Address'},
                id: '443',
                optional: false,
                slug: 'personal-address-state-province-iso-alpha-2-code',
                sourceTableField: 'state_province_iso_alpha_2_code',
                type: 'address',
                value: null,
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.personal_address_id', label: 'Personal Address', type_override: 'id'},
                id: '444',
                optional: false,
                slug: 'personal-address-country-id',
                sourceTableField: 'country_id',
                type: 'address',
                value: '1',
                __typename: 'FormField',
              },
              {
                config: {foreign_key_path: 'users.personal_address_id', label: 'Personal Address'},
                id: '445',
                optional: false,
                slug: 'personal-address-formatted-address',
                sourceTableField: 'formatted_address',
                type: 'address',
                value: '1800 Orleans St, Baltimore, MD 21287, USA',
                __typename: 'FormField',
              }
            ],
            'id': '4',
            'slug': 'eeww-basic-info'
          },
          {
            '__typename': 'Form',
            'formFields': [
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Degree Code',
                  'order': 3
                },
                'id': '176',
                'optional': false,
                'slug': 'degree-code',
                'type': 'number',
                'value': '98asdf890das',
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Ethnicity',
                  'order': 4
                },
                'id': '177',
                'optional': false,
                'slug': 'ethnicity',
                'type': 'text',
                'value': 'Hispanic',
                'sourceTableField': ''
              },
            ],
            'id': '25',
            'slug': 'eeww-personal-info'
          },
          {
            '__typename': 'Form',
            'formFields': [],
            'id': '26',
            'slug': 'eeww-contact-info'
          },
          {
            '__typename': 'Form',
            'formFields': [
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Bank Account Holder Name'
                },
                'id': '109',
                'optional': false,
                'slug': 'bank-account-holder-name',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Bank Name'
                },
                'id': '110',
                'optional': false,
                'slug': 'bank-name',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Bank Account Number'
                },
                'id': '111',
                'optional': true,
                'slug': 'bank-account-number',
                'type': 'number',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Account Type'
                },
                'id': '112',
                'optional': true,
                'slug': 'bank-account-type',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Sort Code',
                  'order': 1
                },
                'id': '241',
                'optional': false,
                'slug': 'sort-code',
                'type': 'number',
                'value': null,
                'sourceTableField': ''
              }
            ],
            'id': '27',
            'slug': 'eeww-bank-info'
          },
          {
            '__typename': 'Form',
            'formFields': [
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Country of Employment',
                  'options': []
                },
                'id': '318',
                'optional': true,
                'slug': 'country-of-employment',
                'type': 'select',
                'value': null,
                'sourceTableField': ''
              }
            ],
            'id': '28',
            'slug': 'eeww-work-info'
          },
          {
            '__typename': 'Form',
            'formFields': [
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'ORGÃO EMISSOR/UF',
                  'order': 2
                },
                'id': '185',
                'optional': false,
                'slug': 'qualification-card-issuing-body',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'DATA EMISSÃO',
                  'order': 3
                },
                'id': '186',
                'optional': false,
                'slug': 'qualification-card-issuing-date',
                'type': 'date',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'CTPS SÉRIE',
                  'order': 5
                },
                'id': '187',
                'optional': false,
                'slug': 'ctps-series',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'UF',
                  'order': 6
                },
                'id': '188',
                'optional': false,
                'slug': 'social-issuing-body',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'R.G. Nº',
                  'order': 7
                },
                'id': '189',
                'optional': false,
                'slug': 'registro-geral-number',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'DATA DE EMISSÃO',
                  'order': 8
                },
                'id': '190',
                'optional': false,
                'slug': 'rgn-issuing-date',
                'type': 'date',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'ORGÃO EMISSOR /UF',
                  'order': 9
                },
                'id': '191',
                'optional': false,
                'slug': 'rgn-issuing-body',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'PIS Nº',
                  'order': 10
                },
                'id': '192',
                'optional': false,
                'slug': 'social-integration-number',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'EMISSÃO',
                  'order': 11
                },
                'id': '193',
                'optional': false,
                'slug': 'emission',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'C.P.F. Nº',
                  'order': 12
                },
                'id': '194',
                'optional': false,
                'slug': 'natural-persons-register',
                'type': 'private',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'National Insurance Number',
                  'order': 1
                },
                'id': '242',
                'optional': false,
                'slug': 'national-insurance-number',
                'type': 'number',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Work Permit Number (if applicable)',
                  'order': 6
                },
                'id': '243',
                'optional': true,
                'slug': 'work-permit-number',
                'type': 'number',
                'value': null,
                'sourceTableField': ''
              }
            ],
            'id': '29',
            'slug': 'eeww-identification-info'
          },
          {
            '__typename': 'Form',
            'formFields': [
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'CNH Nº',
                  'order': 1
                },
                'id': '184',
                'optional': false,
                'slug': 'national-qualification-card',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'CERT. MILITAR',
                  'order': 1
                },
                'id': '195',
                'optional': true,
                'slug': 'millitary-certificate',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'TITULO DE ELEITOR',
                  'order': 2
                },
                'id': '196',
                'optional': false,
                'slug': 'voter-title',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'ZONA',
                  'order': 3
                },
                'id': '197',
                'optional': false,
                'slug': 'zone',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'SEÇÃO',
                  'order': 4
                },
                'id': '198',
                'optional': false,
                'slug': 'section',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              },
              {
                '__typename': 'FormField',
                'config': {
                  'label': 'Student Loan Repayment Plan',
                  'order': 1
                },
                'id': '244',
                'optional': true,
                'slug': 'student-loan-repayment',
                'type': 'text',
                'value': null,
                'sourceTableField': ''
              }
            ],
            'id': '30',
            'slug': 'eeww-other-info'
          }
        ]
      },
    },
  }

  const currentUser = {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: {
        currentUser: {
          firstName: 'Firstname',
          preferredFirstName: 'PreferredName'
        }
      },
    },
  }

  const currentUserDocuments = {
    request: {
      query: GET_CURRENT_USER_DOCUMENTS_QUERY,
    },
    result: {
      data: {
        currentUserDocuments: [
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
            documentTemplate: {
              id: '1'
            },
            __typename: 'Document',
            documentTemplate: {
              id: 1
            }
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
            documentTemplate: {
              id: '2'
            },
            __typename: 'Document',
            documentTemplate: {
              id: 1
            }
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
            documentTemplate: {
              id: '3'
            },
            __typename: 'Document',
            documentTemplate: {
              id: 1
            }
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
            documentTemplate: {
              id: '1'
            },
            __typename: 'Document',
            documentTemplate: {
              id: 1
            }
          }
        ]
      }
    }
  }

  return [eewwForm, currentUser, currentUserDocuments]
}
