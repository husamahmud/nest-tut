import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from '../common/dto/createUser.dto';
import { UpdateUserDto } from '@/common/dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, data);
  }
}
