import mongoose from 'mongoose';
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { UsersService } from '@/users/users.service';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  /** Inject the UsersService to use its methods in the middleware **/
  constructor(private userService: UsersService) {}

  /**
   * @description Check if the user exists
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @param {NextFunction} next - Next function
   * @returns {void}
   **/
  async use(req: Request, res: Response, next: NextFunction) {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    const isExists = await this.userService.getUserById(req.params.id);
    if (!isValidId || !isExists) throw new HttpException('User not found', 404);

    next();
  }
}
