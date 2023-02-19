import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientAssignment } from '../client-assignment/client-assignment.entity';
import { CompanyType } from '../company-type/company-type.entity';
import { Designation } from '../designation/designation.entity';
import { Document } from '../document/document.entity';
import { FirmClient } from '../firm-client/firm-client.entity';
import { FirmInfo } from '../firm-info/firm-info.entity';
import { Folder } from '../folder/folder.entity';
import { User } from '../user/user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CompanyType, (company_type) => company_type.companies, { nullable: false })
  company_type: CompanyType;

  @OneToMany(
    () => ClientAssignment,
    (client_assignment) => client_assignment.company,
  )
  client_assignments: ClientAssignment[];

  @OneToMany(() => Designation, (designation) => designation.company)
  designations: Designation[];

  @OneToMany(() => Folder, (folder) => folder.client)
  folders: Folder[];

  @OneToMany(() => Document, (document) => document.client)
  documents: Document[];

  @OneToMany(() => FirmClient, (firm_client) => firm_client.firm)
  firms: FirmClient[];

  @OneToMany(() => FirmClient, (firm_client) => firm_client.client)
  clients: FirmClient[];

  @OneToMany(() => User, (user) => user.company)
  employees: User[];

  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @Column({ nullable: true })
  workspace: string;

  @Column({ nullable: true })
  bucket_name: string;

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
