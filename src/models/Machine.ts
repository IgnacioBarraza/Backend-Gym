import mongoose from "mongoose"

const machineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

export const Machine = mongoose.model("Machine", machineSchema)