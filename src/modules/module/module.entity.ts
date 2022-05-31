import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "../permission/permission.entity";

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Permission, (permission) => permission.module)
  permissions: Permission[];

  @Column()
  name: string;

  @Column()
  description: string;
}