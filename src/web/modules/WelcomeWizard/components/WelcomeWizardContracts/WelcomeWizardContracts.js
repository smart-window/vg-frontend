import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Document from 'web/components/Document/Document'
import {H2FormHeading, DivFormContents} from '../../wwSharedStyles'

const DivContainer = styled.div`
  height: 100%;
`

WelcomeWizardContracts.propTypes = {
  /** array of all documents the user must sign */
  docsToSign: PropTypes.object
}

/**
 * Contract page of EEWW
 * @category Modules - Web
 * @subcategory WelcomeWizard
 * @namespace WelcomeWizardDocumentInfo
 */

export default function WelcomeWizardContracts({docsToSign, updateSectionCompletion}) {
  return (
    <DivContainer>
      <H2FormHeading>Last Step! Please sign your contract, below:</H2FormHeading>
      <DivFormContents>
        {
          docsToSign.map(doc => <Document document={doc} canSign={true}/>)
        }
      </DivFormContents>
    </DivContainer>
  )
}