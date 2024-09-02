import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  UsePipes,
  HttpException,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../common/dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from '../common/dto/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const findUser = await this.userService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const findUser = await this.userService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
  }
}
