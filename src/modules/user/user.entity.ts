import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ClientAssignment } from '../client-assignment/client-assignment.entity';
import { Company } from '../company/company.entity';
import { Designation } from '../designation/designation.entity';
import { Document } from '../document/document.entity';
import { Record } from '../record/record.entity';
import { Role } from '../role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => ClientAssignment,
    (client_assignment) => client_assignment.user,
    { nullable: true },
  )
  client_assignments: ClientAssignment[];

  @OneToMany(() => Document, (document) => document.uploaded_by)
  documents: Document[];

  @OneToMany(() => Document, (document) => document.reviewed_by)
  docs: Document[];

  @OneToMany(() => Record, (record) => record.created_by)
  records: Record[];

  @ManyToOne(() => Designation, (designation) => designation.users)
  designation: Designation;

  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  role: Role;

  @ManyToOne(() => Company, (company) => company.firms)
  company: Company;

  @Column({ nullable: true })
  employee_no: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ default: false })
  is_active: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
