import filesHelper from './filesHelper.js'

global.URL.createObjectURL = jest.fn()

describe('downloadBlob', () => {
  it('should create an object url and download that object via mouse event', () => {
    const mockFile = new File([''], 'filename.txt', {type: 'text/plain', lastModified: new Date()})
    const mockRef = { current: { dispatchEvent: jest.fn() }}

    filesHelper.downloadBlob(mockFile, mockFile.name, mockRef)

    expect(mockRef.current.dispatchEvent).toHaveBeenCalled()
  })
})

describe('downloadFile', () => {
  it('should create an object url and download that object via mouse event', () => {
    const mockFileUrl = 'path/to/filename.txt'
    const mockRef = { current: { dispatchEvent: jest.fn() }}

    filesHelper.downloadFile(mockFileUrl, mockRef)

    expect(mockRef.current.dispatchEvent).toHaveBeenCalled()
  })
})

describe('validateFilesForUpload', () => {
  it('returns an error if user tries to upload too many files', () => {
    const requiredTypes = ['.png', '.jpg']
    const allowedNumberOfFiles = 1
    const mockFiles = [
      {name: '123.png', size: 20000000},
      {name: '345.png', size: 500},
    ]

    const errorObject = filesHelper.validateFilesForUpload(mockFiles, allowedNumberOfFiles, requiredTypes)
    expect(errorObject.errorTitle).toEqual('Multiple Files Detected')
  })

  it('returns an error if user tries to a file of the wrong type', () => {
    const requiredTypes = ['.png', '.jpg']
    const allowedNumberOfFiles = 1
    const mockFiles = [
      {name: '123.txt', size: 20000000},
    ]

    const errorObject = filesHelper.validateFilesForUpload(mockFiles, allowedNumberOfFiles, requiredTypes)
    expect(errorObject.errorTitle).toEqual('File Type not Accepted')
  })

  it('returns an error if user tries to a file that is too large', () => {
    const requiredTypes = ['.png', '.jpg']
    const allowedNumberOfFiles = 1
    const mockFiles = [
      {name: '123.txt', size: 20000001},
    ]

    const errorObject = filesHelper.validateFilesForUpload(mockFiles, allowedNumberOfFiles, requiredTypes)
    expect(errorObject.errorTitle).toEqual('File Size Is Too Large')
  })

  it('returns an array of acceptable files', () => {
    const requiredTypes = ['.png', '.jpg']
    const allowedNumberOfFiles = 1
    const mockFiles = [
      {name: '123.png', size: 2000000},
    ]

    const errorObject = filesHelper.validateFilesForUpload(mockFiles, allowedNumberOfFiles, requiredTypes)
    expect(errorObject).not.toBeDefined()
  })
})

describe('buildFileTypeRegex', () => {
  it('should create regex with specific file types', () => {
    const requiredTypes = ['.png', '.jpg']

    const regex = filesHelper.buildFileTypeRegex(requiredTypes)

    expect(regex).toEqual(/(\.png|\.jpg)$/i)
  })
})

describe('convertBytesToMB', () => {
  it('should return number of megabytes from bytes', () => {
    expect(filesHelper.convertBytesToMB(20000000)).toEqual(20)
  })
})

describe('getFileNameWithoutExtension', () => {
  it('should return a file name without an extension', () => {
    expect(filesHelper.getFileNameWithoutExtension('file-name_thats^extra.complicated.png')).toEqual('file-name_thats^extra.complicated')
  })
})