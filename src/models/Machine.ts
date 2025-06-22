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
}, {
  toJSON: {
    transform: (_doc, ret) => {
      ret.id = ret._id
      delete ret.id
      delete ret.__v
      return ret
    }
  }
})

export const Machine = mongoose.model("Machine", machineSchema)