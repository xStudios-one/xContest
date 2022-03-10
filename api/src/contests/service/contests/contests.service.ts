import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { Contest } from '@prisma/client';

@Injectable()
export class ContestsService {
  constructor(private prismaService: PrismaService) {}

  async getAllContests(): Promise<
    { name: string; createdAt: Date }[] | undefined
  > {
    return await this.prismaService.contest.findMany({
      select: { name: true, tag: true, createdAt: true },
    });
  }
  async getContest(tag: string) {
    return await this.prismaService.contest.findUnique({
      where: {
        tag: tag,
      },
    });
  }
  async getProblem(tag: string, contestId: number) {
    return await this.prismaService.problem.findMany({
      where: {
        AND: {
          tag: {
            equals: tag,
          },
          contestId: {
            equals: contestId,
          },
        },
      },
    });
  }
  async createContest(
    name: string,
    tag: string,
  ): Promise<Contest | undefined | string> {
    if (!tag.match(/^[a-z0-9\-]+$/i)) return undefined;
    try {
      return await this.prismaService.contest.create({
        data: {
          name: name,
          tag: tag,
        },
      });
    } catch (e) {
      return 'ae';
    }
  }
  async createProblem(
    name,
    tag,
    contestTag,
  ): Promise<
    | {
        id: number;
        tag: string;
        name: string;
        createdAt: Date;
        contestId: number;
      }
    | undefined
    | string
  > {
    const contest = await this.getContest(contestTag);
    if (!contest) {
      return undefined;
    }
    const problem = await this.getProblem(tag, contest.id);
    if (problem.length > 0) {
      return 'ae';
    }
    try {
      return await this.prismaService.problem.create({
        data: {
          name: name,
          tag: tag,
          contestId: contest.id,
        },
      });
    } catch (e) {
      return undefined;
    }
  }
}
