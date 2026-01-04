export async function exchangeLinkedinCodeForTokens(
  code: string,
  redirect_uri = "http://localhost:3000/api/linkedin/callback"
) {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: process.env.LINKEDIN_CLIENT_ID!,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    redirect_uri,
  })

  const res = await fetch(`https://www.linkedin.com/oauth/v2/accessToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  })

  if (!res.ok) throw new Error(`Token exchange failed: ${res.status}`)
  const data = await res.json()
  console.log("\ntoken recieved\n")
  return data
}
