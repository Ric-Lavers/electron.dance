import { createGlobalStyle } from "styled-components";
import { theme } from "@/styles/theme";

export const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 16px;
    overflow-y: scroll;
    
  --lch-ink-darkest: 26% 0.05 264;
  --lch-ink-darker: 40% 0.026 262;
  --lch-ink-dark: 56% 0.014 260;
  --lch-ink-light: 84% 0.005 256;
  --lch-ink-lighter: 92% 0.003 254;
  --lch-ink-lightest: 96% 0.002 252;
  --lch-uncolor-darkest: 26% 0.018 40;
  --lch-uncolor-darker: 40.04% 0.0376 50.06;
  --lch-uncolor-dark: 57.09% 0.0676 60.5;
  --lch-uncolor-light: 83.97% 0.0457 80.84;
  --lch-uncolor-lighter: 92% 0.014 90;
  --lch-uncolor-lightest: 96% 0.012 100;
  --lch-red-darkest: 26% 0.105 34;
  --lch-red-darker: 40% 0.154 36;
  --lch-red-dark: 59% 0.19 38;
  --lch-red-light: 84.08% 0.0837 41.96;
  --lch-red-lighter: 92% 0.03 44;
  --lch-red-lightest: 96% 0.013 46;
  --lch-yellow-darkest: 26% 0.0729 40;
  --lch-yellow-darker: 40% 0.12 50;
  --lch-yellow-dark: 58% 0.156 60;
  --lch-yellow-light: 84% 0.12 80;
  --lch-yellow-lighter: 92% 0.076 90;
  --lch-yellow-lightest: 96% 0.034 100;
  --lch-lime-darkest: 26% 0.064 109;
  --lch-lime-darker: 40% 0.101 110;
  --lch-lime-dark: 56.5% 0.142 111;
  --lch-lime-light: 83.92% 0.0927 113.6;
  --lch-lime-lighter: 92% 0.046 114;
  --lch-lime-lightest: 96% 0.034 115;
  --lch-green-darkest: 26% 0.071 149;
  --lch-green-darker: 40% 0.12 148;
  --lch-green-dark: 55% 0.162 147;
  --lch-green-light: 83.92% 0.0772 145.06;
  --lch-green-lighter: 92% 0.044 144;
  --lch-green-lightest: 96% 0.022 143;
  --lch-aqua-darkest: 26% 0.059 214;
  --lch-aqua-darker: 40% 0.093 212;
  --lch-aqua-dark: 55.5% 0.122 210;
  --lch-aqua-light: 83.88% 0.0555 206.02;
  --lch-aqua-lighter: 92% 0.02 204;
  --lch-aqua-lightest: 96% 0.012 202;
  --lch-blue-darkest: 26% 0.126 264;
  --lch-blue-darker: 40% 0.166 262;
  --lch-blue-dark: 57.02% 0.1895 260.46;
  --lch-blue-light: 84.04% 0.0719 255.29;
  --lch-blue-lighter: 92% 0.026 254;
  --lch-blue-lightest: 96% 0.016 252;
  --lch-violet-darkest: 26% 0.148 292;
  --lch-violet-darker: 40% 0.2 290;
  --lch-violet-dark: 58% 0.216 287.6;
  --lch-violet-light: 84.08% 0.0791 283.47;
  --lch-violet-lighter: 92% 0.03 282;
  --lch-violet-lightest: 96% 0.015 280;
  --lch-purple-darkest: 26% 0.131 314;
  --lch-purple-darker: 40% 0.178 312;
  --lch-purple-dark: 58% 0.21 310;
  --lch-purple-light: 84.09% 0.0778 305.77;
  --lch-purple-lighter: 92% 0.03 304;
  --lch-purple-lightest: 96% 0.019 302;
  --lch-pink-darkest: 26% 0.12 348;
  --lch-pink-darker: 40% 0.16 346;
  --lch-pink-dark: 59% 0.188 344;
  --lch-pink-light: 84.04% 0.0737 340;
  --lch-pink-lighter: 92% 0.03 338;
  --lch-pink-lightest: 96% 0.02 336;

  --lch-ink-medium: 66% 0.008 258;
  --lch-uncolor-medium: 66% 0.0944 71.46;
  --lch-red-medium: 66% 0.204 40;
  --lch-yellow-medium: 74% 0.184 70;
  --lch-lime-medium: 68% 0.176 113.11;
  --lch-green-medium: 66% 0.208 146;
  --lch-aqua-medium: 66% 0.152 208;
  --lch-blue-medium: 66% 0.196 257.82;
  --lch-violet-medium: 66% 0.206 285.52;
  --lch-purple-medium: 66% 0.258 308;
  --lch-pink-medium: 71.8% 0.2008 342;

  --color-card-1: oklch(var(--lch-ink-medium));
  --color-card-2: oklch(var(--lch-uncolor-medium));
  --color-card-3: oklch(var(--lch-yellow-medium));
  --color-card-4: oklch(var(--lch-lime-medium));
  --color-card-5: oklch(var(--lch-aqua-medium));
  --color-card-6: oklch(var(--lch-violet-medium));
  --color-card-7: oklch(var(--lch-purple-medium));

  --color-selected-light: oklch(var(--lch-blue-lightest));
    --color-selected: oklch(var(--lch-blue-lighter));
    --color-selected-dark: oklch(var(--lch-blue-light));

    --color-negative: oklch(var(--lch-red-dark));
    --color-positive: oklch(var(--lch-green-dark));
    --color-link: oklch(var(--lch-blue-dark));
    --color-selected-light: oklch(var(--lch-blue-lightest));
    --color-selected: oklch(var(--lch-blue-lighter));
    --color-selected-dark: oklch(var(--lch-blue-light));
    --color-highlight: oklch(var(--lch-yellow-lighter));
    --color-marker: oklch(var(--lch-red-medium));
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  #modal-root {
    position: relative;
    z-index: 999;
  }

  html {
    background-color: ${theme.palette.offBlack};
    background-color: ${theme.palette.riverRockGrey};
  }

  body {
    color: ${theme.colors.accentGreen};
    font-family: -apple-system,'system-ui','Segoe UI','Noto Sans',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji';
    font-family: "Comfortaa",'Roboto', sans-serif;
    margin: 0;
  }
  h2,
  h3,
  h4,h5,h6{
    margin: 0;
    
  }
  p,h4,h5,
  th {
    color:  ${theme.palette.bushlandDeep};
    
  }
  * {
  box-sizing: border-box;

  }
  a {
    color: inherit;
    outline: none;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }


`
