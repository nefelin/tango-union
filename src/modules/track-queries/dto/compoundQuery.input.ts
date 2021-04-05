import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CompoundQueryInput {
  @Field(() => String, { nullable: true })
  orchestra?: string;
  @Field(() => String, { nullable: true })
  singer?: string;
  @Field(() => String, { nullable: true })
  year?: string;
  @Field(() => String, { nullable: true })
  title?: string;
  @Field(() => String, { nullable: true })
  genre?: string;
}
