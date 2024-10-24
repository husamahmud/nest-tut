import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Authenticates a user by verifying the provided username and password.
   * If successful, returns an access token.
   *
   * @param username - The username of the user attempting to sign in.
   * @param pass - The password of the user attempting to sign in.
   * @returns A promise that resolves to an object containing the access token
   *          if authentication is successful. Throws an UnauthorizedException
   *          if the credentials are invalid.
   */
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string } | Error> {
    const user = await this.usersService.findOne(username);
    if (user.password !== pass) throw new UnauthorizedException();

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
