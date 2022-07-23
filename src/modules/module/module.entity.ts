import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attachment } from "../attachment/attachment.entity";
import { ContactInformation } from "../contact-information/contact-information.entity";
import { Employee } from "../emlpoyee/employee.entity";
import { Permission } from "../permission/permission.entity";
import { Record } from "../record/record.entity";

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Permission, (permission) => permission.module)
  permissions: Permission[];

  @OneToMany(() => ContactInformation, (contact_information) => contact_information.contactable_type)
  contact_informations: ContactInformation[]

  @OneToMany(() => Employee, (employee) => employee.employable_type)
  employees: Employee[]

  @OneToMany(() => Record, (record) => record.recordable_type)
  records: Record[]

  @OneToMany(() => Attachment, (attachment) => attachment.attachmentable_type)
  attachments: Attachment[]

  @Column()
  name: string;

  @Column()
  description: string;
}