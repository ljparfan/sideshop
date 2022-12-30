import { BadRequestError } from "@sideshop/common";
import { NextFunction, Request, Response } from "express";
import { OrderDto } from "../dtos/order-dto.js";
import { Product } from "../entities/product.js";

export default async function validateQuantity(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const { items } = req.body as OrderDto;
  const products = await Promise.all(
    items.map(async (item) =>
      Promise.resolve({
        item,
        product: await Product.findOneBy({ id: item.productId }),
      })
    )
  );

  const nonExistingProducts = products.filter(({ product }) => !product);
  if (nonExistingProducts.length) {
    throw new BadRequestError(
      `Products with the ff. ids not found: ${nonExistingProducts
        .map((p) => p.item.productId)
        .join(", ")}`
    );
  }

  const productsWithInvalidQuantity = products.filter(
    ({ product, item }) => product!.quantityInStock < item.quantity
  );
  if (productsWithInvalidQuantity.length) {
    throw new BadRequestError(
      `The ff. products do not have sufficient quantity in stock. ${productsWithInvalidQuantity
        .map(
          (p) =>
            `Product ID: ${p.item.productId} Quantity left: ${
              p.product!.quantityInStock
            } Desired Quantity: ${p.item.quantity}`
        )
        .join(", ")}`
    );
  }

  return next();
}
