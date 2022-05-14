import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContactInformation } from "../contact-information/contact-information.entity";

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ContactInformation, (contact_information) => contact_information.city)
  contact_informations: ContactInformation[];

  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @Column()
  description: string;
}