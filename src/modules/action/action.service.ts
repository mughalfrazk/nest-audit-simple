import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Action } from "./action.entity";
import { actionSeeder } from "./action.seeder";

@Injectable()
export class ActionService {
  constructor(@InjectRepository(Action) private repo: Repository<Action>) {}

  async findBy(options: any = null) {
    if (!options) return this.repo.find();
    return this.repo.findBy(options);
  }

  async seed() {
    try {
      let dataArray = [];

      for (let i = 0; i < actionSeeder.length; i++) {
        const element = actionSeeder[i];
        const entity = await this.findBy({ name: element.name });
        if (!entity.length) dataArray.push(element)
      }

      if (!!dataArray.length) await this.repo.save(dataArray);
      console.log('Seeding done! Action');
    } catch (error) {
      console.log("Sending error! Action =>", error)
    }
  }
}