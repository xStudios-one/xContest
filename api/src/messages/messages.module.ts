import { Module } from '@nestjs/common';
import { MessagesController } from './controller/messages/messages.controller';
import { MessagesService } from './service/messages/messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
