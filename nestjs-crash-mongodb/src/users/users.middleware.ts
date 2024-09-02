import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) throw new HttpException('User not found', 404);

    next();
  }
}
