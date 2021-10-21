import dateHelper from './dateHelper'

describe('addDaysToDate', () => {
  it('returns a date with a certain number of days added to it', () => {
    const date = new Date(2020, 10, 5)
    const futureDate = new Date(2020, 10, 10)
    expect(dateHelper.addDaysToDate(date, 5)).toEqual(futureDate)
  })
})

describe('subtractDaysFromDate', () => {
  it('returns a date with a certain number of days subtracted from it', () => {
    const date = new Date(2020, 10, 10)
    const previousDate = new Date(2020, 10, 5)
    expect(dateHelper.substractDaysFromDate(date, 5)).toEqual(previousDate)
  })
})

describe('getDateStringForTimezone', () => {
  const timeZoneDbName = 'America/New_York'

  it('returns the correct daylight time', () => {
    const date = new Date('2020-10-08T09:45:50.135Z')
    const formattedDate = dateHelper.getDateStringForTimezone(date, timeZoneDbName)
    expect(formattedDate).toEqual('8 Oct 2020 at 05:45 EDT')
  })

  it('returns the correct standard time', () => {
    const date = new Date('2020-11-08T09:45:50.135Z')
    const formattedDate = dateHelper.getDateStringForTimezone(date, timeZoneDbName)
    expect(formattedDate).toEqual('8 Nov 2020 at 04:45 EST')
  })

})

describe('getDateStringForMT', () => {
  it('returns the correct daylight time', () => {
    const date = new Date('2020-10-08T09:45:50.135Z')
    const formattedDate = dateHelper.getDateStringForMT(date)
    expect(formattedDate).toEqual('8 Oct 2020 at 03:45 MDT')
  })

  it('returns the correct standard time', () => {
    const date = new Date('2020-11-08T09:45:50.135Z')
    const formattedDate = dateHelper.getDateStringForMT(date)
    expect(formattedDate).toEqual('8 Nov 2020 at 02:45 MST')
  })

  it('returns the correct standard date without time', () => {
    const date = new Date('2020-11-08T09:45:50.135Z')
    const formattedDate = dateHelper.getDateStringForMT(date, true)
    expect(formattedDate).toEqual('8 Nov 2020')
  })
})

describe('getTextStringFromNumericDateString', () => {
  it('converts between string formats', () => {
    const numericDateString = '2020-12-09'
    const convertedTextString = dateHelper.getTextStringFromNumericDateString(numericDateString)
    expect(convertedTextString).toEqual('9 December 2020')
  })
})

describe('getTimeIntervalStringFromNow', () => {

  it('gets a correct "s ago" interval string', () => {
    const startDate = new Date('2020-09-30T10:45:50.135Z')
    const endDate = new Date('2020-09-30T10:45:58.135Z')
    const differenceString = dateHelper.getTimeIntervalString(startDate, endDate)
    expect(differenceString).toEqual('8s ago')
  })

  it('gets a correct "m ago" interval string', () => {
    const startDate = new Date('2020-09-30T10:41:58.135Z')
    const endDate = new Date('2020-09-30T10:45:58.135Z')
    const differenceString = dateHelper.getTimeIntervalString(startDate, endDate)
    expect(differenceString).toEqual('4m ago')
  })

  it('gets a correct "h ago" interval string', () => {
    const startDate = new Date('2020-09-30T05:45:58.135Z')
    const endDate = new Date('2020-09-30T10:45:58.135Z')
    const differenceString = dateHelper.getTimeIntervalString(startDate, endDate)
    expect(differenceString).toEqual('5h ago')
  })

  it('gets a correct "d ago" interval string', () => {
    const startDate = new Date('2020-09-21T10:45:58.135Z')
    const endDate = new Date('2020-09-30T10:45:58.135Z')
    const differenceString = dateHelper.getTimeIntervalString(startDate, endDate)
    expect(differenceString).toEqual('9d ago')
  })
})

describe('getTimeIntervalStringFromNow', () => {

  it('gets the correct interval string from now', () => {
    const historicDate = new Date('2020-09-30T10:45:58.135Z')
    const mockDateNow = new Date('2020-09-30T11:01:58.135Z')
    const spy = jest
      .spyOn(global, 'Date')
      .mockImplementationOnce(() => mockDateNow)
    const differenceString = dateHelper.getTimeIntervalStringFromNow(historicDate)
    expect(differenceString).toEqual('16m ago')
    spy.mockRestore()
  })
})

describe('formatBirthdate', () => {
  it('should format a birthdate like YYYY-DD-MM to a date like MM/DD/YYYY', () => {

    const date = '2011-10-03'
    const formattedDate = '03/10/2011'

    const returnedDate = dateHelper.formatBirthdate(date)

    expect(returnedDate).toEqual(formattedDate)
  })
})

