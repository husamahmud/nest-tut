import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from '@/schemas/User.schema';
import { CreateUserDto } from '@/common/dto/CreateUser.dto';
import { UpdateUserDto } from '@/common/dto/UpdateUser.dto';
import { UserSettings } from '@/schemas/UserSettings.schema';

@Injectable()
export class UsersService {
  /** Inject the User and UserSettings models to use their methods in the service **/
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  /**
   * @description Create a new user
   * @param {CreateUserDto} createUserDto - User data
   * @param {UserSettings} settings - User settings
   * @returns {Promise<User>} - User
   * if settings are provided, create a new user with the settings
   **/
  async createUser({
    settings,
    ...createUserDto
  }: CreateUserDto): Promise<User> {
    if (settings) {
      const newSettings = new this.userSettingsModel(settings);
      const savedSettings = await newSettings.save();

      const newUser = new this.userModel({
        ...createUserDto,
        settings: savedSettings._id,
      });
      return newUser.save();
    }

    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  /**
   * @description Get all users
   * @returns {Promise<User[]>} - List of users
   * use find method to get all users
   * use populate method to get the user settings along with the user not just the ID of the settings
   **/
  async getUsers(): Promise<User[]> {
    return this.userModel.find().populate('settings');
  }

  /**
   * @description Get user by ID
   * @param {string} id - User ID
   * @returns {Promise<User>} - User
   * use findById method to get the user by ID
   * use populate method to get the user settings along with the user not just the ID of the settings
   **/
  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id).populate('settings').populate('posts');
  }

  /**
   * @description Update user by ID
   * @param {string} id - User ID
   * @param {UpdateUserDto} updateUserDto - User data
   * @returns {Promise<User>} - Updated user
   * check if the data is the same, if so, throw an error
   * use findByIdAndUpdate method to update the user by ID
   * use new: true to return the updated document instead of the original document
   **/
  async updateUserById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const existingUser = await this.userModel.findById(id);
    const isSameData = Object.keys(updateUserDto).every(
      (key) => existingUser[key] === updateUserDto[key],
    );
    if (isSameData) throw new BadRequestException('No data changed');

    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  /**
   * @description Delete user by ID
   * @param {string} id - User ID
   * @returns {Promise<User>} - Deleted user
   * use findByIdAndDelete method to delete the user by ID
   **/
  async deleteUserById(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
