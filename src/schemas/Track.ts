import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

@Schema()
export class Track {
  @Prop({ required: true })
  genre: string;

  @Prop({ required: false })
  lengthInSecs: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [String], required: true })
  orchestra: string[];

  @Prop({ type: [String], required: true })
  singer: string[];

  @Prop({ required: false })
  year: number;

  @Prop({ type: [RatedYoutube], required: false })
  links: RatedYoutube[];
}

export type TrackDocument = Track & Document;
export const TrackSchema = SchemaFactory.createForClass(Track);
