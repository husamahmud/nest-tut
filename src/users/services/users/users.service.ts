import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '@/common/dto/CreateUser.dto';

@Injectable()
export class UsersService {
  async fetchAll() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return await response.json();
  }
}
