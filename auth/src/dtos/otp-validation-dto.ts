import { z } from "zod";

export const otpValidationSchema = z.object({
  mobileNumber: z
    .string({
      required_error: "Mobile number is required",
      invalid_type_error: "Mobile number must be a string",
    })
    .regex(/^(09|\+639)\d{9}$/i, {
      message: "Please enter a valid mobile number",
    }),
  otp: z
    .string({
      required_error: "otp is required",
      invalid_type_error: "otp must be a number",
    })
    .min(6, { message: "otp must be 6 characters long" })
    .max(6, { message: "otp must be 6 characters long" }),
});

export type OtpValidationDto = z.infer<typeof otpValidationSchema>;
