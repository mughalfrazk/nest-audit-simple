import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClientAssignment } from "../client-assignment/client-assignment.entity";
import { Document } from "../document/document.entity";
import { Employee } from "../emlpoyee/employee.entity";
import { Record } from "../record/record.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ClientAssignment, (client_assignment) => client_assignment.user)
  client_assignments: ClientAssignment[]

  @OneToMany(() => Document, (document) => document.uploaded_by)
  documents: Document[]

  @OneToMany(() => Document, (document) => document.reviewed_by)
  docs: Document[]

  @OneToMany(() => Employee, (employee) => employee.user)
  employees: Employee[]

  @OneToMany(() => Record, (record) => record.created_by)
  records: Record[];

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  is_verified: string;

  @Column({ nullable: true })
  is_active: boolean;

  @Column({ nullable: true })
  is_deleted: boolean;
}