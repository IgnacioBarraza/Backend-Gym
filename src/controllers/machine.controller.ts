import { NextFunction, Request, Response } from "express"
import { getAllMachines } from "../services/machine.service"
import { sendResponse } from "../utils/utils";
import { CustomError } from "../middlewares/errorHandler";

export class MachineController {
  public getMachines = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const machines = await getAllMachines()
      sendResponse(req, res, machines, 200)
    } catch (error) {
      next(new CustomError("Internal server error", 500, [error]))
    }
  }
}
