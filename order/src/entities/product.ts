import { AppBaseEntity } from "@sideshop/common";
import { Column, Entity, OneToMany, Relation } from "typeorm";
import { OrderItem } from "./order-item.js";

@Entity()
export class Product extends AppBaseEntity {
  @Column()
  quantityInStock!: number;

  @Column()
  price!: number;

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.product)
  orderItems!: Relation<OrderItem[]>;
}
