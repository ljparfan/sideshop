import { AppBaseEntity } from "@sideshop/common";
import { Column, Entity, ManyToOne, Relation } from "typeorm";
import { Order } from "./order.js";
import { Product } from "./product.js";

@Entity()
export class OrderItem extends AppBaseEntity {
  @ManyToOne(() => Product, (product) => product.orderItems)
  product!: Relation<Product>;

  @Column()
  productId!: number;

  @Column()
  quantity!: number;

  @ManyToOne(() => Order, (order) => order.items)
  order!: Relation<Order>;

  @Column()
  orderId!: number;
}
