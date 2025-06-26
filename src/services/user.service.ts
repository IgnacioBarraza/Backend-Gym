import { CustomError } from "../middlewares/errorHandler"
import { IUser } from "../models/User"
import { getAll, getUserByEmail, register } from "../repositories/user.repo"
import { UserValidator } from "../validators/userValidator"

export const getAllUsers = async () => {
  const users = await getAll()

  if (users.length === 0) throw new CustomError('Users not found', 404, ['No se han encontrado usuarios'])

  return users
}

export const getByEmail = async (email: string) => {
  const user = await getUserByEmail(email)

  if (!user) throw new CustomError('User not found', 404, ['Usuario no encontrado'])

  return user
}

export const registerUser = async (data: IUser) => {
  const parsedData = UserValidator.safeParse(data)
  if (!parsedData.success) throw new CustomError('Invalid form', 400, parsedData.error)

  const newUser = await register(data)

  if (!newUser) throw new CustomError('Error user register', 500, ['Error al registrar usuario'])

  return newUser
}