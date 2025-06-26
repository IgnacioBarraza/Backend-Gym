import { NextFunction, Request, Response } from "express"
import { createMachine, deleteMachine, getAllMachines, updateMachine } from "../services/machine.service"
import { sendResponse } from "../utils/utils";
import { CustomError } from "../middlewares/errorHandler";

export class MachineController {
  public getMachines = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const machines = await getAllMachines()
      sendResponse(req, res, machines, 200)
    } catch (error) {
      if (error instanceof CustomError) {
        next(new CustomError(error.message, error.statusCode, error.errors))
        return
      }
      next(new CustomError("Internal server error", 500, [error]))
    }
  }

  public createMachine = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMachine = await createMachine(req.body)
      sendResponse(req, res, newMachine, 201)
    } catch (error) {
      if (error instanceof CustomError) {
        next(new CustomError(error.message, error.statusCode, error.errors))
        return
      }
      next(new CustomError("Internal server error", 500, [error]))
    }
  }

  public updateMachine = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      const result = await updateMachine(req.body, id)
      sendResponse(req, res, result, 204)
    } catch (error) {
      if (error instanceof CustomError) {
        next(new CustomError(error.message, error.statusCode, error.errors))
        return
      }
      next(new CustomError("Internal server error", 500, [error]))
    }
  }

  public deleteMachine = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      const result = await deleteMachine(id)
      sendResponse(req, res, result, 204)
    } catch (error) {
      if (error instanceof CustomError) {
        next(new CustomError(error.message, error.statusCode, error.errors))
        return
      }
      next(new CustomError("Internal server error", 500, [error]))
    }
  }
}