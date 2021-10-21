import React, {useContext, useEffect, useRef} from 'react'
import {useParams, useLocation, useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import {useOktaAuth} from '@okta/okta-react'

import {routes} from 'web/constants/routeConstants'
import pegaConstants from 'web/constants/pegaConstants'
import {GlobalLoaderContext} from 'shared/providers/GlobalLoaderProvider'
import {DivPegaContainer} from './PegaContainer.styles'

const PEGA_APPNAME = process.env.REACT_APP_PEGA_APPNAME || 'PEO-dev'
const PEGA_HOST = process.env.REACT_APP_PEGA_HOST || 'https://portal-dev.velocityglobal.com'
const PEGA_AUTH_PATH = process.env.REACT_APP_PEGA_AUTH_PATH || '/prweb/PRAuth/OktaDev'

PegaContainer.propTypes = {
  /** PEGA identifier for the gadget */
  harnessName: PropTypes.string,
  /** Internal PEGA class name for the gadget */
  pegaClassName: PropTypes.string,
  /** If supplied, a basic iframe will be rendered, rather than a PEGA mashup */
  urlOverride: PropTypes.string,
  /** Used for certain admin harnesses to view info about another user */
  operatorId: PropTypes.string,
  /** If true, no GlobalLoader will be invoked */
  disableLoader: PropTypes.bool
}

/**
 * Wraps pega in an iframe using the mashup approach:
 * https://community.pega.com/knowledgebase/articles/pega-web-mashup/about-pega-web-mashup
 * @category Pages
 * @namespace PegaContainer
 */
function PegaContainer({
  harnessName,
  pegaClassName,
  urlOverride,
  operatorId,
  disableLoader
}) {
  const {setIsLoading} = useContext(GlobalLoaderContext)
  /** PEGA case identifier (pzInsKey) - used to open a specific case */
  const {caseId} = useParams()
  const currentLocation = useLocation()
  const history = useHistory()
  const containerRef = useRef(null)
  useEffect(handlePegaLoadAndClose, [])
  useEffect(didUpdate, [pegaClassName, harnessName, caseId, operatorId])
  const { authState } = useOktaAuth()
  let encodedPegaParams = ''
  if (authState.isAuthenticated) {
    const pegaParams = {
      UserIdentifier: authState?.accessToken?.value,
      pzSkinName: 'VGSkin',
    }
    if (operatorId) pegaParams.OperatorID = operatorId
    encodedPegaParams = JSON.stringify(pegaParams)
  }

  /**
   * PEGA Mashup workarounds for dynamic page rendering
   */
  function didUpdate() {
    const gadget = window.pega ? window.pega.web.mgr._getGadgetByID(pegaConstants.GADGET_NAME) : null
    if (gadget) {
      // force a refresh on the iframe when the pega harness or class changes
      // uses workaround described here: https://community.pega.com/support/support-articles/unable-change-mashup-parameters-and-reload-gadget
      window.pega.web.mgr._removeGadget(gadget._id)
      window.pega.web.mgr._initGadget(containerRef.current, window)
      window.pega.web.api.doAction(pegaConstants.GADGET_NAME, 'load')
    }
    else if (window._initAllPegaObjects) {
      // PEGA magic function ✨ for first-time initialization
      window._initAllPegaObjects()
    }
  }

  /**
   * One-time effect used to display <GlobalLoader/> while pega loads.
   */
  function handlePegaLoadAndClose() {
    if (urlOverride) {
      setIsLoading(false)
    }
    else {
      // Set up onSubmit handler for pega cases/harnesses
      global.pegaOnConfirm = function pegaOnConfirm() {
        // after EE onboarding is complete, route to EE profile
        if (harnessName === 'NewEEPersonalInfoHarness') {
          history.push(routes.MY_PROFILE)
        }
      }
      // Set up 'harness close' handler to refresh gadget on 'cancel'
      global.pegaOnClose = function pegaOnClose() {
        // Taking 2 steps back since it seems that 'cancel' pushes to history.
        history.go(-2)
      }

      let pegaLoadTimeout
      if (!disableLoader) {
        // Set up load indicator and timeout
        setIsLoading(true)
        global.pegaOnLoad = function pegaOnLoad() {
          setIsLoading(false)
        }
        // Hide the loader after a 10s timeout
        const tenSeconds = 1000 * 10
        pegaLoadTimeout = setTimeout(global.pegaOnLoad, tenSeconds)
      }

      return function cleanup() {
        // remove timeout and event handlers when component unmounts
        clearTimeout(pegaLoadTimeout)
        global.pegaOnLoad = null
        global.pegaOnClose = null
      }
    }
  }

  const conditionalPegaDivAttributes = {}

  if (urlOverride) {
    return (
      <DivPegaContainer ref={containerRef}>
        <iframe src={urlOverride} title={currentLocation.pathname}/>
      </DivPegaContainer>
    )
  }
  else if (caseId) {
    // Route to a specific 'case' in pega
    conditionalPegaDivAttributes['data-pega-action'] = 'openWorkByHandle'
    conditionalPegaDivAttributes['data-pega-action-param-key'] = 'VG-PEO-WORK ' + caseId
  }
  else if (!harnessName) {
    // 'createNewWork' flow which uses pegaClassName and some other attributes
    // TODO: figure out what data-pega-encrypted is and whether we need to send it
    conditionalPegaDivAttributes['data-pega-action'] = 'createNewWork'
    conditionalPegaDivAttributes['data-pega-action-param-classname'] = pegaClassName
    conditionalPegaDivAttributes['data-pega-action-param-flowname'] = 'pyStartCase'
  }
  else {
    // standard pegaClassName/harnessName flow
    conditionalPegaDivAttributes['data-pega-action-param-classname'] = pegaClassName
    conditionalPegaDivAttributes['data-pega-action-param-harnessname'] = harnessName
  }

  return (
    <DivPegaContainer ref={containerRef}
      data-pega-gadgetname={pegaConstants.GADGET_NAME}
      data-pega-isdeferloaded='false'
      data-pega-applicationname={PEGA_APPNAME}
      data-pega-threadname={harnessName || pegaClassName || caseId}
      data-pega-resizetype='stretch'
      data-pega-url={PEGA_HOST + PEGA_AUTH_PATH}
      data-pega-action-param-parameters={encodedPegaParams}
      data-pega-event-onclose='pegaOnClose'
      data-pega-event-onconfirm='pegaOnConfirm'
      data-pega-event-onload='pegaOnLoad'
      {
        ...conditionalPegaDivAttributes
      }
    >
    </DivPegaContainer>
  )
}

export default PegaContainer