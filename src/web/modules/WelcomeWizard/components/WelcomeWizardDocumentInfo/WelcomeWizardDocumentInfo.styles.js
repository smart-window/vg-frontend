
import styled from 'styled-components'
import {ArticleContainer} from 'web/components/Document/Document.styles'
import {H3SectionHeading} from 'web/modules/WelcomeWizard/components/SectionHeading/SectionHeading.styles'

export const DivContainer = styled.div`
  height: 100%;
`
export const DivDocumentsSection = styled.div`
  margin-bottom: 27px;
  ${ArticleContainer} {
    margin-bottom: 9px;
    &:first-of-type {
      margin-top: 12px;
    }
  }
  ${H3SectionHeading} {
    max-width: 1008px;
  }
`