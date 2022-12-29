import { AppBaseEntity } from "@sideshop/common";
import { Entity, Column } from "typeorm";

@Entity()
export default class User extends AppBaseEntity {
  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  mobileNumber!: string;

  @Column({ nullable: false })
  totpSecret!: string;

  @Column({ nullable: false, default: false })
  isAdmin!: boolean;

  @Column({ nullable: false, default: false })
  activated!: boolean;

  @Column({ nullable: false, default: 0, type: "int" })
  tokenVersion!: number;
}
