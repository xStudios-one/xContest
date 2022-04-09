import { Module } from '@nestjs/common';
import { SubmissionsService } from './service/submissions/submissions.service';
import { SubmissionsController } from './controller/submissions/submissions.controller';

@Module({
  providers: [SubmissionsService],
  controllers: [SubmissionsController]
})
export class SubmissionsModule {}
