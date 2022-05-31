import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../company/company.entity";
import { Employee } from "../emlpoyee/employee.entity";

@Entity()
export class Designation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, (company) => company.designations)
  company: Company;

  @OneToMany(() => Employee, (employee) => employee.designation)
  employees: Employee[]

  @Column()
  name: string;

  @Column()
  description: string;
}