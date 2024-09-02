import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest-crash-monogdb')],
  controllers: [],
  providers: [],
})
export class AppModule {}
