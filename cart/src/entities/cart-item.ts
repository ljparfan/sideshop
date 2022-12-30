import { AppBaseEntity } from "@sideshop/common";
import { Column, Entity } from "typeorm";

@Entity()
export class CartItem extends AppBaseEntity {
  @Column()
  productId!: number;

  @Column()
  quantity!: number;

  @Column()
  userId!: number;
}
