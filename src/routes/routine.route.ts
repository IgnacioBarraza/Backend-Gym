import { Router } from "express";
import { RoutineController } from "../controllers/routine.controller";

export const routineRouter = Router()
export const routineController = new RoutineController()

// Get all routines:
routineRouter.get("/", routineController.getRoutines)

// Create a routine:
routineRouter.post("/", routineController.createRoutine)

// Update a routine:
routineRouter.patch("/", routineController.updateRoutine)

// Delete a routine:
routineRouter.patch("/", routineController.deleteRoutine)