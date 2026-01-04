import React, { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import * as S from "./now-playing.styles"

interface SpotifyNowPlayingProps {
  item?: SpotifyApi.CurrentlyPlayingObject["item"]
  isPlaying: boolean
  isActive: boolean
}

export const SpotifyNowPlayingStream = () => {
  const [data, setTrack] = useState<SpotifyNowPlayingProps | undefined>(),
    [topTracks, setTopTrack] = useState<SpotifyApi.UsersTopTracksResponse>(),
    topTrack = topTracks?.items?.[0],
    isActive = Boolean(data?.item),
    item = isActive ? data!.item : topTrack

  useEffect(() => {
    // Connect to your now-playing server (adjust URL for production)
    const socket = io("https://now-playing-39fz.onrender.com")

    // Listen for playback updates
    socket.on("spotify:currently-playing", (data) => {
      setTrack(data)
    })

    // Trigger streaming once connected (optional: do this on mount or via user action)
    fetch("https://now-playing-39fz.onrender.com/spotify/stream", {
      method: "POST",
    })
      .then((response) => response.json())
      // .then((result) => console.log('Streaming started:', result))
      .catch((error) => console.error("Failed to start streaming:", error))
      .finally(() => {
        fetch("api/spotify/top")
          .then((r) => r.json())
          .then(
            (tracks) => new Promise<SpotifyApi.UsersTopTracksResponse>((res) => setTimeout(() => res(tracks), 8_000))
          )
          .then((tracks) => setTopTrack(tracks))

          .catch(() => {})
      })
    // Cleanup on unmount
    return () => {
      socket.disconnect()
    }
  }, [])

  return <SpotifyNowPlaying item={item} isActive={Boolean(data?.item)} isPlaying={Boolean(data?.isPlaying)} />
}

const SpotifyNowPlaying: React.FC<SpotifyNowPlayingProps> = ({ item, isActive, isPlaying }) => {
  return (
    <S.Container $isActive={isActive} $isPlaying={isPlaying}>
      {(isActive || Boolean(item)) && (
        <S.H6>
          <i />
        </S.H6>
      )}

      <S.NowPlayingContainer $isPlaying={isActive || Boolean(item)}>
        {item ? (
          <S.Info key={item.uri}>
            <S.AlbumImg src={getImage(item)} alt={`${item.name} album art`} />
            <TrackInfo title={item.name} name={getName(item)} />
          </S.Info>
        ) : (
          <div />
        )}

        <S.Spotify height={40} width={40} onClick={openRicProfile} />
        <S.SpotifyBlack height={40} width={40} on={isActive} onClick={openRicProfile} />
      </S.NowPlayingContainer>
    </S.Container>
  )
}
function openRicProfile() {
  window.open("https://open.spotify.com/user/ric-lavers?si=f9f171d3c07f41d0", "_blank")
}

function getName(item: Exclude<SpotifyApi.CurrentlyPlayingObject["item"], null>) {
  if ("show" in item && item.show) {
    return item.show.name
  }

  if ("artists" in item && item.artists) {
    return item.artists.map((a) => a.name).join(", ")
  }

  return ""
}
//@ts-ignore
function getImage(item) {
  return item.album && item.album.images && item.album.images.length > 0
    ? item?.album.images[0].url
    : item?.images?.[0]?.url || null
}

//@ts-ignore
const TrackInfo = ({ title, name }) => {
  const titleRef = useRef<HTMLParagraphElement>(null),
    nameRef = useRef<HTMLParagraphElement>(null)

  return (
    <S.TrackInfo>
      <S.Marquee $width={titleRef.current?.scrollWidth || 150} ref={titleRef}>
        {title}
      </S.Marquee>
      <S.Marquee $width={nameRef.current?.scrollWidth || 150} ref={nameRef}>
        {name}
      </S.Marquee>
    </S.TrackInfo>
  )
}

// const Play = () => (
//   <svg viewBox="0 0 16 16" fill="white">
//     <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z"></path>
//   </svg>
// )
// const Prev = () => (
//   <svg viewBox="0 0 16 16">
//     <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7z"></path>
//   </svg>
// )
// const Next = () => (
//   <svg viewBox="0 0 16 16">
//     <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z"></path>
//   </svg>
// )

export default SpotifyNowPlaying
