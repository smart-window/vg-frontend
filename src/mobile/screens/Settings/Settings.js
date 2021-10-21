import React, {useState, useContext, useMemo} from 'react'
import { View } from 'react-native'
import {CurrentUserContext} from 'mobile/providers/CurrentUserProvider.mobile'
import analyticsService from 'mobile/services/analyticsServiceMobile'
import {useTranslation} from 'react-i18next'
import { useMutation, gql } from '@apollo/client'
import useDebounce from 'shared/hooks/useDebounce'

import Card from 'mobile/components/Card/Card'
import CardHeader from 'mobile/components/CardHeader/CardHeader'
import BackdropWrapper from 'mobile/components/BackdropWrapper/BackdropWrapper'
import RadioButton from 'mobile/components/RadioButton/RadioButton'
import ListPopup from 'mobile/modules/ListPopup/ListPopup'
import GearCircle from 'mobile/icons/StaticIcons/GearCircle'
import ChevronArrow from 'mobile/icons/DynamicIcons/ChevronArrow'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  ViewSettingsCard,
  TextSettings,
  TouchableOpacitySignOutCard,
  TextSignOut,
  TextCurrentLanguage,
  TextSignoutError,
} from './Settings.styles'

export const EDIT_USER_LANGUAGE_MUTATION = gql`
  mutation ChangeUserLanguage($language: String!) {
    changeUserLanguage(language: $language) {
      id
      firstName
      lastName
      birthDate
      settings {
        language
      }
    }
  }
`

/**
 * The Settings page component that allows users to sign out or configure their app's settings.
 * @category Components - Mobile
 * @namespace Settings
 */
export default function Settings() {
  const [logoutError, setLogoutError] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const currentUserContext = useContext(CurrentUserContext)
  const [editUserLanguage] = useMutation(EDIT_USER_LANGUAGE_MUTATION)
  const { t, i18n } = useTranslation()
  // TODO: Revisit the need for this map when i18n backend work is done
  const languageMap = {
    en: 'English',
    es: 'Español'
  }

  const [listItems, setListItems] = useState(
    useMemo(
      () => formatLanguagesForPopup(),
      [i18n.options.supportedLanguages, formatLanguagesForPopup]
    )
  )

  /**
   * Upon language select, set local state to reflect selected choice.
   * @param {object} selectedLanguage - The selected language item object
  */
  function handleItemSelect(selectedLanguage) {
    const listItemsCopy = [...listItems]
    listItemsCopy.forEach(item => {
      if (item.checked) item.checked = false
      if (item.id === selectedLanguage.id) item.checked = true
    })
    setListItems(listItemsCopy)
    debouncedLanguageChange(selectedLanguage)
  }
  const debouncedLanguageChange = useDebounce(changeLanguage, 300)

  // Build list for displaying language options
  const list = listItems.map((item, index) => {
    return (
      <RadioButton
        key={index}
        item={item}
        isFirst={index === 0}
        onOptionSelect={handleItemSelect}
      />
    )
  })
  /**
  * Clear's user's Okta AuthState and information from Storage. Logs user out.
  */
  async function signOutAsync() {
    try {
      await currentUserContext.signOutAsync()
      analyticsService.logEvent('Settings', 'Clicked', 'Session_SignOut')
    }
    catch (error) {
      setLogoutError(error.message)
    }
  }

  /**
   * Change i18n language
   * @param {object} selectedLanguage - language object containing selected language
  */
  function changeLanguage(selectedLanguage) {
    editUserLanguage({
      variables: {
        language: selectedLanguage.value
      },
    })
    currentUserContext.cacheUserLanguage(selectedLanguage.value)
    i18n.changeLanguage(selectedLanguage.value)
    setShowPopup(false)
    analyticsService.logEvent('Settings', 'Clicked', `Language_${selectedLanguage.name}`)
  }

  /** Format supported languages to an object accepted by the ListPopup */
  function formatLanguagesForPopup() {
    /** TODO: Make this a backend call in the future, change value to full language terminology */
    return i18n.options.supportedLanguages.map((language, index) => {
      return {
        name: languageMap[language],
        value: language,
        checked: language === i18n.language,
        id: index
      }
    })
  }

  return (
    <View testID='Settings'>
      <BackdropWrapper title={t('Settings')}>
        <Card hasBorderTop={true} fillSpace={true}>
          <ViewSettingsCard>
            <CardHeader
              icon={<GearCircle />}
              title={t('Language Settings')}
            />
            <TouchableOpacity
              accessibilityLabel={'Change language'}
              onPress={() => {
                setShowPopup(true)
                analyticsService.logEvent('Settings', 'Clicked', 'Language_Menu')
              }}
            >
              <TextSettings>{t('Language')}</TextSettings>
              <TextCurrentLanguage
                isSelected={i18n.language === 'en'}
              >
                {'English'}
              </TextCurrentLanguage>
              <TextCurrentLanguage
                isSelected={i18n.language === 'es'}
              >
                {'Español'}
              </TextCurrentLanguage>
            </TouchableOpacity>
          </ViewSettingsCard>
        </Card>
        <Card hasBorderBottom={true} hasMarginTop={true}>
          <TouchableOpacitySignOutCard
            onPress={() => signOutAsync()}
          >
            <TextSignOut>{t('Sign Out')}</TextSignOut>
            <ChevronArrow />
          </TouchableOpacitySignOutCard>
          {
            logoutError &&
            <TextSignoutError>{t('Log out error')}</TextSignoutError>
          }
        </Card>
      </BackdropWrapper>
      {
        showPopup &&
        <ListPopup>
          {list}
        </ListPopup>
      }
    </View>
  )
}