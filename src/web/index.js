import { setConfig } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import { GlobalLoaderProvider } from 'shared/providers/GlobalLoaderProvider'
import GlobalStyles from 'web/styles/GlobalStyles.component'
import App from './components/App/App'
import logService from 'web/services/logService'

import 'web/styles/normalize.css'
import 'web/styles/reset.css'

window.onerror = logService.handleError

setConfig({
  // disable react-hot-loader overlay in favor of the one from react-dev-utils (webpack.dev)
  ErrorOverlay: () => null
})

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles/>
    <GlobalLoaderProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalLoaderProvider>
  </React.StrictMode>,
  document.getElementById('root')
)