import React from "react"
import styled from "styled-components"
import { theme } from "../theme"

export type TextSize = "xxs" | "xs" | "sm" | "md" | "lg" | "xl"

export type UITextProps = {
  color?: string
  size?: TextSize
  as?: keyof React.JSX.IntrinsicElements
} & any
export const UIText = styled.p<UITextProps>`
  color: ${({ color }) => (color ? color : theme.colors.primary.graysGray)};
  font-size: ${(props) => {
    switch (props.size) {
      case "xxs":
        return "0.5rem"
      case "xs":
        return "0.75rem"
      case "sm":
        return "0.875rem"
      case "md":
        return "1rem"
      case "lg":
        return "1.25rem"
      case "xl":
        return "1.5rem"
      default: {
        switch (props.as) {
          case "h1":
            return "2rem"
          case "h2":
            return "1.75rem"
          case "h3":
            return "1.5rem"
          case "h4":
            return "1.25rem"
          case "h5":
            return "1rem"
          case "h6":
            return "0.875rem"
        }
      }
    }
  }};
  font-weight: 400;
  padding: 0;
  margin: 0;
`
