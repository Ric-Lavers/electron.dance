"use client";

const buttonSizes = {
  small: "small",
  medium: "medium",
  large: "large",
} as const;

const buttons = {
  fontSize: {
    [buttonSizes.small]: 14,
    [buttonSizes.medium]: 16,
    [buttonSizes.large]: 18,
  },
  lineHeight: {
    [buttonSizes.small]: 16,
    [buttonSizes.medium]: 18,
    [buttonSizes.large]: 20,
  },
  height: {
    [buttonSizes.small]: 32,
    [buttonSizes.medium]: 40,
    [buttonSizes.large]: 56,
  },
  padding: {
    [buttonSizes.small]: "8px 12px",
    [buttonSizes.medium]: "10px 16px",
    [buttonSizes.large]: "16px 24px",
  },
};

const borderRadius = {
  default: "4px",
  small: "2px",
  rounded: "25px",
};

const spacings = {
  0: { px: "0px", rem: "0rem" },
  0.5: { px: "2px", rem: "0.125rem" },
  1: { px: "4px", rem: "0.25rem" },
  1.5: { px: "6px", rem: "0.375rem" },
  2: { px: "8px", rem: "0.5rem" },
  3: { px: "12px", rem: "0.75rem" },
  4: { px: "16px", rem: "1rem" },
  4.5: { px: "18px", rem: "1.125rem" },
  4.75: { px: "20px", rem: "1.25rem" },
  5: { px: "24px", rem: "1.5rem" },
  5.5: { px: "28px", rem: "1.75rem" },
  6: { px: "32px", rem: "2rem" },
  6.5: { px: "36px", rem: "2.25rem" },
  7: { px: "40px", rem: "2.5rem" },
  8: { px: "48px", rem: "3rem" },
  9: { px: "56px", rem: "3.5rem" },
  10: { px: "64px", rem: "4rem" },
  11: { px: "72px", rem: "4.5rem" },
  12: { px: "80px", rem: "5rem" },
  13: { px: "88px", rem: "5.5rem" },
  14: {
    px: "96px",
    rem: "6rem",
  },
  15: { px: "128px", rem: "8rem" },
};

const grid = {
  maxWidth: "1320px",
};

export const breakpoints = {
  xs: "410px",
  sm: "576px",
  md: "769px", // 1 pixel bigger than an iPad
  lg: "992px",
  xl: "1320px",
};

