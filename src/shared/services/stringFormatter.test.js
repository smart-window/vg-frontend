import stringFormatter from './stringFormatter'

describe('capitalizeEveryWord', () => {
  it('should capitalize the starting letter of every work', () => {
    const string = 'capitalize this'

    expect(stringFormatter.capitalizeEveryWord(string)).toEqual('Capitalize This')
  })
})

describe('addZeroesToDecimal', () => {
  it('should add zeros to a string if need', () => {
    const string = '1'
    const expectedString = '1.00'

    expect(stringFormatter.addZeroesToDecimal(string)).toEqual(expectedString)
  })

  it('should add zeros to a string if need', () => {
    const string = '1.1'
    const expectedString = '1.10'

    expect(stringFormatter.addZeroesToDecimal(string)).toEqual(expectedString)
  })

  it('should not add zeros to a string it does not need to', () => {
    const string = '1.25'
    const expectedString = '1.25'

    expect(stringFormatter.addZeroesToDecimal(string)).toEqual(expectedString)
  })
})

describe('removeSpaces', () => {
  it('should return a string with no spaces', () => {
    const string = 'format this'

    expect(stringFormatter.removeSpaces(string)).toEqual('formatthis')
  })
})