
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from '../public/locales/en/translation.json'
import translationES from '../public/locales/es/translation.json'

const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
}

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'en',
    fallbackLng: 'en',
    supportedLanguages: ['en', 'es'],
    resources,
    react: {
      useSuspense: false,
    }
  })