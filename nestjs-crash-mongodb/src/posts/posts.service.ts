import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '@/schemas/Post.Schema';
import { Model } from 'mongoose';
import { CreatePostDto } from '@/common/dto/CreatePost.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  createPost(createPostDto: CreatePostDto) {
    const newPost = new this.postModel(createPostDto);
    return newPost.save();
  }

  updatePost() {}

  findPostById() {}

  findAllPosts() {}

  deletePost() {}
}
