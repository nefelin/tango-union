import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SimpleTrack {
  id: number;
  singer?: string[];
  orchestra?: string[];
  title: string;
  genre?: string;
  secondsLong?: number;
  year?: number;
}
