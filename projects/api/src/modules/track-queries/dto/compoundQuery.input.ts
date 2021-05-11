import { InputType } from '@nestjs/graphql';

@InputType()
export class CompoundQueryInput {
  orchestra?: string[];
  singer?: string[];
  year?: number[];
  title?: string[];
  genre?: string[];
}
