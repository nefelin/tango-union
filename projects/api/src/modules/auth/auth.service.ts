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

  async register(user: CreateUserInput) {
    const created = await this.usersService.create(user);
    return jwtPayload(created, this.jwtService, this.configService);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email).then((doc) => doc?.toObject());
    if (user && bcrypt.compareSync(pass, user.hash)) {
      const { hash, refreshHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const { token, refresh } = jwtPayload(user, this.jwtService, this.configService);
    await this.usersService.login(user.email, refresh);

    return { token, refresh };
  }

  async logout(user: User) {
    return this.usersService.logout(user.email);
  }

  async refresh(user: User) {
    const { token, refresh } = jwtPayload(user, this.jwtService, this.configService);
    await this.usersService.refresh(user.email, refresh);
    return { refresh, token };
  }
}
