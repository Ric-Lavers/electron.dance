import { SpotifyBlackIcon, SpotifyIcon, theme } from "@/component-library"
import styled, { css, keyframes } from "styled-components"

const spotifyColors = {
  green: "#1ED760",
  black: "#121212",
  white: "#FFFFFF",
  gray: "#B3B3B3",
  background: "linear-gradient(180deg,#202124 0,#121212 70.06%),#121212",
  background2: "linear-gradient(rgb(32, 33, 36) 0%, rgb(18, 18, 18) 21.35%)",
  textSubdued: "#b3b3b3",
  backgroundBase: "#121212",
  /* 
    --background-base: #121212;
    --background-highlight#1f1f1f
    --background-press: #000;
    --background-elevated-base: #1f1f1f;
    --background-elevated-highlight: #2a2a2a;
    --background-elevated-press: #191919;
    --background-tinted-base: #ffffff1a;
    --background-tinted-highlight: #ffffff24;
    --background-tinted-press: #ffffff36;
    --text-base: #fff;
    --text-subdued: #b3b3b3;
    --text-bright-accent: #1ed760;
    --text-negative: #f3727f;
    --text-warning: #ffa42b;
    --text-positive: #1ed760;
    --text-announcement: #4cb3ff;
    --essential-base: #fff;
    --essential-subdued: #7c7c7c;
    --essential-bright-accent: #1ed760;
    --essential-negative: #ed2c3f;
    --essential-warning: #ffa42b;
    --essential-positive: #1ed760;
    --essential-announcement: #4cb3ff;
    --decorative-base: #fff;
    --decorative-subdued: #292929;
  */
}
//@ts-ignore
const info = ({ $isPlaying, $isActive }) => {
  switch (true) {
    case $isPlaying:
      return css`
        content: "right now, I'm listening to ";
      `
    case !$isPlaying && $isActive:
      return css`
        content: "right now, I'm paused on ";
      `
    case !$isActive:
      return css`
        content: "this month, my top track is ";
      `
  }
}

export const Container = styled.div<{
  $isActive: boolean
  $isPlaying: boolean
}>`
  height: 57px;
  display: flex;
  flex-direction: column;
  justify-self: end;
  grid-column: span 2;
  position: relative;
  @media screen and (width < ${theme.breakpoints.sm}) {
    width: 100%;
    min-width: 100%;
  }
  p,
  h6 {
    font-family:
      SpotifyMixUI, "Inter", CircularSp-Arab, CircularSp-Hebr, CircularSp-Cyrl, CircularSp-Grek, CircularSp-Deva,
      "Helvetica Neue", helvetica, arial, "Hiragino Sans", "Hiragino Kaku Gothic ProN", Meiryo, "MS Gothic", sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 13px;
  }
  h6 {
    font-size: 12px;
    line-height: 10px;
    color: #292929;
  }

  &:hover {
    h6 i {
      &:before {
        ${info};
      }
    }
  }
  &:has(svg:hover) {
    h6 i {
      &:before {
        content: "visit my Spotify profile ";
      }
    }
  }
  @media screen and (width < ${theme.breakpoints.sm}) {
    ${({ $isActive }) => $isActive && "width: 100%"};
    h6 i {
      &:before {
        ${info};
      }
    }
  }
`

export const NowPlayingContainer = styled.div<{ $isPlaying: boolean }>`
  display: flex;
  height: 200px;
  /* box-sizing: border-box; */
  ${({ $isPlaying }) =>
    $isPlaying
      ? css`
          width: 100%;
          @media screen and (width >= ${theme.breakpoints.sm}) {
            width: 170px;
            min-width: 170px;
            min-width: 100px;
            animation: grow 1.8s ease-out forwards;
          }

          @keyframes grow {
            to {
              width: calc(270px - 6px);
              min-width: calc(270px - 6px);
              min-width: 120px;
              width: 220px;
            }
          }

          padding: 8px;
          display: flex;
          justify-content: space-between;
          /* background: ${spotifyColors.background}; */
          background-image: linear-gradient(#121212 0px, #222 70.06%);
          background-image: linear-gradient(#2a2a2a 0px, #1f1f1f 70.06%, ${spotifyColors.backgroundBase} 100%);

          cursor: default;

          border-radius: 8px;

          border: 1px solid #b3b3b3;
          border-top-width: 0px;
        `
      : css`
          padding: 8px;
          @media screen and (width < ${theme.breakpoints.sm}) {
            justify-content: flex-end;
          }
        `}
`
export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  animation: appear 0.35s ease-out forwards;
  width: 100%;
  overflow: hidden;
  max-width: 190px;
  opacity: 0;
  zoom: 0;

  @keyframes appear {
    0% {
      opacity: 0;
    }

    80% {
      opacity: 0;
      zoom: 1;
    }

    100% {
      opacity: 1;
    }
  }
`
export const AlbumImg = styled.img`
  width: 40px;
  max-height: 40px;
  border-radius: 4px;
  z-index: 1;
`
export const TrackInfo = styled.div`
  container-type: inline-size;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
  p {
    user-select: none;
    margin: 0;
    color: ${spotifyColors.white};
    display: inline-block;
    white-space: nowrap;
    &:last-of-type {
      color: ${spotifyColors.textSubdued};
    }
  }

  overflow: hidden;
`
//@ts-ignore
const leftToRight = (width) => keyframes`

  0% {
    transform: translateX(0);
  }
  40% {
    transform: translateX(${`-${width - 150 + 8}px`});
  }
  50% {
    transform: translateX(${`-${width - 150 + 8}px`});
  }
  90% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(0);
  }

`
export const Marquee = styled.p<{
  subdued?: boolean
  $width: number
  $on?: boolean
}>`
  ${({ subdued }) => subdued && `color: ${spotifyColors.textSubdued};`}

  @container (width < 150px) {
    &:hover {
      ${({ $width }) =>
        $width > 150 &&
        css`
          animation: ${leftToRight($width)} 6s linear infinite;
        `};
    }
  }
  ${({ $on, $width }) =>
    $on &&
    $width > 150 &&
    css`
      animation: ${leftToRight($width)} ${Math.min(30, Math.max(6, Math.round($width / 25)))}s linear infinite;
    `}
`

export const Spotify = styled(SpotifyIcon)`
  width: 40px;
  min-width: 40px;
  height: 40px;
  min-height: 40px;
  cursor: pointer;
`
export const SpotifyBlack = styled(SpotifyBlackIcon)`
  width: 40px;
  min-width: 40px;
  height: 40px;
  min-height: 40px;
  cursor: pointer;
  path {
    fill: #000;
    stroke: #000;
  }

  position: absolute;
  top: 8px;
  right: 9px;
  transition:
    opacity 2s ease-out,
    transform 2s ease-out;
  opacity: ${({ on }) => (on ? 0 : 1)};
  transform: ${({ on }) => (on ? "translate(-4px, 2px)" : "translate(0, 0)")};
`

export const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
`
export const H6 = styled.h6`
  position: absolute;
  top: -12px;
`

export const GigPreview = styled(NowPlayingContainer)`
  animation: none;

  width: 215px;
  cursor: grab;
`
