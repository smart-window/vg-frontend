import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LightBulbIcon from 'web/components/DynamicIcons/LightBulbIcon'
import { colors } from 'shared/constants/cssConstants'
import useOnClickOutside from 'web/hooks/useOnClickOutside'

const DivContainer = styled.div`
  position: relative;
  svg {
    width: 18px;
    height: 21px;
  }
`
const DivArticlesContainer = styled.div`
  position: absolute;
  right: 0;
  top: 105%;
  width: 216px;
  padding: 8px;
  background: ${colors.white};
  border: 1px solid ${colors.black};
  border-radius: 4px;
`

const AArticle = styled.a`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 8px 0;
`

/**
 * A dropdown menu that displays the given knowledge article urls
 * @category Components - Web
 * @namespace KnowledgeArticles
 */
function KnowledgeArticles(props) {
  const { knowledgeArticles } = props
  const [open, setOpen] = useState(false)
  const containerRef = useRef()
  useOnClickOutside(containerRef, () => setOpen(false))

  return (
    <DivContainer ref={containerRef}>
      <button aria-label='knowledge articles' onClick={() => setOpen((prev) => !prev)}>
        <LightBulbIcon />
      </button>
      {open && (
        <DivArticlesContainer>
          {knowledgeArticles.map((article) => (
            <AArticle key={article.url} href={article.url}>{article.url}</AArticle>
          ))}
        </DivArticlesContainer>
      )}
    </DivContainer>
  )
}

KnowledgeArticles.propTypes = {
  knowledgeArticles: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string
    })
  )
}

KnowledgeArticles.defaultProps = {
  knowledgeArticles: []
}

export default KnowledgeArticles
