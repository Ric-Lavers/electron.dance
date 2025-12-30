"use client";
import { GlobalStyle } from "@/styles/globalStyle";
import { ThemeProvider } from "styled-components";
import { ErrorBoundary } from "./errorBoundary";
import { theme } from "@/styles/theme";
import { UserTokenContextProvider } from "./UserTokensProvider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <GlobalStyle />
        <UserTokenContextProvider>{children}</UserTokenContextProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
