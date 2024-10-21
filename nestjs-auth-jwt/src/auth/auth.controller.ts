import { Body, Controller, HttpException, Post } from '@nestjs/common';

import { AuthPayloadDto } from '@/common/dto/auth.dto';
import { AuthService } from '@/auth/auth.service';

@Controller('auth')
export class AuthController {
  /** authService is injected into the AuthController constructor */
  constructor(private authService: AuthService) {}

  @Post('login')
  /**
   * Validates the given {@link AuthPayloadDto} and returns a JSON Web Token
   * if the credentials are valid.
   *
   * @returns The JSON Web Token if the credentials are valid, otherwise an
   * {@link HttpException} is thrown with a status of 401.
   */
  login(
    @Body()
    authPayload: AuthPayloadDto,
  ) {
    const token = this.authService.validateUser(authPayload);
    if (!token) throw new HttpException('Invalid credentials', 401);
    return token;
  }
}
