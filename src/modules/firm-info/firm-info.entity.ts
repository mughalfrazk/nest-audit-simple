import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../company/company.entity";

@Entity()
export class FirmInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, (company) => company.infos)
  company: Company;

  @Column()
  workspace: string;
}