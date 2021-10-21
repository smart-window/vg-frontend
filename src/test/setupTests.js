/*
 * WEB CONFIG
 */
import 'jest-styled-components'

/*
 * MOBILE CONFIG
 */
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'

// Mock for async storage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

// Mock for App Auth
jest.mock('expo-auth-session')

// Mock for Web Browser
jest.mock('expo-web-browser')

// MOck for react-18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: string => string,
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
      options: {
        supportedLanguages: ['en', 'es']
      }
    }
  }),
}))