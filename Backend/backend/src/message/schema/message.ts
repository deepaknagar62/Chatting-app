import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop()
  conversationID: string;

  @Prop()
  senderID: string;

  @Prop()
  recieverID: string;

  @Prop()
  text: string;

  @Prop()
  type: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
