import { Args, Query, Resolver } from '@nestjs/graphql';
import { TrackQueriesService } from './trackQueries.service';
import { CompoundQueryInput } from './dto/compoundQuery.input';

@Resolver()
export class TrackQueriesResolver {
  constructor(private readonly trackQueriesService: TrackQueriesService) {}
  @Query(() => [Number])
  testQuery(@Args('query') query: CompoundQueryInput) {
    return this.trackQueriesService.compoundQuery(query);
  }
}
