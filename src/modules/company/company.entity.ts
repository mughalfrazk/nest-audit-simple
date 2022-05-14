import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClientAssignment } from "../client-assignment/client-assignment.entity";
import { CompanyType } from "../company-type/company-type.entity";
import { Designation } from "../designation/designation.entity";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CompanyType, (company_type) => company_type.companies)
  company_type: CompanyType

  @OneToMany(() => ClientAssignment, (client_assignment) => client_assignment.company)
  client_assignments: ClientAssignment[]

  @OneToMany(() => Designation, (designation) => designation.company)
  designations: Designation[];

  @Column()
  name: string;

  @Column()
  abbreviation: string;
}