import { Types } from "mongoose";
import z from "zod/v4";

const objectIdSchema = z
  .string()
  .refine(val => Types.ObjectId.isValid(val),{ message: "Invalid ObjectId" })
  .transform(val => new Types.ObjectId(val))

export const RoutineSchema = z.object({
  name: z.string().min(1, "Routine name is required!"),
  description: z.string().min(1, "Routine description is required"),
  user_id: z.string().refine(val => {
    return Types.ObjectId.isValid(val)
  }),
  exercise_id: z.string().refine(val => {
    return Types.ObjectId.isValid(val)
  })
})

export const UpdateRoutineSchema = z
  .object({
    name: z.string().min(1, "Routine name is required!"),
    description: z.string().min(1, "Routine description is required"),
    user_id: objectIdSchema.optional(),
    exercise_id: objectIdSchema.optional(),
  })
  .partial()
  .strict()
  .refine(data => Object.keys(data).length > 0, {
    message: "You should at least provide one field to update"
  })