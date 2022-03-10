import { Module } from '@nestjs/common';
import { ExecController } from './controller/exec/exec.controller';
import { ExecService } from './service/exec/exec.service';
import { PrismaService } from 'src/service/prisma/prisma.service';

@Module({
  controllers: [ExecController],
  providers: [ExecService, PrismaService],
})
export class ExecModule {}
