import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
  username: string
  email: string
  password: string
}

export interface IUserProp {
  username: string
  email: string
  password: string
}

const UserSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

export const UserModel = mongoose.model<IUser>('User', UserSchema)