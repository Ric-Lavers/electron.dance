"use client"
import { UserIcon } from "@/component-library"
import * as S from "./header.style"
import { useModal } from "@/app/_providers/ModalProvider"
import { useUserToken } from "@/app/_providers/UserTokensProvider"

export const EventsHeader = () => {
  const { tokens, getTokenProfile } = useUserToken(),
    { openModal } = useModal()
  let Icon = <UserIcon width={24} />
  if (tokens.length > 0) {
    const profile = getTokenProfile(tokens[0].provider)
    Icon = (
      <S.LoggedInCircle style={{}}>
        <img src={profile.avatarUrl} style={{ width: "100%" }} onError={(e) => (e.currentTarget.src = "/user.svg")} />
      </S.LoggedInCircle>
    )
  }
  return (
    <S.Header id="events-header">
      <S.Action></S.Action>

      <S.Title>
        <span>Mingle</span>
      </S.Title>

      <S.Action onClick={() => openModal("login")}>{Icon}</S.Action>
    </S.Header>
  )
}
