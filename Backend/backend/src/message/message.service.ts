import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MessageDocument } from './schema/message';
import { Model } from 'mongoose';
import { ConversationService } from 'src/conversation/conversation.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('message') private MessageModel: Model<MessageDocument>,
    private readonly conversationService: ConversationService,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    try {
      const model = new this.MessageModel();
      model.conversationID = createMessageDto.conversationID;
      model.senderID = createMessageDto.senderID;
      model.recieverID = createMessageDto.recieverID;
      model.text = createMessageDto.text;
      model.type = createMessageDto.type;

      await this.conversationService.getLastMessage(
        createMessageDto.conversationID,
        createMessageDto.text,
      );
      return model.save();
    } catch (error) {
      console.log(error.message);
    }
  }
  async getMessage(id: string) {
    try {
      const message = await this.MessageModel.find({ conversationID: id });
      return message;
    } catch (error) {
      console.log(error.message);
    }
  }
}
