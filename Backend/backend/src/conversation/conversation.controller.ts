import { Body, Controller, Post } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post('/add')
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }
  @Post('/get')
  get(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.getConversation(createConversationDto);
  }
}
