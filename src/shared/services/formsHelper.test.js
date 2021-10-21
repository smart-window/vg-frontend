import formsHelper from './formsHelper'

const mockFieldData = [
  {slug: 'field1', id: 1, config: {}, optional: false, value: 'foo'},
  {slug: 'field2', id: 2, config: {}, optional: true, value: 'bar'}
]

describe('getFieldsMap', () => {
  it('converts server data to a slug -> attributes map', () => {
    const fieldsMap = formsHelper.getFieldsMap(mockFieldData)
    expect(fieldsMap.field2.value).toEqual('bar')
    expect(fieldsMap.field1.optional).toEqual(false)
  })
})

const mockAddressFields = [
  {
    config: {foreign_key_path: 'users.personal_address_id', label: 'Personal Address'},
    id: '445',
    optional: false,
    slug: 'personal-address-formatted-address',
    sourceTableField: 'formatted_address',
    type: 'address',
    value: '1900 Eglinton Ave E, Scarborough, ON M1L 4R5, Canada',
  },
  {
    config: {foreign_key_path: 'users.personal_address_id', label: 'Personal Address', type_override: 'id'},
    id: '444',
    optional: false,
    slug: 'personal-address-country-id',
    sourceTableField: 'country_id',
    type: 'address',
    value: '5',
  }
]

const collapsedField = {
  'personal-address': {
    config: {
      foreign_key_path: 'users.personal_address_id',
      label: 'Personal Address',
    },
    formFields: mockAddressFields,
    formattedAddress: '1900 Eglinton Ave E, Scarborough, ON M1L 4R5, Canada',
    optional: false,
    slug: 'personal-address',
    type: 'address',
  },
}

describe('mapAddressField', () => {
  it('converts and address field into a collapsed field on a joined map', () => {
    let fieldsMap = {}
    fieldsMap = formsHelper.mapAddressField(mockAddressFields[0], fieldsMap)
    fieldsMap = formsHelper.mapAddressField(mockAddressFields[1], fieldsMap)

    expect(fieldsMap).toEqual(collapsedField)
  })
})

const shortMockAddressFields = [
  {slug: 'work-address-line-1', id: 1, config: {}, optional: false, value: '123 Test Lane'},
  {slug: 'work-address-line-2', id: 2, config: {}, optional: false, value: 'Test Area'},
  {slug: 'work-address-line-3', id: 3, config: {}, optional: false, value: '#3'},
  {slug: 'work-address-line-city', id: 4, config: {}, optional: false, value: 'City'},
  {slug: 'work-address-line-postal-code', id: 5, config: {}, optional: false, value: '55555'},
  {slug: 'work-address-line-county-district', id: 6, config: {}, optional: false, value: 'County'},
  {slug: 'work-address-line-state-province', id: 7, config: {}, optional: false, value: 'State'}
]

describe('buildAddressString', () => {
  it('builds a full address string', () => {
    const fullAddressString = formsHelper.buildAddressString(shortMockAddressFields)
    expect(fullAddressString).toEqual('123 Test Lane Test Area #3 City 55555 State')
  })
})

const mappedApiFields = {
  'formatted-address': '123 Test Lane #3, City, 55555, State',
  'country-id': '1'
}

const formattedAddressFields = [
  {dataType: 'address', id: '445', slug: 'personal-address-formatted-address', value: ''},
  {dataType: 'id', id: '444', slug: 'personal-address-country-id', value: ''}
]

describe('getAddressApiFields', () => {
  it('creates api fields for every address field mutated in save address', () => {
    expect(formsHelper.getAddressApiFields(mockAddressFields, mappedApiFields, null)).toEqual(formattedAddressFields)
  })
})

const googleMapsAddress = {
  address_components: [
    {
      long_name: 'Test Lane',
      short_name: 'Test Ln',
      types: ['route']
    },
    {
      long_name: 'Rock Springs',
      short_name: 'Rock Springs',
      types: ['locality', 'political']
    },
    {
      long_name: 'Wyoming',
      short_name: 'WY',
      types: ['administrative_area_level_1', 'political']
    },
    {
      long_name: 'United States',
      short_name: 'US',
      types: ['country', 'political']
    }
  ],
  formatted_address: 'Test Ln, Rock Springs, WY 82901, USA'
}

const countries = [
  {
    id: '1',
    name: 'United States',
    __typename: 'Country',
  },
]

const formattedAddress = {
  city: 'Rock Springs',
  country_id: '1',
  formatted_address: 'Test Ln, Rock Springs, WY 82901, USA',
  line_1: 'Test Lane',
  state_province: 'Wyoming',
  state_province_iso_alpha_2_code: 'WY',
}

describe('getValueMapFromGoogleAddress', () => {
  it('builds a map of values returned from the Google Maps API that match returned address fields', () => {
    expect(formsHelper.getValueMapFromGoogleAddress(googleMapsAddress, countries)).toEqual(formattedAddress)
  })
})

describe('transformAddressLabelToKey', () => {
  it('creates an appropriate key for a field map based on a form field\'s label', () => {
    expect(formsHelper.transformAddressLabelToKey('Work Address')).toEqual('work-address')
  })
})
