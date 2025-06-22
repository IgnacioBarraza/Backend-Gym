import { Router } from "express";
import { MachineController } from "../controllers/machine.controller";

export const machineRouter = Router()
const machineController = new MachineController()

// Get all machines:
machineRouter.get("/", machineController.getMachines)