import { Controller, Get } from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators";
import { JwtAuthGuard } from "../../authentication/guards/jwt-auth.guard";
import { GetAuthorizedUser } from "../../authentication/decorators/authorize-user.decorator";
import { strings } from "../../services/constants/strings";
import { ActionService } from "./action.service";

@Controller('action')
@UseGuards(JwtAuthGuard)
export class ActionController {
  constructor(private actionService: ActionService) {}

  @Get('/')
  async getAll(@GetAuthorizedUser(strings.roles.ADMIN) user) {
    return this.actionService.findBy();
  }
}