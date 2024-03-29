import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from '../city/city.entity';
import { ContactInformationType } from '../contact-information-type/contact-information-type.entity';
import { Country } from '../country/country.entity';
import { Module } from '../module/module.entity';

@Entity()
export class ContactInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ContactInformationType,
    (contact_information_type) => contact_information_type.contact_informations,
  )
  contact_information_type: ContactInformationType;

  @ManyToOne(() => City, (city) => city.contact_informations)
  city: City;

  @ManyToOne(() => Country, (country) => country.contact_informations)
  country: Country;

  @ManyToOne(() => Module, (module) => module.contact_informations)
  contactable_type: Module;

  @Column()
  contactable_id: number;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;
}
