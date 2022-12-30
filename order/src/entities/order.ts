import { AppBaseEntity } from "@sideshop/common";
import { Column, Entity, OneToMany, Relation } from "typeorm";
import OrderStatus from "../models/order-status.js";
import { OrderItem } from "./order-item.js";

@Entity()
export class Order extends AppBaseEntity {
  @OneToMany((type) => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
  })
  items!: Relation<OrderItem[]>;

  @Column({ type: "text" })
  billingAddress!: string;

  @Column({ type: "text" })
  shippingAddress!: string;

  @Column({ default: OrderStatus.TO_BE_SHIPPED })
  status!: OrderStatus;

  @Column()
  userId!: number;
}
