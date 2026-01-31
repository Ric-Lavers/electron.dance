"use client"
import { GlobalStyle } from "@/styles/globalStyle"
import { ThemeProvider } from "styled-components"
import { ErrorBoundary } from "./errorBoundary"
import { theme } from "@/styles/theme"

import { UserTokenContextProvider } from "./UserTokensProvider"
import { ModalContextProvider } from "./ModalProvider"

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <GlobalStyle />
        <UserTokenContextProvider>
          <ModalContextProvider>{children}</ModalContextProvider>
        </UserTokenContextProvider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}