import { Request } from "express";
import { CustomError } from "../middlewares/errorHandler";
import { createNewMachine, getAll } from "../repositories/machine.repo";
import { MachineSchema } from "../utils/machineValidator";

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