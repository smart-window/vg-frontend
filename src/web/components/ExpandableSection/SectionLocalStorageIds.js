export const eeProfilelocalStorageIds = {
  PROFILE_WORK: 'EE_PROFILE_WORK_INFO',
  PROFILE_IDENTIFICATION: 'EE_PROFILE_IDENTIFICATION_INFO',
  PROFILE_OTHER: 'EE_PROFILE_OTHER_INFO',
  PROFILE_BANK: 'EE_PROFILE_BANK_INFO',
}

const otherLocalStorageIds = {
  TIME_OFF_INFORMATION: 'TIME_OFF_INFORMATION'
}

export default {
  ...eeProfilelocalStorageIds,
  ...otherLocalStorageIds
}