import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma/prisma.service';
import { User } from '@prisma/client';
import * as sha256 from 'crypto-js/sha256';
import * as uniqid from 'uniqid';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: {
        name: username,
      },
    });
  }

  async getById(id: number): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  }

  async createUser(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const salt = uniqid.process();
    const user = await this.prisma.user.create({
      data: {
        name: username,
        password: sha256(password + salt).toString(),
        salt: salt,
      },
    });

    if (user) return user;
  }

  async checkLogin(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.findOne(username);
    if (user == undefined) return undefined;

    if (user.password == sha256(password + user.salt).toString()) return user;
    return undefined;
  }
}
