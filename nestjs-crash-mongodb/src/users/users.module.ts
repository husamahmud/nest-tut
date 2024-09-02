import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersMiddleware } from './users.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(UsersMiddleware).forRoutes(
      {
        path: 'users/:id',
        method: RequestMethod.GET,
      },
      {
        path: 'users/:id',
        method: RequestMethod.PATCH,
      },
    );
  }
}
