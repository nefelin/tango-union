import { ObjectType } from '@nestjs/graphql';
import { RatedYoutube } from '../../../schemas/tracks.entity';

@ObjectType()
export class SimpleTrack {
  id: string;
  singer?: string[];
  orchestra?: string[];
  title: string;
  genre?: string;
  secondsLong?: number;
  year?: number;
  link?: RatedYoutube;
  linkScore: number;
  flaggedForRescrape: boolean;
}

