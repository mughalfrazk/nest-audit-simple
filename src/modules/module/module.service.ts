import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Module } from "./module.entity";
import { moduleSeeder } from "./module.seeder";

@Injectable()
export class ModuleService {
  constructor(@InjectRepository(Module) private repo: Repository<Module>) {}

  async findBy(name?: string) {
    if (!name) return this.repo.find();
    return this.repo.findBy({ name });
  }

  async seed() {
    try {
      let dataArray = [];

      for (let i = 0; i < moduleSeeder.length; i++) {
        const element = moduleSeeder[i];
        const entity = await this.findBy(element.name);
        if (!entity.length) dataArray.push(element)
      }

      if (!!dataArray.length) await this.repo.save(dataArray);
      console.log('Seeding done! Action');
    } catch (error) {
      console.log("Sending error! Action =>", error)
    }
  }
}