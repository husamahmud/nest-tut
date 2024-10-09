import { HttpException, Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new user
   **/
  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...data,
        userSetting: {
          create: {
            smsEnabled: false,
            notificationsOn: false,
          },
        },
      },
    });
  }

  /**
   * Get all users, Include userSetting
   **/
  getUsers() {
    return this.prisma.user.findMany({ include: { userSetting: true } });
  }

  /**
   * Get a user by id, Include userSetting (smsEnabled, notificationsOn)
   **/
  getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        userSetting: {
          select: {
            smsEnabled: true,
            notificationsOn: true,
          },
        },
      },
    });
  }

  /**
   * Delete a user by id
   **/
  async deleteUser(id: number) {
    const findUser = await this.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return this.prisma.user.delete({ where: { id } });
  }

  /**
   * Update a user by id
   * if the username is provided, check if it is already taken
   **/
  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    const findUser = await this.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);

    if (data.username) {
      const findUserByUsername = await this.prisma.user.findUnique({
        where: { username: data.username as string },
      });

      if (findUserByUsername && findUserByUsername.id !== id) {
        throw new HttpException('Username already taken', 400);
      }
    }

    return this.prisma.user.update({ where: { id }, data });
  }

  /**
   * Update a user's settings by id
   **/
  async updateUserSetting(userId: number, data: Prisma.UserSettingUpdateInput) {
    const findUser = await this.getUserById(userId);
    if (!findUser) throw new HttpException('User not found', 404);
    if (!findUser.userSetting) throw new HttpException('Bad request', 400);

    return this.prisma.userSetting.update({
      where: { userId },
      data,
    });
  }
}
