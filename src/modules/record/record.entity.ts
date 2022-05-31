import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Action } from "../action/action.entity";
import { User } from "../user/user.entity";

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Action, (action) => action.records)
  action: Action;

  @ManyToOne(() => User, (user) => user.records)
  created_by: User

  @CreateDateColumn()
  created_at: Date;
}