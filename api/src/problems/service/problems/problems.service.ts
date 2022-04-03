import { Injectable, NotFoundException } from '@nestjs/common';
import { ContestsService } from 'src/contests/service/contests/contests.service';
import { PrismaService } from 'src/service/prisma/prisma.service';

@Injectable()
export class ProblemsService {
  constructor(
    private prismaService: PrismaService,
    private contestsService: ContestsService,
  ) {}
  async getAllProblems(contestId: string) {
    const contest = await this.contestsService.getContest(contestId);
    if (!contest) throw new NotFoundException();
    return await this.prismaService.problem.findMany({
      where: {
        contestId: contest.id,
      },
      select: {
        name: true,
        tag: true,
        createdAt: true,
        memoryLimit: true,
        timeLimit: true,
        difficulty: true,
        maxSubmissions: true,
      },
    });
  }
}
