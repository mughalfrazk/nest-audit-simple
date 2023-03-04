import { Controller, Get, Post, Request, UseGuards, Session, Body, BadRequestException } from '@nestjs/common';
import { UserDto } from '../modules/user/dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RoleService } from '../modules/role/role.service';
import { UserService } from '../modules/user/user.service';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
    private readonly roleService: RoleService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  @Serialize(UserDto)
  async createUser(@Body() body: SignUpDto) {
    let role;

    const checkUser = await this.usersService.findBy(body.email);
    if (!!checkUser.length) throw new BadRequestException('Email already in use.');
    // if (!!body.role_id) role = await this.roleService.findOne(body.role_id);
    // if (!role || role.identifier === 'super_admin') throw new BadRequestException('Please define a valid role.')

    body['role'] = role?.role_id;
    body['company'] = body.company_id;
    body['designation'] = body.designation_id;

    const user = await this.authService.signup(body);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}