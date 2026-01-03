import { InferSchemaType } from "mongoose";
import { connectToDatabase } from "@/db/mongo/connect";
import Token, { TokenSchema } from "@/db/mongo/models/token";
import Alert, { AlertSchema } from "@/db/mongo/models/alert";
import { twilioSMS } from "@/services/twilio/helpers/sendSms";
import { refreshTokenServices } from "@/services/index";
import { TokenProvider } from "@/app/_providers/UserTokensProvider";
import { TokenData } from "@/db/mongo/models/user";

export const me = "+61421000554";

interface Init {
  phone: string;
  type: TokenProvider;
}
interface ConstructorProps extends Init {
  db: typeof import("mongoose");
}


export class refreshToken {
  // used for sms error logs
  phone: string
  type: string
  provider: TokenProvider
  db: typeof import('mongoose')
  token: Required<InferSchemaType<typeof TokenSchema>> | null | undefined
  tokenList: Required<InferSchemaType<typeof TokenSchema>>[]
  alert: InferSchemaType<typeof AlertSchema> | null | undefined
  now: number

  static async init({ phone, type }: Init) {
    const db = await connectToDatabase()
    return new refreshToken({ db, phone, type })
  }

  constructor({ phone = me, db, type }: ConstructorProps) {
    this.phone = phone
    this.db = db
    this.type = type
    this.provider = type
    this.now = Date.now()
    this.tokenList = []
  }

  async getToken(additionalQuery?: object) {
    this.token = await Token.findOne({ provider: this.provider, ...additionalQuery })
    return this.token
  }
  async getTokens() {
    this.tokenList = (await Token.find({ provider: this.provider })) || []
    return this.tokenList
  }
  isTokenValid(token = this.token) {
    //@ts-ignore
    return token && new Date(token.expiresAt) > new Date()
  }

  async getAlert() {
    this.alert = await Alert.findOne({ number: this.phone })
    return this.alert
  }
  async hasAlertBeenSent() {
    this.alert = await Alert.findOne({ number: this.phone })

    return this.alert && this.alert.sent === true
  }

  async setAlertSent() {
    return Alert.findOneAndUpdate(
      { number: this.phone },
      {
        number: this.phone,
        type: this.type,
        sent: true,
      },
      { new: true, upsert: true }
    )
  }
  async removeAlert() {
    return Alert.deleteOne({ number: this.phone })
  }

  async sendSms(msg: string) {
    return twilioSMS(msg)
  }
  async refreshManyTokens(): Promise<TokenData[]> {
    await this.getTokens()
    const tokenListData: TokenData[] = [],
      refreshService = refreshTokenServices[this.provider]

    if (this.tokenList.length) {
      for (let token of this.tokenList) {
        if (this.isTokenValid(token)) {
          //@ts-ignore
          const newToken = await refreshService(token!.refreshToken)
          const data = await this.saveToken(newToken, token)
          data && tokenListData.push(data)
        }
      }
    }
    return tokenListData
  }

  async saveToken(token, currentTokenData = this.token): Promise<InferSchemaType<typeof TokenSchema> | null> {
    const { access_token, refresh_token, created_at, expires_in } = token

    let expiresAt = this.now + expires_in * 1000
    if (this.provider === 'linkedIn') {
      expiresAt = created_at + expires_in
    }

    return Token.findOneAndUpdate(
      {
        userUri: currentTokenData!.userUri,
        provider: this.provider,
      },
      {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt,
      },
      { new: true, upsert: true }
    )
  }
}
