import React, { useRef } from 'react'
import * as S from './now-playing.styles'

interface SpotifyNowPlayingProps {
  item?: SpotifyApi.CurrentlyPlayingObject['item']
  isPlaying: boolean
  isActive: boolean
}

const placeholder =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="14" fill="gold" />
    </svg>
  `)
const GigPreview: React.FC<SpotifyNowPlayingProps> = ({
  //@ts-ignore
  id,
  item = { uri: '', name: '', album: { images: [] } },
  isActive,
  isPlaying,
  //@ts-ignore
  url,
}) => {
  //@ts-ignore
  let { uri, name, album, album: images } = item,
    µ = getImage(item),
    src = µ == null ? placeholder : µ

  return (
    <S.Container id={id} isActive={isActive} isPlaying={isPlaying} className="now-playing">
      <S.GigPreview isPlaying={isActive || Boolean(item)}>
        {item ? (
          <S.Info key={item.uri}>
            <S.AlbumImg
              src={src}
              alt={`${item.name} album art`}
              onError={function (e) {
                let ø = e.currentTarget
                /* prevent ∞ loop */ ø.onerror = null
                ø.src = placeholder
                ø.title = getImage(item) //url
              }}
              // title={µ == null ? µ : url}
            />

            <TrackInfo
              title={item.name}
              name={
                // @ts-ignore
                getName(item)
              }
              url={url}
              src={getImage(item)}
            />
          </S.Info>
        ) : (
          <div />
        )}
      </S.GigPreview>
    </S.Container>
    // ,JSON.stringify({ uri, name, album, images })
  )
}
// function openRicProfile(url) {
//   url
//     ? window.open(url, '_blank')
//     : window.open('https://open.spotify.com/user/ric-lavers?si=f9f171d3c07f41d0', '_blank')
// }

function getName(item: Exclude<SpotifyApi.CurrentlyPlayingObject['item'], null>) {
  if ('show' in item && item.show) {
    return item.show.name
  }

  if ('artists' in item && item.artists) {
    return item.artists.map((a) => a.name).join(', ')
  }

  return ''
}
function getImage(item) {
  return item.album && item.album.images && item.album.images.length > 0
    ? item?.album.images[0].url
    : item?.images?.[0]?.url || placeholder
}

const TrackInfo = ({
  title,
  name,
  //@ts-ignore
  url,
  //@ts-ignore
  src,
}) => {
  const titleRef = useRef<HTMLParagraphElement>(null),
    nameRef = useRef<HTMLParagraphElement>(null)

  return (
    <S.TrackInfo
    //  title={url}
    >
      <S.Marquee $width={titleRef.current?.scrollWidth || 150} ref={titleRef}>
        {title}
      </S.Marquee>
      <S.Marquee $width={nameRef.current?.scrollWidth || 150} ref={nameRef}>
        {name}
      </S.Marquee>
    </S.TrackInfo>
  )
}

export default GigPreview
