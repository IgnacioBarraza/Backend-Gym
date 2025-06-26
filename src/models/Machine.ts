import mongoose from "mongoose"

export interface MachineInterface {
  name: string,
  description: string,
}

const machineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  toJSON: {
    transform: (_doc, ret) => {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

export const Machine = mongoose.model("Machine", machineSchema)