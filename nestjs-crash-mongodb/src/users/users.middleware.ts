import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { UsersService } from './users.service';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    const isExists = await this.userService.getUserById(req.params.id);
    if (!isValidId || !isExists) throw new HttpException('User not found', 404);

    next();
  }
}
