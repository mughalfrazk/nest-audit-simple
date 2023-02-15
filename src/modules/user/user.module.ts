import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../../authentication/auth.service';
import { CurrentUserInterceptor } from '../../authentication/interceptors/current-user.interceptor';
import { RoleModule } from '../role/role.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  exports: [UserService, AuthService],
})
export class UserModule {}
