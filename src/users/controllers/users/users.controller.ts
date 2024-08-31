import { Request, Response } from 'express';

import { Controller, Get, Post, Req, Res } from '@nestjs/common';

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

  @Post()
  createUser(@Req() request: Request, @Res() response: Response) {
    console.log(request.body);
    response.send('User created');
  }
}
