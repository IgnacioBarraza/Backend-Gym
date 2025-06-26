import { NextFunction, Request, Response } from "express";
import { login, registerUser } from "../services/user.service";
import { sendResponse } from "../utils/utils";
import { CustomError } from "../middlewares/errorHandler";

export class UserController {
  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body
    try {
      const user = await registerUser(data)
      sendResponse(req, res, { token: user }, 200)
    } catch (error) {
      next(new CustomError('Internal server error', 500, [error]))
    }
  }

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body
    try {
      const user = await login(email, password)
      sendResponse(req, res, { token: user }, 200)
    } catch (error) {
      next(new CustomError('Internal server error', 500, [error]))
    }
  }
}