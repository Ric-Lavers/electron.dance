import { useEffect } from "react"
import { propertiesFromTokenData } from "@/utils/propertiesFromTokenData"
import { createContext, useContext, useState } from "react"

export type TokenProvider = "spotify" | "linkedIn" | "calendly" | "google"
export const UserTokenContextProvider = ({ children }) => {
  const [tokens, setTokens] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/user-tokens", { credentials: "include" })
      .then((res) => res.json())
      .then(setTokens)
  }, [])

  function getToken(provider: TokenProvider) {
    return tokens.find((t) => t.provider === provider) || null
  }

  function getTokenProfile(provider: TokenProvider) {
    const token = tokens.find((t) => t.provider === provider)
    if (token) {
      return propertiesFromTokenData(provider, token.data)
    }
    return null
  }

  return (
    <UserTokenContext.Provider
      value={{
        tokens,
        getToken,
        getTokenProfile,
      }}
    >
      {children}
    </UserTokenContext.Provider>
  )
}

const UserTokenContext = createContext<{
  tokens: any[]
  getToken: (provider: TokenProvider) => any
  getTokenProfile: (provider: TokenProvider) => any
}>({
  tokens: [],
  getToken: () => null,
  getTokenProfile: () => null,
})

export const useUserToken = () => useContext(UserTokenContext)
