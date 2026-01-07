import React from "react"
import StyledComponentsRegistry from "../_providers/style-registery"
import ClientProviders from "../_providers/ClientProviders"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      style={{
        backgroundColor: "#fff",
      }}
    >
      <StyledComponentsRegistry>
        <ClientProviders>{children}</ClientProviders>
      </StyledComponentsRegistry>
    </main>
  )
}
