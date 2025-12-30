"use client";
import React from "react";
import styled from "styled-components";
import StyledComponentsRegistry from "../_providers/style-registery";
import ClientProviders from "../_providers/ClientProviders";

const Main = styled.main`
  padding: 8px 12px;
  background-color: #fff;
  min-height: 100dvh;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Main>
      <StyledComponentsRegistry>
        <ClientProviders>{children}</ClientProviders>
      </StyledComponentsRegistry>
    </Main>
  );
}
