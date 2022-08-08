
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { UserService } from "../modules/user/user.service";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) { }

  async signup({ first_name, last_name, email, password }) {
    const user = await this.usersService.find(email);
    if (user.length) throw new BadRequestException('Email already in use.');

    //Hash the password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');

    // Create a new user
    return await this.usersService.create({ email, password: hashedPassword, first_name, last_name });

  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('User not found.');

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) throw new BadRequestException('Wrong Credentails');

    return user;
  }
}