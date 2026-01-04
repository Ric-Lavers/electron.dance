import { TokenProvider } from "@/app/_providers/UserTokensProvider"

export const propertiesFromTokenData = (provider: TokenProvider, data) => {
  let email: string | undefined,
    name: string | undefined,
    avatarUrl: string | undefined,
    userDetailsProvider: string | undefined

  switch (provider) {
    case "spotify":
      email = data.email
      name = data.display_name || data.id
      avatarUrl = Array.isArray(data.images) ? data.images[0]?.url : undefined
      break

    case "linkedIn":
      email = data.email
      name = data.firstName || data.lastName
      avatarUrl = data.picture
      break

    case "google":
      email = data.email
      name = data.given_name + " " + data.family_name
      avatarUrl = data.picture
      break

    case "calendly":
      email = data.email
      name = data.name
      avatarUrl = data.avatar_url
      break
  }
  return { email, name, avatarUrl, provider: userDetailsProvider }
}
