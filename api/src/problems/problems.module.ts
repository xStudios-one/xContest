import { Module } from '@nestjs/common';
import { ContestsService } from 'src/contests/service/contests/contests.service';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { ProblemsController } from './controller/problems/problems.controller';
import { ProblemsService } from './service/problems/problems.service';

@Module({
  controllers: [ProblemsController],
  providers: [ProblemsService, PrismaService, ContestsService],
})
export class ProblemsModule {}
