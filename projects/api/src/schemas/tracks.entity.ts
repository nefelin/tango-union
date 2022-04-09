import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RatedYoutube {
  @Prop({ required: true })
  videoId: string;

  @Prop()
  unionRating: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  secondsLong: number;

  @Prop({ required: true })
  whenPosted: string;

  @Prop({ required: true })
  views: number;

  @Prop({ required: true })
  authorName: string;

  @Prop({ required: true })
  authorUrl: string;
}

@ObjectType()
export class YoutubeLinks {
  @Prop({ required: true })
  scrapedAt: Date;

  @Prop({ required: true })
  linkScore: number;

  @Prop({ required: true })
  links: RatedYoutube[];
}

@Schema({ timestamps: true })
export class Track {
  _id?: string;

  @Prop({ required: true })
  id: number;

  @Prop({ required: false })
  genre?: string;

  @Prop({ required: false })
  secondsLong?: number;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [String], required: false })
  orchestra?: string[];

  @Prop({ type: [String], required: false })
  singer?: string[];

  @Prop({ required: false })
  year?: number;

  @Prop({ required: false })
  youtube?: YoutubeLinks;

  @Prop({ required: false })
  updatedAt?: Date;

  @Prop({ required: false })
  searchGrams: string;
}

export type TrackDocument = Track & Document;
export const TrackSchema = SchemaFactory.createForClass(Track);
