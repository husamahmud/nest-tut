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

  /**
   * Finds a user by their username.
   *
   * @param username - The username of the user to find.
   * @returns A promise that resolves to a User object if found, or undefined if no user exists with the provided username.
   */
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
