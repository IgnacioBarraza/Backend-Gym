import { envConfig } from "../config/env"
import { CustomError } from "../middlewares/errorHandler"
import { IUserProp } from "../models/User"
import { getAll, getUserByEmail, register } from "../repositories/user.repo"
import { UserValidator } from "../validators/userValidator"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const salt = 10

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

export const registerUser = async (data: IUserProp) => {
  const parsedData = UserValidator.safeParse(data)
  if (!parsedData.success) throw new CustomError('Invalid form', 400, parsedData.error)

  const hashedPwd = await bcrypt.hash(parsedData.data.password, salt)

  const userData = {
    username: parsedData.data.username,
    email: parsedData.data.email,
    password: hashedPwd
  }
  const newUser = await register(userData)

  if (!newUser) throw new CustomError('Error user register', 500, ['Error al registrar usuario'])

  const token = jwt.sign({
    user: newUser
  },
  envConfig.jwtSecret as string,
  { expiresIn: '1h'}
  )
  
  return token
}

export const login = async (email: string, password: string) => {
  const user = await getByEmail(email)
  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new CustomError('Invalid password', 500, ['Contraseña incorrecta'])

  const token = jwt.sign({
    user: user
  },
  envConfig.jwtSecret as string,
  { expiresIn: '1h'}
  )

  return token
}