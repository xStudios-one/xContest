import {
  Controller,
  Get,
  UseGuards,
  Post,
  Param,
  BadRequestException,
  Request,
  UnauthorizedException,
  Body,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ContestsService } from 'src/contests/service/contests/contests.service';
import { UsersService } from 'src/users/users.service';

@Controller('contests')
export class ContestsController {
  constructor(
    private contestsService: ContestsService,
    private usersService: UsersService,
  ) {}

  @Get()
  async getContests() {
    return await this.contestsService.getAllContests();
  }

  @Get(':tag')
  async getContest(@Param('tag') tag: string) {
    const response = await this.contestsService.getContest(tag);
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }

  @Get(':contestTag/:problemTag')
  async getProblem(
    @Param('problemTag') problemTag: string,
    @Param('contestTag') contestTag: string,
  ) {
    const contest = await this.contestsService.getContest(contestTag);
    if (!contest) {
      throw new NotFoundException();
    }
    const response = await this.contestsService.getProblem(
      problemTag,
      contest.id,
    );
    if (!response[0]) {
      throw new NotFoundException();
    }
    return response[0];
  }

  @UseGuards(JwtAuthGuard)
  @Post(':tag')
  async createContest(@Request() req, @Param('tag') tag: string, @Body() body) {
    const user = await this.usersService.getById(req.user.userId);
    const { name } = body;
    if (!name) {
      throw new BadRequestException();
    }
    if (user.privilege != 2) throw new UnauthorizedException();
    const response = await this.contestsService.createContest(name, tag);
    if (!response) {
      throw new BadRequestException();
    }
    if (response == 'ae') {
      throw new ConflictException();
    }
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':contestTag/:problemTag')
  async createProblem(
    @Request() req,
    @Param('contestTag') contestTag: string,
    @Param('problemTag') problemTag: string,
    @Body() body,
  ) {
    const user = await this.usersService.getById(req.user.userId);
    const { name } = body;
    if (!name) {
      throw new BadRequestException();
    }
    if (user.privilege != 2) throw new UnauthorizedException();
    const response = await this.contestsService.createProblem(
      name,
      problemTag,
      contestTag,
    );
    if (!response) {
      throw new BadRequestException();
    }
    if (response == 'ae') {
      throw new ConflictException();
    }
    return response;
  }
}
