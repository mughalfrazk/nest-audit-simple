import {
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Designation } from '../designation/designation.entity';
import { Role } from '../role/role.entity';
import { User } from '../user/user.entity';
import { Company } from '../company/company.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.employees)
  user: User;

  @ManyToOne(() => Designation, (designation) => designation.employees)
  designation: Designation;

  @ManyToOne(() => Role, (role) => role.employees)
  role: Role;

  @ManyToOne(() => Company, (company) => company.firms)
  firm: Company;

  @Column()
  employee_no: string;

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
