export type CalendlyToken = {
  token_type: "Bearer"
  access_token: string
  refresh_token: string
  created_at: number
  expires_in: number
  scope: string
  owner: string
  organization: string
}
