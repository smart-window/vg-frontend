const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyBfQFcKqHOlP8oVKDaA5lDe1CQaS8hMvMQ'
const AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'test-vg-8864b.firebaseapp.com'
const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID || 'test-vg-8864b'
const STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'test-vg-8864b.appspot.com'
const MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '397013026245'
const APP_ID = process.env.REACT_APP_FIREBASE_APP_ID || '1:397013026245:web:c06a12a82fe94caad977ac'
const MEASUREMENT_ID = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || 'G-95JM8RZRHL'

export default {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
}
