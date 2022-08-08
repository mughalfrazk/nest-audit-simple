import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
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

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}