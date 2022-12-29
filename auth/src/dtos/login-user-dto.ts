import { z } from "zod";

export const loginUserSchema = z.object({
  mobileNumber: z
    .string({
      required_error: "Mobile number is required",
      invalid_type_error: "Mobile number must be a string",
    })
    .regex(/^(09|\+639)\d{9}$/i, {
      message: "Please enter a valid mobile number",
    }),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;
