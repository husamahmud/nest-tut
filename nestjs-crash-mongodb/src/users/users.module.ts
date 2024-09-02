import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersMiddleware } from './users.middleware';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from '@/users/users.service';
import { User, UserSchema } from '@/schemas/User.schema';
import { UsersController } from '@/users/users.controller';
import {
  UserSettings,
  UserSettingsSchema,
} from '@/schemas/UserSettings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserSettings.name,
        schema: UserSettingsSchema,
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
      {
        path: 'users/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}
