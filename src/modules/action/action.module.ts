import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActionController } from "./action.comtroller";
import { Action } from "./action.entity";
import { ActionService } from "./action.service";

@Module({
  imports: [TypeOrmModule.forFeature([Action])],
  controllers: [ActionController],
  providers: [ActionService],
  exports: [ActionService]
})
export class ActionModule {}