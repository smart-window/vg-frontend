import { createGlobalStyle } from 'styled-components'

/*
  Even though this technically creates a component, it didn't feel right to put
   styles in the /components folder. This is why 'component' is in the filename.
*/
export default createGlobalStyle `
  html {
    /* define 1 REM = 15px, based on browser default of 16px */
    font-size: 93.75%;
  }
  body {
    font-size: 1rem;
    /* 15px is a fallback for older browsers */
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .js-forgot-password {
    /* Hide Okta reset password link on login */
    display: none;
  }
`