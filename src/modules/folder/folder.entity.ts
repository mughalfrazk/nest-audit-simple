import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../company/company.entity";
import { Document } from "../document/document.entity";

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, (company) => company.folders)
  firm: Company

  @OneToMany(() => Document, (document) => document.folder)
  documents: Document[]

  @ManyToOne(() => Folder, (folder) => folder.children, { nullable: true })
  parent: Folder

  @OneToMany(() => Folder, (folder) => folder.parent)
  children: Folder[]

  @Column()
  level_no: number

  @Column()
  name: string

  @Column()
  description: string
}