import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Action } from "../action/action.entity";
import { Company } from "../company/company.entity";
import { User } from "../user/user.entity";

@Entity()
export class ClientAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, (company) => company.client_assignments)
  company: Company

  @ManyToOne(() => User, (user) => user.client_assignments)
  user: User

  @ManyToOne(() => Action, (action) => action.client_assignments)
  action: Action
}