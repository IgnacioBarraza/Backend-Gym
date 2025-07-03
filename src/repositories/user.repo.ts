import { DeleteResult, Types } from "mongoose"
import { UserModel } from "../models/User"
import { IUser, IUserDto } from "../models/interfaces/UserInterface"

export const getAll = async (): Promise<IUser[]> =>  {
  return await UserModel.find()
}

export const getUserByEmail = async (email: string): Promise<IUser | null>=> {
  return await UserModel.findOne({ email })
}

export const register = async (data: IUserDto): Promise<IUser> => {
  const newUser = new UserModel(data)
  return await newUser.save()
}

export const deleteUserById = async (id: Types.ObjectId): Promise<DeleteResult> => {
  return await UserModel.deleteOne({ _id: id })
}

export const login = async (email: string, password: string): Promise<IUser | null> => {
  return await UserModel.findOne({
    email, password
  })
}