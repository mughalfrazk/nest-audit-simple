import { Body, Controller, Get, Post, Session, UseGuards } from "@nestjs/common";
import { AuthService } from "../../authentication/auth.service";
import { CurrentUser } from "../../authentication/decorators/current-user.decorator";
import { AuthGuard } from "../../authentication/guards/auth.guard";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('auth')
export class UserController {
  constructor(private userService: UserService, private authService: AuthService) { }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: any, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: any, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id
    return user;
  }

  @Get('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }
}