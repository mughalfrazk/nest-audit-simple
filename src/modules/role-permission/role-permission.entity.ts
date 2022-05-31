import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "../permission/permission.entity";
import { Role } from "../role/role.entity";

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, (role) => role.role_permissions)
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.role_permissions)
  permission: Permission;
}