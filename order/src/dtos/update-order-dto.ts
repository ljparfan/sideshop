import { z } from "zod";
import OrderStatus from "../models/order-status.js";

export const updateOrderSchema = z.object({
  status: z.nativeEnum(OrderStatus),
  quantity: z.number().nonnegative(),
});

export type UpdateOrderDto = z.infer<typeof updateOrderSchema>;
