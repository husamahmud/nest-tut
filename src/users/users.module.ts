import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UsersController } from '@/users/controllers/users/users.controller';
import { UsersService } from '@/users/services/users/users.service';
import { UsersMiddleware } from '@/users/middlewares/users/users.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(UsersMiddleware).forRoutes(UsersController);
  }
}
