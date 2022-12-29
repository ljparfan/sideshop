import { AppBaseEntity } from "@sideshop/common";
import { Column, Entity, OneToMany, Relation } from "typeorm";
import { Product } from "./product.js";

@Entity()
export class Category extends AppBaseEntity {
  @Column({ length: 100 })
  name!: string;

  @Column({ length: 10000, nullable: true })
  description?: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Relation<Product[]>;
}
