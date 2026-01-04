"use client"

import { useState } from "react"
import { ServerStyleSheet, StyleSheetManager } from "styled-components"
import { useServerInsertedHTML } from "next/navigation"

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement()
    // clear tag to avoid duplicates on streaming
    // @ts-ignore private api
    sheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== "undefined") {
    // On the client, don’t wrap with ServerStyleSheet — let styled-components handle HMR
    return <>{children}</>
  }

  return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>
}
