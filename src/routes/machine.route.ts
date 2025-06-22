import { Router } from "express";
import { MachineController } from "../controllers/machine.controller";

export const machineRouter = Router()
const machineController = new MachineController()

// Get all machines:
machineRouter.get("/", machineController.getMachines)

// Create a new machine:
machineRouter.post("/", machineController.createMachine)

// Update an existing machine:
machineRouter.patch("/:id", machineController.updateMachine)