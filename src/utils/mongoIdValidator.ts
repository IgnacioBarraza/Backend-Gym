import { Types } from "mongoose"

export const mongoIdValidator = (data: string[]) => {
  return data.filter(id => !Types.ObjectId.isValid(id))
}