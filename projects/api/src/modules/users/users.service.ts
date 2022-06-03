import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { CreateUser } from './dto/createUser.input';
import { User, UserRole } from '../../schemas/user.entity';

@Injectable()
export class UsersService {
  private users: Array<User> = [
    {
      email: 'john',
      firstName: 'Someone',
      lastName: 'Last',
      hash: bcrypt.hashSync('pass', 10),
      rtHash: bcrypt.hashSync('pass', 10),
      roles: [UserRole.USER],
    },
    {
      email: 'maria',
      firstName: 'Someone',
      lastName: 'Last',
      hash: bcrypt.hashSync('pass', 10),
      rtHash: bcrypt.hashSync('pass', 10),
      roles: [UserRole.USER],
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(user: CreateUser): Promise<User | undefined> {
    const { password, ...partialUser } = user;
    const newUser: User = {
      ...partialUser,
      hash: bcrypt.hashSync(password, 10),
      rtHash: bcrypt.hashSync(password, 10),
      roles: [UserRole.USER],
    };

    this.users.push(newUser);
    return newUser;
  }
}
