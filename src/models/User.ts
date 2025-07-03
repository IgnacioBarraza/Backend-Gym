import mongoose, { Schema } from "mongoose"
import { IUser } from "./interfaces/UserInterface"

const UserSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

export const UserModel = mongoose.model<IUser>('User', UserSchema)