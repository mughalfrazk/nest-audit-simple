import { Column } from "typeorm";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Action } from "../action/action.entity";
import { Module } from "../module/module.entity";
import { User } from "../user/user.entity";

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Action, (action) => action.records)
  action: Action;

  @ManyToOne(() => User, (user) => user.records)
  created_by: User

  @ManyToOne(() => Module, (module) => module.records)
  recordable_type: Module

  @Column()
  recordable_id: number

  @CreateDateColumn()
  created_at: Date;
}