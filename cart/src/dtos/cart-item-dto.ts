import { z } from "zod";

export const cartItemSchema = z.object({
  productId: z.number().nonnegative(),
  quantity: z.number().nonnegative(),
});

export type CartItemDto = z.infer<typeof cartItemSchema>;
