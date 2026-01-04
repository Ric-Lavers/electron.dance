import styled from "styled-components"

export const BaseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  text-align: center;
  letter-spacing: 0;
  font-weight: 700;
  word-wrap: nowrap;
  height: 40px;
  min-width: fit-content;
  transition:
    color 200ms ease-in,
    background-color 200ms ease-in,
    border-color 200ms ease-in,
    fill 200ms ease-in;

  &:hover {
    text-decoration: none;
  }

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &:disabled {
    opacity: 0.64;
    cursor: auto;
    pointer-events: none;
  }
`
