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
    if (response == 'au') {
      throw new ConflictException();
    }
    return response;
  }
}
