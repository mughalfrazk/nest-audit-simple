import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AuthService } from './authentication/auth.service';
import { RoleService } from './modules/role/role.service';
import { CompanyTypeService } from './modules/company-type/company-type.service';
import { ContactInformationTypeService } from './modules/contact-information-type/contact-information-type.service';
import { ActionService } from './modules/action/action.service';
import { ModuleService } from './modules/module/module.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private roleService: RoleService,
    private actionService: ActionService,
    private companyTypeService: CompanyTypeService,
    private contactInformationTypeService: ContactInformationTypeService,
    private authService: AuthService,
    private moduleService: ModuleService
    ) {}

  async onApplicationBootstrap() {
    await this.runSeeder()
  }

  async runSeeder() {
    try {
      await this.roleService.seed();
      await this.actionService.seed();
      await this.companyTypeService.seed();
      await this.contactInformationTypeService.seed();
      await this.authService.seed();
      await this.moduleService.seed();
    } catch (error) {
      
    }
  }

  main(): string {
    return 'Audit Simple Nest.js Backend.';
  }
}
