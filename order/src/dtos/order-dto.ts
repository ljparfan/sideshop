import { z } from "zod";
import { orderItemSchema } from "./order-item-dto.js";

export const orderSchema = z.object({
  items: z.array(orderItemSchema),
  billingAddress: z.string(),
  shippingAddress: z.string(),
});

export type OrderDto = z.infer<typeof orderSchema>;
