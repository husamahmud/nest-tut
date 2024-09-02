import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { CreateUserDto } from '@/common/dto/CreateUser.dto';
import { UsersService } from '@/users/services/users/users.service';
import { ValidateCreateUserPipe } from '@/users/pipes/validate-create-user.pipe';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // ! Route
  @Get()
  async getUsers(@Res() response: Response) {
    // return [{ id: 1, username: 'husam', email: 'husam@gmail' }];

    const users = await this.userService.fetchAll();
    return response.status(200).json(users);
  }

  // ! Nested Route
  @Get('/posts')
  getUserPosts() {
    return [
      {
        id: 1,
        username: 'husam',
        posts: [
          { id: 1, title: 'Post 1' },
          { id: 2, title: 'Post 2' },
        ],
      },
    ];
  }

  //! Post request
  @Post('/create')
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  //! Route params
  @Get(':id/:name')
  getUserById(@Param('id') id: string, @Param('name') name: string) {
    console.log('id', id);
    console.log('name', name);
    return { id, name };
  }

  //! Query params
  @Get('query')
  getUserByQuery(@Query('sortBy') sortBy: string) {
    console.log('sortBy', sortBy);
    return [{ id: 1, username: 'husam', email: 'husam@gmail' }];
  }
}

/**
 * @Note:
 * - getUser(@Param('id') id: ParseIntPipe) { ... } // ParseIntPipe will parse the id to integer
 * - getUser(@Query('id') id: ParseBoolPipe) { ... } // ParseBoolPipe will parse the id to boolean
 *    - http://localhost:3000/users/query?id=true // true
 *    - http://localhost:3000/users/query?id=false // false
 *    - http://localhost:3000/users/query?id=0 // validation error
 *    - http://localhost:3000/users/query?id=1 // validation error
 *    - http://localhost:3000/users/query?id=jfksa // validation error
 **/
