import { Module } from '@nestjs/common';
import { ExecController } from './controller/exec/exec.controller';
import { ExecService } from './service/exec/exec.service';

@Module({
  controllers: [ExecController],
  providers: [ExecService],
})
export class ExecModule {}
