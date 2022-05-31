import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "../emlpoyee/employee.entity";
import { RolePermission } from "../role-permission/role-permission.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => Employee, (employee) => employee.role)
  employees: Employee[]

  @OneToMany(() => RolePermission, (role_permission) => role_permission.role)
  role_permissions: RolePermission[];

  @Column()
  name: string;

  @Column()
  description: string;
}