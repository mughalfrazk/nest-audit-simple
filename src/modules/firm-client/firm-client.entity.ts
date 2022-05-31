import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../company/company.entity";

@Entity()
export class FirmClient {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Company, (company) => company.firms)
  firm: Company

  @ManyToOne(() => Company, (company) => company.clients)
  client: Company
}