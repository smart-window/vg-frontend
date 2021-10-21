import {useContext, useEffect} from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import {SAVE_USER_DOCUMENT} from 'web/apollo/mutations/documentMutations'
import {documentStatuses} from 'web/constants/documentConstants'
import {GlobalLoaderContext} from 'shared/providers/GlobalLoaderProvider'

/**
 * This is the landing page for when the user finishes signing a Docusign envelope.
 * It contains routing logic to get them back to the Onboarding workflow.
 * @category Pages
 * @namespace DocusignCallback
 */
export default function DocusignCallback() {
  const location = useLocation()
  const queryParams = queryString.parse(location.search)
  const {setIsLoading} = useContext(GlobalLoaderContext)
  const [saveDocument] = useMutation(SAVE_USER_DOCUMENT)
  const history = useHistory()

  useEffect(function didMount() {
    // update doc status as signed on the backend
    // TODO: maybe we should be saving signed_at, downloaded_at, etc?
    const {event, documentId, redirectUri} = queryParams
    if (event === 'signing_complete' && documentId) {
      saveDocument({
        variables: {
          documentId,
          status: documentStatuses.COMPLETEDSTATUS
        }
      })
    }
    // currently the component that routes to/from here is EEWW
    setIsLoading(false)
    history.replace(redirectUri)
  }, [])

  return null
}