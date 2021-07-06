import { ObjectType } from '@nestjs/graphql';
import { RatedYoutube } from '../../../schemas/tracks.entity';

@ObjectType()
export class SimpleTrack {
  id: number;
  singer?: string[];
  orchestra?: string[];
  title: string;
  genre?: string;
  secondsLong?: number;
  year?: number;
  link?: RatedYoutube;
  linkScore?: number;
}

