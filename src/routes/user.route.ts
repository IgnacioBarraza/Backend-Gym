import { Router } from "express";
import { UserController } from "../controllers/user.controlle";

const userController = new UserController()
export const userRouter = Router()

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
// userRouter.get('/', userController.register)
// userRouter.get('/', userController.register)