import { InputType } from '@nestjs/graphql';

@InputType()
export class CompoundQueryInput {
  text?: string;
  categories?: CategoryInput;
}

@InputType()
export class CategoryInput {
  orchestra?: string[];
  singer?: string[];
  title?: string[];
  genre?: string[];
}
