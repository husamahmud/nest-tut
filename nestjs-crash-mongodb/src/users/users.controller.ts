import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '@/common/dto/CreateUser.dto';
import { UpdateUserDto } from '@/common/dto/UpdateUser.dto';

@Controller('users')
export class UsersController {
  /** Inject the UsersService to use its methods in the controller methods **/
  constructor(private userService: UsersService) {}

  /**
   * @description Create a new user
   * @param {CreateUserDto} createUserDto - User data
   * @returns {Promise<User>} - User data
   * use ValidationPipe to validate the incoming data
   * use Post decorator to create a new user
   * use Body decorator to get the user data from the request body
   **/
  @Post('/create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  /**
   * @description Get all users
   * @returns {Promise<User[]>} - List of users
   * use Get decorator to get all users
   **/
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  /**
   * @description Get user by ID
   * @param {string} id - User ID
   * @returns {Promise<User>} - User data
   * use Get decorator to get the user by ID
   **/
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  /**
   * @description Update user by ID
   * @param {string} id - User ID
   * @param {UpdateUserDto} updateUserDto - User data
   * @returns {Promise<User>} - Updated user data
   * use ValidationPipe to validate the incoming data
   * use Patch decorator to update the user data partially instead of updating the whole user data
   * use Param decorator to get the user ID from the URL
   * use Body decorator to get the user data from the request body
   **/
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserById(id, updateUserDto);
  }

  /**
   * @description Delete user by ID
   * @param {string} id - User ID
   * @returns {Promise<User>} - Deleted user
   * use ValidationPipe to validate the incoming data
   * use Delete decorator to delete the user data
   * use Param decorator to get the user ID from the URL
   * use UsePipes decorator to use the ValidationPipe
   **/
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }
}
