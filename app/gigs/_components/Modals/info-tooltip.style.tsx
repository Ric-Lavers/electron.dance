import styled from "styled-components"
import * as Tooltip from "@radix-ui/react-tooltip"
import { theme } from "@/styles/theme"

export const Content = styled(Tooltip.Content)`
  padding: 4px 8px;
  border: 1px solid ${theme.palette.bushlandDeep};
  border-radius: 4px;
  background-color: ${theme.palette.softPaper};
  white-space: pre-wrap;
  max-width: 320px;
  p {
    margin: 0;
  }
`
