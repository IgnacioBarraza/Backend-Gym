import { CustomError } from "../middlewares/errorHandler";
import { getAll } from "../repositories/machine.repo";

export const getAllMachines = async () => {
  const data = await getAll();

  if (data.length === 0) {
    throw new CustomError("No se han encontrado máquinas", 404, ["No se han encontrado máquinas"])
  }

  return data;
}