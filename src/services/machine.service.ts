import { CustomError } from "../middlewares/errorHandler";
import { createNewMachine, deleteMachineById, existsMachine, getAll, updateMachineById } from "../repositories/machine.repo";
import { MachineSchema, UpdateMachineSchema } from "../utils/machineValidator";
import mongoose, { Types } from "mongoose";
import { MachineInterface } from "../models/Machine";
import { ParamsDictionary } from "express-serve-static-core";

export const getAllMachines = async () => {
  const data = await getAll();

  if (data.length === 0) {
    throw new CustomError("No se han encontrado máquinas", 404, ["No se han encontrado máquinas"])
  }

  return data;
}

export const createMachine = async (body: MachineInterface) => {
  const parsedData = MachineSchema.safeParse(body)

  if (!parsedData.success) {
    const message = parsedData.error.issues.map((issue) => issue.message)

    throw new CustomError("Error de validación", 400, message)
  }

  const newMachine = await createNewMachine(parsedData.data)
  return newMachine
}

export const updateMachine = async (body: Partial<MachineInterface>, id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Id inválida", 400, ["Id inválida"])
  }

  const objectId = new Types.ObjectId(id)

  const exists = existsMachine(objectId)

  if (!exists) {
    throw new CustomError("Máquina no encontrada", 404, ["Máquina no encontrada"])
  }

  const parse = UpdateMachineSchema.safeParse(body)

  if (!parse.success) {
    const message = parse.error.issues.map((issues) => issues.message)
    throw new CustomError("Error de validación", 400, message)
  }

  const updatedMachine = await updateMachineById(objectId, parse.data)
  return updatedMachine
}

export const deleteMachine = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Id inválida", 400, ["Id inválida"])
  }

  const objectId = new Types.ObjectId(id)

  const exists = await existsMachine(objectId)
  
  if (!exists) {
    throw new CustomError("Máquina no encontrada", 400, ["Máquina no encontrada"])
  }

  const result = await deleteMachineById(objectId)
  return result
}