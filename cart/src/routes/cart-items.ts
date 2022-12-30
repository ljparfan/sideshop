import {
  entityExists,
  isAuthenticated,
  NotFoundError,
  validateRequest,
} from "@sideshop/common";
import { Router } from "express";
import { CartItemDto, cartItemSchema } from "../dtos/cart-item-dto.js";
import { CartItem } from "../entities/cart-item.js";
import validateQuantity from "../middlewares/validate-quantity.js";

const cartItemRouter = Router();

cartItemRouter.post(
  "/",
  isAuthenticated,
  validateRequest<CartItemDto>(cartItemSchema),
  validateQuantity,
  async (req, res) => {
    const { productId, quantity } = req.body as CartItemDto;
    const cartItem = new CartItem();
    cartItem.userId = req.user!.id;
    cartItem.productId = productId;
    cartItem.quantity = quantity;

    await cartItem.save();

    res.status(201).send(cartItem);
  }
);

cartItemRouter.get("/", isAuthenticated, async (req, res) => {
  const cartItems = await CartItem.findBy({ userId: req.user!.id });

  res.send(cartItems);
});

cartItemRouter.put(
  "/:id",
  isAuthenticated,
  entityExists(CartItem),
  validateRequest<CartItemDto>(cartItemSchema),
  validateQuantity,
  async (req, res) => {
    const { quantity } = req.body as CartItemDto;
    const cartItem = req.entity as CartItem;

    if (!cartItem) {
      throw new NotFoundError();
    }

    cartItem.quantity = quantity;

    await cartItem.save();

    res.send(cartItem);
  }
);

cartItemRouter.delete(
  "/:id",
  isAuthenticated,
  entityExists(CartItem),
  async (req, res) => {
    const cartItem = req.entity as CartItem;

    cartItem.remove();

    res.send(cartItem);
  }
);

export default cartItemRouter;
