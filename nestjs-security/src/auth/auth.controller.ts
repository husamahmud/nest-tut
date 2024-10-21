import { Body, Controller, Post } from '@nestjs/common';

import { SignInDto } from '@/common/dto/signIn.dto';
import { AuthService } from '@/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
