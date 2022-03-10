// eslint-disable-next-line prettier/prettier
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Request,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExecService } from '../../service/exec/exec.service';
@Controller('exec')
export class ExecController {
  constructor(private execService: ExecService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  exec(@Request() req, @Body() bodyContents): any {
    if (!bodyContents.code || !bodyContents.contest || !bodyContents.question) {
      console.log(
        `${!bodyContents.code} || ${!bodyContents.contest} || ${!bodyContents.question}`,
      );

      throw new BadRequestException();
    }
    return this.execService.startWorker(
      bodyContents.code,
      bodyContents.contest,
      bodyContents.question,
      req.user,
    );
  }
  @Get(':id')
  ans(@Param('id') id: string): any {
    const response = this.execService.retrieveAns(id);
    if (!response) {
      throw new BadRequestException();
    }
    return response;
  }
}
