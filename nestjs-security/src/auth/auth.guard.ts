import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtSecret } from '@/constants/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  /**
   * Extracts the Bearer token from the Authorization header of the request.
   * @param request - The incoming request object containing headers.
   * @returns The extracted token if the Authorization header is in the Bearer format, otherwise undefined.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  /**
   * This method is called automatically by Nest before every request.
   * It checks that the request contains a valid Bearer token in the Authorization header.
   * If the token is valid, it stores the payload of the token in the request object with the key "user".
   * If the token is invalid or missing, it throws an UnauthorizedException.
   * @param context - The context of the request, which contains the request object.
   * @returns A boolean indicating whether the request is authorized or not.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtSecret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
