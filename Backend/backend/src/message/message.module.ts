import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schema/message';
import { ConversationModule } from 'src/conversation/conversation.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'message', schema: MessageSchema }]),
    ConversationModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
