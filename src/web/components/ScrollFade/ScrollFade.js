import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

const DivScrollFade = styled.div`
  position: relative;
  width: 100%;
  flex-grow: 1;
`

const DivScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`

const DivScrollIndicator = styled.div`
  position: absolute;
    top: 0;
    left: 0;
  z-index: 1;
  width: 100%;
  height: 50px;
  background: -webkit-linear-gradient(bottom,rgba(256,256,256,0) 0%,rgba(256,256,256,0.9) 90%,rgba(256,256,256,1) 100%);
  ${props => props.fromBottom && css`
    top: unset;
    bottom: 0;
    transform: rotate(180deg);
  `}
`

ScrollFade.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

/**
 * A wrapper that fits to a parent component and controls whether a faded scroll indicator displays
 * Parent component MUST have flex display
 * TODO: modify to handle vertical or horizontal scrolling
 * @category Components - Web
 * @module ScrollFade
 */
export default function ScrollFade({children}) {
  const scrollContainer = useRef(null)
  const [isScrollable, setIsScrollable] = useState(false)
  const [showTopIndicator, setShowTopIndicator] = useState(false)
  const [showBottomIndicator, setShowBottomIndicator] = useState(true)

  // An effect that runs on every update to handle dynamic child resizing
  useEffect(function onChildHeightChange() {
    const hasVerticalScrollbar = scrollContainer.current.scrollHeight > scrollContainer.current.clientHeight
    if (isScrollable !== hasVerticalScrollbar) {
      setIsScrollable(hasVerticalScrollbar)
      onScroll()
    }
  })

  useEffect(function didMount() {
    scrollContainer.current.addEventListener('scroll', onScroll)
    return () => {
      scrollContainer.current.removeEventListener('scroll', onScroll)
    }
  }, [])

  /** On scroll event, determine whether or not the scroll indicators display */
  function onScroll() {
    if (scrollContainer.current.scrollTop < 5) {
      setShowTopIndicator(false)
    }
    else {
      setShowTopIndicator(true)
    }
    if (scrollContainer.current.scrollHeight - scrollContainer.current.scrollTop > scrollContainer.current.clientHeight + 5) {
      setShowBottomIndicator(true)
    }
    else {
      setShowBottomIndicator(false)
    }
  }

  return (
    <DivScrollFade>
      {isScrollable && showTopIndicator && <DivScrollIndicator key={`top${Math.random()}`} />}
      <DivScrollContainer ref={scrollContainer}>
        {children}
      </DivScrollContainer>
      {isScrollable && showBottomIndicator && <DivScrollIndicator fromBottom={true} key={`bottom${Math.random()}`}/>}
    </DivScrollFade>
  )
}