import localeHelper from './localeHelper'

describe('getSeparator', () => {
  it('gets the correct decimal and group format back for US', () => {
    const decimalSeparator = localeHelper.getSeparator('decimal', 'en-US')
    const groupSeparator = localeHelper.getSeparator('group', 'en-US')
    expect(decimalSeparator).toEqual('.')
    expect(groupSeparator).toEqual(',')
  })

  it('gets the correct decimal and group format back for EU', () => {
    const decimalSeparator = localeHelper.getSeparator('decimal', 'fr-FR')
    const groupSeparator = localeHelper.getSeparator('group', 'fr-FR')
    expect(decimalSeparator).toEqual(',')
    expect.stringMatching(groupSeparator, ' ')
  })
})

describe('getCSVLineDelimiter', () => {
  it('gets the correct csv delimiter for US', () => {
    const csvDelim = localeHelper.getCSVLineDelimiter('en-US')
    expect(csvDelim).toEqual(',')
  })

  it('gets the correct csv delimiter for US', () => {
    const csvDelim = localeHelper.getCSVLineDelimiter('fr-FR')
    expect(csvDelim).toEqual(';')
  })
})
