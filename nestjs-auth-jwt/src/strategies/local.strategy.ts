import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as strategy } from 'passport-local';

import { AuthService } from '@/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  validate(username: string, password: string) {}
}
