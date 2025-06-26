import { Types } from "mongoose"
import { IUser, UserModel } from "../models/User"

export const getAll = async () =>  {
  return await UserModel.find()
}

export const getUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email })
}

export const register = async (data: IUser) => {
  const newUser = new UserModel(data)
  return await newUser.save()
}

export const deleteUserById = async (id: Types.ObjectId) => {
  return await UserModel.deleteOne({ _id: id })
}

export const login = async (email: string, password: string) => {
  return await UserModel.findOne({
    email, password
  })
}