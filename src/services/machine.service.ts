import { Request } from "express";
import { CustomError } from "../middlewares/errorHandler";
import { createNewMachine, getAll, updateMachineById } from "../repositories/machine.repo";
import { MachineSchema, UpdateMachineSchema } from "../utils/machineValidator";

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
  const parse = UpdateMachineSchema.safeParse(req.body)

  if (!parse.success) {
    const message = parse.error.issues.map((issues) => issues.message)
    throw new CustomError("Error de validación", 400, message)
  }

  const updatedMachine = await updateMachineById(req.params.id, parse.data)
  return updatedMachine
}