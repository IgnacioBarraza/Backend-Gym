import { Types } from "mongoose";
import { Machine, MachineInterface } from "../models/Machine"

export const getAll = async () => {
  return await Machine.find();
}

export const createNewMachine = async (data: MachineInterface ) => {
  const { name, description } = data

  const newMachine = new Machine({ name, description })
  return await newMachine.save()
}

export const existsMachine = async (id: Types.ObjectId): Promise<boolean> => {
  const result = await Machine.exists({ _id: id })
  return Boolean(result)
}

export const updateMachineById = async (id: Types.ObjectId, data: Partial<MachineInterface>) => {
  const { name, description } = data
  
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