// utils/deriveProfileFromTokens.ts (or inline)

import { InferSchemaType } from "mongoose";
import { TokenSchema } from "./models/token";
type TokenData = InferSchemaType<typeof TokenSchema>;
export type DerivedProfile = {
  email?: string
  name?: string
  avatarUrl?: string
  provider?: string
}

const PROVIDER_PRIORITY = ['spotify', 'linkedIn', 'calendly']

export function deriveProfileFromTokens(tokens: TokenData[] = []): DerivedProfile {
  if (!tokens?.length) return {}

  let email: string | undefined,
    name: string | undefined,
    avatarUrl: string | undefined,
    userDetailsProvider: string | undefined

  for (const provider of PROVIDER_PRIORITY) {
    const token = tokens.find((t) => t.provider === provider)
    if (!token || !token.data) continue

    const data = token.data

    switch (provider) {
      case 'spotify':
        email = data.email
        name = data.display_name || data.id
        avatarUrl = Array.isArray(data.images) ? data.images[0]?.url : undefined
        break

      case 'linkedIn':
        email = data.email
        name = data.firstName || data.lastName
        avatarUrl = data.picture
        break

      case 'calendly':
        email = data.email
        name = data.name
        avatarUrl = data.avatar_url
        break
    }

    userDetailsProvider = provider

    // stop early if we have enough info
    if (email && (name || avatarUrl)) break
  }

  return { email, name, avatarUrl, provider: userDetailsProvider }
}
