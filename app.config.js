export default {
  entryPoint: './src/mobile/MobileAppContainer.js',
  name: 'Velocity Global',
  slug: 'velocityGlobalMobile',
  owner: 'velocityglobal',
  version: '1.0.2',
  orientation: 'portrait',
  icon: 'src/assets/images/velocityGlobalCircle.png',
  splash: {
    'image': 'src/assets/images/whiterect.png',
    'resizeMode': 'contain',
    'backgroundColor': '#ffffff'
  },
  updates: {
    'fallbackToCacheTimeout': 0
  },
  assetBundlePatterns: [
    'src/assets/**/*'
  ],
  ios: {
    'supportsTablet': false,
    'bundleIdentifier': 'com.velocityglobal.customermanagement',
    'buildNumber': '0.1.5',
    'googleServicesFile': './GoogleService-Info.plist'
  },
  android: {
    'package': 'com.velocityglobal.customermanagement',
    'versionCode': 7,
    'softwareKeyboardLayoutMode': 'pan',
    'permissions': [],
    'googleServicesFile': './google-services.json'
  },
  web: {
    'favicon': 'src/assets/velocityGlobalCircle.png',
    'config': {
      'firebase': {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyBfQFcKqHOlP8oVKDaA5lDe1CQaS8hMvMQ',
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'test-vg-8864b.firebaseapp.com',
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'test-vg-8864b',
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'test-vg-8864b.appspot.com',
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '397013026245',
        appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:397013026245:web:c06a12a82fe94caad977ac',
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || 'G-95JM8RZRHL'
      }
    }
  },
  scheme: process.env.REACT_APP_OKTA_SCHEME || 'com.okta.dev-283105'
}