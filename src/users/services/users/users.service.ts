import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '@/common/dto/CreateUser.dto';

@Injectable()
export class UsersService {
  private users = [
    { username: 'husam', email: 'husam@gmail' },
    { username: 'john', email: 'john@gmail' },
  ];

  async fetchAll() {
    return this.users;
  }

  async createUser(userData: CreateUserDto) {
    this.users.push(userData);
    return;
  }
}
