import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUser } from '../users/dto/createUser.input';
import { User } from '../../schemas/user.entity';
import jwtPayload from './util/jwtPayload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(user: CreateUser, res: Response) {
    const created = await this.usersService.create(user);

    const { token, refresh } = jwtPayload(created, this.jwtService, this.configService);
    res.cookie('user', token);
    res.cookie('refresh', refresh);

    const { hash, rtHash, ...stripped } = created;
    return stripped;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && bcrypt.compareSync(pass, user.hash)) {
      const { hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User, res: Response) {
    const payload = { email: user.email, first: user.firstName, last: user.lastName };
    const token = this.jwtService.sign(payload);
    const refresh = this.jwtService.sign({}, { expiresIn: '15d' });
    res.cookie('user', token);
    res.cookie('refresh', refresh);
    return token;
  }
}
