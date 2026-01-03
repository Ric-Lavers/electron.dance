import { connectToDatabase } from '@/db/mongo/connect'
import { ObjectId } from 'mongoose'
import User, { UserDoc } from '@/db/mongo/models/user'
import { TokenProvider } from '@/app/_providers/UserTokensProvider'

export class UserRegistrator {
  user: UserDoc | null
  userId: string | null
  static async init(userId: string | null) {
    await connectToDatabase()
    const exisitingUser: UserDoc | null = userId ? await User.findOne({ id: userId }) : null

    return new UserRegistrator(userId, exisitingUser)
  }
  constructor(userId: string | null, exisitingUser: UserDoc | null) {
    this.userId = userId
    this.user = exisitingUser
  }

  async getExistingUserWithToken(userUri) {
    const [user] = await User.aggregate([
      {
        $lookup: {
          from: 'tokens', // collection name for Token
          localField: 'tokens', // array of ObjectId references on User
          foreignField: '_id',
          as: 'tokens',
        },
      },
      { $unwind: '$tokens' },
      { $match: { 'tokens.userUri': userUri } },
      {
        $group: {
          _id: '$_id',
          doc: { $first: '$$ROOT' },
        },
      },
    ])
    if (user) {
      return user.doc
    }
    return null
    // return await User.findOne().populate({ path: 'tokens', match: { userUri } }).exec()
  }
  async addTokenToUser(tokenObjectId: ObjectId, type: TokenProvider) {
    if (this.userId && tokenObjectId) {
      return await User.findOneAndUpdate(
        { id: this.userId },
        {
          lastLoginMethod: type,
          $addToSet: { tokens: tokenObjectId },
        },
        { upsert: true }
      )
    } else {
      throw Error('missing userId')
    }
  }
  async createUser(tokenObjectId: ObjectId, type: TokenProvider) {
    return await User.create({
      //@ts-ignore
      tokens: [tokenObjectId],
      lastLoginMethod: type,
    })
  }
}
