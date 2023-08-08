import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module as ModuleEntity } from "./module.entity";
import { ModuleService } from "./module.service";

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity])],
  providers: [ModuleService],
  exports: [ModuleService]
})
export class ModuleModule {}