//Don't refer 'base colors' only refer 'colors'
const baseColors = {
  graysRed: "#CA113C",
  graysBlue: "#004E93",
  graysGray: "#333132",
  white: "#FFFFFF",
  systemBlue: "#0076C2",
  graysGray3: "#7C7B7C",
  graysGray4: "#9D9C9D",
  graysGray5: "#CECDCE",
  graysGray6: "#909090",
  black: "#000000",
};
const colors = {
  primary: {
    graysRed: baseColors.graysRed,
    graysBlue: baseColors.graysBlue,
    graysGray: baseColors.graysGray,
    white: baseColors.white,
    black: baseColors.black,
  },
  system: {
    systemRed: "#BC0741",
    systemBlue: baseColors.systemBlue,
    systemYellow: "#FFC71F",
    systemOrange: "#EF7005",
    systemGreen: "#00853B",
    systemRedLite: "#BC07410A", //rgba(188,7,65,0.04)
    systemBlueLite: "#0076C20A", //rgba(0, 118, 194, 0.04);
    systemYellowLite: "#FFC71F0A", //rgba(255,199,31,0.04)
    systemOrangeLite: "#EF70050A", //rgba(239, 112, 5, 0.04)
    systemGreenLite: "#00853B0A", //rgba(0, 133, 59, 0.04)
  },
  secondary: {
    taupe: "#78757B",
    taupeAccent: "#7B709B",
    yellowAccent: "#FFAF06",
  },
  tints: {
    graysRed: {
      _2: "#8D0A29",
      _1: "#A10D30",
      1: baseColors.graysRed,
      2: "#CA113CCC", //rgba(202, 17, 60, 0.8)
      3: "#CA113CA3", //rgba(202, 17, 60, 0.64)
      4: "#CA113C7A", //rgba(202, 17, 60, 0.48)
      5: "#CA113C3D", //rgba(202, 17, 60, 0.24)
      6: "#CA113C28", //rgba(202,17,60,0.16)
      7: "#CA113C14", //rgba(202,17,60,0.08)
      8: "#CA113C0A", //rgba(202,17,60,0.04)
    },

    graysBlue: {
      _2: "#003666",
      _1: "#003E75",
      1: baseColors.graysBlue,
      2: "#004E93CC", //rgba(0, 78, 147, 0.8)
      3: "#004E93A3", //rgba(0, 78, 147, 0.64)
      4: "#004E937A", //rgba(0, 78, 147, 0.48)
      5: "#004E933D", //rgba(0, 78, 147, 0.24)
      6: "#004E9328", //rgba(0, 78, 147,0.16)
      7: "#004E9314", //rgba(0, 78, 147,0.08)
      8: "#004E930A", //rgba(0, 78, 147,0.04)
    },

    systemBlue: {
      _2: "#005286",
      _1: "#025E9B",
      1: baseColors.systemBlue,
      2: "#0076C2CC", //rgba(0, 118, 194, 0.8)
      3: "#0076C2A3", //rgba(0, 118, 194, 0.64)
      4: "#0076C27A", //rgba(0, 118, 194,, 0.48)
      5: "#0076C23D", //rgba(0, 118, 194, 0.24)
      6: "#0076C228", //rgba(0, 118, 194,0.16)
      7: "#0076C214", //rgba(0, 118, 194,0.08)
      8: "#0076C20A", //rgba(0, 118, 194,0.04)
    },
  },
  neutrals: {
    transparentGrays: {
      1: baseColors.graysGray,
      2: "#333132CC", //rgba(51, 49, 50, 0.8)
      3: "#333132A3", //rgba(51, 49, 50, 0.64)
      4: "#3331327A", //rgba(51,49,50,0.48)
      5: "#3331323D", //rgba(51,49,50,0.24)
      6: "#33313228", //rgba(51,49,50,0.16)
      7: "#33313214", //rgba(51,49,50,0.08)
      8: "#3331320A", //rgba(51,49,50,0.04)
    },

    solidGrays: {
      1: baseColors.graysGray,
      2: "#5C5A5B",
      3: baseColors.graysGray3,
      4: baseColors.graysGray4,
      5: baseColors.graysGray5,
      6: "#DEDEDE",
      7: "#EFEEEF",
      8: "#F7F7F7",
      9: baseColors.graysGray6,
    },

    transparentWhites: {
      1: baseColors.white,
      2: "#FFFFFFCC", //rgba(255,255,255,0.8)
      3: "#FFFFFFA3", //rgba(255,255,255,0.64)
      4: "#FFFFFF7A", //rgba(255,255,255,0.48)
      5: "#FFFFFF3D", //rgba(255,255,255,0.24)
      6: "#FFFFFF28", //rgba(255,255,255,0.16)
    },

    text: {
      primary: baseColors.graysGray,
      secondary: baseColors.graysGray3,
      tertiary: baseColors.graysGray4,
    },

    border: {
      dark: baseColors.graysGray,
      medium: baseColors.graysGray4,
      light: baseColors.graysGray5,
    },
  },
} as const;

const fonts = {
  title: "Roboto",
  roboto: "Roboto",
  heading: "Roboto",
  body: "Roboto",
  uiText: "Roboto",
} as const;

// const commonTypography = {
//   title: {
//     "font-family": fonts.title,
//     "font-weight": "bold",
//   },
//   heading: {
//     "font-family": fonts.heading,
//     "font-weight": "bold",
//   },
//   body: {
//     "font-family": fonts.body,
//     "font-weight": "normal",
//   },
//   uiText: {
//     "font-family": fonts.uiText,
//     "font-weight": "normal",
//   },
// } as const;

