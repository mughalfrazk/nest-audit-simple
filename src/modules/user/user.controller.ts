import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
  Query
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { GetAuthorizedUser } from '../../authentication/decorators/authorize-user.decorator';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { strings } from '../../services/constants/strings';
import { IsNull } from 'typeorm';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@ApiTags('Employee')
@UseGuards(JwtAuthGuard)
@Controller('employee')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @Serialize(UserDto)
  async getAllEmployeeByFirm(@GetAuthorizedUser(strings.roles.ADMIN) user, @Query('firm') firm: number) {
    if (strings.roles.SUPER_ADMIN === user.role.identifier) {
      if (!!firm) return this.userService.findByOptions({ company: { id: firm } })
      else return this.userService.findByOptions({ company: !!user?.company?.id ? { id: user?.company?.id } : IsNull() })
    }
    else return this.userService.findByOptions({ company: { id: user?.company?.id }})
  }

  @Get('/:id')
  async getEmployeeById(@GetAuthorizedUser() user, @Param('id') id: number) {
    if (user.role.identifier === strings.roles.EMPLOYEE && user.id === Number(id)) return this.userService.findOne(user.id)
    else if (user.role.identifier === strings.roles.ADMIN) {
      const employee = await this.userService.findOne(Number(id))
      if (employee?.company?.id === user.company.id) return employee;
      throw new ForbiddenException('Forbidden resource.')
    }
    else if (user.role.identifier === strings.roles.SUPER_ADMIN) return this.userService.findOne(Number(id))
    throw new ForbiddenException('Forbidden resource.')
  }

  @Patch('/')
  async update(@GetAuthorizedUser() user: User, @Body() body: any) {
    return this.userService.update(user.id, body);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException('User not found.');

    return this.userService.remove(id);
  }
}
