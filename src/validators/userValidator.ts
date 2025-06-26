import { object, string } from "zod";

export const UserValidator = object({
  username: string({ required_error: 'Username es un campo obligatorio'}).min(3),
  email: string().email(),
  password: string({ required_error: 'Contraseña es obligatoria, minimo 6 caracteres'}).min(6)
})