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
      return 'au';
    }
  }
}
