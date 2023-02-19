import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../company/company.entity";
import { Folder } from "../folder/folder.entity";
import { User } from "../user/user.entity";

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Company, (company) => company.documents)
  client: Company

  @ManyToOne(() => Folder, (folder) => folder.documents)
  folder: Folder

  @ManyToOne(() => User, (user) => user.documents, { nullable: false })
  uploaded_by: User

  @ManyToOne(() => User, (user) => user.docs, { nullable: true })
  reviewed_by: User

  @Column()
  name: string

  @Column({ nullable: true })
  description: string;

  @Column()
  path: string

  @Column()
  audit_date: Date
}