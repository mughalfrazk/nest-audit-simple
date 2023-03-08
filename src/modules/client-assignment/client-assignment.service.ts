import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClientAssignment } from "./client-assignment.entity";

@Injectable()
export class ClientAssignmentService {
  constructor(@InjectRepository(ClientAssignment) private repo: Repository<ClientAssignment>) {}

  async create({ client_id, user_id, action_id }) {
    const entity = await this.repo.create({
      company: client_id,
      user: user_id,
      action: action_id
    });
    return this.repo.save(entity);
  }

  async findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async findBy(options: any, relations: any[]) {
    if (!options) return this.repo.find();
    return this.repo.find({ where: options, relations })
  }

  async remove(id: number) {
    return this.repo.delete({ id });
  }
}