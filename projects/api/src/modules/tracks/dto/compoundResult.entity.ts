import { ObjectType } from '@nestjs/graphql';
import { TrackId } from '../../../types';

@ObjectType()
export class CompoundResults {
  ids: Array<TrackId>;
  totalResults: number;
  counts: SelectIndexCount;
}

@ObjectType()
export class CountTuple {
  name: string;
  count: number;
}

@ObjectType()
export class SelectIndexCount {
  year: Array<CountTuple>;
  singer: Array<CountTuple>;
  orchestra: Array<CountTuple>;
  genre: Array<CountTuple>;
}
