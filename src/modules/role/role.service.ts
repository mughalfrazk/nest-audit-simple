import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./role.entity";
import { roleSeeder } from "./role.seeder";

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private repo: Repository<Role>) {}

  find(name: string) {
    if (!name) return null;
    return this.repo.find({ name });
  }

  async seed() {
    roleSeeder.forEach(async element => {
      const role = await this.find(element.name);
      if (!role.length) this.repo.save(element);
    })

    console.log('Seeding done! Roles');
  }
}