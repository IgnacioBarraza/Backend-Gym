import { Request } from "express";
import { CustomError } from "../middlewares/errorHandler";
import { createNewMachine, deleteMachineById, existsMachine, getAll, updateMachineById } from "../repositories/machine.repo";
import { MachineSchema, UpdateMachineSchema } from "../utils/machineValidator";
import mongoose, { Types } from "mongoose";

export const getAllMachines = async () => {
  const data = await getAll();

  if (data.length === 0) {
    throw new CustomError("No se han encontrado máquinas", 404, ["No se han encontrado máquinas"])
  }

  return data;
}

export const createMachine = async (req: Request) => {
  const parsedData = MachineSchema.safeParse(req.body)

  if (!parsedData.success) {
    const message = parsedData.error.issues.map((issue) => issue.message)

    throw new CustomError("Error de validación", 400, message)
  }

  const newMachine = await createNewMachine(parsedData.data)
  return newMachine
}

export const updateMachine = async (req: Request) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Id inválida", 400, ["Id inválida"])
  }

  const objectId = new Types.ObjectId(id)

  const exists = existsMachine(objectId)

  if (!exists) {
    throw new CustomError("Máquina no encontrada", 404, ["Máquina no encontrada"])
  }

  const parse = UpdateMachineSchema.safeParse(req.body)

  if (!parse.success) {
    const message = parse.error.issues.map((issues) => issues.message)
    throw new CustomError("Error de validación", 400, message)
  }

  const updatedMachine = await updateMachineById(objectId, parse.data)
  return updatedMachine
}

export const deleteMachine = async (req: Request) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Id inválida", 400, ["Id inválida"])
  }

  const objectId = new Types.ObjectId(id)

  const exists = await existsMachine(objectId)
  
  if (!exists) {
    throw new CustomError("Máquina no encontrada", 400, ["Máquina no encontrada"])
  }

  const result = await deleteMachineById(id)
  return result
}