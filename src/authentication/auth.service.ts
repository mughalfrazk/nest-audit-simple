import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UserService } from '../modules/user/user.service';
import { userSeeder } from 'src/modules/user/user.seeder';
import { promisify } from 'util';
import { EmployeeService } from 'src/modules/emlpoyee/employee.service';
import { DesignationService } from 'src/modules/designation/designation.service';
import { RoleService } from 'src/modules/role/role.service';
import { CompanyService } from 'src/modules/company/company.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
  ) {}

  async signup(body) {
    const { email, password } = body;

    const user = await this.usersService.findBy(email);
    if (user.length) throw new BadRequestException('Email already in use.');

    //Hash the password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');

    // Create a new user
    return await this.usersService.create({
      ...body,
      password: hashedPassword,
    });
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.findBy(email);
    if (!user) throw new NotFoundException('User not found.');

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('Wrong Credentails');

    return user;
  }

  async seed() {
    try {
      for (let i = 0; i < userSeeder.length; i++) {
        const element = userSeeder[i];
        const entity = await this.usersService.findBy(element.email);
        if (!entity.length) await this.signup(element)
      }
      console.log('Seeding done! User');
    } catch (error) {
      console.log("Seeding error! User => ", error)
    } 
  }
}
