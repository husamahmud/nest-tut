import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '../drizzle/schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DRIZZLE_CONFIG')
    private readonly drizzle: NodePgDatabase<typeof schema>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.drizzle
      .insert(schema.users)
      .values(createUserDto)
      .returning()
      .then((result) => result[0]);
  }

  findAll() {
    return this.drizzle.select().from(schema.users).execute();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
