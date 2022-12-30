import {
  isAuthenticated,
  BadRequestError,
  entityExists,
  validateRequest,
  isAdmin,
  paginate,
} from "@sideshop/common";
import { Request, Response, Router } from "express";
import { OrderDto, orderSchema } from "../dtos/order-dto.js";
import { OrderItem } from "../entities/order-item.js";
import { Order } from "../entities/order.js";
import validateQuantity from "../middlewares/validate-quantity.js";
import OrderStatus from "../models/order-status.js";

const orderRouter = Router();

orderRouter.post(
  "/",
  isAuthenticated,
  validateRequest<Order>(orderSchema),
  validateQuantity,
  async (req, res) => {
    const orderDto = req.body as OrderDto;

    const order = new Order();

    const items = orderDto.items.map((itemDto) => {
      const item = new OrderItem();
      item.productId = itemDto.productId;
      item.quantity = itemDto.quantity;
      item.createdBy = req.user!.id;
      return item;
    });

    order.items = items;
    order.billingAddress = orderDto.billingAddress;
    order.shippingAddress = orderDto.shippingAddress;
    order.createdBy = req.user!.id;
    order.status = OrderStatus.TO_BE_SHIPPED;
    // TODO: add payment prop

    await order.save();

    res.status(201).send(order);
  }
);

orderRouter.patch(
  "/:id",
  isAuthenticated,
  isAdmin,
  entityExists(Order),
  async (req, res) => {
    const { status } = req.body;

    if (!status) {
      throw new BadRequestError("Status not provided");
    }

    const order = req.entity as Order;
    order.status = status;
    order.updatedBy = req.user!.id;

    await order.save();

    res.send(order);
  }
);

orderRouter.get(
  "/:id",
  isAuthenticated,
  entityExists(Order),
  async (req, res) => {
    const { status } = req.body;

    if (!status) {
      throw new BadRequestError("Status not provided");
    }

    const order = req.entity as Order;
    order.items = await OrderItem.findBy({ orderId: +req.params.id });

    res.send(order);
  }
);

orderRouter.get("/", isAuthenticated, async (req: Request, res: Response) => {
  let { pageNumber = 1, pageSize = 10 } = req.query;
  pageNumber = +pageNumber;
  pageSize = +pageSize;

  const {
    result: { items, totalCount, totalPages },
  } = await paginate(Order, { pageNumber, pageSize });

  res.send({
    pageNumber,
    pageSize,
    totalCount,
    totalPages,
    items,
  });
});

export default orderRouter;
