import { TokenProvider } from "@/app/_providers/UserTokensProvider";
import { refreshCalendlyAccessToken } from "./calendly/refreshAccessToken";
import { refreshLinkedinAccessToken } from "./linkedin/refreshAccessToken";
import { refreshSpotifyAccessToken } from "./spotify/refreshAccessToken";

export const refreshTokenServices: {
  [k in TokenProvider]: (refresh_token: string) => Promise<any>;
} = {
  linkedIn: refreshLinkedinAccessToken,
  spotify: refreshSpotifyAccessToken,
  calendly: refreshCalendlyAccessToken,
};
