import React from 'react'
import {useHistory} from 'react-router'
import sphere from 'assets/images/grid-patterned-sphere.svg'
import {
  DivContainer,
  SectionErrorContainer,
  ArticleErrorMessage
} from './FullPageError.styles'

/**
 * A full page error screen to display 400 and 500 errors
 * @category Components - Web
 * @namespace FullPageError
 */
export default function FullPageError({pageIsNotFound, location}) {
  const history = useHistory()
  const { statusCode, errorMessage } = location?.state ? location.state : {}

  /** If not page found, redirects to home, otherwise goes back to previous location */
  function handleRedirect() {
    pageIsNotFound ? history.push('/') : history.goBack()
  }

  return (
    <DivContainer>
      <SectionErrorContainer>
        <img src={sphere} alt='error icon' />
      </SectionErrorContainer>
      <SectionErrorContainer>
        <div>
          <h1>Oops</h1>
          <h2>We weren’t able to display the page you were looking for.</h2>
          <h2>Sorry about that!</h2>
          <ArticleErrorMessage>
            <p>{`Status code ${statusCode}: ${errorMessage}`}</p>
          </ArticleErrorMessage>
          <button onClick={handleRedirect}>
            {pageIsNotFound ? 'Take Me Home' : 'Take Me Back'}
          </button>
        </div>
      </SectionErrorContainer>
    </DivContainer>
  )
}
