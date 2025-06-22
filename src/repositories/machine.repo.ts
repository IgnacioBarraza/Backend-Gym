import { Machine } from "../models/Machine"

export const getAll = async () => {
  return await Machine.find();
}