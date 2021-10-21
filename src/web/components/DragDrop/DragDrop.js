import React, { useEffect, useRef, useState } from 'react'

import {
  DivDragDropWrapper,
  DivDragOverlay } from './DragDrop.styles'

/**
 * A reusable component to that wraps any child component with a drag and drop space
 * @category Components - Web
 * @namespace DragDrop
 */
export default function DragDrop({
  handleFileUpload,
  children
}) {
  const [dragging, setDragging] = useState(false)
  const dragDrop = useRef(null)
  let dragCounter = 0

  useEffect(function setEvents() {
    const elementReference = dragDrop.current
    elementReference.addEventListener('dragenter', handleDragIn)
    elementReference.addEventListener('dragleave', handleDragOut)
    elementReference.addEventListener('dragover', handleDragOver)
    elementReference.addEventListener('drop', handleDrop)

    return function cleanup() {
      elementReference.removeEventListener('dragenter', handleDragIn)
      elementReference.removeEventListener('dragleave', handleDragOut)
      elementReference.removeEventListener('dragover', handleDragOver)
      elementReference.removeEventListener('drop', handleDrop)
    }
  }, [handleFileUpload])

  /**
   * Called on "dragover" event
   * Prevents default browser behavior of opening file in new tab
   * @param {Event} e
   */
  function handleDragOver(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  /**
   * Called on "dragin" event
   * @param {Event} e
   */
  function handleDragIn(e) {
    e.preventDefault()
    e.stopPropagation()
    dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true)
    }
  }

  /**
   * Called on "dragout" event
   * @param {Event} e
   */
  function handleDragOut(e) {
    e.preventDefault()
    e.stopPropagation()
    dragCounter--
    if (dragCounter > 0) return
    setDragging(false)
  }

  /**
   * Called on "drop" event, handles save files
   * @param {Event} e
   */
  function handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files)
      dragCounter = 0
    }
  }

  return (
    <DivDragDropWrapper
      ref={dragDrop}
    >
      { dragging && <DivDragOverlay><h2>Drop File to Upload</h2></DivDragOverlay> }
      { children }
    </DivDragDropWrapper>
  )
}