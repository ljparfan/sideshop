import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.number().nonnegative(),
  quantity: z.number().nonnegative(),
});

export type OrderItemDto = z.infer<typeof orderItemSchema>;
