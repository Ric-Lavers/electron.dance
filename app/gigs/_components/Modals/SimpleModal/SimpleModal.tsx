"use client"
import ReactDOM from "react-dom"
import React, { useEffect, useLayoutEffect, useState, PropsWithChildren, useRef } from "react"
import * as S from "./simple-modal.styles"
import { CrossIcon } from "@/component-library"

export type SimpleModalContainerProps = {
  title?: string | React.ReactNode
  isOpen?: boolean
  animationDuration?: number
  onClose(): void
}

// modal is not scrollable, so the scroll bar disappearing will cause a shift
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth
}

export const ModalOverlay: React.FC<PropsWithChildren<SimpleModalContainerProps>> = ({
  title,
  isOpen = false,
  animationDuration = 200,
  onClose,
  children,
}) => {
  const [modalRoot, s_modalRoot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root")
    if (modalRoot) {
      s_modalRoot(modalRoot)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  function preventScroll(isOpen: boolean) {
    const scrollBarWidth = getScrollbarWidth()
    const overflowStyle = isOpen ? "hidden" : "initial"
    document.body.style.overflow = overflowStyle
    document.body.style.paddingRight = isOpen ? scrollBarWidth + "px" : ""
    const root = document.documentElement
    if (root) root.style.overflow = overflowStyle
  }
  useLayoutEffect(() => {
    preventScroll(isOpen)
    return () => preventScroll(false)
  }, [isOpen])

  const delayClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose && setTimeout(onClose, animationDuration)
    }
  }

  if (!modalRoot) {
    return null
  }

  return ReactDOM.createPortal(
    <S.Overlay $animationDuration={animationDuration} onClick={delayClose}>
      <Dialog title={title} onClose={onClose}>
        {children}
      </Dialog>
    </S.Overlay>,
    modalRoot
  )
}

const Dialog: React.FC<PropsWithChildren<Pick<SimpleModalContainerProps, "title" | "onClose">>> = ({
  title,
  onClose,
  children,
}) => {
  const dialogRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current?.focus()
    }
  }, [dialogRef.current])
  return (
    <S.Dialog>
      {title && <S.Title>{title}</S.Title>}
      <S.CloseButton ref={dialogRef} onClick={onClose} aria-label="Close">
        <CrossIcon width="16px" />
      </S.CloseButton>
      {children}
    </S.Dialog>
  )
}
