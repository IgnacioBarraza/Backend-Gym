import { Machine } from "../models/Machine"

export const getAll = async () => {
  return await Machine.find();
}

interface MachineInterface {
  name: string,
  description: string
}

export const createNewMachine = async ({ name, description }: MachineInterface ) => {
  const newMachine = new Machine({ name, description })
  return await newMachine.save()
}

export const existsMachine = (id: string): boolean => {
  return !!Machine.findById(id)
}

export const updateMachineById = async (id: string, { name, description }: Partial<MachineInterface>) => {
  const updatedMachine = await Machine.updateOne({ _id: id }, {
    $set: {
      name: name,
      description: description
    }
  })

  return updatedMachine
}

export const deleteMachineById = async (id: string) => {
  return Machine.deleteOne({
    _id: id
  })
}