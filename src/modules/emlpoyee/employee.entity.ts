import { OneToMany } from "typeorm";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Designation } from "../designation/designation.entity";
import { Module } from "../module/module.entity";
import { Role } from "../role/role.entity";
import { User } from "../user/user.entity";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.employees)
  user: User

  @ManyToOne(() => Designation, (designation) => designation.employees)
  designation: Designation

  @ManyToOne(() => Role, (role) => role.employees)
  role: Role

  @ManyToOne(() => Module, (module) => module.employees)
  employable_type: Module

  @Column()
  employable_id: number

  @Column()
  employee_no: string
}