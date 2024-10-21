import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { User } from '@/types';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signIn(username: string, pass: string): Promise<Partial<User> | Error> {
    const user = await this.userService.findOne(username);
    if (user.password !== pass) throw new UnauthorizedException();

    const { password, ...result } = user;
    // TODO: generate a jwt and return it instead of user obj
    return result;
  }
}
