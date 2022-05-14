import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../company/company.entity";

@Entity()
export class Designation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, (company) => company.designations)
  company: Company;

  @Column()
  name: string;

  @Column()
  description: string;
}