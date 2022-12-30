import { BadRequestError } from "@sideshop/common";
import { NextFunction, Request, Response } from "express";
import { CartItemDto } from "../dtos/cart-item-dto.js";
import { Product } from "../entities/product.js";

export default async function (req: Request, _: Response, next: NextFunction) {
  const { productId, quantity } = req.body as CartItemDto;
  const product = await Product.findOneBy({ id: productId });

  if (!product) {
    throw new BadRequestError("Product not found");
  }

  if (product.quantityInStock < quantity) {
    throw new BadRequestError("Insufficient product quantity left");
  }

  return next();
}
