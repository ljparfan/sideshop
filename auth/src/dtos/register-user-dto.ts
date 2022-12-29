import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  mobileNumber: z
    .string({
      required_error: "Mobile number is required",
      invalid_type_error: "Mobile number must be a string",
    })
    .regex(/^(09|\+639)\d{9}$/i, {
      message: "Please enter a valid mobile number",
    }),
});

export type RegisterUserDto = z.infer<typeof registerUserSchema>;
