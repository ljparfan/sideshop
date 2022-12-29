import { AppBaseEntity } from "@sideshop/common";
import { Column, Entity, ManyToOne, Relation } from "typeorm";
import { Brand } from "./brand.js";
import { Category } from "./category.js";

@Entity()
export class Product extends AppBaseEntity {
  @Column({ length: 100 })
  name!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column({ type: "int" })
  quantityInStock!: number;

  @Column({ length: 10000, nullable: true })
  description?: string;

  @ManyToOne(() => Category, (category) => category.products, {
    cascade: true,
  })
  category!: Relation<Category>;

  @Column()
  categoryId!: number;

  @ManyToOne(() => Brand, (brand) => brand.products, {
    cascade: true,
  })
  brand!: Relation<Brand>;

  @Column()
  brandId!: number;

  @Column("text", { array: true })
  photos!: string[]; // Add this line to store multiple photos
}
