import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContactInformation } from "../contact-information/contact-information.entity";

@Entity()
export class ContactInformationType {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ContactInformation, (contact_information) => contact_information.contact_information_type)
  contact_informations: ContactInformation[]

  @Column()
  name: string;

  @Column()
  description: string;
}