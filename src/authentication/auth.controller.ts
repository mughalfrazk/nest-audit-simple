import { Controller, Get, Post, Request, UseGuards, Body, BadRequestException } from '@nestjs/common';
import { UserDto } from '../modules/user/dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from '../modules/user/user.service';
import { GetAuthorizedUser } from './decorators/authorize-user.decorator';
import { strings } from '../services/constants/strings';
import { ForbiddenException } from '@nestjs/common/exceptions';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  async createUser(@GetAuthorizedUser(strings.roles.ADMIN) user, @Body() body: SignUpDto) {
    // let role;

    if (strings.roles.ADMIN === user.role.identifier) {
      if (Number(body.role_id) === 1) throw new ForbiddenException('Forbidden resource.')
      if (Number(body.company_id) !== user.company.id) throw new ForbiddenException('Forbidden resource.')
    } else {
      if (!body.company_id) throw new BadRequestException("'company_id' is required.")
    }

    const checkUser = await this.usersService.findBy(body.email);
    if (!!checkUser.length) throw new BadRequestException('Email already in use.');
    // if (!!body.role_id) role = await this.roleService.findOne(body.role_id);
    // if (!role || role.identifier === 'super_admin') throw new BadRequestException('Please define a valid role.')

    body['role'] = body?.role_id;
    body['company'] = strings.roles.ADMIN === user.role.identifier ? user.company.id : body.company_id;
    body['designation'] = body.designation_id;

    const newUser = await this.authService.signup(body);
    return newUser;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  getProfile(@GetAuthorizedUser() user) {
    return user;
  }
}