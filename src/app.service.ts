import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AuthService } from './authentication/auth.service';
import { RoleService } from './modules/role/role.service';
import { CompanyTypeService } from './modules/company-type/company-type.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private roleService: RoleService,
    private authService: AuthService,
    private companyTypeSeeder: CompanyTypeService,
  ) {}

  onApplicationBootstrap() {
    // this.roleService.seed();
    // this.authService.seed();
    // this.companyTypeSeeder.seed();
  }

  getHello(): string {
    return 'Audit Simple Nest.js Backend.';
  }
}
