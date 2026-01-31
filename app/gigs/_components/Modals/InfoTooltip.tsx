import Markdown from "react-markdown"
import * as Tooltip from "@radix-ui/react-tooltip"
import * as S from "./info-tooltip.style"
import { InfoCircleIcon } from "@/component-library/svg"
import { isTouchDevice } from "./LoginModal"

export const InfoTooltip = ({ id, open, onMobiletooltipOpens, content = "Add to library" }) => {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root open={isTouchDevice() ? open : undefined}>
        <Tooltip.Trigger
          asChild
          onClick={(e) => {
            e.stopPropagation()
            onMobiletooltipOpens(id)
          }}
        >
          <span>
            <InfoCircleIcon width={24} height={24} />
          </span>
        </Tooltip.Trigger>
        <S.Content sideOffset={5} side="right" style={{}}>
          <Markdown>{content}</Markdown>
          <Tooltip.Arrow />
        </S.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
