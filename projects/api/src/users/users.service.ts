import { Injectable } from '@nestjs/common';

export type User = {
  id: string;
  // firstName: string;
  // lastName: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: Array<User> = [
    {
      id: '1',
      username: 'john',
      password: 'changeme',
    },
    {
      id: '25',
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