describe('addSecondsToCurrentDate', () => {
  it('should add time to a date passed in', () => {
    let seconds = 0
    const secondsToAdd = 3600
    const date = new Date(2011, 10, 3, 0, 0, seconds)
    seconds+=secondsToAdd
    const futureDate = new Date(2011, 10, 3, 0, 0, seconds).getTime()

    const spy = jest
      .spyOn(global, 'Date')
      .mockImplementationOnce(() => date)

    const returnedDate = dateHelper.addSecondsToCurrentDate(secondsToAdd)

    expect(returnedDate).toEqual(futureDate)
    spy.mockRestore()
  })
})

describe('getWeekDays', () => {
  it('should get the full week of the date passed in', () => {
    const selectedDate = new Date(2011, 10, 3)
    const week = [
      '2011-10-30',
      '2011-10-31',
      '2011-11-01',
      '2011-11-02',
      '2011-11-03',
      '2011-11-04',
      '2011-11-05',
    ]

    expect(dateHelper.getWeekDays(selectedDate)).toEqual(week)
  })
})

describe('getMultipleDays', () => {
  it('should get all dates within and including the start and end date', () => {
    const startDate = new Date(2011, 10, 1)
    const endDate = new Date(2011, 10, 5)
    const week = [
      '2011-11-01',
      '2011-11-02',
      '2011-11-03',
      '2011-11-04',
      '2011-11-05',
    ]

    expect(dateHelper.getMultipleDays(startDate, endDate)).toEqual(week)
  })
})

describe('getMonthAndYear', () => {
  it('should return the month and year of the date passed in', () => {
    const selectedDate = new Date(2011, 10, 3)

    expect(dateHelper.getMonthAndYear(selectedDate)).toEqual('November 2011')
  })
})

describe('getDateStringWithMonthName', () => {
  it('should return a date with a long month name', () => {
    const date = new Date(2011, 10, 3)

    expect(dateHelper.getDateStringWithMonthName(date)).toEqual('November 03, 2011')
  })

  it('should return a date with a long month name', () => {
    const date = new Date(2011, 10, 3)

    expect(dateHelper.getDateStringWithMonthName(date, 'short')).toEqual('Nov 03, 2011')
  })
})

describe('getMonthStartDay', () => {
  it('should get the start day of the month based on a date', () => {
    const date = new Date(2011, 10, 3)

    expect(dateHelper.getMonthStartDay(date)).toEqual('2011-11-01')
  })

  it('should be able to get the start of a month based on current date if no date passed in', () => {
    const date = new Date(2011, 11, 3)
    const spy = jest
      .spyOn(global, 'Date')
      .mockImplementationOnce(() => {
        spy.mockRestore()
        return date
      })

    expect(dateHelper.getMonthStartDay(date)).toEqual('2011-12-01')
  })
})

describe('getMonthEndDay', () => {
  it('should get the last day of the month based on a date', () => {
    const date = new Date(2011, 10, 3)

    expect(dateHelper.getMonthEndDay(date)).toEqual('2011-11-30')
  })

  it('should be able to get the last day of a month based on current date if no date passed in', () => {
    const date = new Date(2011, 11, 3)
    const spy = jest
      .spyOn(global, 'Date')
      .mockImplementationOnce(() => {
        spy.mockRestore()
        return date
      })

    expect(dateHelper.getMonthEndDay(date)).toEqual('2011-12-31')
  })
})

describe('getCurrentDateFromLastYear', () => {
  it('should get the current date from last year', () => {
    const date = new Date(2011, 11, 3)
    const dateYearAgo = new Date(2010, 11, 3).getTime()
    const spy = jest
      .spyOn(global, 'Date')
      .mockImplementationOnce(() => {
        spy.mockRestore()
        return date
      })

    expect(dateHelper.getCurrentDateFromLastYear(date)).toEqual(dateYearAgo)
  })
})

describe('getISOStringDate', () => {
  it('should return the date string regardless of timezone', () => {
    const date = new Date(2011, 11, 3)

    expect(dateHelper.getISOStringDate(date)).toEqual('2011-12-03')
  })
})

describe('getStringDate', () => {
  it('should return the date string aware of timezone', () => {
    const date = new Date(2011, 11, 3)

    expect(dateHelper.getStringDate(date)).toEqual('2011-12-03')
  })
})

describe('convertAPIDateToDate', () => {
  it('should convert a YYYY-MM-DD to a new Date object', () => {
    const date = new Date(2011, 11, 3)

    expect(dateHelper.convertAPIDateToDate('2011-12-3')).toEqual(date)
  })
})

describe('dateStringIsAPIFormat', () => {
  it('returns true if date is in the format YYYY-MM-DD', () => {
    expect(dateHelper.dateStringIsAPIFormat('2021-01-23')).toEqual(true)
  })
  it('returns false if date is not in the format YYYY-MM-DD', () => {
    expect(dateHelper.dateStringIsAPIFormat('01-23-2021')).toEqual(false)
  })
})