import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Module } from "../module/module.entity";

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Module, (module) => module.attachments)
  attachmentable_type: Module

  @Column()
  attachmentable_id: number;

  @Column()
  name: string

  @Column()
  type: string

  @Column()
  path: string;

}