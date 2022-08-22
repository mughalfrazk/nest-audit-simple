import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Session, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { AuthService } from "../../authentication/auth.service";
import { CurrentUser } from "../../authentication/decorators/current-user.decorator";
import { AuthGuard } from "../../authentication/guards/auth.guard";
import { UserDto } from "./dtos/user.dto";
import { User } from "./user.entity";
import { IUser } from "./user.interface";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private authService: AuthService) { }

  @Get('/auth/whoami')
  @Serialize(UserDto)
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/auth/signup')
  @Serialize(UserDto)
  async createUser(@Body() body: IUser, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('/auth/signin')
  @Serialize(UserDto)
  async signin(@Body() body: any, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);

    if (!user.is_active) throw new UnauthorizedException('User is Inactive.');
    if (user.is_deleted) throw new NotFoundException('User no longer exists.');
    if (!user.is_verified) throw new UnauthorizedException('User verification required.');

    session.userId = user.id
    return user;
  }

  @Get('/auth/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @UseGuards(AuthGuard)
  @Patch('/')
  async update(@CurrentUser() user: User, @Body() body: any) {
    return this.userService.update(user.id, body)
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException('User not found.');

    return this.userService.remove(id)
  }
}