const typography = {
  //   headings: {
  //     1: {
  //       "sm-lg": {
  //         ...commonTypography.title,
  //         "line-height": "2.75rem",
  //         "font-size": "2.25rem",
  //       },
  //       "md-xl": {
  //         ...commonTypography.title,
  //         "line-height": "3.5rem",
  //         "font-size": "3rem",
  //       },
  //       xl: {
  //         ...commonTypography.title,
  //         "line-height": "4.5rem",
  //         "font-size": "3.75rem",
  //       },
  //     },
  //     2: {
  //       "sm-lg": {
  //         ...commonTypography.title,
  //         "line-height": "2.75rem",
  //         "font-size": "2rem",
  //       },
  //       "xs-md": {
  //         ...commonTypography.title,
  //         "line-height": "3.75rem",
  //         "font-size": "2rem",
  //       },
  //       "md-xl": {
  //         ...commonTypography.title,
  //         "line-height": "3rem",
  //         "font-size": "2.5rem",
  //       },
  //       xl: {
  //         ...commonTypography.title,
  //         "line-height": "3rem",
  //         "font-size": "3.5rem",
  //       },
  //     },
  //     3: {
  //       "sm-lg": {
  //         ...commonTypography.heading,
  //         "line-height": "2.25rem",
  //         "font-size": "1.75rem",
  //       },
  //       "xs-md": {
  //         ...commonTypography.heading,
  //         "line-height": "2rem",
  //         "font-size": "1.75rem",
  //       },
  //       "md-xl": {
  //         ...commonTypography.heading,
  //         "line-height": "2.75rem",
  //         "font-size": "2rem",
  //       },
  //       xl: {
  //         ...commonTypography.heading,
  //         "line-height": "2.75rem",
  //         "font-size": "2rem",
  //       },
  //     },
  //     4: {
  //       "sm-lg": {
  //         ...commonTypography.heading,
  //         "line-height": "2rem",
  //         "font-size": "1.375rem",
  //       },
  //       "xs-md": {
  //         ...commonTypography.heading,
  //         "line-height": "2rem",
  //         "font-size": "1.375rem",
  //       },
  //       "md-xl": {
  //         ...commonTypography.heading,
  //         "line-height": "2rem",
  //         "font-size": "1.5rem",
  //       },
  //       xl: {
  //         ...commonTypography.heading,
  //         "line-height": "2rem",
  //         "font-size": "1.5rem",
  //       },
  //     },
  //     5: {
  //       "sm-lg": {
  //         ...commonTypography.heading,
  //         "line-height": "1.5rem",
  //         "font-size": "1.25rem",
  //       },
  //       "xs-md": {
  //         ...commonTypography.heading,
  //         "line-height": "1.5rem",
  //         "font-size": "1.25rem",
  //       },
  //       "md-xl": {
  //         ...commonTypography.heading,
  //         "line-height": "1.5rem",
  //         "font-size": "1.25rem",
  //       },
  //       xl: {
  //         ...commonTypography.heading,
  //         "line-height": "1.5rem",
  //         "font-size": "1.25rem",
  //       },
  //     },
  //     6: {
  //       "sm-lg": {
  //         ...commonTypography.heading,
  //         "line-height": "1.25rem",
  //         "font-size": "1rem",
  //       },
  //       "xs-md": {
  //         ...commonTypography.heading,
  //         "line-height": "1.25rem",
  //         "font-size": "1rem",
  //       },
  //       "md-xl": {
  //         ...commonTypography.heading,
  //         "line-height": "1.25rem",
  //         "font-size": "1rem",
  //       },
  //       xl: {
  //         ...commonTypography.heading,
  //         "line-height": "1.25rem",
  //         "font-size": "1rem",
  //       },
  //     },
  //   },
  //   body: {
  //     xxs: {
  //       ...commonTypography.body,
  //       "line-height": "0.75rem",
  //       "font-size": "0.625rem",
  //     },
  //     xs: {
  //       ...commonTypography.body,
  //       "line-height": "0.875rem",
  //       "font-size": "0.75rem",
  //     },
  //     sm: {
  //       ...commonTypography.body,
  //       "line-height": "1.25rem",
  //       "font-size": "0.875rem",
  //     },
  //     md: {
  //       ...commonTypography.body,
  //       "line-height": "1.5rem",
  //       "font-size": "1rem",
  //     },
  //     lg: {
  //       ...commonTypography.body,
  //       "line-height": "1.75rem",
  //       "font-size": "1.125rem",
  //     },
  //   },
  //   uiText: {
  //     xxs: {
  //       ...commonTypography.uiText,
  //       "line-height": "0.75rem",
  //       "font-size": "0.625rem",
  //     },
  //     xs: {
  //       ...commonTypography.uiText,
  //       "line-height": "0.875rem",
  //       "font-size": "0.75rem",
  //     },
  //     sm: {
  //       ...commonTypography.uiText,
  //       "line-height": "1rem",
  //       "font-size": "0.875rem",
  //     },
  //     md: {
  //       ...commonTypography.uiText,
  //       "line-height": "1.125rem",
  //       "font-size": "1rem",
  //     },
  //     lg: {
  //       ...commonTypography.uiText,
  //       "line-height": "1.25rem",
  //       "font-size": "1.125rem",
  //     },
  //   },
  //   fontWeight: {
  //     normal: "400",
  //     bold: "700",
  //   },
  //   links: {
  //     primary: {
  //       color: colors.primary.graysRed,
  //     },
  //     secondary: {
  //       color: colors.system.systemBlue,
  //     },
  //   },
} as const;

export type BreakpointsOfTOrT<T> = T | BreakpointsOf<T>;

export type BreakpointsOf<T> = {
  [K in keyof typeof breakpoints]?: T;
};

export type AllBreakpointsOf<T> = Required<BreakpointsOf<T>>;

export interface GraysTheme {
  buttons: typeof buttons;
  borderRadius: typeof borderRadius;
  spacings: typeof spacings;
  breakpoints: typeof breakpoints;
  grid: typeof grid;
  colors: typeof colors;
  fonts: typeof fonts;
  typography: typeof typography;
}

export const theme: GraysTheme = {
  buttons,
  borderRadius,
  spacings,
  breakpoints,
  grid,
  colors,
  fonts,
  typography,
};
