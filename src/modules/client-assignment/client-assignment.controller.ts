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
  async getPermissionListByFirm(@GetAuthorizedUser(strings.roles.ADMIN) user, @Query('firm') firm: number, @Query('employee') employee: number) {
    let firmId;
    let isSuperAdmin = user.role.identifier !== strings.roles.ADMIN

    if (!isSuperAdmin) firmId = user.company.id
    else if (!!firm) firmId = firm
    else throw new BadRequestException("'firm' is required.'")

    const firmClients = await this.firmClientService.findBy({ firm: { id: firmId } }, ['client']);
    const firmClientIds = firmClients.map(item => item.client.id);

    // employee id exists, if the role is admin check employee belongs to admin's firm and return data by employee id. 
    if (!!employee) {
      if (isSuperAdmin) return this.clientAssignmentService.findBy({ company: { id: In(firmClientIds) }, user: { id: employee } }, ['company', 'user', 'action'])
      const firmEmployee = await this.userService.findOne(employee)
      if (firmEmployee.company.id === user.company.id) return this.clientAssignmentService.findBy({ company: { id: In(firmClientIds) }, user: { id: employee } }, ['company', 'user', 'action'])
      else throw new ForbiddenException('Forbidden resource.')
    }

    return this.clientAssignmentService.findBy({ company: { id: In(firmClientIds) } }, ['company', 'user', 'action'])
  }

  @Post('/')
  async create(@GetAuthorizedUser(strings.roles.ADMIN) user, @Body() body: CreateClientAssignmentDto) {
    const { client_id, user_id, action_id } = body;

    const [company] = await this.firmClientService.findBy({ client: { id: client_id } }, ['firm'])
    const employee = await this.userService.findOne(user_id);
    
    if (user.role.identifier !== strings.roles.SUPER_ADMIN) {
      if (company.firm.id !== user.company.id) throw new ForbiddenException('Forbidden resource.');
      if (employee.company.id !== user.company.id) throw new ForbiddenException('Forbidden resource.');
    }
    if (employee.role.identifier !== strings.roles.EMPLOYEE) throw new ForbiddenException('Forbidden resource.');
    if (company.firm.id !== employee.company.id) throw new ForbiddenException('Forbidden resource.');

    const assignment = await this.clientAssignmentService.findBy({ user: { id: user_id }, company: { id: client_id }, action: { id: action_id } }, [])
    if (!!assignment.length) throw new BadRequestException('Permission already exists.')

    return this.clientAssignmentService.create(body)
  }
}