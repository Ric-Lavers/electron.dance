import { theme as _theme } from "@/component-library/theme"

export const palette = {
  // Jacaranda (purples / periwinkles)
  jacarandaLight: "#D7C9FF",
  jacarandaMid: "#A38DFF",
  jacarandaDeep: "#6F63C9",
  periwinkleHaze: "#8FA6FF",
  twilightBloom: "#4C4F92",

  // Bottlebrush reds
  bottlebrushScarlet: "#C61A2B",
  brushTipRed: "#E7363E",
  crimsonStamen: "#B31822",
  bushEmber: "#8E111A",

  // Greens
  bottlebrushGreen: "#4C7F4A",
  gumLeafPale: "#A7C4A0",
  eucalyptusBlueGreen: "#5E8F87",
  bushlandDeep: "#2F4F3A",

  // Neutrals
  warmSand: "#E8DCC3",
  softPaper: "#F5F5F7",
  riverRockGrey: "#B7B7C4",
  // Some helpful extras
  ink: "#13141A",
  offBlack: "#181820",
  white: "#FFFFFF",
  textMain: "#F5F6FF",
  textMuted: "#A1A3BD",
} as const

const buttonColors = {
  text: {
    default: palette.bushlandDeep,
    hover: palette.bushlandDeep,
    active: palette.softPaper,
    disabled: palette.riverRockGrey,
    subtle: palette.eucalyptusBlueGreen,
  },
  background: {
    default: palette.jacarandaMid,
    hover: palette.jacarandaDeep,
    active: palette.twilightBloom,
    disabled: palette.jacarandaLight,
  },
}

export const theme = {
  ..._theme,
  palette,
  colors: {
    ..._theme.colors,

    buttons: buttonColors,
    ...{
      background: palette.softPaper,
      backgroundAlt: palette.warmSand,
      surface: "#FFFFFF",
      surfaceAlt: "#F8F8FA",

      // primary: palette.jacarandaMid, // main brand / CTAs
      primarySoft: palette.jacarandaLight, // subtle fills / hovers
      primaryStrong: palette.jacarandaDeep, // active / pressed

      accentRed: palette.bottlebrushScarlet,
      accentRedSoft: "#FCE4E5",

      accentGreen: palette.bottlebrushGreen,
      accentGreenSoft: palette.gumLeafPale,

      textMain: palette.ink,
      textMuted: "#5A5C68",
      textOnPrimary: palette.white,
      textOnAccent: palette.white,

      borderSubtle: "#E0E0EA",
      borderStrong: "#C0C2D0",

      focusRing: palette.periwinkleHaze,
    },
    primary: {
      ..._theme?.colors?.primary,
      // graysRed: palette.bottlebrushScarlet,
      graysRed: palette.bushlandDeep,
    },
  },
} as const
