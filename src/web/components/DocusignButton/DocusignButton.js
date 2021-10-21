import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {useLazyQuery} from '@apollo/client'
import {useLocation} from 'react-router-dom'

import {DOCUSIGN_SIGNING_URL_QUERY, DOCUSIGN_VIEW_URL_QUERY} from 'web/apollo/queries/documentQueries'
import {documentStatuses} from 'web/constants/documentConstants'
import {GlobalLoaderContext} from 'shared/providers/GlobalLoaderProvider'
import VgButton from 'web/components/VgButton/VgButton'

DocusignButton.propTypes = {
  /** Document record to sign */
  document: PropTypes.object.isRequired,
}

/**
 * This button kicks off the docusign embeded-signing workflow.
 * @category Modules - Web
 * @subcategory Docusign
 * @namespace DocusignInitiator
 */
export default function DocusignButton({document}) {
  const currentLocation = useLocation()
  const {setIsLoading} = useContext(GlobalLoaderContext)
  const docSigned = document.status === documentStatuses.COMPLETEDSTATUS
  const query = docSigned ? DOCUSIGN_VIEW_URL_QUERY : DOCUSIGN_SIGNING_URL_QUERY
  const buttonText = docSigned ? 'View In DocuSign' : 'Sign With DocuSign'

  const [getEmbedUrl] = useLazyQuery(query, {
    fetchPolicy: 'network-only',
    variables: {
      documentId: document.id,
      redirectUri: currentLocation.pathname
    },
    onCompleted: (data => {
      const docusignUrl = docSigned ? data.docusignRecipientViewUrl : data.docusignSigningUrl
      // view opens a new tab while sign does a redirect
      if (docSigned) window.open(docusignUrl)
      else window.location.href = docusignUrl
    })
  })

  /**
   * Displays loader and redirects user to Docusign.
   */
  function handleClick() {
    if (!docSigned) setIsLoading(true)
    getEmbedUrl()
  }

  return (
    <VgButton
      text={buttonText}
      onClick={handleClick}
      arrowDirection={'right'}
      invertColors={true}
      shape={'rectangle'}
    />
  )
}