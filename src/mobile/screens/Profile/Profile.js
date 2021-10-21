import React from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types'

import UserDetails from 'mobile/components/UserDetails/UserDetails'
import BackdropWrapper from 'mobile/components/BackdropWrapper/BackdropWrapper'

Profile.propTypes = {
  /** The history object to facilitate page redirects. */
  navigation: PropTypes.object
}

/**
 * The Profile page component that displays information about the current user.
 * @category Components - Mobile
 * @namespace Profile
 * @property {object} navigation
 */
export default function Profile({navigation}) {
  return (
    <View testID='Profile'>
      <BackdropWrapper testID='Profile'>
        <UserDetails />
      </BackdropWrapper>
    </View>
  )
}