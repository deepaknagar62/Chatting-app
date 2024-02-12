import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/add')
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }
  @Get('/get/:id')
  get(@Param('id') id: string) {
    return this.messageService.getMessage(id);
  }
}
