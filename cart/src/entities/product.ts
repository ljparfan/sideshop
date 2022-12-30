import { AppBaseEntity } from "@sideshop/common";
import { Column, Entity } from "typeorm";

@Entity()
export class Product extends AppBaseEntity {
  @Column()
  quantityInStock!: number;
}
