import { z } from "zod";

export const refreshTokenSchema = z.object({
  refreshToken: z.string({
    required_error: "Refresh token is required",
    invalid_type_error: "Refresh token must be a string",
  }),
});

export type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;
