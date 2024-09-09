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

/**
 * @module UsersModule
 * @description Module for the users
 * use MongooseModule.forFeature to import the User and UserSettings schemas
 */
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

/**
 * @class UsersModule
 * @description Class for the users module
 * @implements {NestModule}
 * @method configure
 * @param {MiddlewareConsumer} consumer - Middleware consumer
 * @returns {void}
 * use configure method to apply the UsersMiddleware for the routes
 * 'users/:id' with GET, PATCH, and DELETE methods
 **/
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
