import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../../../common/dto/CreateUser.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return [{ id: 1, username: 'husam', email: 'husam@gmail' }];
  }

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

  //! Route params
  @Get(':id/:name')
  getUserById(@Param('id') id: string, @Param('name') name: string) {
    console.log('id', id);
    console.log('name', name);
    return { id, name };
  }

  @Post('/create')
  createUserPost(@Body() userData: CreateUserDto) {
    console.log(userData);
    return {};
  }
}
