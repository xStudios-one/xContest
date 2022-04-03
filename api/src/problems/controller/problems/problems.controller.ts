import { Controller, Get, Param } from '@nestjs/common';
import { ProblemsService } from 'src/problems/service/problems/problems.service';
@Controller('problems')
export class ProblemsController {
  constructor(private problemsService: ProblemsService) {}
  @Get(':contestTag')
  async isOnContest(@Param('contestTag') tag: string) {
    return await this.problemsService.getAllProblems(tag);
  }
}
