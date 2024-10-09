import { Module } from '@nestjs/common';

import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { MainController } from './main.controller';

@Module({
  imports: [UsersModule, PostsModule],
  controllers: [MainController],
  providers: [],
})
export class AppModule {}
