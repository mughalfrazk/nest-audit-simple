import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClientAssignment } from "../client-assignment/client-assignment.entity";

@Entity()
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ClientAssignment, (client_assignment) => client_assignment.action)
  client_assignments: ClientAssignment[];

  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @Column()
  description: string;
}