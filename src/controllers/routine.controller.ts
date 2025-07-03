import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/utils";
import { CustomError } from "../middlewares/errorHandler";
import { createRoutine, getAllRoutines, removeRoutine, updateRoutine } from "../services/routine.service";

export class RoutineController {
  public getRoutines = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const routines = await getAllRoutines()
      sendResponse(req, res, routines, 200)
    } catch (error) {
      if (error instanceof CustomError) {
        next(new CustomError(error.message, error.statusCode, error.errors))
        return
      }
      next(new CustomError("Internal server error", 500, [error]))
    }
  }

  public createRoutine = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newRoutine = await createRoutine(req.body)
      sendResponse(req, res, newRoutine, 201)
    } catch (error) {
      if (error instanceof CustomError) {
        next(new CustomError(error.message, error.statusCode, error.errors))
        return
      }
      next(new CustomError("Internal server error", 500, [error]))
    }
  }

  public updateRoutine = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      const result = await updateRoutine(req.body, id)
      sendResponse(req, res, result, 200)
    } catch (error) {
      if (error instanceof CustomError) {
        next(new CustomError(error.message, error.statusCode, error.errors))
        return
      }
      next(new CustomError("Internal server error", 500, [error]))
    }
  }

  public deleteRoutine = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      const result = await removeRoutine(id)
      sendResponse(req, res, result, 200)
    } catch (error) {
      if (error instanceof CustomError) {
        next(new CustomError(error.message, error.statusCode, error.errors))
        return
      }
      next(new CustomError("Internal server error", 500, [error]))
    }
  }
}