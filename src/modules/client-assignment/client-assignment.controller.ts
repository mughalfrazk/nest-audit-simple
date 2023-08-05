import { BadRequestException, Body, Controller, ForbiddenException, Get, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../authentication/guards/jwt-auth.guard";
import { GetAuthorizedUser } from "../../authentication/decorators/authorize-user.decorator";
import { strings } from "../../services/constants/strings";
import { FirmClientService } from "../firm-client/firm-client.service";
import { UserService } from "../user/user.service";
import { ClientAssignmentService } from "./client-assignment.service";
import { CreateClientAssignmentDto } from "./dtos/create-client-assignment.dto";
import { In } from "typeorm";
import { Serialize } from "../../interceptors/serialize.interceptor";
import { ClientAssignmentDto } from "./dtos/client-assignment.dto";

@Controller('client-assignment')
@UseGuards(JwtAuthGuard)
export class ClientAssignmentController {
  constructor(
    private clientAssignmentService: ClientAssignmentService,
    private firmClientService: FirmClientService,
    private userService: UserService
  ) {}

  @Get('/')
  @Serialize(ClientAssignmentDto)
  async getPermissionListByFirm(@GetAuthorizedUser() user, @Query('firm') firm: number, @Query('employee') employee: number) {
    let firmId: number;
    let employeeId: number;
    let firmClientIds: number[];
    let isSuperAdmin: boolean = user.role.identifier === strings.roles.SUPER_ADMIN;
    let isAdmin: boolean = user.role.identifier === strings.roles.ADMIN;

    // Authorize user and gather request
    if (isSuperAdmin) { // if user is super_admin
      employeeId = employee
      if (!!firm) firmId = firm;
      else throw new BadRequestException("'firm' is required.'")
    
      const firmClients = await this.firmClientService.findBy({ firm: { id: firmId } }, ['client']);
      firmClientIds = firmClients.map(item => item.client.id);
    } 
    else if (isAdmin) { // if user is admin
      firmId = user.company.id
      if (!!employee) {
        const firmEmployee = await this.userService.findOne(employee)
        if (firmEmployee.company.id === user.company.id) employeeId = employee
        else throw new ForbiddenException('Forbidden resource.')
      }
    
      const firmClients = await this.firmClientService.findBy({ firm: { id: firmId } }, ['client']);
      firmClientIds = firmClients.map(item => item.client.id);
    } else if (!isSuperAdmin && !isAdmin) { // if user is employee
      if (Number(employee) === user.id) employeeId = Number(employee);
      else throw new ForbiddenException('Forbidden resource.')
    }

    
    if (!isSuperAdmin && !isAdmin) return this.clientAssignmentService.findBy({ user: { id: employee } }, ['company', 'user', 'action']);
    else if (!!employeeId) return this.clientAssignmentService.findBy({ company: { id: In(firmClientIds) }, user: { id: employee } }, ['company', 'user', 'action']);
    else return this.clientAssignmentService.findBy({ company: { id: In(firmClientIds) } }, ['company', 'user', 'action']);
  }

  @Post('/')
  async create(@GetAuthorizedUser(strings.roles.ADMIN) user, @Body() body: CreateClientAssignmentDto) {
    let isSuperAdmin: boolean = user.role.identifier === strings.roles.SUPER_ADMIN;
    let isAdmin: boolean = user.role.identifier === strings.roles.ADMIN;
    const { client_id, user_id, action_id } = body;

    const [company] = await this.firmClientService.findBy({ client: { id: client_id } }, ['firm'])
    const employee = await this.userService.findOne(user_id);

    if (isAdmin) {
      if (company.firm.id !== user.company.id) throw new ForbiddenException('Forbidden resource.');
      if (employee.company.id !== user.company.id) throw new ForbiddenException('Forbidden resource.');
    }
    else if (!isSuperAdmin && !isAdmin) throw new ForbiddenException('Forbidden resource.');
    if (company.firm.id !== employee.company.id) throw new BadRequestException('Invalid request.');

    const checkIfFirstPermission = await this.clientAssignmentService.findBy({ user: { id: user_id }, company: { id: client_id }}, [])
    if (!checkIfFirstPermission.length) {
      const readPermissionBody = { ...body };
      readPermissionBody.action_id = 2

      this.clientAssignmentService.create(readPermissionBody)
    } else {
      const assignment = await this.clientAssignmentService.findBy({ user: { id: user_id }, company: { id: client_id }, action: { id: action_id } }, [])
      if (!!assignment.length) throw new BadRequestException('Permission already exists.')
    }

    return this.clientAssignmentService.create(body);
  }
}