import React, {useState} from 'react'

export const GlobalModalContext = React.createContext({
  modalComponent: null,
  modalProps: null,
  showModal: () => {},
  hideModal: () => {}
})

/**
 * Global Modal provider for both web and mobile.
 * Web and mobile have their own implementation of <GlobalModal> which consumes this context.
 *
 * The main functions for consumers are showModal() and hideModal(), which are documented below.
 */
export function GlobalModalProvider(props) {
  const [modalConstant, setModalConstant] = useState(null)
  const [modalProps, setModalProps] = useState(null)

  /**
   * Update context with modal type and props.
   * @param {string} constant must map to a name in modalConstants.js.
   * When addina a new modal, be sure to add the constant there as well as the map in GlobalModal.
   * @param {object} props props for the component identified by the 'constant' param
   */
  function showModal(constant, props) {
    setModalConstant(constant)
    setModalProps(props)
  }

  /**
   * Reset the modal type and props, effectively removing the modal.
   */
  function hideModal() {
    setModalConstant(null)
    setModalProps(null)
  }

  return (
    <GlobalModalContext.Provider
      value={{
        showModal,
        hideModal,
        modalConstant,
        modalProps
      }}
    >
      {props.children}
    </GlobalModalContext.Provider>
  )
}
