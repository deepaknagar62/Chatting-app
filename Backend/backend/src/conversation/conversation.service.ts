import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConversationDocument } from './schema/conversation';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel('Conversation')
    private ConversationModel: Model<ConversationDocument>,
  ) {}

  async create(CreateConversationDto: CreateConversationDto) {
    try {
      const senderID = CreateConversationDto.senderID;
      const recieverID = CreateConversationDto.recieverID;
      const exist = await this.ConversationModel.findOne({
        members: { $all: [senderID, recieverID] },
      });
      if (exist) {
        return 'conversation already exist';
      }
      const newConversation = new this.ConversationModel({
        members: [senderID, recieverID],
      });
      newConversation.save();
      return 'conversation successfully created';
    } catch (err) {
      console.error(err);
    }
  }
  async getConversation(CreateConversationDto: CreateConversationDto) {
    try {
      const senderID = CreateConversationDto.senderID;
      const recieverID = CreateConversationDto.recieverID;
      const Conversation = await this.ConversationModel.findOne({
        members: { $all: [senderID, recieverID] },
      });
      if (Conversation) {
        return Conversation;
      }
    } catch (err) {
      console.error(err);
    }
  }
  async getLastMessage(convId: string, text: string) {
    try {
      await this.ConversationModel.findByIdAndUpdate(convId, { message: text });
    } catch (err) {
      console.error(err);
    }
  }
}
