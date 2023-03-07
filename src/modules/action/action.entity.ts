import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClientAssignment } from "../client-assignment/client-assignment.entity";
import { Permission } from "../permission/permission.entity";
import { Record } from "../record/record.entity";

@Entity()
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ClientAssignment, (client_assignment) => client_assignment.action)
  client_assignments: ClientAssignment[];

  @OneToMany(() => Permission, (permission) => permission.action)
  permissions: Permission[];

  @OneToMany(() => Record, (record) => record.action)
  records: Record[];

  @Column()
  name: string;

  @Column({ nullable: false })
  identifier: string;

  @Column()
  description: string;
}