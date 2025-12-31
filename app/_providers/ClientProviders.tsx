"use client";
import { GlobalStyle } from "@/styles/globalStyle";
import { ThemeProvider } from "styled-components";
import { ErrorBoundary } from "./errorBoundary";
import { theme } from "@/styles/theme";
import { useEffect } from "react";
// import { UserTokenContextProvider } from "./UserTokensProvider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <GlobalStyle />
        {/* <UserTokenContextProvider></UserTokenContextProvider> */}
        {children}
      </ErrorBoundary>
    </ThemeProvider>
  );
}
