import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AuthService } from './authentication/auth.service';
import { RoleService } from './modules/role/role.service';
import { CompanyTypeService } from './modules/company-type/company-type.service';
import { ContactInformationTypeService } from './modules/contact-information-type/contact-information-type.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private roleService: RoleService,
    private authService: AuthService,
    private companyTypeSeeder: CompanyTypeService,
    private contactInformationTypeService: ContactInformationTypeService,
  ) {}

  onApplicationBootstrap() {
    // this.roleService.seed();
    // this.authService.seed();
    // this.companyTypeSeeder.seed();
    // this.contactInformationTypeService.seed();
  }

  main(): string {
    return 'Audit Simple Nest.js Backend.';
  }
}
