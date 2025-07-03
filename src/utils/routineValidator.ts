import { Types } from "mongoose";
import z from "zod/v4";

export const RoutineSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    user_id: z.string(),
    exercise_id: z.string(),
  })

export const UpdateRoutineSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    user_id: z.string(),
    exercise_id: z.string(),
  })
  .partial()
  .strict()
  .refine(data => Object.keys(data).length > 0, {
    message: "You should at least provide one field to update"
  })