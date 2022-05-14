import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../company/company.entity";

@Entity()
export class CompanyType {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Company, (company) => company.company_type)
  companies: Company[]

  @Column()
  name: string;

  @Column()
  description: string;
}