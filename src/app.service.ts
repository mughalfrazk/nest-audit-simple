import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Console } from 'console';
import { AuthService } from './authentication/auth.service';
import { RoleService } from './modules/role/role.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private roleService: RoleService,
    private authService: AuthService
  ) { }

  onApplicationBootstrap() {
    // this.roleService.seed();
    // this.authService.seed();
  }

  getHello(): string {
    return 'Audit Simple Nest.js Backend.';
  }
}
