import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Action } from "../action/action.entity";
import { Module } from "../module/module.entity";
import { RolePermission } from "../role-permission/role-permission.entity";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Module, (module) => module.permissions)
  module: Module;

  @ManyToOne(() => Action, (action) => action.permissions)
  action: Action;

  @OneToMany(() => RolePermission, (role_permission) => role_permission.permission)
  role_permissions: RolePermission[];
}