import mongoose, { Types } from "mongoose";

export interface RoutineInterface {
  name: string,
  description: string,
  user_id: Types.ObjectId,
  exercise_id: Types.ObjectId,
}

const routineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: Types.ObjectId,
    required: true,
  },
  exercise_id: {
    type: Types.ObjectId,
    required: true
  }
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

export const Routine = mongoose.model("Routine", routineSchema)