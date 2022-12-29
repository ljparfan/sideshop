import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim(),
  price: z.number().nonnegative(),
  quantityInStock: z.number().nonnegative(),
  description: z.optional(z.string().trim()),
  categoryName: z.string().trim(),
  brandName: z.string().trim(),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
