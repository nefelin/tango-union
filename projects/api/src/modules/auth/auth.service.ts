import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserInput } from '../users/dto/createUser.input';
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

  async register(user: CreateUserInput, res: Response) {
    const created = await this.usersService.create(user);

    const { token, refresh } = jwtPayload(created, this.jwtService, this.configService);
    res.cookie('user', token);
    res.cookie('refresh', refresh);

    return created;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username).then((doc) => doc?.toObject());
    if (user && bcrypt.compareSync(pass, user.hash)) {
      const { hash, refreshHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User, res: Response) {
    const { token, refresh } = jwtPayload(user, this.jwtService, this.configService);
    await this.usersService.login(user.email, refresh);

    res.cookie('user', token);
    res.cookie('refresh', refresh);
    return token;
  }

  async logout(user: User, res: Response) {
    await this.usersService.logout(user.email);
    res.clearCookie('user');
    res.clearCookie('refresh');
  }

  async refresh(user: User, res: Response) {
    const { token, refresh } = jwtPayload(user, this.jwtService, this.configService);
    await this.usersService.refresh(user.email, refresh);
    res.cookie('user', token);
    res.cookie('refresh', refresh);
  }
}
