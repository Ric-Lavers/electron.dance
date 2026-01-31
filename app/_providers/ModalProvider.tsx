"use client"
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useState } from "react"
import styled from "styled-components"
import { ModalOverlay } from "../gigs/_components/Modals/SimpleModal/SimpleModal"
import { LoginModal } from "../gigs/_components/Modals/LoginModal"

export type ModalContextProps = {
  //todo rename  SimpleModalTypes
  type: "login"
  isOpen: boolean

  onClose?: () => void
}

export type ModalContextType = {
  modalProps: ModalContextProps
  openModal: (type: ModalContextProps["type"]) => void
  setModalProps: (props: ModalContextProps) => void | Dispatch<SetStateAction<ModalContextProps>>
}

export const ModalContextProvider = ({ children }) => {
  const [modalProps, setModalProps] = useState<ModalContextProps>({
    type: "login",
    isOpen: false,
  })
  const handleModalClose = useCallback(() => {
    setModalProps({ ...modalProps, isOpen: false })
  }, [modalProps])
  function openModal(type: ModalContextProps["type"]) {
    setModalProps({ type, isOpen: true })
  }

  return (
    <ModalContext.Provider
      value={{
        modalProps,
        openModal,
        setModalProps,
      }}
    >
      <PortalRootDiv id="modal-root" />
      {children}

      {modalProps.isOpen && (
        <ModalOverlay title={titleSwitch(modalProps.type)} isOpen={modalProps.isOpen} onClose={handleModalClose}>
          {(() => {
            switch (modalProps.type) {
              case "login":
                return <LoginModal />

              default:
                handleModalClose()
                return null
            }
          })()}
        </ModalOverlay>
      )}
    </ModalContext.Provider>
  )
}

function titleSwitch(type): string {
  switch (type) {
    case "login":
      return "Hello you, welcome to electron.dance"
    default:
      return ""
  }
}

const PortalRootDiv = styled.div`
  position: relative;
  z-index: 1;
  top: 0;
`

const ModalContext = createContext<ModalContextType>({
  modalProps: { type: "login", isOpen: false },
  setModalProps: () => {},
  openModal: () => {},
})

export const useModal = () => useContext(ModalContext)
