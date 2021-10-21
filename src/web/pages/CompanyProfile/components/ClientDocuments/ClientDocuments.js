import React from 'react'
import { DivContentBlock, DivContentBody, DivContentHeader } from '../ClientInformation/ClientInformation.styles'

/**
 * Renders a component where users can manage all documents that are related to a client company
 * @category Components - Web
 * @namespace ClientDocuments
 */
 export default function ClientDocuments() {
  return (
    <DivContentBlock>
      <DivContentHeader>
        Documents
      </DivContentHeader>
      <DivContentBody expanded>
        Client documents are here
      </DivContentBody>
    </DivContentBlock>
  )
}