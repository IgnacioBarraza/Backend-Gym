import { Machine } from "../models/Machine"

export const getAll = async () => {
  return await Machine.find();
}

interface NewMachineInterface {
  name: string,
  description: string
}

export const createNewMachine = async ({ name, description }: NewMachineInterface ) => {
  const newMachine = new Machine({ name, description })
  return await newMachine.save()
}