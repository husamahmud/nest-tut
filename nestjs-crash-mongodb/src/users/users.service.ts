import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/User.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../common/dto/CreateUser.dto';
import { UpdateUserDto } from '../common/dto/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async getUsers() {
    return this.userModel.find();
  }

  async getUserById(id: string) {
    return this.userModel.findById(id);
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModel.findById(id);
    const isSameData = Object.keys(updateUserDto).every(
      (key) => existingUser[key] === updateUserDto[key],
    );
    if (isSameData) throw new BadRequestException('No data changed');

    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    // new: true returns the updated document instead of the original document
  }

  async deleteUserById(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
