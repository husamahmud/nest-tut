import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { SignInDto } from '@/common/dto/signIn.dto';
import { AuthService } from '@/auth/auth.service';
import { AuthGuard } from '@/auth/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  /**
   * Handles user sign-in.
   * @param signInDto - Data transfer object containing user's sign-in information,
   *                    including username and password.
   * @returns A promise that resolves to an object containing an access token
   *          if authentication is successful, or throws an UnauthorizedException
   *          if authentication fails.
   */
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  /**
   * Handles retrieval of the currently authenticated user's profile.
   * @param req - The current request object, which contains the user object
   *              in its "user" property.
   * @returns A promise that resolves to the user object if authentication is
   *          successful, or throws an UnauthorizedException if authentication
   *          fails.
   */
  getProfile(@Request() req) {
    return req.user;
  }
}
