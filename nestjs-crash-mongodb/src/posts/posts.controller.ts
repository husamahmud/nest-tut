import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from '@/posts/posts.service';
import { CreatePostDto } from '@/common/dto/CreatePost.dto';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post('/create')
  @UsePipes(new ValidationPipe())
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }
}
