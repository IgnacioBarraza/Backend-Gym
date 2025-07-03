import { Types, UpdateResult } from "mongoose";
import { Routine, RoutineInterface } from "../models/Routine"

export const getAll = async () => {
  return await Routine.find();
}

export const createNewRoutine = async (data: RoutineInterface) => {
  const { name, description, user_id, exercise_id } = data

  const newRoutine = new Routine({ name, description, user_id, exercise_id })
  return await newRoutine.save()
}

export const existsRoutine = async (id: Types.ObjectId) => {
  const exists = await Routine.exists({ _id: id })
  return Boolean(exists)
}

export const updateRoutineById = async (id: Types.ObjectId, data: Partial<RoutineInterface>): Promise<UpdateResult> => {
  const { name, description, user_id, exercise_id } = data

  const result = await Routine.updateOne({ _id: id }, {
    $set: {
      name,
      description,
      user_id,
      exercise_id,
    }
  })

  return result
}

export const deleteRoutineById = async (id: Types.ObjectId) => {
  return Routine.deleteOne({ _id: id })
}