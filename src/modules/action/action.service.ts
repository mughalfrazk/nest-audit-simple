import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Action } from "./action.entity";
import { actionSeeder } from "./action.seeder";

@Injectable()
export class ActionService {
  constructor(@InjectRepository(Action) private repo: Repository<Action>) {}

  async findBy(name?: string) {
    if (!name) return this.repo.find();
    return this.repo.findBy({ name });
  }

  async seed() {
    try {
      let dataArray = [];

      for (let i = 0; i < actionSeeder.length; i++) {
        const element = actionSeeder[i];
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