import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  hash: string;

  @Prop({ required: false })
  lastLogin: Date | null;

  @Prop({ required: true })
  refreshHash: string | null;

  @Prop({ required: true })
  roles: Array<UserRole>;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CONTRIBUTOR = 'CONTRIBUTOR',
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
