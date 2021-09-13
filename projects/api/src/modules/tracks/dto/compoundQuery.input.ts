import { InputType, registerEnumType } from '@nestjs/graphql';

@InputType()
export class CompoundQueryInput {
  sort?: CompoundSortInput;
  pagination?: PaginationInput;
  text?: string;
  year?: string;
  orchestras?: string[];
  singers?: string[];
  titles?: string[];
  genres?: string[];
}

@InputType()
export class PaginationInput {
  limit: number;
  offset: number;
}

@InputType()
export class CompoundSortInput {
  singer?: number;
  orchestra?: number;
  genre?: number;
  year?: number;
  title?: number;
  secondsLong?: number;
  linkScore?: number;
}
