import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@/common/dto/createUser.dto';
import { UpdateUserDto } from '@/common/dto/updateUser.dto';
import { UpdateUserSettingsDto } from '@/common/dto/updateUserSettings.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  /**
   * Create a new user
   * UsePipes(ValidationPipe) is used to validate the incoming data
   **/
  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  /**
   * Get all users
   **/
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  /**
   * Get a user by id
   * ParseIntPipe is used to parse the id to a number
   **/
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  /**
   * Delete a user by id
   * ParseIntPipe is used to parse the id to a number
   **/
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  /**
   * Update a user by id
   * Patch is used instead of Put because we are updating only the fields that are provided
   * ParseIntPipe is used to parse the id to a number
   * UsePipes(ValidationPipe) is used to validate the incoming data
   **/
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, data);
  }

  @Patch(':id/settings')
  async updateUserSettings(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserSettingsDto,
  ) {
    return this.userService.updateUserSetting(id, data);
  }
}
