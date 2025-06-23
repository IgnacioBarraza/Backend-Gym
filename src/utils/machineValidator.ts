import z from "zod/v4";

export const MachineSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
})

export const UpdateMachineSchema = z.object({
  name: z.string().min(1, "Name must not be empty"),
  description: z.string().min(1, "Description should not be empty"),
})
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "You should at least provide one field to update"
  })