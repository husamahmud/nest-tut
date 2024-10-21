import { Injectable } from '@nestjs/common';

import { User } from '@/types';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'husam',
      password: 'password',
    },
    {
      id: 2,
      username: 'john',
      password: 'password',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
