import inputValidationHelper from './inputValidationHelper'

describe('regexValidNumberWithMaxTwoDecimals', () => {
  it('the regex should test true if the number is a positive number with two or fewer decimal points', () => {
    const string = '1.25'

    expect(inputValidationHelper.regexValidNumberWithMaxTwoDecimals().test(string)).toEqual(true)
  })

  it('the regex should test false if the number is a negative number', () => {
    const string = '-1.25'

    expect(inputValidationHelper.regexValidNumberWithMaxTwoDecimals().test(string)).toEqual(false)
  })

  it('the regex should test false if the number is has more than two decimals', () => {
    const string = '-1.255'

    expect(inputValidationHelper.regexValidNumberWithMaxTwoDecimals().test(string)).toEqual(false)
  })

  it('the regex should test false if the number contains a non number', () => {
    const string = '1.2a'

    expect(inputValidationHelper.regexValidNumberWithMaxTwoDecimals().test(string)).toEqual(false)
  })
})