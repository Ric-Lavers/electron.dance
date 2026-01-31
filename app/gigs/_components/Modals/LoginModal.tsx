import { useState } from "react"
import LinkedInImage from "@/component-library/svg/linkedin-50.png"
import GoogleImage from "@/component-library/svg/google_bw.png"
import { SpotifyBlackIcon } from "@/component-library/svg"
import * as S from "./login-modal.styles"
import { InfoTooltip } from "./InfoTooltip"

import { formatDistanceToNow } from "date-fns"
import { TokenProvider, useUserToken } from "@/app/_providers/UserTokensProvider"

export const LoginModal = () => {
  const { getTokenProfile, getToken } = useUserToken()
  function handleClick(path: string) {
    window.location.replace(window.location.origin + path)
  }
  const [openId, s_open] = useState<string>("")
  function handleMobiletooltipOpens(serviceId) {
    if (isTouchDevice()) {
      if (openId === serviceId) {
        s_open("")
      } else {
        s_open(serviceId)
      }
    }
  }
  function handleMobiletooltipClose({ currentTarget }) {
    if (isTouchDevice()) {
      s_open("")
    }
  }

  return (
    <S.Container onClick={handleMobiletooltipClose}>
      <S.Content>{`To unlock more access, introduce yourself with a Spotify, Google or LinkedIn login.`}</S.Content>
      <S.List>
        {services.map(
          (service, tokenProfile: any, token: any) => (
            (token = getToken(service.id as TokenProvider)),
            (tokenProfile = getTokenProfile(service.id as TokenProvider)),
            (
              <S.Item key={service.name}>
                <Logo tokenProfileUrl={tokenProfile?.avatarUrl} serviceLogo={service.logo} />
                <ServiceName token={token} service={service} />
                <Action token={token} service={service} onClick={handleClick} />
                {service.info && (
                  <InfoTooltip
                    id={service.id}
                    content={service.info}
                    open={service.id === openId}
                    onMobiletooltipOpens={handleMobiletooltipOpens}
                  />
                )}
              </S.Item>
            )
          )
        )}
      </S.List>
    </S.Container>
  )
}

export function isTouchDevice() {
  return typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)
}

const Logo = ({ serviceLogo, tokenProfileUrl }) => {
  const isImg = typeof serviceLogo === "string"
  let logo = serviceLogo
  if (tokenProfileUrl) {
    logo = <img src={tokenProfileUrl} style={{ width: "100%" }} onError={(e) => (e.currentTarget.src = serviceLogo)} />
  } else if (isImg) {
    logo = <img src={serviceLogo} style={{ width: "70%" }} />
  }
  return <S.Circle style={{ backgroundColor: "white", color: "#000" }}>{logo}</S.Circle>
}

const ServiceName = ({ token, service }) => {
  if (!token) {
    return (
      <div>
        <p>{service.name}</p>
      </div>
    )
  }
  const expiresAt = new Date(token.expiresAt)
  const createdAt = new Date(token.createdAt)
  if (expiresAt < new Date()) {
    return (
      <div>
        <p>{service.name} </p>{" "}
        <small>
          <i>expired {formatDistanceToNow(expiresAt, { addSuffix: true })}</i>
        </small>
      </div>
    )
  }
  return (
    <div>
      <p>{service.name} </p>{" "}
      <small>
        <i>active {formatDistanceToNow(createdAt)}</i>
      </small>
    </div>
  )
}
const Action = ({ token, service, onClick }) => {
  const tokenIsValid = token && new Date(token.expiresAt) > new Date()
  if (tokenIsValid) {
    return <S.Button onClick={() => onClick(service.url)}>Refresh</S.Button>
  }

  return <S.Button onClick={() => onClick(service.url)}>Login</S.Button>
}
export const services = [
  {
    name: "Google",
    id: "google",
    logo: GoogleImage.src,
    url: "/api/google/auth",
    info: "Google is pretty standard  \n\n You'll be sharing your **name, email and profile picture** ",
  },
  {
    name: "Spotify",
    id: "spotify",
    logo: <SpotifyBlackIcon width="70%" />,
    url: "/api/spotify/auth",
    info: "Spotify API is a bit more extensive but more fun, leveraging off a _playlist sharing app_ I made called [party-blends](https://serverless-one-xi.vercel.app/api/login). We will be able to share music, and use AI to recommend gigs. \n \n You'll be sharing **email, profile picture, faviourite tracks, playlists, now-playing and more**.",
  },
  {
    name: "LinkedIn",
    id: "linkedIn",
    logo: LinkedInImage.src,
    url: "/api/linkedin/auth",
    info: "Corporate guy huh? LinkedIn API is pretty closed off, I only have access because my old start-up is a registered LinkedIn company.\n\n You'll be sharing your **name, email and profile picture**.",
  },

  // {
  //   name: 'Github',
  //   logo: LinkedInImage.src,
  //   url: '',
  //   info: null,
  // },
]
