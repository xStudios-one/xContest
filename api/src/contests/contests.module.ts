import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.stratedy';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { ContestsController } from './controller/contests/contests.controller';
import { ContestsService } from './service/contests/contests.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ContestsController],
  providers: [ContestsService, PrismaService, JwtStrategy, UsersService],
})
export class ContestsModule {}
