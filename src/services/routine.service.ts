import { CustomError } from "../middlewares/errorHandler"
import { createNewRoutine, deleteRoutineById, existsRoutine, getAll, updateRoutineById } from "../repositories/routine.repo"
import { RoutineSchema, UpdateRoutineSchema } from "../utils/routineValidator"
import { RoutineInterface } from "../models/Routine"
import mongoose, { Types } from "mongoose"
import { mongoIdValidator } from "../utils/mongoIdValidator"

export const getAllRoutines = async () => {
  const data = await getAll()

  if (data.length === 0) {
    throw new CustomError("No se han encontrado rutinas", 404, ["No se han encontrado rutinas"])
  }

  return data
}

export const createRoutine = async (data: RoutineInterface) => {
  const parseData = RoutineSchema.safeParse(data)

  if (!parseData.success) {
    const message = parseData.error.issues.map((issue) => issue.message)

    throw new CustomError("Error de validación", 400, message)
  }

  const invalidIds = mongoIdValidator([parseData.data.user_id, parseData.data.exercise_id])

  if (invalidIds.length > 0) {
    throw new CustomError("Invalid ids: " + invalidIds, 400, invalidIds)
  }

  const parsedDataId = {
    name: parseData.data.name,
    description: parseData.data.description,
    user_id: new Types.ObjectId(parseData.data.user_id),
    exercise_id: new Types.ObjectId(parseData.data.exercise_id)
  }

  const newRoutine = await createNewRoutine(parsedDataId)
  return newRoutine
}

export const updateRoutine = async (data: Partial<RoutineInterface>, id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Id inválida", 400, ["Id inválida"])
  }

  const objectId = new Types.ObjectId(id)

  const exists = await existsRoutine(objectId)

  if (!exists) {
    throw new CustomError("Rutina no encontrada", 400, ["Rutina no encontrada"])
  }

  const parseData = UpdateRoutineSchema.safeParse(data)

  if (!parseData.success) {
    const message = parseData.error.issues.map((issues) => issues.message)
    throw new CustomError("Error de validación", 400, message)
  }

  const parsedDataId = {
    name: parseData.data.name,
    description: parseData.data.description,
    user_id: parseData.data.user_id
      ? new Types.ObjectId(parseData.data.user_id)
      : undefined,
    exercise_id: parseData.data.exercise_id
      ? new Types.ObjectId(parseData.data.exercise_id)
      : undefined,
  }

  const result = await updateRoutineById(objectId, parsedDataId)
  return result
}

export const removeRoutine = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Id inválida", 400, ["Id inválida"])
  }

  const objectId = new Types.ObjectId(id)

  const exists = await existsRoutine(objectId)

  if (!exists) {
    throw new CustomError("Ejercicio no encontrado", 404, ["Ejercicio no encontrado"])
  }

  const result = await deleteRoutineById(objectId)
  return result
}