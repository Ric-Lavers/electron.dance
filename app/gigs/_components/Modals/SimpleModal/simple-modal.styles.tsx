import styled from "styled-components"

export const Dialog = styled.div.attrs({
  role: "dialog",
  "aria-modal": "true",
})`
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  position: relative;
  z-index: 3;
  max-height: 80vh;
  overflow: auto;
  min-width: 400px;
  max-width: 400px;
`

export const Title = styled.h2`
  margin: 0;
  line-height: 16px;
`
export const CloseButton = styled.button`
  appearance: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  background: transparent;
  cursor: pointer;
  position: absolute;
  right: 24px;
  top: 24px;
`

export const Overlay = styled.div<{ $animationDuration: number }>`
  background-color: #3331327a;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0px;
  transition: opacity ${(p) => p.$animationDuration + "ms"};
  width: 100vw;
  height: 100vh;
  overflow: auto;
`
