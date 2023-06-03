import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, registerEnumType } from '@nestjs/graphql';
import { TrackId } from '../types';

@Schema({ timestamps: true })
@ObjectType()
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

  @Prop({ required: false })
  refreshHash: string | null;

  @Prop({ required: true })
  roles: Array<UserRole>;

  @Prop({ required: false })
  likedTracks: Array<TrackId>;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CONTRIBUTOR = 'CONTRIBUTOR',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
