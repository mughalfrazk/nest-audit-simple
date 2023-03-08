import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FirmClientModule } from "../firm-client/firm-client.module";
import { UserModule } from "../user/user.module";
import { ClientAssignmentController } from "./client-assignment.controller";
import { ClientAssignment } from "./client-assignment.entity";
import { ClientAssignmentService } from "./client-assignment.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientAssignment]),
    FirmClientModule,
    UserModule
  ],
  controllers: [ClientAssignmentController],
  providers: [ClientAssignmentService],
  exports: [ClientAssignmentService]
})
export class ClientAssignmentModule {}